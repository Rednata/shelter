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

;// CONCATENATED MODULE: ./src/script/modules/pagination.js


const PETS = document.querySelector('.pets__list');
const LEFTbtn = document.querySelector('.pets-pagination__next');
const RIGHTbtn = document.querySelector('.pets-pagination__prev');
const ACTIVEbtn = document.querySelector('.pets-pagination__current');
const STARTbtn = document.querySelector('.pets-pagination__start');
const ENDbtn = document.querySelector('.pets-pagination__end');
const createCard = ({
  name,
  imageSlider
}) => {
  const li = document.createElement('li');
  li.className = 'friend-card';
  li.insertAdjacentHTML('afterbegin', `
      <img src=${imageSlider} class="friend-card__img">
      <p class="friend-card__title">
        ${name}
      </p>
      <button class="friend-card__button button">Learn more</button>
  `);
  return li;
};
const renderPetsList = async arr => {
  PETS.innerHTML = '';
  const url = 'fonts/pets.json';
  const response = await getPetsData(url);
  const data = arr.map(elem => createCard(response[elem]));
  PETS.append(...data);
};
const onClickRightBtn = arr => {
  RIGHTbtn.addEventListener('click', () => {
    let activePageNumber = +ACTIVEbtn.textContent;
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = false;
    ENDbtn.disabled = false;
    STARTbtn.disabled = false;
    renderPetsList(arr[activePageNumber]);
    ACTIVEbtn.textContent = activePageNumber + 1;
    if (activePageNumber >= arr.length - 1) {
      RIGHTbtn.disabled = true;
      LEFTbtn.disabled = false;
      ENDbtn.disabled = true;
    }
  });
};
const onClickLeftBtn = arr => {
  LEFTbtn.addEventListener('click', () => {
    let activePageNumber = +ACTIVEbtn.textContent;
    LEFTbtn.disabled = false;
    RIGHTbtn.disabled = false;
    ENDbtn.disabled = false;
    renderPetsList(arr[activePageNumber - 2]);
    ACTIVEbtn.textContent = activePageNumber - 1;
    if (activePageNumber - 1 <= 1) {
      LEFTbtn.disabled = true;
      RIGHTbtn.disabled = false;
      STARTbtn.disabled = true;
    }
  });
};
const onClickEndBtn = arr => {
  ENDbtn.addEventListener('mousedown', () => {
    renderPetsList(arr[arr.length - 1]);
    RIGHTbtn.disabled = true;
    LEFTbtn.disabled = false;
    ACTIVEbtn.textContent = arr.length;
    ENDbtn.disabled = true;
    STARTbtn.disabled = false;
  });
};
const onClickStartBtn = arr => {
  STARTbtn.addEventListener('mousedown', () => {
    renderPetsList(arr[0]);
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = true;
    ACTIVEbtn.textContent = 1;
    STARTbtn.disabled = true;
    ENDbtn.disabled = false;
  });
};
const controlPagination = async (arr, count) => {
  if (ACTIVEbtn.textContent == 1) {
    LEFTbtn.disabled = true;
    STARTbtn.disabled = true;
  }
  renderPetsList(arr[0]);
  onClickRightBtn(arr);
  onClickLeftBtn(arr);
  onClickEndBtn(arr);
  onClickStartBtn(arr);
};

;// CONCATENATED MODULE: ./src/script/modules/shuffle.js
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const getShuffleArray = () => {
  const getRandom = () => {
    const min = 0;
    const max = 7;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const isNumInArray = (arr, num) => {
    return arr.some(elem => elem === num);
  };
  const isDubleInArray = elem => {
    const temp = new Set(elem);
    return elem.length !== temp.size;
  };
  const arr = [];
  while (arr.length < 8) {
    const num = getRandom();
    if (!isNumInArray(arr, num)) {
      arr.push(num);
    }
  }
  let arr1 = arr.splice(0, 3);
  let arr2 = arr.splice(0, 3);
  let arr3 = arr.splice(0, 2);
  const getStrShuffle = (arr, size) => {
    let numStr = '';
    while (numStr.length < size) {
      let t = shuffle(arr).join('');
      if (numStr.length === 0) {
        numStr += t;
      } else if (numStr.length > 0 && numStr.length <= 3) {
        if (numStr.slice(0, 3) !== t) {
          numStr += t;
        }
      } else if (numStr.length > 3 && numStr.length <= 6) {
        if (numStr.slice(0, 3) !== t && numStr.slice(3, 6) !== t) {
          numStr += t;
        }
      } else if (numStr.length > 6 && numStr.length <= 9) {
        if (numStr.slice(0, 3) !== t && numStr.slice(3, 6) !== t && numStr.slice(6, 9) !== t) {
          numStr += t;
        }
      } else if (numStr.length > 9 && numStr.length <= 12) {
        if (numStr.slice(0, 3) !== t && numStr.slice(3, 6) !== t && numStr.slice(6, 9) !== t && numStr.slice(9, 12) !== t) {
          numStr += t;
        }
      } else if (numStr.length > 12 && numStr.length <= 15) {
        if (numStr.slice(0, 3) !== t && numStr.slice(3, 6) !== t && numStr.slice(6, 9) !== t && numStr.slice(9, 12) !== t && numStr.slice(12, 15) !== t) {
          numStr += t;
        }
      } else if (numStr.length > 15 && numStr.length <= 18) {
        if (numStr.slice(0, 3) !== t && numStr.slice(3, 6) !== t && numStr.slice(6, 9) !== t && numStr.slice(9, 12) !== t && numStr.slice(12, 15) !== t && numStr.slice(15, 18) !== t) {
          numStr += t;
        }
      }
    }
    return numStr;
  };
  const str1 = getStrShuffle(arr1, 18);
  const str2 = getStrShuffle(arr2, 18);
  const str3 = getStrShuffle(arr3, 4);
  let a1 = str1.slice(0, 3);
  let a2 = str1.slice(3, 6);
  let a3 = str1.slice(6, 9);
  let a4 = str1.slice(9, 12);
  let a5 = str1.slice(12, 15);
  let a6 = str1.slice(15, 18);
  let b1 = str2.slice(0, 3);
  let b2 = str2.slice(3, 6);
  let b3 = str2.slice(6, 9);
  let b4 = str2.slice(9, 12);
  let b5 = str2.slice(12, 15);
  let b6 = str2.slice(15, 18);
  let c1 = str3.slice(0, 2);
  let c2 = str3.slice(2, 4);
  const resultStr = a1 + b1 + c1 + a2 + b1 + c2 + a4 + b5 + c2 + a4 + b3 + c1 + a6 + b3 + c2 + a2 + b6 + c1;

  // a4+b2+c2
  // a3+b4+c1+
  // +a3+b1+c2+a4+b1+c2+a5+b1+c2+a6+b1+c2 + 
  // a1+b2+c1+a2+b2+c1+a3+b2+c1+a4+b2+c1+a5+b2+c1+a6+b2+c1 + 
  // a1+b2+c2+a2+b2+c2+a3+b2+c2+a4+b2+c2+a5+b2+c2+a6+b2+c2 + 
  // a1+b3+c1+a2+b3+c1+a3+b3+c1+a4+b3+c1+a5+b3+c1+a6+b3+c1 + 
  // a1+b3+c2+a2+b3+c2+a3+b3+c2+a4+b3+c2+a5+b3+c2+a6+b3+c2 + 
  // a1+b4+c1+a2+b4+c1+a3+b4+c1+a4+b4+c1+a5+b4+c1+a6+b4+c1 + 
  // a1+b4+c2+a2+b4+c2+a3+b4+c2+a4+b4+c2+a5+b4+c2+a6+b4+c2;

  const resultArray = [];
  for (let i = 0; i < resultStr.length; i += 8) {
    const temp = [];
    const t = resultStr.slice(i, i + 8).split('');
    for (let j = 0; j < 8; j++) {
      t[j] = +t[j];
    }
    resultArray.push(...t);
  }
  return resultArray;
};
const getArray8 = arr => {
  const temp = [];
  for (let i = 0; i < 48; i += 8) {
    const t = arr.slice(i, i + 8);
    shuffle(t);
    temp.push(t);
  }
  return temp;
};
const getArray6 = arr => {
  const temp = [];
  for (let i = 0; i < 48; i += 6) {
    const t = arr.slice(i, i + 6);
    temp.push(t);
  }
  return temp;
};
const getArray3 = arr => {
  const temp = [];
  for (let i = 0; i < 48; i += 3) {
    const t = arr.slice(i, i + 3);
    temp.push(t);
  }
  return temp;
};

;// CONCATENATED MODULE: ./src/script/pets.js




console.log(`
  =====================================
  Не реализована пагинация при изменении размера страницы.  
  =====================================
`);
const init = () => {
  controlBurger();
  controlPopup();
  const arrPagination = getShuffleArray();
  const arrPagination8 = getArray8(arrPagination);
  const arrPagination6 = getArray6(arrPagination);
  const arrPagination3 = getArray3(arrPagination);
  const width = document.body.offsetWidth;
  if (width >= 1280) {
    controlPagination(arrPagination8);
  } else if (width > 650 && width <= 1200) {
    controlPagination(arrPagination6);
  } else if (width >= 320 && width <= 650) {
    controlPagination(arrPagination3);
  }
};
init();
/******/ })()
;