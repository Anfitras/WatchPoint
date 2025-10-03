function validarEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validarFormularioCadastro(ids) {
  const email = document.getElementById(ids.email).value.trim();
  const senha = document.getElementById(ids.senha).value;
  const confirmarSenha = document.getElementById(ids.confirmar).value;

  if (email === "" || !validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
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

  const idsCadastro = {
    email: "email",
    senha: "senha",
    confirmar: "confirmar",
  };

  if (!validarFormularioCadastro(idsCadastro)) {
    return;
  }

  alert("Cadastro bem-sucedido!");
  event.target.submit();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", processarCadastro);
});
