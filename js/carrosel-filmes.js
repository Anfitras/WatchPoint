const filmes = [
  {
    titulo: "Senhor dos Anéis: O Retorno do Rei",
    poster: "../banners/filmes/retorno_do_rei.jpg",
    fundo: "../banners_horizontal/filmes/retorno_do_rei.jpg",
    nota: "⭐ 9.0",
  },
  {
    titulo: "O Poderoso Chefão",
    poster: "../banners/filmes/o_poderoso_chefao.jpg",
    fundo: "../banners_horizontal/filmes/o_poderoso_chefao.jpg",
    nota: "⭐ 9.2",
  },
  {
    titulo: "Batman: O Cavaleiro das Trevas",
    poster: "../banners/filmes/cavaleiro_das_trevas.jpeg",
    fundo: "../banners_horizontal/filmes/cavaleiro_das_trevas.jpg",
    nota: "⭐ 9.0",
  },
  {
    titulo: "Clube da Luta",
    poster: "../banners/filmes/clube_da_luta.jpeg",
    fundo: "../banners_horizontal/filmes/clube_da_luta.jpg",
    nota: "⭐ 8.8",
  },
];

let atual = 0;

function atualizarCarrossel() {
  const filme = filmes[atual];
  document.getElementById("carrossel-bg").src = filme.fundo;
  document.getElementById("carrossel-poster").src = filme.poster;
  document.getElementById("carrossel-title").textContent = filme.titulo;
  document.getElementById("carrossel-rating").textContent = filme.nota;
}

function nextFilme() {
  atual = (atual + 1) % filmes.length;
  atualizarCarrossel();
}

function prevFilme() {
  atual = (atual - 1 + filmes.length) % filmes.length;
  atualizarCarrossel();
}

atualizarCarrossel();
setInterval(nextFilme, 5000);
