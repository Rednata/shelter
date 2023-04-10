import { getShuffleArray, getArray8 } from './shuffle.js';
import { getPetsData } from './popup.js';

const PETS = document.querySelector('.pets__list');
const LEFTbtn = document.querySelector('.pets-pagination__next');
const RIGHTbtn = document.querySelector('.pets-pagination__prev');
const ACTIVEbtn = document.querySelector('.pets-pagination__current');
const STARTbtn = document.querySelector('.pets-pagination__start');
const ENDbtn = document.querySelector('.pets-pagination__end'); 

const createCard = ({name, imageSlider}) => {

  const li = document.createElement('li');  

  li.className = 'friend-card';
  li.insertAdjacentHTML('afterbegin', 
  `
      <img src=${imageSlider} class="friend-card__img">
      <p class="friend-card__title">
        ${name}
      </p>
      <button class="friend-card__button button">Learn more</button>
  `)
  return li;
}

const renderPetsList = async(arr) => {
  PETS.innerHTML = '';
  const url = 'fonts/pets.json';
  const response = await getPetsData(url);  

  const data = arr.map(elem => createCard(response[elem]));
  PETS.append(...data);  
}

const onClickRightBtn = (arr) => {
  RIGHTbtn.addEventListener('click', () => {    
    let activePageNumber = +ACTIVEbtn.textContent;    
    
    console.log(arr[activePageNumber]);

    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = false;
    ENDbtn.disabled = false;
    STARTbtn.disabled = false;
    renderPetsList(arr[activePageNumber]);
    ACTIVEbtn.textContent = activePageNumber + 1;
      if(activePageNumber >= 5) {        
        RIGHTbtn.disabled = true;
        LEFTbtn.disabled = false;
        ENDbtn.disabled = true;
      }      
  })

}

const onClickLeftBtn = (arr) => {
  LEFTbtn.addEventListener('click', () => {    

    let activePageNumber = +ACTIVEbtn.textContent;    
    console.log(arr[activePageNumber - 2]);
    
      LEFTbtn.disabled = false;
      RIGHTbtn.disabled = false;
      ENDbtn.disabled = false;
      renderPetsList(arr[activePageNumber - 2]);
      ACTIVEbtn.textContent = activePageNumber - 1;
    
      if((activePageNumber - 1) <= 1) {
        LEFTbtn.disabled = true;
        RIGHTbtn.disabled = false;
        STARTbtn.disabled = true;
      }     
    
  })
  
}

const onClickEndBtn = (arr) => {
  ENDbtn.addEventListener('mousedown', () => {
    renderPetsList(arr[arr.length - 1]);
    console.log(arr[arr.length - 1]);
    RIGHTbtn.disabled = true;
    LEFTbtn.disabled = false;
    ACTIVEbtn.textContent = arr.length;
    ENDbtn.disabled = true;
    STARTbtn.disabled = false;
    console.log('++');
  })
}

const onClickStartBtn = (arr) => {
  STARTbtn.addEventListener('mousedown', () => {
    renderPetsList(arr[0]);
    console.log(arr[0]);
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = true;
    ACTIVEbtn.textContent = 1;
    STARTbtn.disabled = true;    
    ENDbtn.disabled = false;
  })
}

const controlPagination = async (arr, count) => {
  console.log(arr);
    
  if (ACTIVEbtn.textContent == 1) {
    console.warn('============');
    LEFTbtn.disabled = true;
    STARTbtn.disabled = true;
  }
  renderPetsList(arr[0]);

  onClickRightBtn(arr);
  onClickLeftBtn(arr);
  onClickEndBtn(arr);
  onClickStartBtn(arr);

  
}

export {controlPagination};
