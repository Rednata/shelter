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
  petsBtnMenu.forEach(dash => {
    dash.classList.add('menu-btn__dash_pets-active');
  });
};
const coloredDarkBtn = () => {
  const petsBtnMenu = document.querySelectorAll('.menu-btn__dash_pets');
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
  image,
  age,
  inoculations,
  diseases,
  parasites
}) => {
  const popupContent = document.querySelector('.popup__content');
  const title = popupContent.querySelector('.popup__title');
  const subtitle = popupContent.querySelector('.popup__subtitle');
  const text = popupContent.querySelector('.popup__text');
  const img = document.querySelector('.popup__img>img');
  const ageElem = document.querySelector('.age');
  const inocul = document.querySelector('.inocul');
  const diseasElem = document.querySelector('.diseas');
  const paras = document.querySelector('.parasite');
  img.src = image;
  title.textContent = name;
  subtitle.textContent = breed;
  text.textContent = descript;
  ageElem.textContent = age;
  inocul.textContent = inoculations;
  diseasElem.textContent = diseases;
  paras.textContent = parasites;
  const inoculWidth = inocul.offsetWidth;
  const inoculParentWudth = inocul.parentElement.offsetWidth;
  const inoculSiblingWidth = inocul.previousElementSibling.offsetWidth;
  if (inoculWidth + inoculSiblingWidth > inoculParentWudth) {
    inocul.parentElement.classList.add('li_column');
    inocul.classList.add('value_paddingLeft');
  } else {
    inocul.parentElement.classList.remove('li_column');
    inocul.classList.remove('value_paddingLeft');
  }
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
  const friends = document.querySelector('.friends__list') || document.querySelector('.pets__list');
  friends.addEventListener('click', async ({
    target
  }) => {
    const friendName = getFriendName(target);
    const url = "fonts/pets.json";
    const data = await getPetsData(url, friendName);
    const descript = getPetDescript(data, friendName);
    createInnerPopup(descript);
    showPopup();
    closePopup();
  });
};

;// CONCATENATED MODULE: ./src/script/modules/slider.js

const leftBtn = document.querySelector('.pagination_left');
const rightBtn = document.querySelector('.pagination_right');
const list = document.querySelector('.friends__list');
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
      // console.log(currentArray);   
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
  const url = 'fonts/pets.json';
  const data = await getPetsData(url);
  const cards = arr.map(id => createItem(data[id]));
  const li = document.createElement('li');
  li.className = 'friends__item';
  li.id = id;
  li.append(...cards);
  return li;
};
const renderTemp = async (arr, id) => {
  const url = 'fonts/pets.json';
  const data = await getPetsData(url);
  const cards = arr.map(id => createItem(data[id]));
  return cards;
};
const getNewCards = (count, arr) => {
  const tempArr = [...arr];
  const t = getRandomArray(count * 2, tempArr);
  // console.log(t);

  const nextArray = t.splice(count, count);
  return nextArray;
};
const taskLeftBtn = () => {
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;
  if (width > 1200) {
    list.classList.add('move_left990');
  } else if (width <= 650) {
    list.classList.add('move_left270');
  } else {
    list.classList.add('move_left700');
  }
  leftBtn.removeEventListener('click', taskLeftBtn);
};
const taskRightBtn = () => {
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;
  if (width > 1200) {
    list.classList.add('move_right990');
  } else if (width <= 650) {
    list.classList.add('move_right270');
  } else {
    list.classList.add('move_right700');
  }
  rightBtn.removeEventListener('click', taskRightBtn);
};
const getCurrentArray = () => {
  const currentCards = document.querySelectorAll('#current .friend-card');
  const currentArray = [];
  currentCards.forEach(elem => {
    currentArray.push(+elem.id);
  });
  return currentArray;
};
const moveSlider = (list, count) => {
  list.addEventListener('animationend', async e => {
    list.className = 'friends__list';
    if (e.animationName.slice(0, 4) === 'left') {
      const right = document.querySelector('#right');
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');
      current.innerHTML = right.innerHTML;
      leftBtn.addEventListener('click', taskRightBtn);
      const currentArray = getCurrentArray();
      const newArrayLeftID = getNewCards(count, currentArray);
      const newArrayRightID = getNewCards(count, currentArray);
      const newCardsRight = await renderTemp(newArrayRightID, 'right');
      const newCardsLeft = await renderTemp(newArrayLeftID, 'left');
      right.innerHTML = '';
      right.append(...newCardsRight);
      left.innerHTML = '';
      left.append(...newCardsLeft);
    } else if (e.animationName.slice(0, 4) === 'righ') {
      const left = document.querySelector('#left');
      const right = document.querySelector('#right');
      const current = document.querySelector('#current');
      current.innerHTML = left.innerHTML;
      rightBtn.addEventListener('click', taskLeftBtn);
      const currentArray = getCurrentArray();
      const newArrayLeftID = getNewCards(count, currentArray);
      const newArrayRightID = getNewCards(count, currentArray);

      // const newArrayID = getNewCards(count, currentArray);      
      const newCardsLeft = await renderTemp(newArrayLeftID, 'left');
      const newCardsRight = await renderTemp(newArrayRightID, 'right');
      left.innerHTML = '';
      left.append(...newCardsRight);
      right.innerHTML = '';
      right.append(...newCardsLeft);
    }
  });
};
const controlSlider = async count => {
  const currentArray = getRandomArray(count);
  const leftArray = getNewCards(count, currentArray);
  const rightArray = getNewCards(count, currentArray);
  const currentCards = await renderList(currentArray, 'current');
  const leftCards = await renderList(leftArray, 'left');
  const rightCards = await renderList(rightArray, 'right');
  const list = document.querySelector('.friends__list');
  list.innerHTML = '';
  list.append(leftCards, currentCards, rightCards);
  leftBtn.addEventListener('click', taskRightBtn);
  rightBtn.addEventListener('click', taskLeftBtn);
  moveSlider(list, count);
};

;// CONCATENATED MODULE: ./src/script/index.js



console.log(`
  =====================================
  Не реализована пагинация при изменении размера страницы.  
  =====================================
`);
const init = () => {
  controlBurger();
  controlPopup();
  let count;
  const width = document.body.offsetWidth;
  if (width > 1200) {
    const list = document.querySelector('.friends__list');
    list.style.left = '-1080px';
    count = 3;
  } else if (width > 650 && width <= 1200) {
    const list = document.querySelector('.friends__list');
    list.style.left = '-620px';
    count = 2;
  } else {
    const list = document.querySelector('.friends__list');
    list.style.left = '-270px';
    count = 1;
  }
  controlSlider(count);
  const widthThreeCardsMediaQuery = window.matchMedia('(min-width: 1200px)');
  widthThreeCardsMediaQuery.addEventListener('change', e => {
    if (widthThreeCardsMediaQuery.matches) {
      const list = document.querySelector('.friends__list');
      list.style.left = '-1080px';
      controlSlider(3);
    }
  });
  const widthTwoCardsMediaQuery = window.matchMedia('(max-width: 1200px) and (min-width: 650px)');
  widthTwoCardsMediaQuery.addEventListener('change', e => {
    if (widthTwoCardsMediaQuery.matches) {
      const list = document.querySelector('.friends__list');
      list.style.left = '-620px';
      controlSlider(2);
    }
  });
  const widthOneCardMediaQuery = window.matchMedia('(max-width: 650px) and (min-width: 320px)');
  widthOneCardMediaQuery.addEventListener('change', e => {
    if (widthOneCardMediaQuery.matches) {
      const list = document.querySelector('.friends__list');
      list.style.left = '-270px';
      controlSlider(1);
    }
  });
};
init();
/******/ })()
;