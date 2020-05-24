// временный объект для того, чтобы заполнить долготу и широту.
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
  name: 'Маркетопт',
  price: '333,33'
};
const MyStore2 = {
  name: 'Atb',
  price: '222,22'
};
const arrayMyStore = [];
const arrayOfRequest = [];
arrayMyStore.push(MyStore1);
arrayMyStore.push(MyStore2);
// -----//
// заполняем данные для поиска магазина
function getRequest(elem) {
  request = {
    query: elem.name,
    fields: ['name', 'geometry']
  };
  return request;
}
for (let i = 0; i < arrayMyStore.length; i++) {
  arrayOfRequest.push(getRequest(arrayMyStore[i]));
}
// инициализация карты
// eslint-disable-next-line no-unused-vars
function initMap() {
  const position = new google.maps.LatLng(myGeoPos.lat, myGeoPos.long); // начальная позиция для карты

  infowindow = new google.maps.InfoWindow();
  // засовываем карту в див
  map = new google.maps.Map(document.getElementById('map'), { center: position, zoom: 15 });

  service = new google.maps.places.PlacesService(map);
  // проходимся по массиву магазинов и создаем маркеры
  for (let i = 0; i < arrayOfRequest.length; i++) {
    const request = arrayOfRequest[i];
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }
}
// создание маркера
function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });
  // по клику появляется инфополе
  google.maps.event.addListener(marker, 'click', function() {
    for (let i = 0; i < arrayMyStore.length; i++) {
      if (place.name == arrayMyStore[i].name)
        // если название места совпадает с местом в массиве
        infowindow.setContent(`${place.name} with price ${arrayMyStore[i].price}`); // выводим название места и цену
      infowindow.open(map, this);
    }
  });
}
