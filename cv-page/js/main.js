
// функция закрытия/открытия меню c помощью добавления/удаления класса

$('.nav-burger-arrow, .header__nav-item a').on('click', function () {
  $('.header__nav-two').toggleClass('header__nav-two--active');
});

// такая же функция, только для стрелочки меню, чтобы она меняла свое состояние

$('.nav-burger-arrow, .header__nav-item a').on('click', function () {
  $('.nav-burger-arrow').toggleClass('nav-burger-arrow--active');
});

// функция для скрытия менюшки при клике в область за зоной (outside) этой менюшки и одновременно изменении состоянии стрелочки:

document.onclick = function (e) {
  if (e.target.id !== 'header__nav-list-two' && e.target.id !== 'nav-burger-arrow') {
    $('.header__nav-two').removeClass('header__nav-two--active');
    $('.nav-burger-arrow').removeClass('nav-burger-arrow--active');
  }
};

// плавный скрол:

$(".header__nav a, .header__cv a").on("click", function (event) {
  event.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({ scrollTop: top }, 1200);
});

// стрелочка to-top:

function backToTop() {

  let button = $('.back-to-top');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() >= 350) {
    button.fadeIn();
  } else {
    button.fadeOut();
    }
});

  button.on('click', (e) => {
    e.preventDefault();
    $('html').animate({ scrollTop: 0 }, 1000);
  });
}

backToTop();

// настройка формы с помощью formspree:

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }

  }).then(response => {
    status.classList.add('success');
    status.innerHTML = "Thanks!";
    form.reset();
  }).catch(error => {
    status.classList.add('error');
    status.innerHTML = "Oops! There was a problem submitting your form";
  });
}

form.addEventListener("submit", handleSubmit);


// подключил библиотеку hightlight js для демонстрации кода:

hljs.initHighlightingOnLoad();