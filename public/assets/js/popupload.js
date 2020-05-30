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
    popupRequest.onload = () => {
      popupContainer.innerHTML = popupRequest.responseText;
      window.history.pushState(
        event.target.getAttribute('href'),
        'page 2',
        event.target.getAttribute('href')
      );
      $('#myModal').modal('show');
      $('#myModal').on('hidden.bs.modal', () => {
        window.history.back();
      });
      const currentLocalStorage = JSON.parse(localStorage.getItem('tags')).map(el =>
        el.toLowerCase()
      );
      // make this parser work normally!
      const whatToBuy = [...document.querySelectorAll('.ingredientsSingle span')]
        .map(e => e.innerHTML.toLowerCase())
        .filter(el => !currentLocalStorage.includes(el));
      const buyRequest = new XMLHttpRequest(); // открытие запроса
      buyRequest.open('POST', '/Cart');
      buyRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); //  пишем что это json
      // Отправляем данные
      buyRequest.send(
        JSON.stringify({
          whatToBuy
        })
      );
      buyRequest.onreadystatechange = () => {
        // 4 = Ответ от сервера полностью загружен
        if (buyRequest.readyState === 4) {
          // 200 - 299 = успешная отправка данных!
          if (buyRequest.status === 200 && buyRequest.status < 300) {
            // eslint-disable-next-line no-console
            console.log(buyRequest.responseText);
          } else {
            //  не успешное получение данных
            // eslint-disable-next-line no-console
            console.log('ну напиши ты миддлвар нормально');
          }
        }
      };
    };
  });
}
export default popup;
