// map.js

const map = L.map("map", {
  zoomControl: true,
  scrollWheelZoom: false,
}).setView([0, 0], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors',
  maxZoom: 6,
  minZoom: 1,
}).addTo(map);

const baseIcon = L.icon({
  iconUrl: "./media/base-spaziale.png", // Icona personalizzata 40x40 px
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const ufficiGalattici = [
 {
  nome: "Base Jedi Coruscant",
  desc: "Centro operativo Jedi sulla capitale galattica.",
  coords: [39.2238, 9.1217], // Cagliari
},
{
  nome: "Stazione Ribelle Hoth",
  desc: "Base ribelle nel sistema ghiacciato di Hoth.",
  coords: [39.8733, 8.8415], // Siamanna
},
{
  nome: "Outpost Imperiale Endor",
  desc: "Base di sorveglianza imperiale sul sistema Endor.",
  coords: [39.9035, 8.5912], // Oristano
},
{
  nome: "Centro Ricerca Naboo",
  desc: "Laboratori avanzati per tecnologie spaziali.",
  coords: [39.2170, 9.0790], // Pirri
}

];

ufficiGalattici.forEach((ufficio) => {
  L.marker(ufficio.coords, { icon: baseIcon })
    .addTo(map)
    .bindPopup(`<b>${ufficio.nome}</b><br>${ufficio.desc}`);
});
