const popup = document.querySelector('.overlay-popup');

const getFriendName = (target) => {
  const card = target.closest('.friend-card');
  return card.querySelector('.friend-card__title').textContent.trim();
}

const getFriendDescript = async (url, friendName) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.find(item => item.name === friendName);  
}

const createInnerPopup = ({name, breed, descript, image}) => {
  const popupContent = document.querySelector('.popup__content');
  const title = popupContent.querySelector('.popup__title');
  const subtitle = popupContent.querySelector('.popup__subtitle');
  const text = popupContent.querySelector('.popup__text');
  const img = document.querySelector('.popup__img>img');
  img.src = image;
  title.textContent = name;
  subtitle.textContent = breed;
  text.textContent = descript;
}

const showPopup = () => {
  popup.classList.add('overlay-popup_active');
  document.body.classList.add('deleteScroll');
}

const closePopup = () => {
  popup.addEventListener('click', ({target}) => {
  const closeBtn = document.querySelector('.popup__btn');    
    if (target === popup ||
      target === closeBtn ) {      
      popup.classList.add('overlay-popup_delete');
    document.body.classList.remove('deleteScroll');
    setTimeout(() => {
      popup.classList.remove('overlay-popup_active');
      popup.classList.remove('overlay-popup_delete');
    }, 400);

    }
  })
}

const controlPopup = () => {
  const friends = document.querySelector('.friends__list');
  friends.addEventListener('click', async ({target}) => {
    const friendName = getFriendName(target);

    const url = "../fonts/pets.json";
    const descript = await getFriendDescript(url, friendName);
    
    createInnerPopup(descript);

    showPopup();
    closePopup();    
  })

}

export { controlPopup};