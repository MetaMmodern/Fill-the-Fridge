document.addEventListener('DOMContentLoaded', () => {
  const popupContainer = document.getElementsByClassName(
    'container-popup'
  )[0]
  document.addEventListener('click', (event) => {
    if (!event.target.matches('a.recipe-link')) return
    event.preventDefault()
    const popupRequest = new XMLHttpRequest()
    popupRequest.open('GET', event.target.getAttribute('href'))
    popupRequest.send()
    popupRequest.onload = function () {
      popupContainer.innerHTML = popupRequest.responseText
      $('#myModal').modal('show')
    }
  })
})
