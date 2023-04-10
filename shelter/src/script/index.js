
import { controlBurger } from './modules/burger.js';
import { controlPagination } from './modules/pagination.js';
import { controlPopup } from './modules/popup.js';
import { controlSlider } from './modules/slider.js';
import { getShuffleArray, getArray8, getArray6, getArray3 } from './modules/shuffle.js';

console.log(`
  =====================================
  Не реализована пагинация при изменении размера страницы.  
  =====================================
`)
const init = () => {
  
  if (document.location.pathname === '/pets.html') {    
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
          controlPagination(arrPagination3)
        }        
    


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
