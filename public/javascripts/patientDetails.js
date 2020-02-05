$(document).ready(function() {
  // Aplica a máscara de CPF para todos os elementos com a classe "cpfMask"
  $('.telMask').each(function () {
      $(this).text().length === 10 ? $(this).mask('(00) 0000 0000') : $(this).mask('(00) 00000 0000');
  });
});


