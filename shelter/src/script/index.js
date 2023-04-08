
import { controlBurger } from './modules/burger.js';
import { controlPopup } from './modules/popup.js';
import { controlSlider } from './modules/slider.js';

const init = () => {

  // if (document.location.pathname === '/pets.html') {
  //   controlBurger();    
  // } else {
    controlBurger();  
    
    controlPopup();

    let count; 
    const width = document.body.offsetWidth;
    if (width > 1200) {
      const list = document.querySelector('.friends__list'); 
      list.style.left = '-1080px';
          count = 3;          
        } else if (width > 500 && width <= 1200) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-710px';
          count = 2
        } else {
          count = 1
        }        
    controlSlider(count)
    
    const widthThreeCardsMediaQuery = window.matchMedia('(max-width: 1280px) and (min-width: 1200px)');
    
      widthThreeCardsMediaQuery.addEventListener('change', (e) => {  
        if (widthThreeCardsMediaQuery.matches) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-1080px';
          controlSlider(3);
          
        }      
      })
  
      const widthTwoCardsMediaQuery = window.matchMedia('(max-width: 1200px) and (min-width: 600px)');
    
      widthTwoCardsMediaQuery.addEventListener('change', (e) => {  
        if (widthTwoCardsMediaQuery.matches) {
          const list = document.querySelector('.friends__list'); 
          list.style.left = '-710px';
          controlSlider(2);
        }      
      })
  
      const widthOneCardMediaQuery = window.matchMedia('(max-width: 600px) and (min-width: 320px)');
    
      widthOneCardMediaQuery.addEventListener('change', (e) => {  
        if (widthOneCardMediaQuery.matches) {
          controlSlider(1);
        }      
      })  
  
}

init();