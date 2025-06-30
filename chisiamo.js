console.log("Script Chi Siamo caricato");

// NAVBAR DINAMICA (colore e dimensione su scroll)
const navbar = document.querySelector("#navbar");
const links = document.querySelectorAll(".nav-link");
const logoNavbar = document.querySelector("#logoNavbar");
const spadaLaser = document.querySelector("#spadalaser");
const collapse = document.querySelector("#collapse");

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

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.removeItem("dark-mode");
  }
});

// BACK TO TOP
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
