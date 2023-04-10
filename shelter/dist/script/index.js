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
  const friends = document.querySelector('.friends__list') || document.querySelector('.pets');
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
    console.log(arr[activePageNumber]);
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = false;
    ENDbtn.disabled = false;
    STARTbtn.disabled = false;
    renderPetsList(arr[activePageNumber]);
    ACTIVEbtn.textContent = activePageNumber + 1;
    if (activePageNumber >= 5) {
      RIGHTbtn.disabled = true;
      LEFTbtn.disabled = false;
      ENDbtn.disabled = true;
    }
  });
};
const onClickLeftBtn = arr => {
  LEFTbtn.addEventListener('click', () => {
    let activePageNumber = +ACTIVEbtn.textContent;
    console.log(arr[activePageNumber - 2]);
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
    console.log(arr[arr.length - 1]);
    RIGHTbtn.disabled = true;
    LEFTbtn.disabled = false;
    ACTIVEbtn.textContent = arr.length;
    ENDbtn.disabled = true;
    STARTbtn.disabled = false;
    console.log('++');
  });
};
const onClickStartBtn = arr => {
  STARTbtn.addEventListener('mousedown', () => {
    renderPetsList(arr[0]);
    console.log(arr[0]);
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = true;
    ACTIVEbtn.textContent = 1;
    STARTbtn.disabled = true;
    ENDbtn.disabled = false;
  });
};
const controlPagination = async (arr, count) => {
  console.log(arr);
  if (ACTIVEbtn.textContent == 1) {
    console.warn('============');
    LEFTbtn.disabled = true;
    STARTbtn.disabled = true;
  }
  renderPetsList(arr[0]);
  onClickRightBtn(arr);
  onClickLeftBtn(arr);
  onClickEndBtn(arr);
  onClickStartBtn(arr);
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
  const nextArray = getRandomArray(count * 2, tempArr).splice(count, count);
  return nextArray;
};
const taskLeftBtn = () => {
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;
  console.log(width1);
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
  console.log(width1);
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
      const current = document.querySelector('#current');
      console.warn('right===', right);
      console.warn('current===', current);
      current.innerHTML = right.innerHTML;
      leftBtn.addEventListener('click', taskLeftBtn);
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);
      const newCards = await renderTemp(newArrayID, 'right');
      console.log(newCards);
      right.innerHTML = '';
      right.append(...newCards);
    } else {
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');
      current.innerHTML = left.innerHTML;
      rightBtn.addEventListener('click', taskRightBtn);
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);
      const newCards = await renderTemp(newArrayID, 'left');
      console.log(newCards);
      left.innerHTML = '';
      left.append(...newCards);
    }
  });
};
const controlSlider = async count => {
  console.log('count in controlSLIDER', count);
  const currentArray = getRandomArray(count);
  console.log('currentArray: ', currentArray);
  const leftArray = getNewCards(count, currentArray);
  console.log('leftArray: ', leftArray);
  const rightArray = getNewCards(count, currentArray);
  console.log('rightArray: ', rightArray);
  const currentCards = await renderList(currentArray, 'current');
  const leftCards = await renderList(leftArray, 'left');
  const rightCards = await renderList(rightArray, 'right');
  const list = document.querySelector('.friends__list');
  list.innerHTML = '';
  list.append(leftCards, currentCards, rightCards);
  leftBtn.addEventListener('click', taskLeftBtn);
  rightBtn.addEventListener('click', taskRightBtn);
  moveSlider(list, count);
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

;// CONCATENATED MODULE: ./src/script/index.js





const init = () => {
  if (document.location.pathname === '/pets.html') {
    controlBurger();
    // controlPopup();
    // controlPagination();    
    const arrPagination = getShuffleArray();
    const arrPagination8 = getArray8(arrPagination);
    let cards;
    const width = document.body.offsetWidth;
    if (width >= 1280) {
      cards = 8;
      controlPagination(arrPagination8, cards);
    } else if (width > 650 && width <= 1200) {} else {}
  } else {
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
  }
};
init();
/******/ })()
;