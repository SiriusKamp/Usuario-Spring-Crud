$(document).ready(function () {
  // Função para validar e cadastrar usuário
  function cadastrarUsuario(event) {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário

    var nome = $("#nome").val().trim();
    var sexo = $("#sexo").val();
    var email = $("#email").val().trim();
    var senha = $("#senha").val();

    // Validação adicional
    if (nome === "" || sexo === "" || email === "" || senha.length < 5) {
      alert(
        "Todos os campos são obrigatórios e a senha deve ter pelo menos 5 caracteres."
      );
      return;
    }

    var usuario = {
      nome: nome,
      sexo: sexo,
      email: email,
      senha: senha,
    };

    $.ajax({
      type: "POST",
      url: "/cadastro",
      contentType: "application/json",
      data: JSON.stringify(usuario),
      success: function (response) {
        alert(response);
        window.location.href = "/";
      },
      error: function () {
        alert("Erro ao cadastrar usuário!");
      },
    });
  }

  // Associa a função de cadastro ao evento de submissão do formulário
  $("#formCadastroUsuario").submit(function (event) {
    cadastrarUsuario(event);
  });
});
