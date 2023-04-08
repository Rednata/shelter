import { controlBurger } from './modules/burger.js';
import { controlPopup } from './modules/popup.js';
import { controlSlider } from './modules/slider.js';

const init = () => {

  // if (document.location.pathname === '/pets.html') {
  //   controlBurger();    
  // } else {
    controlBurger();  
    controlSlider();
    controlPopup();
    
  // }
  
}

init();