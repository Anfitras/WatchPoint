function carregarAvaliacoes() {
  try {
    return JSON.parse(localStorage.getItem("wpAvaliacoes")) || [];
  } catch (e) {
    return [];
  }
}

function salvarAvaliacoes(arr) {
  try {
    localStorage.setItem("wpAvaliacoes", JSON.stringify(arr));
  } catch (e) {}
}

function carregarUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("wpUsers")) || [];
  } catch (e) {
    return [];
  }
}

function carregarObras() {
  try {
    return JSON.parse(localStorage.getItem("obras")) || [];
  } catch (e) {
    return [];
  }
}

function montarTabela() {
  var avaliacoes = carregarAvaliacoes();
  var usuarios = carregarUsuarios();
  var obras = carregarObras();
  var tbody = document.getElementById("tbody-avaliacoes");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!avaliacoes || avaliacoes.length === 0) {
    var tr0 = document.createElement("tr");
    var td0 = document.createElement("td");
    td0.colSpan = 4;
    td0.textContent =
      "Nenhuma avaliação encontrada. Use a página de teste para adicionar.";
    tr0.appendChild(td0);
    tbody.appendChild(tr0);
    return;
  }

  for (var i = 0; i < avaliacoes.length; i++) {
    var av = avaliacoes[i];
    var tr = document.createElement("tr");

    var tdUsuario = document.createElement("td");
    var usuario = null;
    for (var u = 0; u < usuarios.length; u++) {
      if (
        usuarios[u].id === av.usuarioId ||
        usuarios[u].email === av.usuarioEmail
      ) {
        usuario = usuarios[u];
        break;
      }
    }
    tdUsuario.textContent = usuario
      ? usuario.nickname || usuario.email
      : av.usuarioEmail || "Usuário desconhecido";

    var tdObra = document.createElement("td");
    tdObra.textContent = av.obraNome || av.obra || "Obra desconhecida";

    var tdPoster = document.createElement("td");
    var img = document.createElement("img");
    img.className = "poster";
    img.alt = av.obraNome || "Poster";
    img.style.maxWidth = "80px";
    img.style.maxHeight = "110px";
    var src = "";
    if (av.obraPoster) src = av.obraPoster;
    else if (obras && obras[av.obraIndex] && obras[av.obraIndex].urlPoster)
      src = obras[av.obraIndex].urlPoster;
    img.src = src;
    tdPoster.appendChild(img);

    var tdNota = document.createElement("td");
    tdNota.textContent = av.nota;

    var tdAcoes = document.createElement("td");
    // Edit rating button (edits the evaluation)
    var btnEditar = document.createElement("button");
    btnEditar.className = "botao-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar Nota";
    btnEditar.dataset.avIndex = i;
    // Delete evaluation button (removes only this evaluation)
    var btnRemoverAvaliacao = document.createElement("button");
    btnRemoverAvaliacao.className = "botao-remover-avaliacao";
    btnRemoverAvaliacao.type = "button";
    btnRemoverAvaliacao.textContent = "Excluir Avaliação";
    btnRemoverAvaliacao.dataset.avIndex = i;

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnRemoverAvaliacao);

    tr.appendChild(tdUsuario);
    tr.appendChild(tdObra);
    tr.appendChild(tdPoster);
    tr.appendChild(tdNota);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  }

  // Event delegation for edit/delete buttons
  tbody.addEventListener("click", function (e) {
    var target = e.target;
    // Edit evaluation note
    if (target.classList && target.classList.contains("botao-editar")) {
      var avIndex = parseInt(target.dataset.avIndex, 10);
      if (isNaN(avIndex)) return;
      var avaliacoesLocal = carregarAvaliacoes();
      var avObj = avaliacoesLocal[avIndex];
      if (!avObj) {
        alert("Avaliação não encontrada.");
        return;
      }
      var novo = prompt("Editar nota (1-10):", avObj.nota || "");
      if (novo === null) return; // cancel
      novo = novo.trim();
      if (novo === "") {
        alert("Nota não pode ficar vazia.");
        return;
      }
      var nnum = parseFloat(novo);
      if (isNaN(nnum) || nnum < 1 || nnum > 10) {
        alert("Informe uma nota válida entre 1 e 10.");
        return;
      }
      avObj.nota = nnum;
      avaliacoesLocal[avIndex] = avObj;
      salvarAvaliacoes(avaliacoesLocal);
      montarTabela();
      return;
    }

    // Remove only this evaluation
    if (
      target.classList &&
      target.classList.contains("botao-remover-avaliacao")
    ) {
      var avIndex2 = parseInt(target.dataset.avIndex, 10);
      if (isNaN(avIndex2)) return;
      var avaliacoesLocal2 = carregarAvaliacoes();
      if (!avaliacoesLocal2[avIndex2]) {
        alert("Avaliação não encontrada.");
        return;
      }
      var confirmarEval = confirm(
        "Tem certeza que deseja excluir esta avaliação?"
      );
      if (!confirmarEval) return;
      avaliacoesLocal2.splice(avIndex2, 1);
      salvarAvaliacoes(avaliacoesLocal2);
      montarTabela();
      return;
    }

    // (obra deletion removed — biblioteca only manipulates evaluations now)
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", montarTabela);
} else {
  montarTabela();
}
