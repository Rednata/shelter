/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/script/modules/burger.js
const btnMenu = document.querySelector('.menu-btn');
const menu = document.querySelector('.burger');
const overlay = document.querySelector('.overlay');
let flagOpen = true;
const coloredLightBtn = () => {
  const petsBtnMenu = document.querySelectorAll('.menu-btn__dash_pets');
  console.log(petsBtnMenu);
  petsBtnMenu.forEach(dash => {
    dash.classList.add('menu-btn__dash_pets-active');
  });
};
const coloredDarkBtn = () => {
  const petsBtnMenu = document.querySelectorAll('.menu-btn__dash_pets');
  console.log(petsBtnMenu);
  petsBtnMenu.forEach(dash => {
    dash.classList.remove('menu-btn__dash_pets-active');
  });
};
const openMenu = () => {
  menu.classList.toggle('burger_active');
  overlay.classList.toggle('overlay_active');
  btnMenu.classList.toggle('menu-btn_active');
  document.body.classList.add('deleteScroll');
  flagOpen = false;
  coloredLightBtn();
};
const closeMenu = () => {
  menu.classList.toggle('burger_active');
  overlay.classList.toggle('overlay_active');
  btnMenu.classList.toggle('menu-btn_active');
  document.body.classList.remove('deleteScroll');
  flagOpen = true;
  coloredDarkBtn();
};
const onClickOverlay = () => {
  overlay.addEventListener('click', ({
    target
  }) => {
    if (target.classList.contains('overlay')) {
      closeMenu();
    }
  });
};
const onClickNavLinks = () => {
  const linkMenu = document.querySelectorAll('.burger .nav__link');
  linkMenu.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.toggle('burger_active');
      overlay.classList.toggle('overlay_active');
      btnMenu.classList.toggle('menu-btn_active');
      document.body.classList.remove('deleteScroll');
      flagOpen = true;
      coloredDarkBtn();
    });
  });
};
const controlBurger = () => {
  btnMenu.addEventListener('click', () => {
    if (flagOpen) openMenu();else {
      closeMenu();
    }
  });
  onClickOverlay();
  onClickNavLinks();
};
;// CONCATENATED MODULE: ./src/script/modules/popup.js
const popup = document.querySelector('.overlay-popup');
const getFriendName = target => {
  const card = target.closest('.friend-card');
  return card.querySelector('.friend-card__title').textContent.trim();
};
const getPetsData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const getPetDescript = (data, friendName) => {
  return data.find(item => item.name === friendName);
};
const createInnerPopup = ({
  name,
  breed,
  descript,
  image
}) => {
  const popupContent = document.querySelector('.popup__content');
  const title = popupContent.querySelector('.popup__title');
  const subtitle = popupContent.querySelector('.popup__subtitle');
  const text = popupContent.querySelector('.popup__text');
  const img = document.querySelector('.popup__img>img');
  img.src = image;
  title.textContent = name;
  subtitle.textContent = breed;
  text.textContent = descript;
};
const showPopup = () => {
  popup.classList.add('overlay-popup_active');
  document.body.classList.add('deleteScroll');
};
const closePopup = () => {
  popup.addEventListener('click', ({
    target
  }) => {
    const closeBtn = document.querySelector('.popup__btn');
    if (target === popup || target === closeBtn) {
      popup.classList.add('overlay-popup_delete');
      document.body.classList.remove('deleteScroll');
      setTimeout(() => {
        popup.classList.remove('overlay-popup_active');
        popup.classList.remove('overlay-popup_delete');
      }, 400);
    }
  });
};
const controlPopup = () => {
  const friends = document.querySelector('.friends__list');
  friends.addEventListener('click', async ({
    target
  }) => {
    const friendName = getFriendName(target);
    const url = "../fonts/pets.json";
    const data = await getPetsData(url, friendName);
    const descript = getPetDescript(data, friendName);
    createInnerPopup(descript);
    showPopup();
    closePopup();
  });
};

;// CONCATENATED MODULE: ./src/script/modules/slider.js

const getRandomID = () => {
  const min = 0;
  const max = 7;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const isIDInArray = (arr, id) => arr.some(num => num === id);
const getRandomArray = (count, currentArray) => {
  if (!currentArray) {
    const currentArray = [];
    while (currentArray.length < count) {
      const id = getRandomID();
      if (!isIDInArray(currentArray, id)) {
        currentArray.push(id);
      }
    }
    return currentArray;
  } else {
    while (currentArray.length < count) {
      const id = getRandomID();
      if (!isIDInArray(currentArray, id)) {
        currentArray.push(id);
      }
    }
    return currentArray;
  }
};
const createItem = ({
  id,
  name,
  imageSlider
}) => {
  const card = document.createElement('div');
  card.className = 'friend-card';
  card.id = id;
  const img = document.createElement('img');
  img.className = 'friend-card__img';
  img.src = imageSlider;
  const title = document.createElement('p');
  title.className = 'friend-card__title';
  title.textContent = name;
  const btn = document.createElement('button');
  btn.className = 'friend-card__button button';
  btn.textContent = 'Learn more';
  card.append(img, title, btn);
  return card;
};
const renderList = async (arr, id) => {
  const url = '../fonts/pets.json';
  const data = await getPetsData(url);
  const cards = arr.map(id => createItem(data[id]));
  const li = document.createElement('li');
  li.className = 'friends__item';
  li.id = id;
  li.append(...cards);
  return li;
};
const getNewCards = (count, arr) => {
  const tempArr = [...arr];
  const nextArray = getRandomArray(count * 2, tempArr).splice(count, count);
  return nextArray;
};
const onClickLeftBtn = (list, count) => {
  const leftBtn = document.querySelector('.pagination_left');
  leftBtn.addEventListener('click', async () => {
    list.classList.add('move_left');
    list.addEventListener('animationend', () => {
      list.className = 'friends__list';
      const right = document.querySelector('#right');
      const current = document.querySelector('#current');
      current.innerHTML = right.innerHTML;
    });
    const currentCards = document.querySelectorAll('#current .friend-card');
    const currentArray = [];
    currentCards.forEach(elem => {
      currentArray.push(+elem.id);
    });
    console.log('currentArray:::::', currentArray);
    const newArray = getNewCards(count, currentArray);
    console.log('newArray:::: ', newArray);
    console.log('=========================');
    const newCards = await renderList(newArray, 'right');
    right.remove();
    list.append(newCards);
  });
};
const onClickRightBtn = (list, count) => {
  const rightBtn = document.querySelector('.pagination_right');
  rightBtn.addEventListener('click', async () => {
    list.classList.add('move_right');
    list.addEventListener('animationend', () => {
      list.className = 'friends__list';
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');
      current.innerHTML = left.innerHTML;
    });
    const currentCards = document.querySelectorAll('#current .friend-card');
    const currentArray = [];
    currentCards.forEach(elem => {
      currentArray.push(+elem.id);
    });
    const newArray = getNewCards(count, currentArray);
    const newCards = await renderList(newArray, 'left');
    left.remove();
    list.prepend(newCards);
  });
};
const controlSlider = async () => {
  const currentPageWidth = document.body.offsetWidth;
  let count;
  if (currentPageWidth >= 1280) {
    count = 3;
  }
  const currentArray = getRandomArray(count);
  const leftArray = getNewCards(count, currentArray);
  const rightArray = getNewCards(count, currentArray);
  const currentCards = await renderList(currentArray, 'current');
  const leftCards = await renderList(leftArray, 'left');
  const rightCards = await renderList(rightArray, 'right');
  const list = document.querySelector('.friends__list');
  list.append(leftCards, currentCards, rightCards);
  onClickLeftBtn(list, count);
  onClickRightBtn(list, count);

  // const leftItem = document.querySelector('.friends__item:first-child');
  // const rightItem = document.querySelector('.friends__item:last-child');
  // let currentItem = document.querySelector('.friends__item:nth-child(2');
  // currentItem.innerHTML = '';
  // currentItem.append(leftItem);
};


;// CONCATENATED MODULE: ./src/script/index.js



const init = () => {
  // if (document.location.pathname === '/pets.html') {
  //   controlBurger();    
  // } else {
  controlBurger();
  controlSlider();
  controlPopup();

  // }
};

init();
/******/ })()
;