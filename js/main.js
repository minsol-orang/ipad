const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    // basketEl.classList.contains('show') 값이 true인 경우 숨기기 hide
    hideBasket()
  } else {
    // basketEl.classList.contains('show') 값이 false인 경우 show
    showBasket()
  }
})

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function() {
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
} 
function hideBasket() {
  basketEl.classList.remove('show')
}