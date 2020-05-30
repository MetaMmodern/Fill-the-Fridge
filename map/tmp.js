myGeoPos = {
  lat: 0,
  long: 0
};
// получаем данные о местоположении
navigator.geolocation.getCurrentPosition(function(position) {
  (myGeoPos.lat = position.coords.latitude), (myGeoPos.long = position.coords.longitude);
});
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
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
  const request = {
    query: arrayMyStore[i].name,
    fields: ['name', 'geometry'],
    locationBias: { radius: 50, center: { lat: myGeoPos.lat, lng: myGeoPos.long } }
  };
  arrayOfRequest.push(request);
}
console.log(arrayOfRequest);
// инициализация карты
// eslint-disable-next-line no-unused-vars
function initMap() {
  const position = new google.maps.LatLng(myGeoPos.lat, myGeoPos.long); // начальная позиция для карты
  map = new google.maps.Map(document.getElementById('map'), { center: position, zoom: 20 });
  infowindow = new google.maps.InfoWindow();
  // засовываем карту в див

  service = new google.maps.places.PlacesService(map);
  // проходимся по массиву магазинов и создаем маркеры
  for (let i = 0; i < arrayOfRequest.length; i++) {
    const request = arrayOfRequest[i];

    service.findPlaceFromQuery(request, (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {

          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }
  map = new google.maps.Map(document.getElementById('map'), { center: position, zoom: 10 });
}
