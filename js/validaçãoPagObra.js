function validarFormularioObra(ids) {
  const comentario = document.getElementById(ids.comentario).value.trim();
  const nota = document.getElementById(ids.nota).value;
  const status = document.getElementById(ids.status).value;
  const episodiosInput = document.getElementById(ids.episodios);
  const episodiosAssistidos = parseInt(episodiosInput.value, 10);
  const maxEpisodios = parseInt(episodiosInput.dataset.totalEpisodios, 10);

  if (comentario === "" || comentario.length < 10) {
    alert("Por favor, insira um comentário com ao menos 10 letras.");
    return false;
  }
  if (!nota) {
    alert("Por favor, escolha uma nota para a obra.");
    return false;
  }
  if (!status) {
    alert(
      "Por favor, determine qual status você se encontra em relação a obra."
    );
    return false;
  }
  if (
    episodiosInput.value !== "" &&
    (isNaN(episodiosAssistidos) ||
      episodiosAssistidos < 0 ||
      episodiosAssistidos > maxEpisodios)
  ) {
    alert(
      `O número de episódios assistidos deve ser entre 0 e ${maxEpisodios}.`
    );
    return false;
  }

  return true;
}

function processarObra(event) {
  event.preventDefault();

  const idsObra = {
    comentario: "comentario",
    nota: "nota",
    status: "status",
    episodios: "episodios",
  };

  if (!validarFormularioObra(idsObra)) {
    return;
  }

  alert("Obra cadastrada com sucesso!");
  event.target.submit();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", processarObra);
});
