const btnMenu = document.querySelector('.menu-btn');  
const menu = document.querySelector('.burger'); 
const overlay = document.querySelector('.overlay'); 
let flagOpen = true;

const coloredLightBtn = () => {
  const petsBtnMenu = document.querySelectorAll('.menu-btn__dash_pets');
  console.log(petsBtnMenu);
  petsBtnMenu.forEach(dash => {
    dash.classList.add('menu-btn__dash_pets-active')        
  })
}

const coloredDarkBtn = () => {
  const petsBtnMenu = document.querySelectorAll('.menu-btn__dash_pets');
  console.log(petsBtnMenu);
  petsBtnMenu.forEach(dash => {
    dash.classList.remove('menu-btn__dash_pets-active')        
  })
}

const openMenu = () => {
  menu.classList.toggle('burger_active');
  overlay.classList.toggle('overlay_active');
  btnMenu.classList.toggle('menu-btn_active');    
  document.body.classList.add('deleteScroll');
  flagOpen = false;
  coloredLightBtn();
}

const closeMenu = () => {
  menu.classList.toggle('burger_active');
  overlay.classList.toggle('overlay_active');
  btnMenu.classList.toggle('menu-btn_active');    
  document.body.classList.remove('deleteScroll');
  flagOpen = true;
  coloredDarkBtn();
}

const onClickOverlay = () => {
  overlay.addEventListener('click', ({target}) => {
    if (target.classList.contains('overlay')) {
      closeMenu();
    }
  })
}

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
    })
  }) 
}

export const controlBurger = () => {
  btnMenu.addEventListener('click', () => {
    if (flagOpen) openMenu()
    else {
      closeMenu();
    }
  })
  onClickOverlay();
  onClickNavLinks()
}