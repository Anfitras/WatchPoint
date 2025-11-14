function lerStorage(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch (e) {
    return [];
  }
}

function gravarStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (e) {}
}

function gravarUsuarios(arr) {
  gravarStorage("wpUsers", arr);
  try {
    localStorage.setItem("usuarios", JSON.stringify(arr));
  } catch (e) {}
}

function carregarUsuarios() {
  return lerStorage("wpUsers");
}

function carregarAvaliacoes() {
  return lerStorage("wpAvaliacoes");
}

function salvarAvaliacoes(arr) {
  gravarStorage("wpAvaliacoes", arr);
}

function carregarObras() {
  return lerStorage("obras");
}

function preencherSelectUsuarios() {
  var usuarios = carregarUsuarios();
  var sel = document.getElementById("selectUsuario");
  if (!sel) return;
  sel.innerHTML = "";
  if (!usuarios || usuarios.length === 0) {
    var opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = "Nenhuma usuário cadastrado";
    sel.appendChild(opt0);
    return;
  }
  var optEmpty = document.createElement("option");
  optEmpty.value = "";
  optEmpty.textContent = "-- Escolha um usuário --";
  sel.appendChild(optEmpty);
  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    var opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent =
      (u.nickname || u.email || "Usuário") + " (" + (u.email || "") + ")";
    sel.appendChild(opt);
  }
}

function editarUsuario() {
  var sel = document.getElementById("selectUsuario");
  if (!sel) return;
  var val = sel.value;
  if (!val) {
    alert("Selecione um usuário para editar.");
    return;
  }
  var usuarioId = parseInt(val, 10);
  var usuarios = carregarUsuarios();
  var idx = -1;
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === usuarioId) {
      idx = i;
      break;
    }
  }
  if (idx === -1) {
    alert("Usuário não encontrado.");
    return;
  }
  var u = usuarios[idx];
  var atualNick = u.nickname || u.nome || "";
  var novoNick = prompt(
    "Editar nickname (deixe em branco para remover):",
    atualNick
  );
  if (novoNick === null) return; // cancel
  novoNick = (novoNick || "").trim();
  if (novoNick) {
    u.nickname = novoNick;
  } else {
    if (u.hasOwnProperty("nickname")) delete u.nickname;
  }

  var atualEmail = u.email || "";
  var novoEmail = prompt("Editar e-mail:", atualEmail);
  if (novoEmail === null) return; // cancel
  novoEmail = (novoEmail || "").trim();
  if (!novoEmail) {
    alert("E-mail não pode ficar vazio.");
    return;
  }
  u.email = novoEmail;

  usuarios[idx] = u;
  gravarUsuarios(usuarios);
  preencherSelectUsuarios();
  alert("Usuário atualizado.");
}

function removerUsuario() {
  var sel = document.getElementById("selectUsuario");
  if (!sel) return;
  var val = sel.value;
  if (!val) {
    alert("Selecione um usuário para remover.");
    return;
  }
  var usuarioId = parseInt(val, 10);
  var usuarios = carregarUsuarios();
  var idx = -1;
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === usuarioId) {
      idx = i;
      break;
    }
  }
  if (idx === -1) {
    alert("Usuário não encontrado.");
    return;
  }
  var confirmar = confirm(
    "Tem certeza que deseja excluir o usuário '" +
      (usuarios[idx].nickname || usuarios[idx].email || "") +
      "'?\nEsta ação não pode ser desfeita."
  );
  if (!confirmar) return;
  usuarios.splice(idx, 1);
  gravarUsuarios(usuarios);
  preencherSelectUsuarios();
  alert("Usuário removido.");
}

function preencherSelectObras() {
  var obras = carregarObras();
  var sel = document.getElementById("selectObra");
  if (!sel) return;
  sel.innerHTML = "";
  if (!obras || obras.length === 0) {
    var opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = "Nenhuma obra cadastrada";
    sel.appendChild(opt0);
    return;
  }
  for (var j = 0; j < obras.length; j++) {
    var o = obras[j];
    var opt = document.createElement("option");
    opt.value = j;
    opt.textContent = o.nome + " (" + (o.tipo || "") + ")";
    sel.appendChild(opt);
  }
}

function tratarEnvioAvaliacao(evt) {
  if (evt && evt.preventDefault) evt.preventDefault();
  var usuarios = carregarUsuarios();
  var usuarioId = parseInt(document.getElementById("selectUsuario").value, 10);
  var usuario = null;
  for (var k = 0; k < usuarios.length; k++) {
    if (usuarios[k].id === usuarioId) {
      usuario = usuarios[k];
      break;
    }
  }
  if (!usuario) {
    alert("Selecione um usuário válido.");
    return;
  }

  var obras = carregarObras();
  var obraIndex = parseInt(document.getElementById("selectObra").value, 10);
  var obraObj = obras[obraIndex];
  if (!obraObj) {
    alert("Selecione uma obra válida.");
    return;
  }

  var notaEl = document.getElementById("nota");
  var nota = notaEl ? notaEl.value : "";
  if (!nota) {
    alert("Informe uma nota entre 1 e 10.");
    return;
  }

  var avaliacoes = carregarAvaliacoes();
  var existente = null;
  for (var m = 0; m < avaliacoes.length; m++) {
    var a = avaliacoes[m];
    if (
      (a.usuarioId === usuarioId || a.usuarioEmail === usuario.email) &&
      a.obraIndex === obraIndex
    ) {
      existente = a;
      break;
    }
  }
  if (existente) {
    existente.nota = nota;
  } else {
    avaliacoes.push({
      id: avaliacoes.length + 1,
      obraIndex: obraIndex,
      obraNome: obraObj.nome,
      obraTipo: obraObj.tipo,
      usuarioId: usuarioId,
      usuarioEmail: usuario.email,
      nota: nota,
    });
  }

  salvarAvaliacoes(avaliacoes);
  alert("Avaliação cadastrada!");
  var form = document.getElementById("formAvaliacao");
  if (form && form.reset) form.reset();
}

function initCadastroAvaliacao() {
  var form = document.getElementById("formAvaliacao");
  if (form) form.addEventListener("submit", tratarEnvioAvaliacao);
  preencherSelectUsuarios();
  preencherSelectObras();
  var btnEdit = document.getElementById("btnEditarUsuario");
  if (btnEdit) btnEdit.addEventListener("click", editarUsuario);
  var btnRem = document.getElementById("btnRemoverUsuario");
  if (btnRem) btnRem.addEventListener("click", removerUsuario);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCadastroAvaliacao);
} else {
  initCadastroAvaliacao();
}
