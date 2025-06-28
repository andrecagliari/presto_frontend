// Navbar dinamica
let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let spadaLaser = document.querySelector('#spadalaser');
let collapse = document.querySelector('#collapse');
let check = false;

window.addEventListener('scroll', () => {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
    navbar.classList.remove('bg-black');
    navbar.classList.add('bg-yellow');
    collapse.classList.remove('bg-black');
    collapse.classList.add('bg-yellow');
    navbar.style.height = '70px';

    links.forEach(link => {
      link.style.color = 'var(--black)';
    });

    logoNavbar.src = 'http://127.0.0.1:5500/media/LogoSWnero.png';
    spadaLaser.src = 'http://127.0.0.1:5500/media/spadanavbarOriz-nera.png';
  } else {
    navbar.classList.remove('bg-yellow');
    navbar.classList.add('bg-black');
    collapse.classList.remove('bg-yellow');
    collapse.classList.add('bg-black');
    navbar.style.height = '140px';

    links.forEach(link => {
      link.style.color = 'var(--yellow)';
    });

    logoNavbar.src = 'http://127.0.0.1:5500/media/LogoSWgiallo.png';
    spadaLaser.src = 'http://127.0.0.1:5500/media/spadanavbarOriz-giallo.png';
  }
});

// Spada laser rotante
spadaLaser.addEventListener('click', () => {
  check = !check;
  spadaLaser.style.transform = check ? 'rotate(-90deg)' : 'rotate(0deg)';
});

// Incremento numeri
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let confirm = true;

function createInterval(n, element, time) {
  let counter = 0;
  let interval = setInterval(() => {
    if (counter < n) {
      counter++;
      element.innerHTML = counter;
    } else {
      clearInterval(interval);
    }
  }, time);
}

setTimeout(() => {
  confirm = true;
}, 8000);

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && confirm) {
      createInterval(100, firstNumber, 100);
      createInterval(200, secondNumber, 50);
      createInterval(300, thirdNumber, 20);
      confirm = false;
    }
  });
});

observer.observe(firstNumber);
observer.observe(secondNumber);
observer.observe(thirdNumber);

// Recensioni Swiper dinamiche
let rewiews = [
  { name: "Mario Rossi", rating: 5 },
  { name: "Luca Bianchi", rating: 4 },
  { name: "Giulia Verdi", rating: 3 },
  { name: "Andrea Gialli", rating: 2 },
  { name: "Elena Neri", rating: 1 }
];

// Funzione per testo recensione in base al voto
function getReviewText(rating) {
  if (rating === 5) {
    return "Esperienza perfetta! Servizio impeccabile e super consigliato.";
  } else if (rating === 4) {
    return "Molto buono, solo qualche piccolo dettaglio da migliorare.";
  } else if (rating === 3) {
    return "Servizio nella media, niente di eccezionale.";
  } else if (rating === 2) {
    return "Abbastanza deludente, mi aspettavo di più.";
  } else {
    return "Pessima esperienza, non lo consiglio affatto.";
  }
}

let swiperWrapper = document.querySelector('.swiper-wrapper');

rewiews.forEach(recensione => {
  let div = document.createElement('div');
  div.classList.add('swiper-slide');

  let stelle = '';
  for (let i = 1; i <= 5; i++) {
    stelle += i <= recensione.rating
      ? `<i class="fa-solid fa-star"></i>`
      : `<i class="fa-regular fa-star"></i>`;
  }

  div.innerHTML = `
    <div class="card-review">
      <p class="lead text-center">${getReviewText(recensione.rating)}</p>
      <p class="h4 text-center">${recensione.name}</p>
      <div class="d-flex justify-content-center">
        ${stelle}
      </div>
    </div>
  `;

  swiperWrapper.appendChild(div);
});

// Inizializzazione Swiper
const swiper = new Swiper('.swiper', {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});


