import classNames from "classnames";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useDeepCompareEffect from "use-deep-compare-effect";
import getLocation from "../../../utils";
type Props = {
  mapIsShowing: boolean;
};

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  center: google.maps.LatLngLiteral;
  zoom: number;
}

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
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);
  return <div ref={ref} style={style}></div>;
};

const MapSideBar: NextPage<Props> = (props) => {
  const MapContainerClassName = classNames([
    "modal-content",
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
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GMAPS_KEY!}>
          {location ? (
            <Map
              style={{ width: "100%", height: "100%" }}
              center={{
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              }}
              zoom={zoom}
            />
          ) : undefined}
        </Wrapper>
      </div>
    </div>
  );
};

export default MapSideBar;
