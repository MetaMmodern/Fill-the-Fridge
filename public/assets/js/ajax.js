/* eslint-disable no-param-reassign */
// Настройка AJAX запроса
function SubmitForm(form, allTags, searchResult) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/recipes/search/1`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  const json = JSON.stringify({
    ings: allTags
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

export default SubmitForm;
