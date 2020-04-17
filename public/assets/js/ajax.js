document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms[0]
  const searchResult = document.getElementById('search-results-container')
  // Настройка AJAX запроса
  let numberOfNextPage = 0
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    const ingsString = document.getElementById('inputIngredients').value

    const ingsArray = ingredientsTempParser(ingsString)
    if (ingsString.length !== 0) {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/recipes/search', true)
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      )

      const json = JSON.stringify({
        ings: ingsArray,
        page: numberOfNextPage
      })

      // Отправляем данные
      xhr.send(json)

      // Функция для наблюдения изменения состояния xhr.readyState обновления statusMessage соответственно

      xhr.onload = function () {
        console.log(numberOfNextPage)
        numberOfNextPage === 0
          ? (numberOfNextPage += 2)
          : numberOfNextPage++
        searchResult.insertAdjacentHTML('beforeend', xhr.responseText)
      }
    }
  })
})

function ingredientsTempParser (ingsString) {
  const ingsArray = ingsString.split(' ')
  return ingsArray
}
