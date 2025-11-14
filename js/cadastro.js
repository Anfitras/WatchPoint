function validarEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validarFormularioCadastro(ids) {
  var email = document.getElementById(ids.email).value.trim();
  var senha = document.getElementById(ids.senha).value;
  var confirmarSenha = document.getElementById(ids.confirmar).value;
  var nickname = document.getElementById("nickname")
    ? document.getElementById("nickname").value.trim()
    : "";

  if (email === "" || !validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }

  if (nickname === "" || nickname.length < 3) {
    alert("Por favor, insira um nickname com pelo menos 3 caracteres.");
    return false;
  }

  if (senha === "" || senha.length < 6 || senha.length > 8) {
    alert("Senha inválida. A senha deve conter entre 6 e 8 caracteres.");
    return false;
  }

  if (confirmarSenha === "" || confirmarSenha !== senha) {
    alert("Confirmação Inválida! As senhas não correspondem.");
    return false;
  }

  return true;
}

function processarCadastro(event) {
  event.preventDefault();

  var idsCadastro = { email: "email", senha: "senha", confirmar: "confirmar" };

  if (!validarFormularioCadastro(idsCadastro)) return;

  var nickname = document.getElementById("nickname").value.trim();
  var email = document.getElementById(idsCadastro.email).value.trim();
  var senha = document.getElementById(idsCadastro.senha).value;

  var usuarios = JSON.parse(localStorage.getItem("wpUsers")) || [];

  for (var i = 0; i < usuarios.length; i++) {
    if (
      usuarios[i].email &&
      usuarios[i].email.toLowerCase() === email.toLowerCase()
    ) {
      alert("Já existe um usuário cadastrado com esse e-mail.");
      return;
    }
  }

  var novoUsuario = {
    id: usuarios.length + 1,
    nickname: nickname,
    email: email,
    senha: senha,
  };
  usuarios.push(novoUsuario);
  localStorage.setItem("wpUsers", JSON.stringify(usuarios));

  alert("Usuário cadastrado!");
  event.target.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formulario");
  if (form) form.addEventListener("submit", processarCadastro);
});
