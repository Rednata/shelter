const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]    
  }    
  return arr;
}


const getShuffleArray = () => {
  const getRandom = () => {
    const min = 0;
    const max = 7;
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  
  const isNumInArray = (arr, num) => {
    return arr.some(elem => elem === num)
  }
  
  const isDubleInArray = (elem) => {
    const temp = new Set(elem);
    return elem.length !== temp.size;
  }
  
  const arr = [];
  while (arr.length < 8) {
    const num = getRandom();
    if (!isNumInArray(arr, num)) {
      arr.push(num)
    }
  }
  

  
  let arr1 = arr.splice(0, 3);
  let arr2 = arr.splice(0, 3);
  let arr3 = arr.splice(0, 2)
  
  
  const getStrShuffle = (arr, size) => {
    let numStr = '';
    while (numStr.length < size) {
      let t = shuffle(arr).join('');
  
      if (numStr.length === 0) {
        numStr += t;    
      }  else if (numStr.length > 0 && numStr.length <= 3) {
        if (numStr.slice(0, 3) !== t) {
          numStr += t;       
        }
      } else if (numStr.length > 3 && numStr.length <= 6) {
        if ( (numStr.slice(0, 3) !== t) && 
              (numStr.slice(3, 6) !== t)) {
                numStr += t;            
          }
        } else if (numStr.length > 6 && numStr.length <= 9) {
            if ( (numStr.slice(0, 3) !== t) && 
                (numStr.slice(3, 6) !== t) && 
                (numStr.slice(6, 9) !==t) ) {
                numStr += t;            
            }
        } else if (numStr.length > 9 && numStr.length <= 12) {
          if ( (numStr.slice(0, 3) !== t) && 
              (numStr.slice(3, 6) !== t) && 
              (numStr.slice(6, 9) !==t) && 
              (numStr.slice(9, 12) !==t )) {
              numStr += t;            
          }
      } else if (numStr.length > 12 && numStr.length <= 15) {
        if ( (numStr.slice(0, 3) !== t) && 
            (numStr.slice(3, 6) !== t) && 
            (numStr.slice(6, 9) !== t) && 
            (numStr.slice(9, 12) !== t) &&
            (numStr.slice(12, 15) !== t)) {
            numStr += t;            
        }
    } else if (numStr.length > 15 && numStr.length <= 18) {
      if ( (numStr.slice(0, 3) !== t) && 
          (numStr.slice(3, 6) !== t) && 
          (numStr.slice(6, 9) !==t) &&
          (numStr.slice(9, 12) !==t) &&
          (numStr.slice(12, 15) !==t) &&
          (numStr.slice(15, 18) !==t)) {
          numStr += t;            
      }
  }
    }
    return numStr
  }
  
  const str1 = getStrShuffle(arr1, 18);
  const str2 = getStrShuffle(arr2, 18);
  const str3 = getStrShuffle(arr3, 4);
  
  let a1 = str1.slice(0, 3);
  let a2 = str1.slice(3, 6);
  let a3 = str1.slice(6, 9);
  let a4 = str1.slice(9, 12);
  let a5 = str1.slice(12, 15);
  let a6 = str1.slice(15, 18);
  
  let b1 = str2.slice(0, 3);
  let b2 = str2.slice(3, 6);
  let b3 = str2.slice(6, 9);
  let b4 = str2.slice(9, 12);
  let b5 = str2.slice(12, 15);
  let b6 = str2.slice(15, 18);
  
  let c1 = str3.slice(0, 2);
  let c2 = str3.slice(2, 4);
  
  const resultStr = 
  a1+b1+c1+
  a2+b1+c2+
  a4+b5+c2+
  a4+b3+c1+
  a6+b3+c2+ 
  a2+b6+c1
  
  // a4+b2+c2
  // a3+b4+c1+
  // +a3+b1+c2+a4+b1+c2+a5+b1+c2+a6+b1+c2 + 
  // a1+b2+c1+a2+b2+c1+a3+b2+c1+a4+b2+c1+a5+b2+c1+a6+b2+c1 + 
  // a1+b2+c2+a2+b2+c2+a3+b2+c2+a4+b2+c2+a5+b2+c2+a6+b2+c2 + 
  // a1+b3+c1+a2+b3+c1+a3+b3+c1+a4+b3+c1+a5+b3+c1+a6+b3+c1 + 
  // a1+b3+c2+a2+b3+c2+a3+b3+c2+a4+b3+c2+a5+b3+c2+a6+b3+c2 + 
  // a1+b4+c1+a2+b4+c1+a3+b4+c1+a4+b4+c1+a5+b4+c1+a6+b4+c1 + 
  // a1+b4+c2+a2+b4+c2+a3+b4+c2+a4+b4+c2+a5+b4+c2+a6+b4+c2;
  
  const resultArray = []
  for (let i = 0; i < resultStr.length; i += 8) {
    const temp = [];  
    const t = (resultStr.slice(i, i + 8)).split('');
    for (let j = 0; j < 8; j++) {
      t[j] = +t[j]
    }
    resultArray.push(...t);
  }
  return resultArray
}

const getArray8 = (arr) => {
  const temp = [];
  for (let i = 0; i < 48; i += 8) {
    const t = (arr.slice(i, i + 8));
    shuffle(t)    
    temp.push(t);
  }
  return temp
}

export {getShuffleArray, getArray8};