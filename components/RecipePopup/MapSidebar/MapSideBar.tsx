import classNames from "classnames";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useDeepCompareEffect from "use-deep-compare-effect";
import getLocation from "../../../utils/getLocation";
import { Carts } from "../../../types";

import styles from "./MapSideBar.module.scss";

type Props = {
  mapIsShowing: boolean;
  stores: Carts;
};

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  center: google.maps.LatLngLiteral;
  zoom: number;
  stores: Carts;
}

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  style,
  center,
  zoom,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [positions, setPositions] = useState([]);
  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);
  const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]);
  // create marker positions
  useEffect(() => {
    function findPlacePromise(
      element: google.maps.places.FindPlaceFromQueryRequest,
      service: google.maps.places.PlacesService
    ): Promise<google.maps.places.PlaceResult[]> {
      return new Promise((resolve, reject) => {
        service.findPlaceFromQuery(
          element,
          (
            a: google.maps.places.PlaceResult[] | null,
            b: google.maps.places.PlacesServiceStatus
          ) => {
            if (a) resolve(a);
            else reject(b);
          }
        );
      });
    }
    if (map) {
      console.log("started searching");
      const service = new window.google.maps.places.PlacesService(map);
      const requestBodies = options.stores.map((el) => ({
        query: el.name,
        fields: ["name", "geometry"],
        locationBias: {
          radius: 800,
          center: { lat: center.lat, lng: center.lng },
        },
      }));
      console.log(requestBodies);
      const promises = requestBodies.map((reqBody) =>
        findPlacePromise(reqBody, service)
      );
      Promise.allSettled(promises).then((results) => {
        console.log(results);
        results.forEach((resultArray) => {
          if (resultArray.status == "fulfilled") {
            const userPosition = new google.maps.LatLng(center.lat, center.lng);
            const markerParams = resultArray.value
              .map((resultPosition) => ({
                map,
                position: resultPosition.geometry?.location,
              }))
              .filter(({ position }) => {
                if (!position?.lat || !position.lng) {
                  return false;
                }
                const cpos =
                  google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(position.lat(), position.lng()),
                    userPosition
                  );
                return cpos <= 10000;
              });
            setMarkers(markerParams);
          }
        });
      });
    }
  }, [center.lat, center.lng, map, options.stores]);

  return (
    <div ref={ref} style={style}>
      {markers.map((mOptions, i) => {
        return <Marker {...mOptions} key={i} />;
      })}
    </div>
  );
};

const MapSideBar: NextPage<Props> = (props) => {
  const MapContainerClassName = classNames([
    "modal-content",
    "w-100",
    styles.mapPopup,
    { "d-none": !props.mapIsShowing },
  ]);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  useEffect(() => {
    getLocation().then((loc) => {
      setLocation(loc);
    });
  }, []);

  const zoom = 14;
  return (
    <div
      className={MapContainerClassName}
      id="mapPopup"
      style={{ width: "400px" }}
    >
      <div className="modal-body" style={{ padding: "0.5rem" }}>
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GMAPS_KEY!}
          libraries={["places"]}
        >
          {location ? (
            <Map
              style={{ width: "100%", height: "100%" }}
              center={{
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              }}
              zoom={zoom}
              stores={props.stores}
            />
          ) : undefined}
        </Wrapper>
      </div>
    </div>
  );
};

export default MapSideBar;
