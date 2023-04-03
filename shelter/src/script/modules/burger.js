export const controlBurger = () => {
  const btnMenu = document.querySelector('.menu-btn');  
  const menu = document.querySelector('.burger'); 
  const overlay = document.querySelector('.overlay');  

  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('burger_active');
    overlay.classList.toggle('overlay_active');
    btnMenu.classList.toggle('menu-btn_active');    
  })

  const linkMenu = document.querySelectorAll('.burger .nav__link');
  linkMenu.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.toggle('burger_active');
    overlay.classList.toggle('overlay_active');
    btnMenu.classList.toggle('menu-btn_active');    
    })
  })


}