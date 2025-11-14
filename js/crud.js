var obras = [];

var formCadastro = document.getElementById("form-cadastro");
var formEdicao = document.getElementById("form-edicao");
var obrasTabela = document.getElementById("obrasTabela");
var tipoSelectCadastro = document.getElementById("tipo");

function formatarTitulo(titulo) {
  if (!titulo) return "";

  var palavras = titulo.toLowerCase().split(" ");
  var palavrasFormatadas = [];

  for (var i = 0; i < palavras.length; i++) {
    var palavra = palavras[i];
    var primeiraLetra = palavra.charAt(0).toUpperCase();
    var restoDaPalavra = palavra.slice(1);
    palavrasFormatadas.push(primeiraLetra + restoDaPalavra);
  }

  return palavrasFormatadas.join(" ");
}

function salvarNoStorage() {
  try {
    localStorage.setItem("obras", JSON.stringify(obras));
  } catch (e) {}
}

function carregarDoStorage() {
  try {
    var raw = localStorage.getItem("obras");
    if (raw) {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        obras = parsed;
      }
    }
  } catch (e) {}
}

function validarFormulario(ids) {
  var nome = document.getElementById(ids.nome).value.trim();
  var tipo = document.getElementById(ids.tipo).value;
  var urlPoster = document.getElementById(ids.poster).value.trim();
  var sinopse = document.getElementById(ids.sinopse).value.trim();
  var nota = document.getElementById(ids.nota).value.trim();
  var generos = document.getElementById(ids.generos).value.trim();

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
  function isValidPosterPath(p) {
    if (!p) return false;
    var s = p.trim().toLowerCase();
    if (s.length < 3) return false;
    if (s.indexOf("http://") === 0 || s.indexOf("https://") === 0) return true;
    var lastDot = s.lastIndexOf(".");
    if (lastDot !== -1) {
      var ext = s.substring(lastDot);
      var exts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
      for (var ii = 0; ii < exts.length; ii++) {
        if (ext === exts[ii]) return true;
      }
    }
    if (s.indexOf("/") !== -1) return true;
    return false;
  }

  if (!isValidPosterPath(urlPoster)) {
    alert(
      "Por favor, insira uma URL válida para o pôster (ex: https://... ou banners/arquivo.jpg)."
    );
    return false;
  }
  if (sinopse === "" || sinopse.length < 10) {
    alert("Por favor, preencha a sinopse da obra com ao menos 10 caracteres.");
    return false;
  }
  if (nota !== "") {
    var notaNum = parseFloat(nota);
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
  var htmlDaTabela = "";

  for (var i = 0; i < obras.length; i++) {
    var obra = obras[i];

    var generosHtml = "";
    for (var j = 0; j < (obra.generos ? obra.generos.length : 0); j++) {
      generosHtml += "<li>" + obra.generos[j] + "</li>";
    }

    htmlDaTabela +=
      "<tr>" +
      "<td>" +
      obra.nome +
      "</td>" +
      "<td>" +
      obra.tipo +
      "</td>" +
      '<td><img class="poster" src="' +
      obra.urlPoster +
      '" alt="' +
      obra.nome +
      '" /></td>' +
      '<td class="sinopse">' +
      obra.sinopse +
      "</td>" +
      "<td>" +
      (obra.episodios || "") +
      "</td>" +
      "<td>" +
      (obra.nota || "") +
      "</td>" +
      '<td><ul class="generos">' +
      generosHtml +
      "</ul></td>" +
      '<td><button class="botao-editar" data-index="' +
      i +
      '">Editar</button> <button class="botao-remover" data-index="' +
      i +
      '">Remover</button></td>' +
      "</tr>";
  }

  obrasTabela.innerHTML = htmlDaTabela;
}

function processarGeneros(textoGeneros) {
  var generosArray = textoGeneros.split(",");
  var generosFormatados = [];

  for (var i = 0; i < generosArray.length; i++) {
    var generoLimpo = generosArray[i].trim().toLowerCase();
    var primeiraLetra = generoLimpo.charAt(0).toUpperCase();
    var restoDoGenero = generoLimpo.slice(1);
    generosFormatados.push(primeiraLetra + restoDoGenero);
  }
  return generosFormatados;
}

function cadastrar(event) {
  event.preventDefault();
  var idsCadastro = {
    nome: "nome",
    tipo: "tipo",
    poster: "poster",
    sinopse: "sinopse",
    nota: "nota",
    generos: "generos",
  };
  if (!validarFormulario(idsCadastro)) return;

  var tipo = tipoSelectCadastro.value;
  var episodios;
  if (tipo === "Filme") {
    episodios = document.getElementById("episodios").value.trim() || "-";
  } else {
    episodios = document.getElementById("episodios").value;
  }

  var generosTexto = document.getElementById("generos").value;

  var obra = {
    nome: formatarTitulo(document.getElementById("nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("poster").value,
    sinopse: document.getElementById("sinopse").value,
    episodios: episodios,
    nota: document.getElementById("nota").value,
    generos: processarGeneros(generosTexto),
  };

  obras.push(obra);
  salvarNoStorage();
  atualizarLista();
  if (formCadastro && formCadastro.reset) formCadastro.reset();
  var nomeEl = document.getElementById("nome");
  if (nomeEl) nomeEl.focus();
}

function abrirModalEdicao(index) {
  var obra = obras[index];

  var en = document.getElementById("edit-nome");
  if (en) en.value = obra.nome;
  var et = document.getElementById("edit-tipo");
  if (et) et.value = obra.tipo;
  var ep = document.getElementById("edit-poster");
  if (ep) ep.value = obra.urlPoster;
  var es = document.getElementById("edit-sinopse");
  if (es) es.value = obra.sinopse;
  var enota = document.getElementById("edit-nota");
  if (enota) enota.value = obra.nota;
  var eg = document.getElementById("edit-generos");
  if (eg) eg.value = (obra.generos || []).join(", ");
  var editEpisodiosInput = document.getElementById("edit-episodios");
  if (editEpisodiosInput) {
    editEpisodiosInput.value =
      obra.episodios === undefined ? "" : obra.episodios;
  }

  formEdicao.dataset.editingIndex = index;
  atualizarCampoDinamicoEdicao();
  window.location.hash = "editModal";
}

function atualizarCampoDinamico() {
  var tipoSelect = document.getElementById("tipo");
  var containerEpisodios = document.getElementById("container-episodios");
  var label = null;
  var labels = document.getElementsByTagName("label");
  for (var k = 0; k < labels.length; k++) {
    if (labels[k].htmlFor === "episodios") {
      label = labels[k];
      break;
    }
  }
  var input = document.getElementById("episodios");
  if (!tipoSelect || !label || !input || !containerEpisodios) return;
  if (tipoSelect.value) {
    containerEpisodios.style.display = "";
  } else {
    containerEpisodios.style.display = "none";
  }
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

function atualizarCampoDinamicoEdicao() {
  var tipoSelect = document.getElementById("edit-tipo");
  var containerEpisodios = document.getElementById(
    "container-episodios-edicao"
  );
  var label = null;
  var labels = document.getElementsByTagName("label");
  for (var k = 0; k < labels.length; k++) {
    if (labels[k].htmlFor === "edit-episodios") {
      label = labels[k];
      break;
    }
  }
  var input = document.getElementById("edit-episodios");
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

var editTipoSelect = document.getElementById("edit-tipo");
if (editTipoSelect) {
  editTipoSelect.addEventListener("change", atualizarCampoDinamicoEdicao);
}

function salvarEdicao(event) {
  event.preventDefault();
  var idsEdicao = {
    nome: "edit-nome",
    tipo: "edit-tipo",
    poster: "edit-poster",
    sinopse: "edit-sinopse",
    nota: "edit-nota",
    generos: "edit-generos",
  };
  if (!validarFormulario(idsEdicao)) return;

  var index = formEdicao.dataset.editingIndex;
  var tipo = document.getElementById("edit-tipo").value;
  var episodios;

  if (tipo === "Filme") {
    episodios = document.getElementById("edit-episodios").value.trim() || "-";
  } else {
    episodios = document.getElementById("edit-episodios").value;
  }

  var generosTexto = document.getElementById("edit-generos").value;

  var obraAtualizada = {
    nome: formatarTitulo(document.getElementById("edit-nome").value),
    tipo: tipo,
    urlPoster: document.getElementById("edit-poster").value,
    sinopse: document.getElementById("edit-sinopse").value,
    episodios: episodios,
    nota: document.getElementById("edit-nota").value,
    generos: processarGeneros(generosTexto),
  };

  obras[index] = obraAtualizada;
  salvarNoStorage();
  atualizarLista();
  if (typeof atualizarCampoDinamico === "function") atualizarCampoDinamico();
  window.location.hash = "";
}

if (formCadastro) formCadastro.addEventListener("submit", cadastrar);

if (obrasTabela) {
  obrasTabela.addEventListener("click", function (event) {
    if (event.target.classList.contains("botao-editar")) {
      var index = event.target.dataset.index;
      abrirModalEdicao(index);
    } else if (event.target.classList.contains("botao-remover")) {
      var index = event.target.dataset.index;
      var confirmar = confirm(
        'Tem certeza que deseja remover "' + obras[index].nome + '"?'
      );
      if (confirmar) {
        obras.splice(index, 1);
        salvarNoStorage();
        atualizarLista();
      }
    }
  });
}

if (formEdicao) formEdicao.addEventListener("submit", salvarEdicao);
carregarDoStorage();
atualizarLista();

document.addEventListener("DOMContentLoaded", function () {
  atualizarCampoDinamico();
  var tipoSelect = document.getElementById("tipo");
  if (tipoSelect) {
    tipoSelect.addEventListener("change", atualizarCampoDinamico);
  }
});
