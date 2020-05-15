function ingredientsTempParser(ingsString) {
  const ingsArray = ingsString.split(' ');
  return ingsArray;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms[0];
  let currentIngs = document.getElementById('inputIngredients').value;

  const searchResult = document.getElementById('search-results-container');
  // Настройка AJAX запроса
  let numberOfNextPage = 1;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const ingsString = document.getElementById('inputIngredients').value;
    if (ingsString !== currentIngs) {
      currentIngs = ingsString;
      const ingsArray = ingredientsTempParser(ingsString);
      if (ingsString.length !== 0) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/recipes/search/${numberOfNextPage}`);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        const json = JSON.stringify({
          ings: ingsArray
        });

        // Отправляем данные
        xhr.send(json);

        // Функция для наблюдения изменения состояния xhr.readyState обновления statusMessage соответственно

        xhr.onload = () => {
          numberOfNextPage += 1;
          searchResult.innerHTML = xhr.responseText;
        };
      }
    }
  });
});
