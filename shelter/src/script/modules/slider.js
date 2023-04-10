import { getPetsData } from './popup.js';

const leftBtn = document.querySelector('.pagination_left');
const rightBtn = document.querySelector('.pagination_right');
const list = document.querySelector('.friends__list');  


const getRandomID = () => {
  const min = 0;
  const max = 7;  
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const isIDInArray = (arr, id) => arr.some(num => num === id);

const getRandomArray = (count, currentArray) => {      
  if (!currentArray) {
    const currentArray = [];

    while (currentArray.length < count) {    
      const id = getRandomID();      
      
      if (!isIDInArray(currentArray, id)) {
        currentArray.push(id);
      }      
    }     
    return currentArray

  } else {    
    while (currentArray.length < count) {
    
      const id = getRandomID();
      
      if (!isIDInArray(currentArray, id)) {
        currentArray.push(id);
      }      
    }     
    return currentArray;
  }

}

const createItem = ({id, name, imageSlider}) => {

  const card = document.createElement('div');
  card.className = 'friend-card';
  card.id = id;

  const img = document.createElement('img');
  img.className = 'friend-card__img';
  img.src = imageSlider;
  
  const title = document.createElement('p');
  title.className = 'friend-card__title';
  title.textContent = name;
  
  const btn = document.createElement('button');
  btn.className = 'friend-card__button button';
  btn.textContent = 'Learn more';

  card.append(img, title, btn);

  return card;  
}

const renderList = async (arr, id) => {
  const url = '../../fonts/pets.json';
  const data = await getPetsData(url);  
  
  const cards = arr.map(id => createItem(data[id]));

  const li = document.createElement('li');
  li.className = 'friends__item';
  li.id = id;
  
  li.append(...cards);
  return li;
}

const renderTemp = async (arr, id) => {
  const url = '../../fonts/pets.json';
  const data = await getPetsData(url);  
  
  const cards = arr.map(id => createItem(data[id]));

  return cards;
}

const getNewCards = (count, arr) => {
  const tempArr = [...arr];

  const nextArray = getRandomArray(count * 2, tempArr).splice(count, count) ;
  return nextArray;
}

const taskLeftBtn = () => {    
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;
  console.log(width1);
  if (width > 1200) {
    list.classList.add('move_left990')
  } else if (width <= 650) {
    list.classList.add('move_left270');      
  } else  {
    list.classList.add('move_left700');      
  }  
  leftBtn.removeEventListener('click', taskLeftBtn);
}

const taskRightBtn = () => {    
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;
  console.log(width1);
  if (width > 1200) {
    list.classList.add('move_right990')
  } else if (width <= 650) {
    list.classList.add('move_right270');      
  } else  {
    list.classList.add('move_right700');      
  }  
  rightBtn.removeEventListener('click', taskRightBtn);
}

const getCurrentArray = () => {
  const currentCards = document.querySelectorAll('#current .friend-card');
      const currentArray = [];
      currentCards.forEach(elem => {
      currentArray.push(+elem.id)
    })
  return currentArray    
}

const moveSlider = (list, count) => {  

  list.addEventListener('animationend', async (e) => {
    list.className = 'friends__list';              

    if (e.animationName.slice(0, 4) === 'left') {
      const right = document.querySelector('#right');
      const current = document.querySelector('#current'); 
      console.warn('right===', right);    
      console.warn('current===', current);
      current.innerHTML = right.innerHTML;            
      leftBtn.addEventListener('click', taskLeftBtn)        
            
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);      
      const newCards = await renderTemp(newArrayID, 'right');      
      
      console.log(newCards);
      right.innerHTML = '';
      right.append(...newCards)      

    } else {
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');     
      current.innerHTML = left.innerHTML;            
      rightBtn.addEventListener('click', taskRightBtn)        
      
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);      
      const newCards = await renderTemp(newArrayID, 'left');      
      
      console.log(newCards);
      left.innerHTML = '';
      left.append(...newCards)

    }
  });
}

const controlSlider = async (count) => {
  console.log('count in controlSLIDER', count);

  const currentArray = getRandomArray(count);
  console.log('currentArray: ', currentArray);
  const leftArray = getNewCards(count, currentArray);
  console.log('leftArray: ', leftArray);
  const rightArray = getNewCards(count, currentArray);
  console.log('rightArray: ', rightArray);

  const currentCards = await renderList(currentArray, 'current');
  const leftCards = await  renderList(leftArray, 'left');
  const rightCards = await  renderList(rightArray, 'right');

  const list = document.querySelector('.friends__list');  
  list.innerHTML = '';
      
  list.append(leftCards, currentCards, rightCards);  
    
  leftBtn.addEventListener('click', taskLeftBtn) ;
  rightBtn.addEventListener('click', taskRightBtn) 

  moveSlider(list, count);
  


}

export {controlSlider};
