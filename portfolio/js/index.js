"use strict";

const i18Obj = {
  en: {
    skills: "Skills",
    portfolio: "Portfolio",
    video: "Video",
    price: "Price",
    contacts: "Contacts",
    "hero-title": "Alexa Rise",
    "hero-text":
      "Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise",
    hire: "Hire me",
    "skill-title-1": "Digital photography",
    "skill-text-1": "High-quality photos in the studio and on the nature",
    "skill-title-2": "Video shooting",
    "skill-text-2": "Capture your moments so that they always stay with you",
    "skill-title-3": "Rotouch",
    "skill-text-3": "I strive to make photography surpass reality",
    "skill-title-4": "Audio",
    "skill-text-4":
      "Professional sounds recording for video, advertising, portfolio",
    winter: "Winter",
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    "price-description-1-span-1": "One location",
    "price-description-1-span-2": "120 photos in color",
    "price-description-1-span-3": "12 photos in retouch",
    "price-description-1-span-4": "Readiness 2-3 weeks",
    "price-description-1-span-5": "Make up, visage",
    "price-description-2-span-1": "One or two locations",
    "price-description-2-span-2": "200 photos in color",
    "price-description-2-span-3": "20 photos in retouch",
    "price-description-2-span-4": "Readiness 1-2 weeks",
    "price-description-2-span-5": "Make up, visage",
    "price-description-3-span-1": "Three locations or more",
    "price-description-3-span-2": "300 photos in color",
    "price-description-3-span-3": "50 photos in retouch",
    "price-description-3-span-4": "Readiness 1 week",
    "price-description-3-span-5": "Make up, visage, hairstyle",
    order: "Order shooting",
    "contact-me": "Contact me",
    "send-message": "Send message",
  },
  ru: {
    skills: "Навыки",
    portfolio: "Портфолио",
    video: "Видео",
    price: "Цены",
    contacts: "Контакты",
    "hero-title": "Алекса Райс",
    "hero-text":
      "Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом",
    hire: "Пригласить",
    "skill-title-1": "Фотография",
    "skill-text-1": "Высококачественные фото в студии и на природе",
    "skill-title-2": "Видеосъемка",
    "skill-text-2":
      "Запечатлите лучшие моменты, чтобы они всегда оставались с вами",
    "skill-title-3": "Ретушь",
    "skill-text-3":
      "Я стремлюсь к тому, чтобы фотография превосходила реальность",
    "skill-title-4": "Звук",
    "skill-text-4":
      "Профессиональная запись звука для видео, рекламы, портфолио",
    winter: "Зима",
    spring: "Весна",
    summer: "Лето",
    autumn: "Осень",
    "price-description-1-span-1": "Одна локация",
    "price-description-1-span-2": "120 цветных фото",
    "price-description-1-span-3": "12 отретушированных фото",
    "price-description-1-span-4": "Готовность через 2-3 недели",
    "price-description-1-span-5": "Макияж, визаж",
    "price-description-2-span-1": "Одна-две локации",
    "price-description-2-span-2": "200 цветных фото",
    "price-description-2-span-3": "20 отретушированных фото",
    "price-description-2-span-4": "Готовность через 1-2 недели",
    "price-description-2-span-5": "Макияж, визаж",
    "price-description-3-span-1": "Три локации и больше",
    "price-description-3-span-2": "300 цветных фото",
    "price-description-3-span-3": "50 отретушированных фото",
    "price-description-3-span-4": "Готовность через 1 неделю",
    "price-description-3-span-5": "Макияж, визаж, прическа",
    order: "Заказать съемку",
    "contact-me": "Свяжитесь со мной",
    "send-message": "Отправить",
  },
};

const videoPlayer = document.querySelector(".video-wrap");
const video = videoPlayer.querySelector("video.video-item");
const playButton = videoPlayer.querySelector(".play-button");
const playTotalButton = videoPlayer.querySelector(".play-icon");
const volume = videoPlayer.querySelector(".volume");
const currentTimeElement = videoPlayer.querySelector(".current");
const durationTimeElement = videoPlayer.querySelector(".duration");
const progress = videoPlayer.querySelector(".video-progress");
const progressBar = videoPlayer.querySelector(".video-progress-filled");
const mute = videoPlayer.querySelector(".mute");
const fullscreen = videoPlayer.querySelector(".fullscreen");

// Play and Pause button:
playButton.addEventListener("click", (e) => {
  if (video.paused) {
    video.play();
    e.target.textContent = "❚❚";
    videoPlayer.classList.add("pause");
  } else {
    video.pause();
    e.target.textContent = "►";
    videoPlayer.classList.remove("pause");
  }
});
playTotalButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.textContent = "❚❚";
    videoPlayer.classList.add("pause");
  } else {
    video.pause();
    playButton.textContent = "►";
    videoPlayer.classList.remove("pause");
  }
});
video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.textContent = "❚❚";
    videoPlayer.classList.add("pause");
  } else {
    video.pause();
    playButton.textContent = "►";
    videoPlayer.classList.remove("pause");
  }
});

// volume:
volume.addEventListener("mousemove", (e) => {
  video.volume = e.target.value;
  if (video.volume == 0) {
    mute.classList.add("muted");
  } else if (video.volume != 0) {
    mute.classList.remove("muted");
  }
});

// current time and duartion:
const currentTime = () => {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currentTimeElement.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
  }`;
  durationTimeElement.innerHTML = `${durationMinutes}:${
    durationSeconds < 10 ? "0" + durationSeconds : durationSeconds
  }`;
};

video.addEventListener("timeupdate", currentTime);

// progress bar
video.addEventListener("timeupdate", () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percentage}%`;
});

// change progress bar on click
progress.addEventListener("click", (e) => {
  const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressTime;
});

// mute button
mute.addEventListener("click", () => {
  if (video.volume == 0) {
    mute.classList.remove("muted");
    video.muted = !video.muted;
  }
  video.muted = !video.muted;
  mute.classList.toggle("muted");
});

// fullscreen button:
fullscreen.addEventListener("click", () => {
  video.requestFullscreen();
});

// закрытие / открытие менюшки по клику на nav-btn или ссылке:

const burger = document.querySelector(".burger-nav");
const burgerNav = document.querySelector(".header__nav");
const navButton = document.querySelectorAll(".header__nav-item");

function burgerMenu() {
  burgerNav.classList.toggle("header__nav--active");
}
burger.addEventListener("click", burgerMenu);
navButton.forEach((el) => el.addEventListener("click", burgerMenu));

// возьмем в переменные каждый селектор и добавим функцию, которая проверяет каждое portfolioImg через forEach, а затем заменяет смену изображений через forEach:

const portfolioImg = document.querySelectorAll(".portfolio-item__img");
const portfolioBtns = document.querySelector(".portfolio-filter__nav-list");
const portfolioBtn = document.querySelectorAll(".portfolio-filter__list-btn");

function changeImage(event) {
  if (event.target.classList.contains("portfolio-filter__list-btn")) {
    portfolioImg.forEach(
      (img, index) =>
        (img.src = `images/portfolio/${event.target.dataset.season}/${
          index + 1
        }.jpg`)
    );
  }
}
portfolioBtns.addEventListener("click", changeImage);

// сначала удаляем классы btn-active и пишем функцию, которая будет для каждого элемента стирать классы, а тому, по которому нажали (event.target) добавлять.
portfolioBtn.forEach((x) => x.classList.remove("btn-active"));

function changeActive(event) {
  portfolioBtn.forEach((elem) => elem.classList.remove("btn-active"));
  event.target.classList.add("btn-active");
}
portfolioBtns.addEventListener("click", changeActive);

// Добавляем функцию перевода:

const langElement = document.querySelectorAll("[data-i18]");
const langs = document.querySelectorAll(".header__lang-btn");
const langRu = document.querySelector(".header__ru");
const langEn = document.querySelector(".header__en");

function doTranslate(language) {
  langElement.forEach(
    (elem) => (elem.textContent = i18Obj[language][elem.dataset.i18])
  );
  lang = language;
  if (language == "en") {
    langEn.setAttribute("checked", "");
    langRu.removeAttribute("checked", "");
  } else if (language == "ru") {
    langRu.setAttribute("checked", "");
    langEn.removeAttribute("checked", "");
  }
}
langs.forEach((el) =>
  el.addEventListener("click", (e) => {
    doTranslate(e.target.id);
  })
);

// добавим смену дневной и ночной темы и заодно создадим переменную theme для localStorage:

const themeBtn = document.querySelector(".header__theme-btn");
const darkBtn = document.querySelector(".header__theme-img__dark");
const lightBtn = document.querySelector(".header__theme-img");
let theme = "dark";

function changeTheme() {
  if (themeBtn.classList.contains("theme-active")) {
    themeBtn.classList.remove("theme-active");
    document.documentElement.style.setProperty("--gold-color", "#BDAE82");
    document.documentElement.style.setProperty("--black-color", "#000");
    document.documentElement.style.setProperty("--white-color", "#fff");
    document.documentElement.style.setProperty("--wtn-color", "#fff");
    theme = "dark";
    theme = localStorage.setItem("theme", theme);
  } else {
    themeBtn.classList.add("theme-active");
    document.documentElement.style.setProperty("--gold-color", "#000");
    document.documentElement.style.setProperty("--black-color", "#fff");
    document.documentElement.style.setProperty("--white-color", "#000");
    document.documentElement.style.setProperty("--wtn-color", "#BDAE82");
    theme = "light";
    theme = localStorage.setItem("theme", theme);
  }
}

themeBtn.addEventListener("click", changeTheme);

// 'Забираем' localStorage для смены темы при перезагрузке
if (localStorage.getItem("theme") === "dark") {
  themeBtn.classList.remove("theme-active");
  document.documentElement.style.setProperty("--gold-color", "#BDAE82");
  document.documentElement.style.setProperty("--black-color", "#000");
  document.documentElement.style.setProperty("--white-color", "#fff");
  document.documentElement.style.setProperty("--wtn-color", "#fff");
} else if (localStorage.getItem("theme") === "light") {
  themeBtn.classList.add("theme-active");
  document.documentElement.style.setProperty("--gold-color", "#000");
  document.documentElement.style.setProperty("--black-color", "#fff");
  document.documentElement.style.setProperty("--white-color", "#000");
  document.documentElement.style.setProperty("--wtn-color", "#BDAE82");
}

// сохранение языка после перезагрузки:
let lang = "en";

function setLocalStorage() {
  localStorage.setItem("lang", lang);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    const lang = localStorage.getItem("lang");
    doTranslate(lang);
  }
}
window.addEventListener("load", getLocalStorage);

console.log(
  `Если видео не включается сразу, подождите немного, должно прогрузиться😗`
);
