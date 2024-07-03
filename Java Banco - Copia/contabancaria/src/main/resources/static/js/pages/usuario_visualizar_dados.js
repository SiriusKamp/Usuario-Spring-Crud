// Função principal para visualizar dados na tabela de usuários
function visualizarDados(lista) {
  let html = ""; // Variável para armazenar o HTML da tabela

  // Construção do HTML da tabela de usuários
  html += '<div class="row bg-info py-2 rounded-top-3 mt-1">';
  html +=
    '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left text-uppercase fw-bold titulo-coluna-medio">Nome</div>';
  html +=
    '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left text-uppercase fw-bold titulo-coluna-medio">Sexo</div>';
  html +=
    '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left text-uppercase fw-bold titulo-coluna-medio">E-mail</div>';
  html +=
    '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left text-uppercase fw-bold titulo-coluna-medio">Grupo</div>';
  html +=
    '<div class="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center text-uppercase fw-bold titulo-coluna-medio">Editar</div>';
  html +=
    '<div class="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center text-uppercase fw-bold titulo-coluna-medio">Excluir</div>';
  html += "</div>";

  html += '<div class="row">';
  html += '<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">';

  // Loop para construir as linhas da tabela com os dados dos usuários
  lista.forEach(function (usuario, indice) {
    let cor = indice % 2 === 0 ? "row-background-par" : "row-background-impar";
    html += '<div class="row ' + cor + '" id="id_row_' + indice + '">';
    html +=
      '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left"><span class="align-middle titulo-coluna-medio text-uppercase">' +
      (usuario.nome ? usuario.nome : "") +
      "</span></div>";
    html +=
      '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-left"><span class="align-middle titulo-coluna-medio">' +
      (usuario.sexo ? usuario.sexo : "") +
      "</span></div>";
    html +=
      '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-left"><span class="align-middle titulo-coluna-medio">' +
      (usuario.email ? usuario.email : "") +
      "</span></div>";
    html +=
      '<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 text-left"><span class="align-middle titulo-coluna-medio">' +
      (usuario.grupo ? usuario.grupo : "") +
      "</span></div>";
    html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">';
    html +=
      '<button type="button" class="btn objeto-ativo-inativo btn-editar p-0" id="editar-' +
      indice +
      '">';
    html += '<i class="fa fa-edit true btn-icone-edit"></i>';
    html += "</button>";
    html += "</div>";
    html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">';
    html +=
      '<button type="button" class="btn objeto-ativo-inativo btn-excluir p-0" id="excluir-' +
      indice +
      '">';
    html += '<i class="fa fa-trash true btn-icone-del"></i>';
    html += "</button>";
    html += "</div>";
    html += "</div>";
  });

  html += "</div>";
  html += "</div>";

  // Inserir HTML construído na div de conteúdo
  $("#id_div_conteudo").html(html);

  // Adicionar evento de clique nos botões de excluir usando delegação de eventos
  $(".btn-excluir").on("click", function () {
    let objeto = $(this);
    if (!objeto.hasClass("disabled")) {
      // Verifica se o botão não está desativado
      objeto.addClass("disabled"); // Desabilita o botão para evitar cliques repetidos
      console.log("Clique no botão excluir detectado");
      let indice = objeto.attr("id").split("-")[1]; // Obtém o índice do usuário a partir do ID do botão
      let idUsuario = lista[indice].id; // Obtém o ID do usuário

      console.log("ID do usuário para exclusão:", idUsuario);

      // Chama a função para excluir o usuário
      excluirUsuario(idUsuario, objeto);
    }
  });

  // Adicionar evento de clique nos botões de editar usando delegação de eventos
  $(".btn-editar").on("click", function () {
    console.log("Clique no botão editar detectado");
    let objeto = $(this);
    let indice = objeto.attr("id").split("-")[1]; // Obtém o índice do usuário a partir do ID do botão
    let idUsuario = lista[indice].id; // Obtém o ID do usuário

    console.log("ID do usuário para edição:", idUsuario);

    // Salva o ID do usuário na sessão
    sessionStorage.setItem("idUsuario", idUsuario);

    // Redireciona para a página de edição
    window.location.href = "/pages/usuario_form.html";
  });
}

// Função para excluir o usuário
async function excluirUsuario(idUsuario, botao) {
  console.log("Iniciando exclusão do usuário com ID:", idUsuario);
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    await $.ajax({
      type: "DELETE",
      url: "/usuario/" + idUsuario,
      success: function (response) {
        console.log("Usuário excluído com sucesso:", response);
        alert(response);
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        console.error("Erro ao excluir usuário:", xhr, status, error);
        alert("Erro ao excluir usuário!");
      },
      complete: function () {
        botao.removeClass("disabled"); // Habilita o botão novamente após a conclusão
      },
    });
  } else {
    console.log("Exclusão cancelada pelo usuário");
    botao.removeClass("disabled"); // Habilita o botão novamente se a exclusão for cancelada
  }
}

// Função para cadastrar usuário
async function cadastrarUsuario(event) {
  // Prevenindo o comportamento padrão do formulário
  event.preventDefault();

  var nome = $("#nome").val();
  var sexo = $("#sexo").val();
  var email = $("#email").val();
  var senha = $("#senha").val();

  var usuario = {
    nome: nome,
    sexo: sexo,
    email: email,
    senha: senha,
  };

  console.log(usuario); // Para depuração

  await $.ajax({
    type: "POST",
    url: "/cadastro",
    contentType: "application/json",
    data: JSON.stringify(usuario),
    success: function (response) {
      alert(response); // Exibe mensagem de sucesso
      listar(); // Atualiza a lista de usuários após o cadastro
      location.href = "/pages/index.html";
    },
    error: function () {
      alert("Erro ao cadastrar usuário!");
    },
  });
}

// Função para inicializar a página
$(document).ready(function () {
  listar();
});
