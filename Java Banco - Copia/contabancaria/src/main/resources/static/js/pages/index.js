/**
 * @apiNote Função responsável por realizar o login no sistema
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
 */
async function listar() {
  await $.ajax({
    type: "POST",
    url: "/listarUsuario",
    dataType: "json",
    success: function (result) {
      visualizarDados(result);
    },
    error: function () {
      alert("ERRO!");
    },
  });
}

/**
 * @apiNote Função responsável por inicializar este arquivo
 * @returns
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
 */
jQuery(function () {
  listar();
});
