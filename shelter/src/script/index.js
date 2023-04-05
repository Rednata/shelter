import { controlBurger } from './modules/burger.js';
import { controlPopup } from './modules/popup.js';

const init = () => {

  // if (document.location.pathname === '/pets.html') {
  //   controlBurger();    
  // } else {
    controlBurger();  
    controlPopup();
  // }
  
}

init();