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
function createMarker(map, place, arrayMyStore, infowindow) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  // по клику появляется инфополе
  google.maps.event.addListener(marker, 'click', () => {
    console.log(`clicked ${marker.position}`);
    for (let i = 0; i < arrayMyStore.length; i++) {
      if (place.name === arrayMyStore[i].name || place.name === arrayMyStore[i].name2) {
        console.log(`${place.name} = ${arrayMyStore[i].name}`);

        // если название места совпадает с местом в массиве
        infowindow.setContent(`${place.name} with price ${arrayMyStore[i].price}`); // выводим название места и цену
        infowindow.open(map, this);
      }
    }
  });
}
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -20, lng: 150.644 },
    zoom: 10
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
        name: 'Сильпо',
        name2: 'Silpo',
        price: '333,33'
      };
      const MyStore2 = {
        name: 'Atb',
        name2: 'Aтб',
        price: '222,22'
      };
      const MyStore3 = {
        name: 'Velyka Kyshenya',
        name2: 'Велика Кишеня',
        price: '0'
      };
      const MyStore4 = {
        name: 'Novus',
        name2: 'Новус',
        price: '0'
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
            radius: 5,
            center: { lat: pos.lat, lng: pos.lng }
          }
        });
      }
      for (let index = 0; index < arrayOfRequest.length; index++) {
        const element = arrayOfRequest[index];
        service.findPlaceFromQuery(element, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(res => {
              createMarker(map, res, arrayMyStore, infoWindow);
            });
          }
        });
      }
      console.log(arrayOfRequest);
    },
    error,
    options
  );
}
