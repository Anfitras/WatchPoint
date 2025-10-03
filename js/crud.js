const obras = [
  {
    nome: "Breaking Bad",
    tipo: "Série",
    urlPoster: "../banners/series/breaking_bad.jpeg",
    sinopse:
      "Um professor de química diagnosticado com câncer de pulmão inoperável recorre à fabricação e venda de metanfetamina com um ex-aluno para garantir o futuro de sua família.",
    episodios: 62,
    nota: 9.5,
    generos: [
      "Humor Ácido",
      "Crime",
      "Épico",
      "Drama Psicológico",
      "Suspense Psicológico",
      "Tragédia",
      "Drama",
      "Suspense",
    ],
  },
  {
    nome: "Attack On Titan",
    tipo: "Anime",
    urlPoster: "../banners/animes/attack_on_titan.jpeg",
    sinopse:
      "A Depois que sua cidade natal é destruída, o jovem Eren Jaeger jura limpar a Terra dos gigantes Titãs humanoides que levaram a humanidade à beira da extinção.",
    episodios: 98,
    nota: 9.1,
    generos: [
      "Ação Épica",
      "Animação Adulta",
      "Terror Corporal",
      "Terror de Monstros",
      "Shonen",
      "Sobrevivência",
      "Tragédia",
      "Ação",
      "Aventura",
    ],
  },
];

const formCadastro = document.getElementById("form-cadastro");
const formEdicao = document.getElementById("form-edicao");
const obrasTabela = document.getElementById("obrasTabela");
const modalEdicao = document.getElementById("editModal");
const tipoSelectCadastro = document.getElementById("tipo");
const containerEpisodiosCadastro = document.getElementById(
  "container-episodios"
);

function formatarTitulo(titulo) {
  if (!titulo) return "";
  return titulo
    .toLowerCase()
    .split(" ")
    .map((palavra) => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}

function validarFormulario(ids) {
  const nome = document.getElementById(ids.nome).value.trim();
  const tipo = document.getElementById(ids.tipo).value;
  const urlPoster = document.getElementById(ids.poster).value.trim();
  const sinopse = document.getElementById(ids.sinopse).value.trim();
  const nota = document.getElementById(ids.nota).value.trim();
  const generos = document.getElementById(ids.generos).value.trim();

  if (nome === "" || nome.length < 2) {
    alert(
      "Por favor, preencha o nome da obra (Deve conter ao menos 2 letras)."
    );
    return false;
  }
  if (!tipo) {
    alert("Por favor, escolha um tipo para a obra.");
    return false;
  }
  try {
    new URL(urlPoster);
  } catch (_) {
    alert("Por favor, insira uma URL válida para o pôster.");
    return false;
  }
  if (sinopse === "" || sinopse.length < 10) {
    alert("Por favor, preencha a sinopse da obra com ao menos 10 caracteres.");
    return false;
  }
  if (nota !== "") {
    const notaNum = parseFloat(nota);
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      alert("A nota deve ser um número entre 0 e 10.");
      return false;
    }
  }
  if (generos === "") {
    alert("Por favor, preencha os gêneros da obra.");
    return false;
  }

  return true;
}

function atualizarLista() {
  obrasTabela.innerHTML = obras
    .map(
      (o, index) => `
    <tr>
      <td data-label="Nome">${o.nome}</td>
      <td data-label="Tipo">${o.tipo}</td>
      <td data-label="Poster">
        <img class="poster" src="${o.urlPoster}" alt="${o.nome}" />
      </td>
      <td data-label="Sinopse" class="sinopse">${o.sinopse}</td>
      <td data-label="Episodios">${o.episodios}</td>
      <td data-label="Nota">${o.nota}</td>
      <td data-label="Generos">
        <ul class="generos">${o.generos
          .map((g) => `<li>${g}</li>`)
          .join("")}</ul>
      </td>
      <td data-label="Ações">
        <button class="botao-editar" data-index="${index}">Editar</button>
        <button class="botao-remover" data-index="${index}">Remover</button>
      </td>
    </tr>
  `
    )
    .join("");
}

function cadastrar(event) {
  event.preventDefault();
  const idsCadastro = {
    nome: "nome",
    tipo: "tipo",
    poster: "poster",
    sinopse: "sinopse",
    nota: "nota",
    generos: "generos",
  };
  if (!validarFormulario(idsCadastro)) {
    return;
  }

  const tipo = tipoSelectCadastro.value;
  let episodios;
  if (tipo === "Filme") {
    episodios = "-";
  } else {
    episodios = document.getElementById("episodios").value;
  }

  const obra = {
    nome: formatarTitulo(document.getElementById("nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("poster").value,
    sinopse: document.getElementById("sinopse").value,
    episodios: episodios,
    nota: document.getElementById("nota").value,
    generos: document
      .getElementById("generos")
      .value.split(", ")
      .map((g) => {
        const generoLimpo = g.trim().toLowerCase();
        return generoLimpo.charAt(0).toUpperCase() + generoLimpo.slice(1);
      }),
  };

  obras.push(obra);
  atualizarLista();
  formCadastro.reset();
  containerEpisodiosCadastro.classList.add("escondido");
  document.getElementById("nome").focus();
}

function abrirModalEdicao(index) {
  const obra = obras[index];
  const containerEpisodiosEdicao = document.getElementById(
    "container-episodios-edicao"
  );

  document.getElementById("edit-nome").value = obra.nome;
  document.getElementById("edit-tipo").value = obra.tipo;
  document.getElementById("edit-poster").value = obra.urlPoster;
  document.getElementById("edit-sinopse").value = obra.sinopse;
  document.getElementById("edit-nota").value = obra.nota;
  document.getElementById("edit-generos").value = obra.generos.join(", ");

  if (obra.tipo === "Filme") {
    containerEpisodiosEdicao.classList.add("escondido");
  } else {
    containerEpisodiosEdicao.classList.remove("escondido");
    document.getElementById("edit-episodios").value = obra.episodios;
  }

  formEdicao.dataset.editingIndex = index;

  window.location.hash = "editModal";
}

function salvarEdicao(event) {
  event.preventDefault();
  const idsEdicao = {
    nome: "edit-nome",
    tipo: "edit-tipo",
    poster: "edit-poster",
    sinopse: "edit-sinopse",
    nota: "edit-nota",
    generos: "edit-generos",
  };
  if (!validarFormulario(idsEdicao)) {
    return;
  }

  const index = formEdicao.dataset.editingIndex;
  const tipo = document.getElementById("edit-tipo").value;
  let episodios;

  if (tipo === "Filme") {
    episodios = "-";
  } else {
    episodios = document.getElementById("edit-episodios").value;
  }

  const obraAtualizada = {
    nome: formatarTitulo(document.getElementById("edit-nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("edit-poster").value,
    sinopse: document.getElementById("edit-sinopse").value,
    episodios: episodios,
    nota: document.getElementById("edit-nota").value,
    generos: document
      .getElementById("edit-generos")
      .value.split(",")
      .map((g) => {
        const generoLimpo = g.trim().toLowerCase();
        return generoLimpo.charAt(0).toUpperCase() + generoLimpo.slice(1);
      }),
  };

  obras[index] = obraAtualizada;

  atualizarLista();

  window.location.hash = "";
}

tipoSelectCadastro.addEventListener("change", function () {
  const tipoSelecionado = this.value;
  if (tipoSelecionado === "Anime" || tipoSelecionado === "Série") {
    containerEpisodiosCadastro.classList.remove("escondido");
    containerEpisodiosCadastro.style.maxHeight =
      containerEpisodiosCadastro.scrollHeight + "px";
  } else {
    containerEpisodiosCadastro.classList.add("escondido");
    containerEpisodiosCadastro.style.maxHeight = null;
  }
});

formCadastro.addEventListener("submit", cadastrar);

obrasTabela.addEventListener("click", function (event) {
  if (event.target.classList.contains("botao-editar")) {
    const index = event.target.dataset.index;
    abrirModalEdicao(index);
  } else if (event.target.classList.contains("botao-remover")) {
    const index = event.target.dataset.index;
    const confirmar = confirm(
      `Tem certeza que deseja remover "${obras[index].nome}"?`
    );
    if (confirmar) {
      obras.splice(index, 1);
      atualizarLista();
    }
  }
});

formEdicao.addEventListener("submit", salvarEdicao);

atualizarLista();