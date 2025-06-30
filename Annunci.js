console.log("✅ Script Annunci caricato");

// ================== CARICAMENTO DATI ==================
fetch('./annunci.json')
  .then(response => response.json())
  .then(data => {
    const radiowrapper = document.querySelector("#radiowrapper");
    const cardContainer = document.querySelector("#annunciWrapper");
    const titoloAnnunci = document.querySelector("#titoloAnnunci");
    const inputMin = document.getElementById("minPrice");
    const inputMax = document.getElementById("maxPrice");
    const inputSearch = document.getElementById("searchKey");

    // ================== CATEGORIE UNICHE ==================
    const categorie = [...new Set(data.map(a => a.categoria).filter(Boolean))];

    // ================== CREAZIONE RADIO DINAMICI ==================
    function radioCreate() {
      const divAll = document.createElement("div");
      divAll.classList.add("form-check");
      divAll.innerHTML = `
        <input class="form-check-input" type="radio" name="categorie" id="radioAll" value="" checked>
        <label class="form-check-label" for="radioAll">Tutti gli oggetti</label>
      `;
      radiowrapper.appendChild(divAll);

      categorie.forEach((categoria, index) => {
        const div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
          <input class="form-check-input" type="radio" name="categorie" id="radio${index}" value="${categoria}">
          <label class="form-check-label" for="radio${index}">${categoria}</label>
        `;
        radiowrapper.appendChild(div);
      });
    }

    // ================== MOSTRA ANNUNCI FILTRATI ==================
    function mostraAnnunciFiltrati() {
      const categoriaSelezionata = document.querySelector("input[name='categorie']:checked")?.value;
      const min = parseFloat(inputMin.value) || 0;
      const max = parseFloat(inputMax.value) || Infinity;
      const chiave = inputSearch.value.toLowerCase();

      const risultati = data.filter(annuncio => {
        const matchCategoria = categoriaSelezionata ? annuncio.categoria === categoriaSelezionata : true;
        const matchPrezzo = annuncio.prezzo >= min && annuncio.prezzo <= max;
        const matchKeyword =
          annuncio.titolo.toLowerCase().includes(chiave) ||
          annuncio.descrizione.toLowerCase().includes(chiave);

        return matchCategoria && matchPrezzo && matchKeyword;
      });

      generaCard(risultati);
    }

    // ================== GENERA CARD ==================
    function generaCard(array) {
      cardContainer.innerHTML = "";

      if (array.length === 0) {
        titoloAnnunci.innerHTML = `Nessun annuncio trovato 😢`;
        return;
      } else {
        titoloAnnunci.innerHTML = `Annunci trovati: ${array.length}`;
      }

      array.forEach(annuncio => {
        const card = document.createElement("div");
        card.classList.add("card-review", "fade-in");

        const mediaRecensioni = calcolaMedia(annuncio.recensioni);
        const stelle = generaStelle(mediaRecensioni);

        let recensioniHTML = '<div class="recensioni-list" style="display:none; margin-top:15px; text-align:left;">';
        annuncio.recensioni.forEach(rec => {
          const stelleRec = generaStelle(rec.stelle);
          recensioniHTML += `
            <div class="recensione-singola" style="margin-bottom:10px;">
              <strong>${rec.utente}</strong>: ${rec.testo}
              <div>${stelleRec}</div>
            </div>
          `;
        });
        recensioniHTML += '</div>';

        card.innerHTML = `
          <div class="row g-3 align-items-center">
            <div class="col-md-4">
              <img src="${annuncio.img}" alt="${annuncio.titolo}" class="img-fluid rounded" />
            </div>
            <div class="col-md-8">
              <h3 class="mb-2">${annuncio.titolo}</h3>
              <p class="mb-1">${annuncio.descrizione}</p>
              <p class="fw-bold text-yellow">Prezzo: € ${annuncio.prezzo}</p>
              <div class="mb-2">Recensioni medie: ${stelle}</div>
              <button class="btn btn-sm btn-custom toggle-recensioni">Mostra recensioni</button>
              ${recensioniHTML}
            </div>
          </div>
        `;

        cardContainer.appendChild(card);
      });

      // ================== TOGGLE RECENSIONI ==================
      const toggleButtons = cardContainer.querySelectorAll(".toggle-recensioni");
      toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const recensioniDiv = btn.nextElementSibling;
          if (recensioniDiv.style.display === "none") {
            recensioniDiv.style.display = "block";
            btn.textContent = "Nascondi recensioni";
          } else {
            recensioniDiv.style.display = "none";
            btn.textContent = "Mostra recensioni";
          }
        });
      });
    }

    // ================== CALCOLA MEDIA RECENSIONI ==================
    function calcolaMedia(recensioni) {
      const somma = recensioni.reduce((acc, el) => acc + el.stelle, 0);
      return Math.round(somma / recensioni.length);
    }

    // ================== GENERA STELLE ==================
    function generaStelle(n) {
      return Array.from({ length: 5 }, (_, i) =>
        i < n
          ? '<i class="fa-solid fa-star"></i>'
          : '<i class="fa-regular fa-star"></i>'
      ).join("");
    }

    // ================== AVVIO ==================
    radioCreate();
    mostraAnnunciFiltrati();

    // ================== EVENTI FILTRO ==================
    document.addEventListener("input", mostraAnnunciFiltrati);
    document.addEventListener("change", mostraAnnunciFiltrati);
  });

// ================== TORNA SU ==================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
