const animes = [
  {
    titulo: "Attack on Titan",
    poster: "../banners/animes/attack_on_titan.jpeg",
    fundo: "../banners_horizontal/animes/attack_on_titan.jpg",
    nota: "⭐ 9.1",
  },
  {
    titulo: "Fullmetal Alchemist: Brotherhood",
    poster: "../banners/animes/fullmetal_brotherhood.jpg",
    fundo: "../banners_horizontal/animes/fullmetal_brotherhood.jpg",
    nota: "⭐ 9.1",
  },
  {
    titulo: "Hunter x Hunter",
    poster: "../banners/animes/hunter_x_hunter.jpg",
    fundo: "../banners_horizontal/animes/hunter_x_hunter.jpg",
    nota: "⭐ 9.0",
  },
  {
    titulo: "One Piece",
    poster: "../banners/animes/one_piece.jpeg",
    fundo: "../banners_horizontal/animes/one_piece.jpg",
    nota: "⭐ 9.0",
  },
];

let atual = 0;
let carrosselIntervalo;

function atualizarCarrossel() {
  const anime = animes[atual];
  document.getElementById("carrossel-bg").src = anime.fundo;
  document.getElementById("carrossel-poster").src = anime.poster;
  document.getElementById("carrossel-title").textContent = anime.titulo;
  document.getElementById("carrossel-rating").textContent = anime.nota;
}

function iniciarTimer() {
  clearInterval(carrosselIntervalo);
  carrosselIntervalo = setInterval(nextAnime, 5000);
}

function nextAnime() {
  atual = (atual + 1) % animes.length;
  atualizarCarrossel();
}

function prevAnime() {
  atual = (atual - 1 + animes.length) % animes.length;
  atualizarCarrossel();
}

function cliqueNext() {
  nextAnime();
  iniciarTimer();
}

function cliquePrev() {
  prevAnime();
  iniciarTimer();
}

atualizarCarrossel();
iniciarTimer();
