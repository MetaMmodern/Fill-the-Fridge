/* global initMap */

/* global google */

/* global service */

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
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
  if (cpos > 56000) {
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
        // если название места совпадает с местом в массиве
        infowindow.setContent(`${place.name} with price ${arrayMyStore[i].price}`); // выводим название места и цену
        infowindow.open(map, marker);
      }
    }
  });
}
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -20, lng: 150.644 },
    zoom: 8
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
      const MyStore1 = {
        name: 'Сільпо',
        name2: 'Silpo',
        name3: 'Сильпо',
        price: '333,33'
      };
      const MyStore2 = {
        name: 'АТБ',
        name2: 'Atb',
        name3: 'АТБ',

        price: '222,22'
      };
      const MyStore3 = {
        name: 'Велика Кишеня',
        name2: 'Velyka Kyshenya',
        name3: 'Велика Кишеня',

        price: '9874'
      };
      const MyStore4 = {
        name: 'Новус',
        name2: 'Novus',
        name3: 'Novus',

        price: '2345'
      };
      const arrayMyStore = [];
      const arrayOfRequest = [];
      arrayMyStore.push(MyStore1);
      arrayMyStore.push(MyStore2);
      arrayMyStore.push(MyStore3);
      arrayMyStore.push(MyStore4);
      // -----//
      // заполняем данные для поиска магазина
      for (let i = 0; i < arrayMyStore.length; i++) {
        arrayOfRequest.push({
          query: arrayMyStore[i].name,
          fields: ['name', 'geometry'],
          locationBias: {
            radius: 1000,
            center: { lat: pos.lat, lng: pos.lng }
          }
        });
      }
      google.maps.event.addDomListener(document.getElementById('putmarkers'), 'click', () => {
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
      });
    },
    error,
    options
  );
}
