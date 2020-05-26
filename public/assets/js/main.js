/* eslint-disable import/extensions */
import SubmitForm from './ajax.js';

import addTags from './tagsinput.js';

import popup from './popupload.js';

import localStorageSetter from './startup.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms[0];
  let loadPageNum = 2;
  let olderInput = [];
  const searchResult = document.getElementById('search-results-container');
  const container = document.querySelector('.tag-container');
  const input = document.querySelector('.tag-container input');

  let allTags = localStorageSetter(container);

  //  preventing form sending by enter
  form.addEventListener('keypress', e => {
    if (e.key === 'Enter') e.preventDefault();
  });
  //  very comlex and spagetti code below. it is for first ajax loading.
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (
      allTags.join('').length !== 0 &&
      [...new Set(olderInput.slice().sort())].join() !== [...new Set(allTags.slice().sort())].join()
    ) {
      loadPageNum = 2;
      SubmitForm(form, allTags, searchResult);
      olderInput = [...allTags];
    }
  });
  popup();
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
  window.addEventListener('scroll', infinity);

  //  tags adding below
  input.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      allTags.push(input.value);
      localStorage.setItem('tags', JSON.stringify(allTags));
      addTags(allTags, container);
      input.value = '';
    }
  });

  document.addEventListener('click', e => {
    if (e.target.tagName === 'SPAN') {
      const value = e.target.getAttribute('data-item');
      const index = allTags.indexOf(value);
      allTags = [...allTags.slice(0, index), ...allTags.slice(index + 1)];
      localStorage.setItem('tags', JSON.stringify(allTags));
      addTags(allTags, container);
    }
  });
});
