/* eslint-disable no-unused-vars */
/* global initMap */

/* global google */

/* global service */
// this code was got on https://developers.google.com/maps/documentation/javascript/tutorial
// also it was originally written by @TsakeLove in https://github.com/MetaMmodern/Fill-the-Fridge/tree/feature_map

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
function createList(listOfAllGoods) {
  let list = '<ul>';
  listOfAllGoods.forEach(goods => {
    list += `<li>${goods.name} - ${goods.price}</li>`;
  });
  list += '</ul>';
  return list;
}
// создание маркера
function createMarker(map, place, myposition, arrayMyStore, infowindow) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  const cpos = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(JSON.parse(JSON.stringify(marker.position))),
    new google.maps.LatLng(myposition)
  );
  if (cpos > 10000) {
    marker.setMap(null);
    return null;
  }
  // по клику появляется инфополе
  google.maps.event.addListener(marker, 'click', () => {
    for (let i = 0; i < arrayMyStore.length; i++) {
      if (
        place.name.toLowerCase().includes(arrayMyStore[i].name.toLowerCase()) ||
        place.name.toLowerCase().includes(arrayMyStore[i].name2.toLowerCase()) ||
        place.name.toLowerCase().includes(arrayMyStore[i].name3.toLowerCase())
      ) {
        const list = createList(arrayMyStore[i].listOfAllGoods);

        // если название места совпадает с местом в массиве
        infowindow.setContent(`${place.name}: ${arrayMyStore[i].price} grn. ${list}`); // выводим название места и цену
        infowindow.open(map, marker);
      }
    }
  });
  return marker;
}
function initMap(arrayMyStore) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -20, lng: 150.644 },
    zoom: 13
  });
  const infoWindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);
  navigator.geolocation.getCurrentPosition(
    position => {
      // начальная позиция для карты
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found. ');
      // infoWindow.open(map);
      map.setCenter(pos);
      // поля хардкода
      // ------//
      const arrayOfRequest = [];

      // -----//
      // заполняем данные для поиска магазина
      for (let i = 0; i < arrayMyStore.length; i++) {
        arrayOfRequest.push({
          query: arrayMyStore[i].name,
          fields: ['name', 'geometry'],
          locationBias: {
            radius: 800,
            center: { lat: pos.lat, lng: pos.lng }
          }
        });
      }
      for (let index = 0; index < arrayOfRequest.length; index++) {
        const element = arrayOfRequest[index];
        service.findPlaceFromQuery(element, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(res => {
              createMarker(map, res, pos, arrayMyStore, infoWindow);
            });
          }
        });
      }
    },
    error,
    options
  );
}

export default initMap;
