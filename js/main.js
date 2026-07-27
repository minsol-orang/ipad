// 장바구니 !
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


// 검색
const headerEl = document.querySelector('header')
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearching)
searchShadowEl.addEventListener('click', hideSearching)

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement = 해당 문서의 최상위 요소를 의미(<html></html>) 
  document.documentElement.classList.add('fixed')
}
function hideSearching() {
  headerEl.classList.remove('searching')
}