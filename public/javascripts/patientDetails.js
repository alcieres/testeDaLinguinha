$(document).ready(function() {
  //Atualizar a página quando acessada a partir dos botões voltar e avançar
  // $(window).on('popstate', function() {
  //   location.reload(true);
  // });

  $('#deleteBtn').click(function() {
    alert("Esse botão vai APAGAR o paciente");
  });

  // $('#editBtn').click(function() {
  //   alert("Esse botão vai EDITAR o paciente");
  // });

  $('#backBtn').click(function() {
    window.history.back();
  });

  // $('#newTestBtn').click(function() {
  //   alert("Esse botão vai CRIAR NOVO TESTE para o paciente");
  // });
});


