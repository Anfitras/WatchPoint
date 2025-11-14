var series = [
  {
    titulo: "Breaking Bad",
    poster: "../banners/series/breaking_bad.jpeg",
    fundo: "../banners_horizontal/series/breaking_bad.jpg",
    nota: "⭐ 9.5",
  },
  {
    titulo: "Chernobyl",
    poster: "../banners/series/chernobyl.jpg",
    fundo: "../banners_horizontal/series/chernobyl.jpg",
    nota: "⭐ 9.2",
  },
  {
    titulo: "Game of Thrones",
    poster: "../banners/series/game_of_thrones.jpg",
    fundo: "../banners_horizontal/series/game_of_thrones.jpg",
    nota: "⭐ 9.2",
  },
  {
    titulo: "Rick and Morty",
    poster: "../banners/series/rick_and_morty.jpg",
    fundo: "../banners_horizontal/series/rick_and_morty.jpg",
    nota: "⭐ 9.1",
  },
];

var atual = 0;
var carrosselIntervalo;

function atualizarCarrossel() {
  var serie = series[atual];
  document.getElementById("carrossel-bg").src = serie.fundo;
  document.getElementById("carrossel-poster").src = serie.poster;
  document.getElementById("carrossel-title").textContent = serie.titulo;
  document.getElementById("carrossel-rating").textContent = serie.nota;
}

function iniciarTimer() {
  clearInterval(carrosselIntervalo);
  carrosselIntervalo = setInterval(nextSerie, 5000);
}

function nextSerie() {
  atual = (atual + 1) % series.length;
  atualizarCarrossel();
}

function prevSerie() {
  atual = (atual - 1 + series.length) % series.length;
  atualizarCarrossel();
}

function cliqueNext() {
  nextSerie();
  iniciarTimer();
}

function cliquePrev() {
  prevSerie();
  iniciarTimer();
}

atualizarCarrossel();
iniciarTimer();
