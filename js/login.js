function validarEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validarFormularioLogin(ids) {
  const email = document.getElementById(ids.email).value.trim();
  const senha = document.getElementById(ids.senha).value;

  if (email === "" || !validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }

  if (senha === "" || senha.length < 6 || senha.length > 8) {
    alert("Senha inválida. A senha deve conter entre 6 e 8 caracteres.");
    return false;
  }

  return true;
}

function processarLogin(event) {
  event.preventDefault();

  const idsLogin = {
    email: "email",
    senha: "senha",
  };

  if (!validarFormularioLogin(idsLogin)) {
    return;
  }

  alert("Login bem-sucedido!");
  event.target.submit();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", processarLogin);
});
