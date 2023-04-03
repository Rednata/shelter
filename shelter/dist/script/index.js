/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/script/modules/burger.js
console.log('111111111111');
const controlBurger = () => {
  const btnMenu = document.querySelector('.menu-btn');
  const menu = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('burger_active');
    overlay.classList.toggle('overlay_active');
    btnMenu.classList.toggle('menu-btn_active');
  });
  const linkMenu = document.querySelectorAll('.burger .nav__link');
  linkMenu.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.toggle('burger_active');
      overlay.classList.toggle('overlay_active');
      btnMenu.classList.toggle('menu-btn_active');
    });
  });
};
;// CONCATENATED MODULE: ./src/script/index.js

const init = () => {
  controlBurger();
};
init();
/******/ })()
;