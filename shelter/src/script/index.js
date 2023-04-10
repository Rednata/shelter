
import { controlBurger } from './modules/burger.js';
import { controlPagination } from './modules/pagination.js';
import { controlPopup } from './modules/popup.js';
import { controlSlider } from './modules/slider.js';

const init = () => {

  if (document.location.pathname === '/pets.html') {
    controlBurger();    
    // controlPopup();
    // controlPagination();
    let cards;
    const width = document.body.offsetWidth;
    if (width >= 1280) {
      cards = 8
        } else if (width > 650 && width <= 1200) {
      
        } else {
      
        }        
    controlPagination(cards);


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
          count = 2
        } else {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-270px';
          count = 1
        }        
    controlSlider(count)
    
    const widthThreeCardsMediaQuery = window.matchMedia('(min-width: 1200px)');
    
      widthThreeCardsMediaQuery.addEventListener('change', (e) => {  
        if (widthThreeCardsMediaQuery.matches) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-1080px';
          controlSlider(3);
          
        }      
      })
  
      const widthTwoCardsMediaQuery = window.matchMedia('(max-width: 1200px) and (min-width: 650px)');
    
      widthTwoCardsMediaQuery.addEventListener('change', (e) => {  
        if (widthTwoCardsMediaQuery.matches) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-620px';
          controlSlider(2);
        }      
      })
  
      const widthOneCardMediaQuery = window.matchMedia('(max-width: 650px) and (min-width: 320px)');
    
      widthOneCardMediaQuery.addEventListener('change', (e) => {  
        if (widthOneCardMediaQuery.matches) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-270px';
          controlSlider(1);
        }      
      })  
    }
}

init();
