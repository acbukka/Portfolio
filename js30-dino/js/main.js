let kaban = document.querySelector(".kaban");
let container = document.querySelector(".container");
let block = document.querySelector(".block");
let road = document.querySelector(".road");
let gameOver = document.querySelector(".gameOver");
let score = document.querySelector(".score");
let totalScore = document.querySelector(".totalScore");
let hightScore = document.querySelector(".hightScore");
let playBtn = document.querySelector(".play-btn");
// Переменная для score в таблице:
let scoreVar = document.querySelectorAll(".scoreVar");
// Переменная для номера score в таблице:
let scoreNum = document.querySelectorAll(".scoreNum");
// новый объект для localstorage:
let newObj = {};

// Вводим переменные и пути для звуков:
const kabanJump = new Audio();
kabanJump.src = "sound/jump.mp3";
const rickSound = new Audio();
rickSound.src = "sound/rick.mp3";

// счетчик 'попыток' для получения ключа к табличным значениям:
let counter = 0;
// Объявим переменные для подсчета score и hightScore в функциях:
let interval = null;
let highInterval = null;
let playerScore = 0;
let higherScore = 0;

// Если у нас есть в localStorage 'hightscore', сохраняем его:
if (localStorage.getItem("hightscore")) {
  higherScore = localStorage.getItem("hightscore");
  hightScore.innerHTML = `Hight score <b>${higherScore}</b>`;
}

// ставим значение каунтера до обновления страницы из локалсторейдж:
if (localStorage.getItem("counterItem")) {
  counter = localStorage.getItem("counterItem");
}

/* ставим активный класс для подсветки элементам, если они есть 
в localStorage, counter-1 ставим тк после F5 наш каунтер плюсуется 
на 1 и без -1 переключится сразу на следующие значения */
if (localStorage.getItem("activeVar") && localStorage.getItem("activeNum")) {
  scoreVar[counter - 1].classList.add("active");
  scoreNum[counter - 1].classList.add("active");
}
/* Зададим функцию для score и добавим условия, исходя из 
которого функция будет ровнять hightScore и playerScore только если playerScore станет больше */
let scoreCount = () => {
  playerScore++;
  score.innerHTML = `Total score <b>${playerScore}</b>`;
  if (playerScore > higherScore) {
    higherScore = playerScore;
    hightScore.innerHTML = `Hight score <b>${higherScore}</b>`;
    window.localStorage.setItem("hightscore", higherScore);
  }
};

// Начало игры при нажатии space в десктопе:
window.addEventListener("keydown", (touch) => {
  if (touch.code == "Space") {
    rickSound.pause();
    rickSound.currentTime = 0;
    gameOver.style.display = "none";
    totalScore.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    playerScore = 0;
    clearInterval(interval);
    // Зададим подсчет total score с setInterval:
    interval = setInterval(scoreCount, 200);
  }
  if (gameOver.style.display == "block") {
    clearInterval(interval);
    playerScore = 0;
  }
});
// Начало игры при клике на play в адаптиве:
playBtn.addEventListener("click", () => {
  rickSound.pause();
  rickSound.currentTime = 0;
  gameOver.style.display = "none";
  totalScore.style.display = "none";
  block.classList.add("blockActive");
  road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
  playerScore = 0;
  clearInterval(interval);
  // Зададим подсчет total score с setInterval:
  interval = setInterval(scoreCount, 200);
  if (gameOver.style.display == "block") {
    clearInterval(interval);
    playerScore = 0;
  }
});
// Добавим функцию прыжка в десктоп на стрелочку и W:
window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp" || event.key == "w") {
    kabanJump.play();
    if (kaban.classList != "kabanActive") {
      kaban.classList.add("kabanActive");
      // Вводим setTimeout для удаления класса прыжка через короткий промежуток:
      setTimeout(() => {
        kaban.classList.remove("kabanActive");
      }, 500);
    }
  }
});
// Добавим функцию прыжка в адаптив при клике на экран:
container.addEventListener("click", () => {
  kabanJump.play();
  if (kaban.classList != "kabanActive") {
    kaban.classList.add("kabanActive");
    // Вводим setTimeout для удаления класса прыжка через короткий промежуток:
    setTimeout(() => {
      kaban.classList.remove("kabanActive");
    }, 500);
  }
});
// Создаём функцию GameOver'a при задевании кактуса (block'a):
let final = setInterval(() => {
  let kabanBottom = parseInt(
    getComputedStyle(kaban).getPropertyValue("bottom")
  );
  let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
  if (kabanBottom <= 70 && blockLeft >= 0 && blockLeft <= 145) {
    // Выводим надписи на экран:
    gameOver.innerHTML = "Game Over";
    gameOver.style.left = "calc(50% - 165px)";
    gameOver.style.display = "block";
    totalScore.style.display = "block";
    totalScore.innerHTML = `Your score is <b>${playerScore}</b>`;
    // Останавливаем анимации:
    block.classList.remove("blockActive");
    road.firstElementChild.style.animation = "none";
    // Обнуляем каунтер если он достиг 10:
    if (counter == 10) {
      counter = 0;
    }
    // Задаем переменные для storage, и добавляем активный класс текущему значению counter для элемента таблицы:
    let activeVar = scoreVar[counter].classList.add("active");
    let activeNum = scoreNum[counter].classList.add("active");
    window.localStorage.setItem("activeVar", activeVar);
    window.localStorage.setItem("activeNum", activeNum);
    // Удаляем активный класс прошлого значения counter для элемента таблицы
    if (counter - 1 < 0) {
      scoreVar[9].classList.remove("active");
      scoreNum[9].classList.remove("active");
    } else {
      scoreVar[counter - 1].classList.remove("active");
      scoreNum[counter - 1].classList.remove("active");
    }
    // Добавляем значение в таблицу
    scoreVar[counter].innerHTML = `${playerScore}`;
    // создаем цикл, который заполняет новый объект значениями текущего объекта:
    for (let i = 0; i < scoreVar.length; i++) {
      newObj[i] = scoreVar[i].innerHTML;
    }
    // сохраняем в локалсторедж новый объект с новыми данными:
    window.localStorage.setItem("leaderscore", JSON.stringify(newObj));
    // обновляем каунтер:
    counter++;
    // сохраняем в локалсторедж каунтер:
    window.localStorage.setItem("counterItem", counter);
    // Обнуляем интервал и score:
    clearInterval(interval);
    playerScore = 0;
    // вводим else if в случае выигрыша и почти полностью копипастим код из геймовера изменяя только надписи и их положение:
  } else if (playerScore == 300) {
    rickSound.play();
    gameOver.innerHTML = "WINNER!";
    gameOver.style.left = "calc(50% - 130px)";
    gameOver.style.display = "block";
    totalScore.style.display = "block";
    totalScore.innerHTML = `Your score is <b>${playerScore}</b>`;
    // Останавливаем анимации:
    block.classList.remove("blockActive");
    road.firstElementChild.style.animation = "none";
    // Обнуляем каунтер если он достиг 10:
    if (counter == 10) {
      counter = 0;
    }
    // Задаем переменные для storage, и добавляем активный класс текущему значению counter для элемента таблицы:
    let activeVar = scoreVar[counter].classList.add("active");
    let activeNum = scoreNum[counter].classList.add("active");
    window.localStorage.setItem("activeVar", activeVar);
    window.localStorage.setItem("activeNum", activeNum);
    // Удаляем активный класс прошлого значения counter для элемента таблицы
    if (counter - 1 < 0) {
      scoreVar[9].classList.remove("active");
      scoreNum[9].classList.remove("active");
    } else {
      scoreVar[counter - 1].classList.remove("active");
      scoreNum[counter - 1].classList.remove("active");
    }
    // Добавляем значение в таблицу:
    scoreVar[counter].innerHTML = `${playerScore}`;
    // создаем цикл, который заполняет новый объект значениями текущего объекта:
    for (let i = 0; i < scoreVar.length; i++) {
      newObj[i] = scoreVar[i].innerHTML;
    }
    // сохраняем в локалсторедж новый объект с новыми данными:
    window.localStorage.setItem("leaderscore", JSON.stringify(newObj));
    // обновляем каунтер:
    counter++;
    // сохраняем в локалсторедж каунтер:
    window.localStorage.setItem("counterItem", counter);
    // Обнуляем интервал и score:
    clearInterval(interval);
    playerScore = 0;
  }
}, 10);

/* теперь создадим цикл, который будет заполнять каждый элемент 
текущей таблицы (после перезагрузки страницы) значениями из объекта в локал сторейдж */
for (let l = 0; l < scoreVar.length; l++) {
  scoreVar[l].innerHTML = JSON.parse(localStorage.getItem("leaderscore"))[l];
}

console.log(
  `Таблица рекордов исчезает при разрешении экрана 1260px и ниже, на смартфонах играть не рекомендую :D`
);
