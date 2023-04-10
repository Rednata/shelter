const popup = document.querySelector('.overlay-popup');

const getFriendName = (target) => {
  const card = target.closest('.friend-card');
  return card.querySelector('.friend-card__title').textContent.trim();
}

const getPetsData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;  
}

const getPetDescript = (data, friendName) => {
  return data.find(item => item.name === friendName)
}

const createInnerPopup = ({name, breed, descript, image, age, inoculations,
  diseases, parasites }) => {
  const popupContent = document.querySelector('.popup__content');
  const title = popupContent.querySelector('.popup__title');
  const subtitle = popupContent.querySelector('.popup__subtitle');
  const text = popupContent.querySelector('.popup__text');
  const img = document.querySelector('.popup__img>img');
  const ageElem = document.querySelector('.age');
  const inocul = document.querySelector('.inocul');
  const diseasElem = document.querySelector('.diseas');
  const paras = document.querySelector('.parasite');
  img.src = image;
  title.textContent = name;
  subtitle.textContent = breed;
  text.textContent = descript;
  ageElem.textContent = age;
  inocul.textContent = inoculations;
  diseasElem.textContent = diseases;
  paras.textContent = parasites;

  const inoculWidth = inocul.offsetWidth;
  const inoculParentWudth = inocul.parentElement.offsetWidth;
  const inoculSiblingWidth = inocul.previousElementSibling.offsetWidth;

  if ((inoculWidth + inoculSiblingWidth) > inoculParentWudth) {
  inocul.parentElement.classList.add('li_column');
    inocul.classList.add('value_paddingLeft')
  } else {
    inocul.parentElement.classList.remove('li_column');
    inocul.classList.remove('value_paddingLeft')
  }
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
  const friends = document.querySelector('.friends__list') || document.querySelector('.pets');
  friends.addEventListener('click', async ({target}) => {
    const friendName = getFriendName(target);

    const url = "../fonts/pets.json";
    const data = await getPetsData(url, friendName);

    const descript = getPetDescript(data, friendName);
    
    createInnerPopup(descript);

    showPopup();
    closePopup();    
  })

}

export { controlPopup, getPetsData};