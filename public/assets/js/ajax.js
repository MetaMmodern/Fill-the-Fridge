function ingredientsTempParser(ingsString) {
  const ingsArray = ingsString.split(' ');
  return ingsArray;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms[0];
  let loadPageNum = 2;
  let currentIngs = document.getElementById('inputIngredients').value;

  const searchResult = document.getElementById('search-results-container');
  // Настройка AJAX запроса
  form.addEventListener('submit', event => {
    event.preventDefault();
    const ingsString = document.getElementById('inputIngredients').value;
    if (ingsString !== currentIngs) {
      currentIngs = ingsString;
      const ingsArray = ingredientsTempParser(ingsString);
      if (ingsString.length !== 0) {
        const xhr = new XMLHttpRequest();
        loadPageNum = 2;
        xhr.open('POST', `/recipes/search/1`);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        const json = JSON.stringify({
          ings: ingsArray
        });
        // ref http://weblab.ua/ajax-request-without-jquery/
        // Отправляем данные
        xhr.send(json);
        document.getElementById('reloading').innerHTML =
          "<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>";
        searchResult.style.filter = 'blur(5px) opacity(50%)';
        // Функция для наблюдения изменения состояния xhr.readyState обновления statusMessage соответственно
        xhr.onreadystatechange = () => {
          // 4 = Ответ от сервера полностью загружен
          if (xhr.readyState === 4) {
            // 200 - 299 = успешная отправка данных!
            if (xhr.status === 200 && xhr.status < 300) {
              searchResult.innerHTML = xhr.responseText;
              searchResult.style.filter = 'none';

              document.getElementById('reloading').innerHTML = '';
            } else {
              searchResult.style.filter = 'none';

              searchResult.innerHTML = 'nothing found, try again, please';
              document.getElementById('reloading').innerHTML = '';
            }
          }
        };
      }
    }
  });
  let scrollPos = 0;
  function infinity() {
    if (
      //  ref https://codepen.io/lehollandaisvolant/pen/ryrrGx?editors=0010
      //  ref http://jsfiddle.net/8PkQN/1/
      document.body.getBoundingClientRect().top <= scrollPos &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    ) {
      window.removeEventListener('scroll', infinity);
      const infinityIngsArray = ingredientsTempParser(currentIngs);
      if (currentIngs.length !== 0) {
        const infinityXhr = new XMLHttpRequest();
        infinityXhr.open('POST', `/recipes/search/${loadPageNum}`);
        infinityXhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        const json = JSON.stringify({
          ings: infinityIngsArray
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
});
