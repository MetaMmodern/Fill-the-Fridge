/* eslint-disable import/extensions */
import SubmitForm from './ajax.js';

import addTags from './tagsinput.js';

import localStorageSetter from './startup.js';

import { popup, loadStoresAndPries, setupStores, setupIngredients } from './popupload.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.forms[0];
  let loadPageNum = 2;
  let olderInput = [];
  const searchResult = document.getElementById('search-results-container');
  const container = document.querySelector('.tag-container');
  const input = document.querySelector('.tag-container input');

  let allTags = localStorageSetter(container);
  if (allTags.length === 0) input.setAttribute('placeholder', 'Ingredients');
  //  preventing form sending by enter
  form.addEventListener('keypress', e => {
    if (e.key === 'Enter') e.preventDefault();
  });
  //  infinity scroll loading below
  let scrollPos = 0;
  function infinity() {
    if (
      //  ref https://codepen.io/lehollandaisvolant/pen/ryrrGx?editors=0010
      //  ref http://jsfiddle.net/8PkQN/1/
      document.body.getBoundingClientRect().top <= scrollPos &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    ) {
      window.removeEventListener('scroll', infinity);
      if (allTags.join('').length !== 0) {
        const infinityXhr = new XMLHttpRequest();
        infinityXhr.open('POST', `/recipes/search/${loadPageNum}`);
        infinityXhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        const json = JSON.stringify({
          ings: allTags
        });

        // Отправляем данные
        infinityXhr.send(json);

        document.getElementById('loading').innerHTML =
          "<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>";

        // Функция для наблюдения изменения состояния xhr.readyState обновления statusMessage соответственно
        infinityXhr.onreadystatechange = () => {
          // 4 = Ответ от сервера полностью загружен
          if (infinityXhr.readyState === 4) {
            // 200 - 299 = успешная отправка данных!
            if (infinityXhr.status === 200 && infinityXhr.status < 300) {
              loadPageNum += 1;
              searchResult.insertAdjacentHTML('beforeend', infinityXhr.responseText);

              document.getElementById('loading').innerHTML = '';
              window.addEventListener('scroll', infinity);
            } else {
              searchResult.insertAdjacentHTML('beforeend', 'nothing found, try again, please');
              document.getElementById('loading').innerHTML = '';
              window.addEventListener('scroll', infinity);
            }
          }
        };
      }
    }
    // saves the new position for iteration.
    scrollPos = document.body.getBoundingClientRect().top;
  }
  //  very comlex and spagetti code below. it is for first ajax loading.
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (
      allTags.join('').length !== 0 &&
      [...new Set(olderInput.slice().sort())].join() !== [...new Set(allTags.slice().sort())].join()
    ) {
      if (document.getElementsByClassName('fullreciep')[0] !== undefined) {
        document.getElementsByClassName('fullreciep')[0].innerHTML = '';
        document.getElementsByClassName('fullreciep')[0].style.border = 'none';
      }
      loadPageNum = 2;
      SubmitForm(form, allTags, searchResult);
      olderInput = [...allTags];
      window.history.pushState('search', 'page 1', '/');
      window.addEventListener('scroll', infinity);
    }
  });
  popup();
  if (document.getElementsByClassName('fullreciep')[0] !== undefined) {
    if (document.getElementsByClassName('fullreciep')[0].innerHTML !== '') {
      window.removeEventListener('scroll', infinity);
      const currentLocalStorage = JSON.parse(localStorage.getItem('tags')).map(el =>
        el.toLowerCase()
      );
      const whatToBuy = [...document.querySelectorAll('.ingredientsSingle span')]
        .map(e => e.innerHTML.toLowerCase())
        .filter(el => !currentLocalStorage.includes(el));
      setupStores(await loadStoresAndPries(whatToBuy));
      setupIngredients(whatToBuy);
    }
  }

  //  tags adding below
  input.addEventListener('keyup', e => {
    if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      input.value !== '' &&
      input.value.split(' ').join('') !== ''
    ) {
      e.preventDefault();
      allTags.push(input.value);
      localStorage.setItem('tags', JSON.stringify(allTags));
      addTags(allTags, container);
      input.value = '';
      input.removeAttribute('placeholder');
    }
    if (e.key === 'Backspace' && input.value === '' && allTags.length > 0) {
      e.preventDefault();
      input.value = allTags[allTags.length - 1];
      allTags = [...allTags.slice(0, allTags.length - 1)];
      localStorage.setItem('tags', JSON.stringify(allTags));
      addTags(allTags, container);
    }
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('tagCloser')) {
      const value = e.target.getAttribute('data-item');
      const index = allTags.indexOf(value);
      allTags = [...allTags.slice(0, index), ...allTags.slice(index + 1)];
      localStorage.setItem('tags', JSON.stringify(allTags));
      addTags(allTags, container);
      if (allTags.length === 0) {
        input.setAttribute('placeholder', 'Ingredients');
      }
    }
  });
  document.addEventListener('click', e => {
    if (e.target.classList.contains('cleaner')) {
      allTags = [];
      addTags([], container);
      localStorage.setItem('tags', JSON.stringify([]));
    }
  });
});
