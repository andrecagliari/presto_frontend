console.log("✅ Script Chi Siamo caricato");

// ================== NAVBAR DINAMICA ==================
const navbar = document.querySelector("#navbar");
const links = document.querySelectorAll(".nav-link");
const logoNavbar = document.querySelector("#logoNavbar");
const spadaLaser = document.querySelector("#spadalaser");
const collapse = document.querySelector("#collapse");

// Aggiorna stile navbar su scroll
window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
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
});

// ================== DARK MODE TOGGLE ==================
const darkModeToggle = document.getElementById("darkModeToggle");

// Applica modalità scura se già abilitata
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark");
}

// Attiva/disattiva modalità scura con toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.removeItem("dark-mode");
  }
});

// ================== BOTTONE "TORNA SU" ==================
const backToTop = document.getElementById("backToTop");

// Mostra bottone se scroll > 300px
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// Scorri in alto con animazione
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
