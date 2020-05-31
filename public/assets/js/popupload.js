function setupIngredients(whatToBuy) {
  const allIngs = document.getElementById('allIngs');
  allIngs.querySelectorAll('span').forEach(ing => {
    console.log(whatToBuy);
    console.log(ing.innerHTML);
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

      setupStores(await loadStoresAndPries(whatToBuy));
      setupIngredients(whatToBuy);
    };
  });
}
export { popup, loadStoresAndPries, setupStores, setupIngredients };
