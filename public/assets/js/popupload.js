// eslint-disable-next-line import/extensions
import initMap from './map.js';

function initializeMap(mapButton, storesForMap) {
  mapButton.addEventListener('click', e => {
    e.preventDefault();
    // commented below is check for mobile device, was got from https://redstapler.co/detect-mobile-device-with-javascript/

    // if (
    //   navigator.userAgent.match(/Android/i) ||
    //   navigator.userAgent.match(/iPhone/i) ||
    //   navigator.userAgent.match(/iPad/i) ||
    //   navigator.userAgent.match(/iPod/i)
    // ) {

    // } else {

    // }
    const wholemodalReciep = document.getElementById('wholemodalReciep');
    const reciepContent = document.getElementById('reciepContent');
    const mapPopup = document.getElementById('mapPopup');
    const dropmarkers = document.getElementById('dropmarkers');
    reciepContent.style.transition =
      'width 0.3s ease-in, height 0.3s ease-in, margin-right 0.3s ease-in';
    reciepContent.style.width = '3.5rem';
    reciepContent.style.height = 'calc(100vh - 3.5rem)';
    reciepContent.style.marginRight = '0.5rem';
    wholemodalReciep.classList.add('d-none');
    mapPopup.classList.remove('d-none');
    mapPopup.style.height = 'calc(100vh - 3.5rem)';
    mapPopup.classList.add('w-100');
    setTimeout(() => {
      initMap(storesForMap);
      dropmarkers.classList.remove('d-none');
    }, 300);
    dropmarkers.addEventListener('click', ev => {
      ev.preventDefault();
      mapPopup.classList.remove('w-100');
      mapPopup.classList.add('d-none');
      reciepContent.style.width = '100%';
      setTimeout(() => {
        mapPopup.style.height = '0px';
        reciepContent.style.height = '100%';
        wholemodalReciep.classList.remove('d-none');
        reciepContent.style.marginRight = '0px';
        dropmarkers.classList.add('d-none');
      }, 300);
    });
  });
}
function setupIngredients(whatToBuy) {
  const allIngs = document.getElementById('allIngs');
  allIngs.querySelectorAll('span').forEach(ing => {
    if (whatToBuy.includes(ing.innerHTML.toLowerCase())) {
      ing.parentElement.classList.add('list-group-item-danger');
    }
  });
}
function setupStores(stores) {
  const storesInHTML = document.getElementById('allStores');
  stores.forEach(store => {
    const outterStoreContainer = document.createElement('div');
    const cartLogo = document.createElement('span');
    const storeName = document.createElement('div');
    const dash = document.createElement('span');
    const storeCartPrice = document.createElement('div');
    const uah = document.createElement('span');
    outterStoreContainer.setAttribute('class', 'store d-flex align-items-center mb-2');
    cartLogo.setAttribute('class', 'material-icons mr-1');
    cartLogo.innerHTML = 'shopping_cart';
    storeName.setAttribute('class', 'storeName');
    storeCartPrice.setAttribute('class', 'Price');
    uah.innerHTML = ' grn.';
    dash.innerHTML = '&mdash;';
    storeName.innerHTML = store.name;
    storeCartPrice.innerHTML = store.price;
    outterStoreContainer.appendChild(cartLogo);
    outterStoreContainer.appendChild(storeName);
    outterStoreContainer.appendChild(dash);
    outterStoreContainer.appendChild(storeCartPrice);
    outterStoreContainer.appendChild(uah);
    storesInHTML.appendChild(outterStoreContainer);
  });
}
async function loadStoresAndPries(whatToBuy) {
  document
    .getElementById('allStores')
    .setAttribute('class', 'd-flex justify-content-center align-items-center mt-1 mb-3');
  document.getElementById('allStores').innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>";
  const response = await fetch('/Cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      whatToBuy
    })
  });
  // Отправляем данные
  const stores = await response.json();
  document.getElementById('allStores').innerHTML = '';
  document.getElementById('allStores').setAttribute('class', '');
  return stores;
}
function popup() {
  const popupContainer = document.getElementsByClassName('container-popup')[0];
  document.addEventListener('click', event => {
    if (!event.target.matches('a.recipe-link')) return;
    event.preventDefault();
    const popupRequest = new XMLHttpRequest();
    popupRequest.open('POST', event.target.getAttribute('href'));
    popupRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    popupRequest.send(
      JSON.stringify({
        href: event.target.getAttribute('href')
      })
    );
    popupRequest.onload = async () => {
      popupContainer.innerHTML = popupRequest.responseText;
      window.history.pushState(
        event.target.getAttribute('href'),
        'page 2',
        event.target.getAttribute('href')
      );
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
      const mapButton = document.getElementById('openMap');
      mapButton.setAttribute('disabled', 'true');
      mapButton.innerHTML = 'Searching for prices...';
      $('#myModal').modal('show');
      $('#myModal').on('hidden.bs.modal', () => {
        window.history.back();
      });
      const currentLocalStorage = JSON.parse(localStorage.getItem('tags')).map(el =>
        el.toLowerCase()
      );
      const whatToBuy = [...document.querySelectorAll('.ingredientsSingle span')]
        .map(e => e.innerHTML.toLowerCase())
        .filter(el => !currentLocalStorage.includes(el));
      const storesAndPrices = await loadStoresAndPries(whatToBuy);
      setupStores(storesAndPrices);
      setupIngredients(whatToBuy);
      const storesForMap = storesAndPrices.map(el => {
        switch (el.name) {
          case 'Сільпо':
            return {
              name: el.name,
              name2: 'Silpo',
              name3: 'Сильпо',
              price: el.price
            };
          case 'АТБ':
            return {
              name: el.name,
              name2: 'Atb',
              name3: 'АТБ',
              price: el.price
            };

          case 'Novus':
            return {
              name: 'Новус',
              name2: el.name,
              name3: 'Новус',
              price: el.price
            };

          case 'Велика Кишеня':
            return {
              name: el.name,
              name2: 'Velyka Kyshenya',
              name3: el.name,
              price: el.price
            };

          default:
            return {};
        }
      });
      mapButton.removeAttribute('disabled');
      mapButton.innerHTML = 'See on Map';

      initializeMap(mapButton, storesForMap);
    };
  });
}
export { popup, loadStoresAndPries, setupStores, setupIngredients, initializeMap };
