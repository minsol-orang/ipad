// import 라는 키워드를 사용하는 js를 html 파일에서 불러오려면 html script태그 내부에 tyoe이라는 속성의 module이라는 값을 넣어 사용햐야 함
import ipads from "../data/ipads.js";
import navigations from '../data/navigations.js'

// 장바구니 !
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    // basketEl.classList.contains('show') 값이 true인 경우 숨기기 hide
    hideBasket();
  } else {
    // basketEl.classList.contains('show') 값이 false인 경우 show
    showBasket();
  }
});

basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll(".ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearching);
searchShadowEl.addEventListener("click", hideSearching);

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    // 최대 .4초를 설정하기 위해서 .4를 곱해준 후 요소의 개수만큼을 나눠줌 (0~ 0.4)
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  (searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  }),
    // .6초 뒤에 검색바가 완전히 나타나므로 focus를 .6초 뒤에 실행해주는 함수 setTimeout 사용
    setTimeout(function () {
      searchInputEl.focus();
    }, 600));
}
function hideSearching() {
  headerEl.classList.remove("searching");
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    // 최대 .4초를 설정하기 위해서 .4를 곱해준 후 요소의 개수만큼을 나눠줌 (0~ 0.4)
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  // 검색바가 사라질 때 input 요소도 함께 초기화 시킴
  searchInputEl.value = "";
}

function playScroll() {
  // documentElement = 해당 문서의 최상위 요소를 의미(<html></html>)
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// 헤더 메뉴 토글 
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if(headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // 요소가 화면에 보이지 않는 경우 함수를 종료하겠다는 조건문
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// 당신에게 맞는 iPad는? 렌더링
const itemsEl = document.querySelector("section.compare .items");

ipads.forEach(function (ipad) {
  // createElement는 요소를 자바스크립트를 통해서 생성하는 메소드 .
  // 인수로는 내가 생성하고자 하는 요소의 태그 이름을 넣어주면 됨
  // 만들어진 itemEl는 js를 통해 생성된 요소이기에 메모리상에만 존재하기에 시레 요소에 넣어주어야 함
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color : ${color};"></li>`;
  });

  // textContent 속성 : 말 그대로 글자 내용으로 어떠힌 깂을 요소 내부에 추가
  // innerHTML : 개발자가 삽입하는 문자를 실제 html 구조로 내부에 삽입을 해줌
  // itemEl.textContent = ipad.name
  // itemEl.innerHTML = '<div style="color: red;">Hello</div>'
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>

  `;

  // itemsEl에 append라는 메소드를 사용하여 실제 요소를 넣을 수 있음
  itemsEl.append(itemEl);
});


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */`
    <li>
      <a href="${map.url}">${map.name}</a>
  </li>
  `
})

mapEl.innerHTML = /* html */`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
</ul>
`

navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()