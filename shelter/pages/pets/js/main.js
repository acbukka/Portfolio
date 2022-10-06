"use strict";
// Пагинация
// создать массив с именами  питомцев, потом создать сетку с питомцами в html и менять по клику
/* Создадим две переменных, первую - под начальный пустой 
массив, вторую - под итоговый, затем с помощью функции рандомайзера из первой части задания и циклу по общего массива 
запишем данные в новую переменную */

let petsData = [];
function getRandomInt(arr, num) {
  let newArr = [...new Set(arr)];
  while (newArr.length < num) {
    newArr.push(Math.floor(Math.random() * 8));
    if (newArr.length === num) {
      return getRandomInt(newArr, num);
    }
  }
  return newArr;
}
/* Нам нужна вторая функция, которая будет формировать фракции, и если 
во фракциях будут дубли, то будет перезапускать рандомайзер */
const getFractions = function (arr, pages, num) {
  let startData = [];
  let newArr = arr;
  newArr = [];
  for (let i = 0; i < 6; i++) {
    newArr.push(getRandomInt(startData, 8));
  }
  newArr = newArr.flat();
  for (let i = 0; i < pages; i++) {
    startData.push(newArr.splice(0, num));
  }
  for (let i = 0; i < startData.length; i++) {
    for (let p = 0; p < startData[i].length; p++) {
      if (startData[i].indexOf(startData[i][p]) !== p) {
        return getFractions(startData, pages, num);
      }
    }
  }
  return startData;
};

// Объявим переменные айтема, что работать с его Нодой нужно объявить через имя класса
let sliderItem = document.getElementsByClassName("slider-item");
// Создадим переменные для общего кол-ва страниц и текущей страницы
let allPages = 6;
let cards = 8;
let currentPage = 1;
// медиа-запросы:
// которые в зависимости от размера экрана будут записываит разные переменные
// в том числе число фракций для petsData и кол-во карточек в них
// и удалим карточки которых у нас нет из DOM
let queryDesktop = window.matchMedia("(min-width: 1280px)");
let queryTablet = window.matchMedia("(max-width: 1279px)");
let queryMobile = window.matchMedia("(max-width: 767px)");
let newPetsData = [];
if (queryTablet.matches) {
  petsData = [];
  allPages = 8;
  cards = 6;
  petsData = getFractions(petsData, allPages, cards);
  //
  sliderItem[7].remove();
  sliderItem[6].remove();
}
if (queryMobile.matches) {
  petsData = [];
  allPages = 16;
  cards = 3;
  petsData = getFractions(petsData, allPages, cards);
  //
  sliderItem[5].remove();
  sliderItem[4].remove();
  sliderItem[3].remove();
}
if (queryDesktop.matches) {
  petsData = [];
  allPages = 6;
  cards = 8;
  petsData = getFractions(petsData, allPages, cards);
}
console.log(petsData);

// Переменная для инфо номере страницы
const numberPage = document.querySelector(".slider-btn__info");
// Переменные для карточки
let sliderItemTitle = document.querySelectorAll(".slider-item__title");
let sliderItemImg = document.querySelectorAll(".slider-item__img");
// Наша функция
const changeItems = async function (e) {
  let currentItem = e.target.closest(".slider-btn").id;
  switch (currentItem) {
    case "double-left":
      currentPage = allPages / allPages;
      break;
    case "left":
      currentPage = currentPage - 1;
      break;
    case "right":
      currentPage = currentPage + 1;
      break;
    case "double-right":
      currentPage = allPages;
      break;
  }
  // Введем доп условие для того, чтобы значение currentPage не пересекало "границы"
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > allPages) {
    currentPage = allPages;
  }
  // Введем условия для интерактива стрелочек
  if (currentPage > 1) {
    buttons[0].removeAttribute("disabled");
    buttons[1].removeAttribute("disabled");
  }
  if (currentPage === allPages) {
    buttons[2].setAttribute("disabled", "disabled");
    buttons[3].setAttribute("disabled", "disabled");
  }
  if (currentPage === allPages / allPages) {
    buttons[0].setAttribute("disabled", "disabled");
    buttons[1].setAttribute("disabled", "disabled");
  }
  if (currentPage < allPages) {
    buttons[2].removeAttribute("disabled");
    buttons[3].removeAttribute("disabled");
  }
  // Меняем значение страницы в html
  numberPage.innerHTML = `${currentPage}`;
  // получим ассинхронно данные из нашего "слайдер" json'а
  const res = await fetch("js/slider.json");
  const petsObjectsMini = await res.json();
  // теперь создадим цикл, который будет менять значения в карточках в зависимости от текущей страницы
  for (let i = 0; i < petsData.length; i++) {
    for (let p = 0; p < petsData[i].length; p++) {
      if (i === currentPage - 1) {
        sliderItem[p].id = petsObjectsMini[petsData[i][p]].name;
        sliderItemTitle[p].innerHTML = petsObjectsMini[petsData[i][p]].name;
        sliderItemImg[p].src = petsObjectsMini[petsData[i][p]].img;
      }
    }
  }
};
//

// Объявим переменные стрелочек
const buttons = document.querySelectorAll(".slider-btn");
buttons.forEach((item) => item.addEventListener("click", changeItems));

// переменные бургера
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

//
const cover = document.querySelector(".cover");
// const sliderItem = document.querySelectorAll(".slider-item");
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
// Придется вешать слушатель через цикл тк мы объвили sliderItem через className :/
for (let i = 0; i < sliderItem.length; i++) {
  sliderItem[i].addEventListener("click", openModal);
  sliderItem[i].addEventListener("click", modalInfo);
}
// Ну и повесим слушатель на затемняшку + крестик, как и на main page
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

// Создадим предзагрузку данных из нашего массива для замены начальной раскладки
const onLoaded = async function () {
  const res = await fetch("js/slider.json");
  const petsObjectsMini = await res.json();
  for (let i = 0; i < petsData.length; i++) {
    for (let p = 0; p < petsData[i].length; p++) {
      if (i === currentPage - 1) {
        sliderItem[p].id = petsObjectsMini[petsData[i][p]].name;
        sliderItemTitle[p].innerHTML = petsObjectsMini[petsData[i][p]].name;
        sliderItemImg[p].src = petsObjectsMini[petsData[i][p]].img;
      }
    }
  }
};
document.addEventListener("DOMContentLoaded", onLoaded);
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
