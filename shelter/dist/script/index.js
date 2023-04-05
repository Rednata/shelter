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
const getFriendName = target => {
  const card = target.closest('.friend-card');
  return card.querySelector('.friend-card__title').textContent.trim();
};
const getFriendDescript = async (url, friendName) => {
  const response = await fetch(url);
  const data = await response.json();
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
const showPopup = popup => {
  popup.classList.add('overlay-popup_active');
  document.body.classList.add('deleteScroll');
};
const closePopup = popup => {
  const closeBtn = document.querySelector('.popup__btn');
  closeBtn.addEventListener('click', () => {
    popup.classList.add('overlay-popup_delete');
    document.body.classList.remove('deleteScroll');
    setTimeout(() => {
      popup.classList.remove('overlay-popup_active');
      popup.classList.remove('overlay-popup_delete');
    }, 400);
  });
};
const controlPopup = () => {
  const friends = document.querySelector('.friends__list');
  friends.addEventListener('click', async ({
    target
  }) => {
    const friendName = getFriendName(target);
    const url = "../fonts/pets.json";
    const descript = await getFriendDescript(url, friendName);
    createInnerPopup(descript);
    const popup = document.querySelector('.overlay-popup');
    showPopup(popup);
    closePopup(popup);
  });
};

;// CONCATENATED MODULE: ./src/script/index.js


const init = () => {
  // if (document.location.pathname === '/pets.html') {
  //   controlBurger();    
  // } else {
  controlBurger();
  controlPopup();
  // }
};

init();
/******/ })()
;