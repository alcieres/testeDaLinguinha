//Função que formata o JQuery datepicker
function datepickerFormat(dateField) {
 dateField.datepicker({
   dateFormat: 'yy-mm-dd',
   dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
   dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
   dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
   monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
   monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
   nextText: 'Próximo',
   prevText: 'Anterior',
   maxDate: '+0m +0w'
 });
}

//Busca a lista de cidades no banco e atualiza a lista de cidades
function findCities(state){
  $.getJSON( "/city/citiesListByState", {
    state: state,
  })
      .done(function(data) {
        let citiesSelect =  $("#inputCity");
        citiesSelect.empty();
        $.each(data.cities, function (index, item) {
          citiesSelect.append(new Option(item.c, item.c));
        });
        if (state === 'RS'){
          citiesSelect.val('Osório');
        }
      })
      .fail(function() {
        console.log( "error" );
      });
}