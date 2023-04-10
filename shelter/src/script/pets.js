
import { controlBurger } from './modules/burger.js';
import { controlPagination } from './modules/pagination.js';
import { controlPopup } from './modules/popup.js';
import { getShuffleArray, getArray8, getArray6, getArray3 } from './modules/shuffle.js';

console.log(`
  =====================================
  Не реализована пагинация при изменении размера страницы.  
  =====================================
`)
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
        controlPagination(arrPagination3)
      }        
}

init();
