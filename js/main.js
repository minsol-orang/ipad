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
const headerMenuEls = [...headerEl.querySelectorAll('.ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearching)
searchShadowEl.addEventListener('click', hideSearching)

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement = 해당 문서의 최상위 요소를 의미(<html></html>) 
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    // 최대 .4초를 설정하기 위해서 .4를 곱해준 후 요소의 개수만큼을 나눠줌 (0~ 0.4)
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' 
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's' 
  })
}
function hideSearching() {
  headerEl.classList.remove('searching')
  headerMenuEls.reverse().forEach(function (el, index) {
    // 최대 .4초를 설정하기 위해서 .4를 곱해준 후 요소의 개수만큼을 나눠줌 (0~ 0.4)
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' 
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's' 
  })
  searchDelayEls.reverse()
}