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
  const url = '../fonts/pets.json';
  const response = await getPetsData(url);  

  const data = arr.map(elem => createCard(response[elem]));
  PETS.append(...data);  
}

const onClickRightBtn = (arr8) => {
  RIGHTbtn.addEventListener('click', () => {    
    let activePageNumber = +ACTIVEbtn.textContent;    
    
    console.log(arr8[activePageNumber]);

    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = false;
    ENDbtn.disabled = false;
    STARTbtn.disabled = false;
    renderPetsList(arr8[activePageNumber]);
    ACTIVEbtn.textContent = activePageNumber + 1;
      if(activePageNumber >= 5) {        
        RIGHTbtn.disabled = true;
        LEFTbtn.disabled = false;
        ENDbtn.disabled = true;
      }      
  })

}

const onClickLeftBtn = (arr8) => {
  LEFTbtn.addEventListener('click', () => {    

    let activePageNumber = +ACTIVEbtn.textContent;    
    console.log(arr8[activePageNumber - 2]);
    
      LEFTbtn.disabled = false;
      RIGHTbtn.disabled = false;
      ENDbtn.disabled = false;
      renderPetsList(arr8[activePageNumber - 2]);
      ACTIVEbtn.textContent = activePageNumber - 1;
    
      if((activePageNumber - 1) <= 1) {
        LEFTbtn.disabled = true;
        RIGHTbtn.disabled = false;
        STARTbtn.disabled = true;
      }     
    
  })
  
}

const onClickEndBtn = (arr8) => {
  ENDbtn.addEventListener('mousedown', () => {
    renderPetsList(arr8[arr8.length - 1]);
    console.log(arr8[arr8.length - 1]);
    RIGHTbtn.disabled = true;
    LEFTbtn.disabled = false;
    ACTIVEbtn.textContent = arr8.length;
    ENDbtn.disabled = true;
    STARTbtn.disabled = false;
    console.log('++');
  })
}

const onClickStartBtn = (arr8) => {
  STARTbtn.addEventListener('mousedown', () => {
    renderPetsList(arr8[0]);
    console.log(arr8[0]);
    RIGHTbtn.disabled = false;
    LEFTbtn.disabled = true;
    ACTIVEbtn.textContent = 1;
    STARTbtn.disabled = true;    
    ENDbtn.disabled = false;
  })
}

const controlPagination = async (count) => {
  const arr = getShuffleArray();
  console.log(arr);  

  const arr8 = getArray8(arr);
  console.log(arr8);
  
  if (ACTIVEbtn.textContent == 1) {
    console.warn('============');
    LEFTbtn.disabled = true;
    STARTbtn.disabled = true;
  }
  renderPetsList(arr8[0]);

  onClickRightBtn(arr8);
  onClickLeftBtn(arr8);
  onClickEndBtn(arr8);
  onClickStartBtn(arr8);

  
}

export {controlPagination};