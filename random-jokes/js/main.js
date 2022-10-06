const shrekBtn = document.querySelector('.shrek-btn');
const quotesContent = document.querySelector('.content');
const audio0 = new Audio();
const audio1 = new Audio();
const donkeySounder = new Audio();
const donkeySound0 = new Audio();
const donkeySound1 = new Audio();
const donkeySound2 = new Audio();
const donkeySound3 = new Audio();
audio0.src = "sound/burpsound.mp3";
audio1.src = "sound/anogre.mp3";
donkeySounder.src = 'sound/donkey.mp3';
donkeySound0.src = 'sound/oh0.mp3';
donkeySound1.src = 'sound/oh1.mp3';
donkeySound2.src = 'sound/oh2.mp3';
donkeySound3.src = 'sound/oh3.mp3';

// Переменные и функции ассинхронной загрузки json-файликов:
const enBtn = document.querySelector('.lang-changer__en');
const ruBtn = document.querySelector('.lang-changer__ru');

async function getQuotables() {
  if (enBtn.classList.contains('active')) {
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quotesContent.textContent = data[Math.floor(Math.random() * 16)].text;
  } else if (ruBtn.classList.contains('active')) {
    const quotes = 'js/dataRu.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quotesContent.textContent = data[Math.floor(Math.random() * 16)].text;
  }
}
getQuotables();

// создаем функцию генерации случайной переменной - звука для ослика и добавляем слушатель, чтобы при клике он вызывал функцию звука:
const generateSoundDonkey = () => {
  let currentDonkeySound = eval(`${'donkeySound' + Math.floor(Math.random() * 4)}`);
  return currentDonkeySound;
};

const dunkeyBtn = document.querySelector('.footer__secret');
dunkeyBtn.addEventListener('click', () => {
  generateSoundDonkey().play();
});


// добавляем класс для ослика и счетчик нажатий на кнопку цитаты, когда счетчик делится на 5 без остатка - добавляем класс для ослика (благодаря которому он появляется):
const donkey = document.querySelector('.footer__secret');
let donkeyCount = 0;
shrekBtn.addEventListener('click', () => {
  donkeyCount++;
  if (donkeyCount % 5 === 0) {
    donkey.classList.add('jump');
    donkeySounder.play();
  } else if (donkeyCount % 5 !== 0) {
    donkey.classList.remove('jump');
  }
});

// создаем функцию генерации случайной переменной - звука и добавляем слушатель, чтобы при клике он вызывал функцию (если значение ослика не делится на 5);
const generateSound = () => {
  let currentShrekSound = eval(`${'audio' + Math.floor(Math.random() * 2)}`);
  return currentShrekSound;
};

shrekBtn.addEventListener('click', getQuotables);
shrekBtn.addEventListener('click', () => {
  if (donkeyCount % 5 !== 0) {
    generateSound().play();
  } else {
    generateSound().pause();
  }
});

// добавляем класс по клику для активного языка
ruBtn.addEventListener('click', () => {
  if (enBtn.classList.contains('active')) {
    enBtn.classList.remove('active');
    ruBtn.classList.add('active');
  }
});
enBtn.addEventListener('click', () => {
  if (ruBtn.classList.contains('active')) {
    ruBtn.classList.remove('active');
    enBtn.classList.add('active');
  }
});




