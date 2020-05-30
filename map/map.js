/* global initMap */

/* global google */

/* global service */

// временный объект для того, чтобы заполнить долготу и широту.

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// function success(pos) {
//   const crd = pos.coords;

//   console.log('Ваше текущее метоположение:');
//   console.log(`Широта: ${crd.latitude}`);
//   console.log(`Долгота: ${crd.longitude}`);
//   console.log(`Плюс-минус ${crd.accuracy} метров.`);
// }

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -20, lng: 150.644 },
    zoom: 10
  });
  const infoWindow = new google.maps.InfoWindow();
  navigator.geolocation.getCurrentPosition(
    position => {
      // начальная позиция для карты

      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found. ' + JSON.stringify(pos));
      infoWindow.open(map);
      map.setCenter(pos);
      // infowindow = new google.maps.InfoWindow();
      // засовываем карту в див
      // service = new google.maps.places.PlacesService(map);
      // проходимся по массиву магазинов и создаем маркеры
      // for (let i = 0; i < arrayOfRequest.length; i++) {
      //   const request = arrayOfRequest[i];
      //   service.findPlaceFromQuery(request, (results, status) => {
      //     if (status === google.maps.places.PlacesServiceStatus.OK) {
      //       for (let i = 0; i < results.length; i++) {
      //         createMarker(results[i]);
      //         console.log(results[i].geometry.location);
      //       }

      //       map.setCenter(results[0].geometry.location);
      //     }
      //   });
      // }
    },
    error,
    options
  );
}
