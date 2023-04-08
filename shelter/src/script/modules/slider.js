import { getPetsData } from './popup.js';

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
  const url = '../fonts/pets.json';
  const data = await getPetsData(url);  
  
  const cards = arr.map(id => createItem(data[id]));

  const li = document.createElement('li');
  li.className = 'friends__item';
  li.id = id;
  
  li.append(...cards);
  return li;
}

const getNewCards = (count, arr) => {
  const tempArr = [...arr];
  const nextArray = getRandomArray(count * 2, tempArr).splice(count, count) ;
  return nextArray;
}

const onClickLeftBtn = (list, count) => {
  const leftBtn = document.querySelector('.pagination_left');

  leftBtn.addEventListener('click', async () => {    
    list.classList.add('move_left');

    list.addEventListener('animationend', () => {
      list.className = 'friends__list';      
      const right = document.querySelector('#right');
      const current = document.querySelector('#current');      
      current.innerHTML = right.innerHTML;
    });

    const currentCards = document.querySelectorAll('#current .friend-card');
      const currentArray = [];
      currentCards.forEach(elem => {
        currentArray.push(+elem.id)
      })
      
      console.log('currentArray:::::', currentArray);
      const newArray = getNewCards(count, currentArray);
      console.log('newArray:::: ', newArray);
      console.log('=========================');
      
      const newCards = await renderList(newArray, 'right');
      right.remove();
      list.append(newCards);
  })
  
}

const onClickRightBtn = (list, count) => {
  const rightBtn = document.querySelector('.pagination_right');

  rightBtn.addEventListener('click', async () => {
    list.classList.add('move_right');    

    list.addEventListener('animationend', () => {
      list.className = 'friends__list';
      const left = document.querySelector('#left');
      const current = document.querySelector('#current');      
      current.innerHTML = left.innerHTML;
    })

    const currentCards = document.querySelectorAll('#current .friend-card');
      const currentArray = [];
      currentCards.forEach(elem => {
        currentArray.push(+elem.id)
      })

      const newArray = getNewCards(count, currentArray);
      const newCards = await renderList(newArray, 'left');
      left.remove();
      list.prepend(newCards);
  })
}


const controlSlider = async () => {
  const currentPageWidth = document.body.offsetWidth;
  let count;
  if (currentPageWidth >= 1280) {
    count = 3
  }
  
  const currentArray = getRandomArray(count);
  const leftArray = getNewCards(count, currentArray);
  const rightArray = getNewCards(count, currentArray);

  const currentCards = await renderList(currentArray, 'current');
  const leftCards = await  renderList(leftArray, 'left');
  const rightCards = await  renderList(rightArray, 'right');

  const list = document.querySelector('.friends__list');  
      
  list.append(leftCards, currentCards, rightCards);  
    
  onClickLeftBtn(list, count);
  onClickRightBtn(list, count);
  
 

  // const leftItem = document.querySelector('.friends__item:first-child');
  // const rightItem = document.querySelector('.friends__item:last-child');
  // let currentItem = document.querySelector('.friends__item:nth-child(2');
  // currentItem.innerHTML = '';
  // currentItem.append(leftItem);

}

export {controlSlider};
