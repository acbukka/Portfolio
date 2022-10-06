"use strict";

// BURGER MENU
const burgerBtn = document.querySelector(".burger-btn");
const navList = document.querySelector(".header-inner");
const navBtn = document.querySelectorAll(".header-nav__list-link");
const burgerCover = document.querySelector(".burger-cover");
const body = document.querySelector(".body");
/* добавим закрытие и открытие nav через добавление класса + повесим эту функцию на кнопки навигации через forEach 
и на фон для того чтобы меню автоматически закрывалось */
const burger = function () {
  if (navList.classList.contains("active")) {
    navList.classList.remove("active");
    body.style.overflow = "visible";
  } else {
    navList.classList.add("active");
    body.style.overflow = "hidden";
  }
};

burgerBtn.addEventListener("click", burger);
navBtn.forEach((item) =>
  item.addEventListener("click", () => {
    navList.classList.remove("active");
    body.style.overflow = "visible";
  })
);
burgerCover.addEventListener("click", burger);

// SLIDER AND PAGINATION

// define slider arrows
const leftArrow = document.querySelector('.btn-left');
const rightArrow = document.querySelector('.btn-right');
const sliderItem = document.querySelectorAll('.slider-item')
// define the slider element
const slider = document.querySelector('.slider')
// define the slider-item title and img
const sliderItemTitle = document.querySelectorAll('.slider-item__title')
const sliderItemImg = document.querySelectorAll('.slider-item__img')

const moveLeft = () => {
  slider.classList.add('transition-left')
  leftArrow.removeEventListener('click', moveLeft)
  rightArrow.removeEventListener('click', moveRight)
}

const moveRight = () => {
  slider.classList.add('transition-right')
  leftArrow.removeEventListener('click', moveLeft)
  rightArrow.removeEventListener('click', moveRight)
}

leftArrow.addEventListener('click', moveLeft)
rightArrow.addEventListener('click', moveRight)

slider.addEventListener('animationend', () => {
  if (slider.classList.contains('transition-left')) {
    slider.classList.remove('transition-left')
    sliderItem[3].id = sliderItem[0].id;
    sliderItem[4].id = sliderItem[1].id;
    sliderItem[5].id = sliderItem[2].id;
    sliderItemTitle[3].innerHTML = sliderItemTitle[0].innerHTML;
    sliderItemTitle[4].innerHTML = sliderItemTitle[1].innerHTML;
    sliderItemTitle[5].innerHTML = sliderItemTitle[2].innerHTML;
    sliderItemImg[3].src = sliderItemImg[0].src;
    sliderItemImg[4].src = sliderItemImg[1].src;
    sliderItemImg[5].src = sliderItemImg[2].src;
    changeItems('left');
  } else if (slider.classList.contains('transition-right')) {
    slider.classList.remove('transition-right')
    sliderItem[3].id = sliderItem[6].id;
    sliderItem[4].id = sliderItem[7].id;
    sliderItem[5].id = sliderItem[8].id;
    sliderItemTitle[3].innerHTML = sliderItemTitle[6].innerHTML;
    sliderItemTitle[4].innerHTML = sliderItemTitle[7].innerHTML;
    sliderItemTitle[5].innerHTML = sliderItemTitle[8].innerHTML;
    sliderItemImg[3].src = sliderItemImg[6].src;
    sliderItemImg[4].src = sliderItemImg[7].src;
    sliderItemImg[5].src = sliderItemImg[8].src;
    changeItems('right');
  }
  leftArrow.addEventListener('click', moveLeft)
  rightArrow.addEventListener('click', moveRight)
})


// /* Создадим функцию-рандомайзер случайного числа для массива из 8 чисел (от 0 до 7, тк питомцев 8), также добавим 
// проверку на дубли с помощью рекурсии, если они имеются */
function getRandomInt(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 8);
  }
  let newArr = [...new Set(arr)];
  if (newArr.length < 3) {
    newArr.push(Math.floor(Math.random() * 8));
    return getRandomInt(newArr);
  } else {
    return newArr;
  }
}
/* Создадим функцию, которая будет проверять, есть ли в прошлом "наборе" карточек элементы из текущего набора, 
если есть то пропускаем массив через функцию рандомайзер, если нет - отдаём */
function checkPast(arr, pastArr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (pastArr.includes(arr[i])) {
      count++;
    }
  }
  if (count > 0) {
    arr = getRandomInt(arr);
    return checkPast(arr, pastArr);
  } else {
    return arr;
  }
}
/* Создадим переменную для хранения значений прошлого набора карточек */
let pastRandomNums = [4, 0, 2];

async function changeItems(e) {
  const currentRandomNums = [];
  const pets = "js/slider.json";
  const res = await fetch(pets);
  const petsObjectsMini = await res.json();
  /* создадим переменную которая будет содержать рандомные значения без дублей */
  let newArr = getRandomInt(currentRandomNums);
  /* теперь прогоним ее через проверку на прошлые значения */
  newArr = checkPast(newArr, pastRandomNums);
  /* Заполним значения id в карточках в зависимости от того, на какую стрелку нажали (чтобы определить какие айтемы 
  в слайдере заполнить) */
  if (e === "left") {
    sliderItem[0].id = petsObjectsMini[newArr[0]].name;
    sliderItem[1].id = petsObjectsMini[newArr[1]].name;
    sliderItem[2].id = petsObjectsMini[newArr[2]].name;
    // 
    sliderItem[6].id = petsObjectsMini[newArr[0]].name;
    sliderItem[7].id = petsObjectsMini[newArr[1]].name;
    sliderItem[8].id = petsObjectsMini[newArr[2]].name;
  } else if (e === "right") {
    sliderItem[0].id = petsObjectsMini[newArr[0]].name;
    sliderItem[1].id = petsObjectsMini[newArr[1]].name;
    sliderItem[2].id = petsObjectsMini[newArr[2]].name;
    // 
    sliderItem[6].id = petsObjectsMini[newArr[0]].name;
    sliderItem[7].id = petsObjectsMini[newArr[1]].name;
    sliderItem[8].id = petsObjectsMini[newArr[2]].name;
    // 
  }
  // Заполним информацию в карточках по новым значениям id в карточках:
  for (let i = 0; i < petsObjectsMini.length; i++) {
    for (let p = 0; p < sliderItem.length; p++) {
      if (sliderItem[p].id === petsObjectsMini[i].name) {
        sliderItemTitle[p].innerHTML = petsObjectsMini[i].name;
        sliderItemImg[p].src = petsObjectsMini[i].img;
      }
    }
  }
  /* затем перепишем прошлые значения */
  pastRandomNums = newArr;
}

// загружаем крайние карточки в случайном порядке при загрузке страницы
document.addEventListener('onDOMContentLoaded', changeItems('left'));


/* Объявим переменные для модального окна */
const cover = document.querySelector(".cover");
const modalBtn = document.querySelector(".modal-btn");
/* Создадим функцию открытия/закрытия модального окна, 
так чтобы при открытии накладывался cover и заполонялись 
данные по json файлу */
let modalName = document.querySelector(".modal-info__title"),
  modalImg = document.querySelector(".modal-img"),
  modalType = document.querySelector(".modal-info-type"),
  modalBreed = document.querySelector(".modal-info-breed"),
  modalText = document.querySelector(".modal-info-text"),
  modalAge = document.querySelector(".modal-info__item-age"),
  modalIno = document.querySelector(".modal-info__item-ino"),
  modalDis = document.querySelector(".modal-info__item-dis"),
  modalPar = document.querySelector(".modal-info__item-par");

async function modalInfo(e) {
  const pets = "js/pets.json";
  const res = await fetch(pets);
  const petsObjects = await res.json();
  let currentItem = e.target.closest(".slider-item").id;
  for (let i = 0; i < petsObjects.length; i++) {
    if (petsObjects[i].name === currentItem) {
      modalName.innerHTML = petsObjects[i].name;
      modalImg.src = petsObjects[i].img;
      modalType.innerHTML = petsObjects[i].type;
      modalBreed.innerHTML = petsObjects[i].breed;
      modalText.innerHTML = petsObjects[i].description;
      modalAge.innerHTML = petsObjects[i].age;
      modalIno.innerHTML = petsObjects[i].inoculations;
      modalDis.innerHTML = petsObjects[i].diseases;
      modalPar.innerHTML = petsObjects[i].parasites;
    }
  }
}
function openModal() {
  if (body.classList.contains("active")) {
    body.classList.remove("active");
    body.style.overflow = "visible";
  } else {
    body.classList.add("active");
    body.style.overflow = "hidden";
  }
}

sliderItem.forEach((item) => item.addEventListener("click", openModal));
sliderItem.forEach((item) => item.addEventListener("click", modalInfo));
cover.addEventListener("click", openModal);
modalBtn.addEventListener("click", openModal);

// Добавим ховер слушателя на ковер и на кнопку
cover.addEventListener("mouseenter", () => {
  modalBtn.style.background = "#fddcc4";
  modalBtn.style.border = "2px solid #fddcc4";
});
cover.addEventListener("mouseleave", () => {
  modalBtn.style.background = "transparent";
  modalBtn.style.border = "2px solid #f1cdb3";
});
modalBtn.addEventListener("mouseenter", () => {
  modalBtn.style.background = "#fddcc4";
  modalBtn.style.border = "2px solid #fddcc4";
});
// исправим баг, который оставлял затемнение от бургера при ресайзе:
window.addEventListener(
  "resize",
  function () {
    if (navList.classList.contains("active")) {
      navList.classList.remove("active");
      body.style.overflow = "visible";
    }
  },
  true
);
