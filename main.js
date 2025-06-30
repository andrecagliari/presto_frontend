console.log(`Script di gestione main caricato`);

// ========== NAVBAR DINAMICA ==========
const navbar = document.querySelector("#navbar");
const links = document.querySelectorAll(".nav-link");
const logoNavbar = document.querySelector("#logoNavbar");
const spadaLaser = document.querySelector("#spadalaser");
const collapse = document.querySelector("#collapse");

function updateNavbarTheme(scrolled) {
  if (scrolled > 0 || document.body.classList.contains("dark")) {
    navbar.classList.replace("bg-black", "bg-yellow");
    collapse.classList.replace("bg-black", "bg-yellow");
    navbar.style.height = "70px";
    links.forEach((link) => (link.style.color = "var(--red)"));
    logoNavbar.src = "./media/LogoSWnero.png";
    spadaLaser.src = "./media/spadanavbarOriz-nera.png";
  } else {
    navbar.classList.replace("bg-yellow", "bg-black");
    collapse.classList.replace("bg-yellow", "bg-black");
    navbar.style.height = "140px";
    links.forEach((link) => (link.style.color = "var(--yellow)"));
    logoNavbar.src = "./media/LogoSWgiallo.png";
    spadaLaser.src = "./media/spadanavbarOriz-giallo.png";
  }
}

window.addEventListener("scroll", () => {
  updateNavbarTheme(window.scrollY);
});

// ========== ROTAZIONE SPADA ==========
let check = false;
spadaLaser.addEventListener("click", () => {
  check = !check;
  spadaLaser.style.transform = check ? "rotate(-90deg)" : "rotate(0deg)";
});

// ========== NUMERI INCREMENTALI ==========
const firstNumber = document.querySelector("#firstNumber");
const secondNumber = document.querySelector("#secondNumber");
const thirdNumber = document.querySelector("#thirdNumber");
let confirm = true;

function createInterval(n, element, time) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter < n) {
      counter++;
      element.textContent = counter;
    } else {
      clearInterval(interval);
    }
  }, time);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && confirm) {
      createInterval(100, firstNumber, 10);
      createInterval(200, secondNumber, 7);
      createInterval(300, thirdNumber, 5);
      confirm = false;
    }
  });
});

observer.observe(firstNumber);
observer.observe(secondNumber);
observer.observe(thirdNumber);

// ========== SWIPER RECENSIONI ==========
const rewiews = [
  { name: "Mario Rossi", rating: 5 },
  { name: "Luca Bianchi", rating: 4 },
  { name: "Giulia Verdi", rating: 3 },
  { name: "Andrea Gialli", rating: 2 },
  { name: "Elena Neri", rating: 1 },
];

function getReviewText(rating) {
  switch (rating) {
    case 5:
      return "Esperienza perfetta! Servizio impeccabile e super consigliato.";
    case 4:
      return "Molto buono, solo qualche piccolo dettaglio da migliorare.";
    case 3:
      return "Servizio nella media, niente di eccezionale.";
    case 2:
      return "Abbastanza deludente, mi aspettavo di più.";
    default:
      return "Pessima esperienza, non lo consiglio affatto.";
  }
}

const swiperWrapper = document.querySelector(".swiper-wrapper");

rewiews.forEach((recensione) => {
  const div = document.createElement("div");
  div.classList.add("swiper-slide", "fade-in");

  const stelle = Array.from({ length: 5 }, (_, i) =>
    i < recensione.rating
      ? '<i class="fa-solid fa-star"></i>'
      : '<i class="fa-regular fa-star"></i>'
  ).join("");

  div.innerHTML = `
    <div class="card-review">
      <p class="lead text-center">${getReviewText(recensione.rating)}</p>
      <p class="h4 text-center">${recensione.name}</p>
      <div class="d-flex justify-content-center">${stelle}</div>
    </div>
  `;
  swiperWrapper.appendChild(div);
});

new Swiper(".swiper", {
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
  pagination: { el: ".swiper-pagination" },
  scrollbar: { el: ".swiper-scrollbar" },
});

// ========== DARK MODE TOGGLE ==========
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark");
  updateNavbarTheme(1);
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateNavbarTheme(window.scrollY);
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.removeItem("dark-mode");
  }
});

// ========== TORNA SU ==========
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== VALIDAZIONE FORM ==========
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = contactForm.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      valid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (valid) {
    alert("Messaggio inviato! 🚀");
    contactForm.reset();
  }
});