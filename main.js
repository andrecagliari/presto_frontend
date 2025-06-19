let annunci = [];
let preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];

const annunciContainer = document.getElementById("annunciContainer");
const preferitiContainer = document.getElementById("favsContainer");
const favsSection = document.getElementById("favsSection");
const categoryFilter = document.getElementById("categoryFilter");
const priceRange = document.getElementById("priceRange");
const priceInput = document.getElementById("priceInput");
const searchInput = document.getElementById("searchInput");
const starsFilter = document.getElementById("starsFilter");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const toggleDark = document.getElementById("toggleDark");
const showFavorites = document.getElementById("showFavorites");
const closeFavorites = document.getElementById("closeFavorites");

async function loadAnnunci() {
  const res = await fetch("annunci.json");
  annunci = await res.json();
  initFilters();
  applyFilters();
}

function renderAnnunci(lista, container = annunciContainer) {
  container.innerHTML = "";
  lista.forEach((a) => {
    const card = document.createElement("div");
    card.className = "card";
    const isFav = preferiti.includes(a.id);

    card.innerHTML = `
      <div class="rounded-xl overflow-hidden relative shadow-2xl border border-white/10 backdrop-blur-lg bg-white/10 dark:bg-gray-800/20 transition transform hover:scale-[1.02]">
        <img src="${a.img}" alt="${a.titolo}" class="w-full h-60 object-contain object-center rounded-t-xl cursor-pointer bg-transparent" data-id="${a.id}" />
        <div class="p-4 flex flex-col text-white dark:text-gray-100">
          <h3 class="text-lg font-semibold mb-1">${a.titolo}</h3>
          <p class="text-sm opacity-90 mb-1">${a.descrizione.substring(0, 60)}...</p>
          <p class="text-amber-400 font-bold mb-3">€ ${parseFloat(a.prezzo).toFixed(2)}</p>
          <div class="mt-auto flex justify-between items-center">
            <span class="favorite-btn" data-id="${a.id}">
              <i class="fas fa-heart ${isFav ? "text-red-500" : "text-white"} text-lg"></i>
            </span>
            <button class="text-sm underline text-blue-300" data-id="${a.id}">Dettagli</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function initFilters() {
  const categories = [...new Set(annunci.map(a => a.categoria))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  const maxPrezzo = Math.max(...annunci.map(a => parseFloat(a.prezzo)));
  priceRange.max = maxPrezzo;
  priceRange.value = maxPrezzo;
  priceInput.value = maxPrezzo;
}

function applyFilters() {
  let filtered = [...annunci];
  const cat = categoryFilter.value;
  const maxPrice = parseFloat(priceRange.value);
  const minStars = parseInt(starsFilter.value);
  const query = searchInput.value.toLowerCase();

  if (cat) filtered = filtered.filter(a => a.categoria === cat);
  filtered = filtered.filter(a => parseFloat(a.prezzo) <= maxPrice);
  if (minStars > 0) {
    filtered = filtered.filter(a => {
      const avg = a.recensioni.reduce((sum, r) => sum + r.stelle, 0) / a.recensioni.length;
      return avg >= minStars;
    });
  }
  if (query) filtered = filtered.filter(a => a.titolo.toLowerCase().includes(query));

  priceInput.value = maxPrice;
  renderAnnunci(filtered);
}

function toggleFavorite(id) {
  const index = preferiti.indexOf(id);
  if (index !== -1) {
    preferiti.splice(index, 1);
  } else {
    preferiti.push(id);
  }
  localStorage.setItem("preferiti", JSON.stringify(preferiti));
  updateView();
}

function updateView() {
  if (favsSection.classList.contains("hidden")) {
    applyFilters();
  } else {
    const favs = annunci.filter(a => preferiti.includes(a.id));
    renderAnnunci(favs, preferitiContainer);
  }
}

function openModal(id) {
  const item = annunci.find(a => a.id == id);
  if (!item) return;

  const avg =
    item.recensioni.length > 0
      ? item.recensioni.reduce((sum, r) => sum + r.stelle, 0) / item.recensioni.length
      : 0;

  modalContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${item.titolo}</h2>
    <img src="${item.img}" class="rounded-xl w-full h-64 object-contain object-center bg-white/10 mb-3" />
    <p class="mb-2">${item.descrizione}</p>
    <p class="text-lg font-semibold mb-2">Prezzo: € ${parseFloat(item.prezzo).toFixed(2)}</p>
    <p class="mb-2">Media recensioni: ${avg.toFixed(1)} ★</p>
    <h3 class="text-md font-semibold mb-1">Recensioni:</h3>
    <ul class="space-y-2 mb-2">
      ${item.recensioni.map(r => `
        <li class="border-l-4 pl-2 border-amber-400">
          <strong>${r.utente}</strong>: <span>${"★".repeat(r.stelle)}${"☆".repeat(5 - r.stelle)}</span><br/>
          <em>${r.testo}</em>
        </li>
      `).join("")}
    </ul>
  `;
  modalOverlay.classList.add("show");
}

// Eventi
priceRange.addEventListener("input", () => {
  priceInput.value = priceRange.value;
  applyFilters();
});
priceInput.addEventListener("input", () => {
  priceRange.value = priceInput.value;
  applyFilters();
});
categoryFilter.addEventListener("change", applyFilters);
starsFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

document.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".favorite-btn");
  if (favBtn) {
    const id = parseInt(favBtn.dataset.id);
    toggleFavorite(id);
  }
  if (e.target.textContent === "Dettagli" || e.target.tagName === "IMG") {
    const id = e.target.dataset.id;
    openModal(id);
  }
});

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("show");
});
toggleDark.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
showFavorites.addEventListener("click", () => {
  favsSection.classList.remove("hidden");
  annunciContainer.classList.add("hidden");
  updateView();
});
closeFavorites.addEventListener("click", () => {
  favsSection.classList.add("hidden");
  annunciContainer.classList.remove("hidden");
  applyFilters();
});

loadAnnunci();
