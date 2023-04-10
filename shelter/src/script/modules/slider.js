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
      console.log(currentArray);   
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
  const url = 'fonts/pets.json';
  const data = await getPetsData(url);  
  
  const cards = arr.map(id => createItem(data[id]));

  const li = document.createElement('li');
  li.className = 'friends__item';
  li.id = id;
  
  li.append(...cards);
  return li;
}

const renderTemp = async (arr, id) => {
  const url = 'fonts/pets.json';
  const data = await getPetsData(url);  
  
  const cards = arr.map(id => createItem(data[id]));

  return cards;
}

const getNewCards = (count, arr) => {
  const tempArr = [...arr];
  const t = getRandomArray(count * 2, tempArr);
  console.log(t);
  
  const nextArray =  t.splice(count, count);
  return nextArray;
}

const taskLeftBtn = () => {    
  const width = document.body.offsetWidth;
  const width1 = list.offsetWidth;  
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
      current.innerHTML = right.innerHTML;            
      leftBtn.addEventListener('click',  taskRightBtn)        
            
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);      
      const newCards = await renderTemp(newArrayID, 'right');      
            
      right.innerHTML = '';
      right.append(...newCards)      

    } else if (e.animationName.slice(0, 4) === 'righ') {
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');     
      current.innerHTML = left.innerHTML;            
      rightBtn.addEventListener('click', taskLeftBtn)        
      
      const currentArray = getCurrentArray();
      const newArrayID = getNewCards(count, currentArray);      
      const newCards = await renderTemp(newArrayID, 'left');      
            
      left.innerHTML = '';
      left.append(...newCards)

    }
  });
}

const controlSlider = async (count) => {  

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
    
  leftBtn.addEventListener('click',  taskRightBtn) ;
  rightBtn.addEventListener('click', taskLeftBtn) 

  moveSlider(list, count);
  


}

export {controlSlider};
