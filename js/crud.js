const obras = [
  {
    nome: "Breaking Bad",
    tipo: "Série",
    urlPoster: "banners/series/breaking_bad.jpeg",
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
    urlPoster: "banners/animes/attack_on_titan.jpeg",
    sinopse:
      "Depois que sua cidade natal é destruída, o jovem Eren Jaeger jura limpar a Terra dos gigantes Titãs humanoides que levaram a humanidade à beira da extinção.",
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
const tipoSelectCadastro = document.getElementById("tipo");

function formatarTitulo(titulo) {
  if (!titulo) return "";

  const palavras = titulo.toLowerCase().split(" ");
  const palavrasFormatadas = [];

  for (let i = 0; i < palavras.length; i++) {
    const palavra = palavras[i];
    const primeiraLetra = palavra.charAt(0).toUpperCase();
    const restoDaPalavra = palavra.slice(1);
    palavrasFormatadas.push(primeiraLetra + restoDaPalavra);
  }

  return palavrasFormatadas.join(" ");
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
  let htmlDaTabela = "";

  for (let i = 0; i < obras.length; i++) {
    const obra = obras[i];

    let generosHtml = "";
    for (let j = 0; j < obra.generos.length; j++) {
      generosHtml += `<li>${obra.generos[j]}</li>`;
    }

    htmlDaTabela += `
      <tr>
        <td>${obra.nome}</td>
        <td>${obra.tipo}</td>
        <td>
          <img class="poster" src="${obra.urlPoster}" alt="${obra.nome}" />
        </td>
        <td class="sinopse">${obra.sinopse}</td>
        <td>${obra.episodios}</td>
        <td>${obra.nota}</td>
        <td>
          <ul class="generos">${generosHtml}</ul>
        </td>
        <td>
          <button class="botao-editar" data-index="${i}">Editar</button>
          <button class="botao-remover" data-index="${i}">Remover</button>
        </td>
      </tr>
    `;
  }

  obrasTabela.innerHTML = htmlDaTabela;
}

function processarGeneros(textoGeneros) {
  const generosArray = textoGeneros.split(",");
  const generosFormatados = [];

  for (let i = 0; i < generosArray.length; i++) {
    const generoLimpo = generosArray[i].trim().toLowerCase();
    const primeiraLetra = generoLimpo.charAt(0).toUpperCase();
    const restoDoGenero = generoLimpo.slice(1);
    generosFormatados.push(primeiraLetra + restoDoGenero);
  }
  return generosFormatados;
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
    // para filmes, permitir a duração livre (texto), se informado
    episodios = document.getElementById("episodios").value.trim() || "-";
  } else {
    episodios = document.getElementById("episodios").value;
  }

  const generosTexto = document.getElementById("generos").value;

  const obra = {
    nome: formatarTitulo(document.getElementById("nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("poster").value,
    sinopse: document.getElementById("sinopse").value,
    episodios: episodios,
    nota: document.getElementById("nota").value,
    generos: processarGeneros(generosTexto),
  };

  obras.push(obra);
  atualizarLista();
  formCadastro.reset();
  document.getElementById("nome").focus();
}

function abrirModalEdicao(index) {
  const obra = obras[index];

  document.getElementById("edit-nome").value = obra.nome;
  document.getElementById("edit-tipo").value = obra.tipo;
  document.getElementById("edit-poster").value = obra.urlPoster;
  document.getElementById("edit-sinopse").value = obra.sinopse;
  document.getElementById("edit-nota").value = obra.nota;
  document.getElementById("edit-generos").value = obra.generos.join(", ");
  // preencher o campo de episódios/duração com o valor salvo
  const editEpisodiosInput = document.getElementById("edit-episodios");
  if (editEpisodiosInput) {
    editEpisodiosInput.value =
      obra.episodios === undefined ? "" : obra.episodios;
  }

  formEdicao.dataset.editingIndex = index;
  // Ajusta o campo de episódios/duração no modal conforme o tipo atual
  atualizarCampoDinamicoEdicao();
  window.location.hash = "editModal";
}

// Atualiza o campo de episódios/duração dentro do modal de edição
function atualizarCampoDinamicoEdicao() {
  const tipoSelect = document.getElementById("edit-tipo");
  const containerEpisodios = document.getElementById(
    "container-episodios-edicao"
  );
  const label = document.querySelector('label[for="edit-episodios"]');
  const input = document.getElementById("edit-episodios");

  if (!tipoSelect || !containerEpisodios || !label || !input) return;

  if (tipoSelect.value === "Filme") {
    label.textContent = "Duração do Filme:";
    input.type = "text";
    input.placeholder = "Ex: 2h 15m";
  } else {
    label.textContent = "Quantidade de Episódios:";
    input.type = "number";
    input.placeholder = "Ex: 24";
  }
}

// Escuta mudanças no select do modal para atualizar dinamicamente
const editTipoSelect = document.getElementById("edit-tipo");
if (editTipoSelect) {
  editTipoSelect.addEventListener("change", atualizarCampoDinamicoEdicao);
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
    // para filmes no modal de edição, ler a duração se fornecida
    episodios = document.getElementById("edit-episodios").value.trim() || "-";
  } else {
    episodios = document.getElementById("edit-episodios").value;
  }

  const generosTexto = document.getElementById("edit-generos").value;

  const obraAtualizada = {
    nome: formatarTitulo(document.getElementById("edit-nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("edit-poster").value,
    sinopse: document.getElementById("edit-sinopse").value,
    episodios: episodios,
    nota: document.getElementById("edit-nota").value,
    generos: processarGeneros(generosTexto),
  };

  obras[index] = obraAtualizada;
  atualizarLista();
  // ajustar visibilidade/placeholder do campo após reset
  if (typeof atualizarCampoDinamico === "function") atualizarCampoDinamico();
  window.location.hash = "";
}

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
