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
function findCities(state, city){
  $.getJSON( "/city/citiesListByState", {
    state: state,
  })
      .done(function(data) {
        let citiesSelect =  $("#inputCity");
        citiesSelect.empty();
        $.each(data.cities, function (index, item) {
          citiesSelect.append(new Option(item.c, item.c));
        });

          if(city){
            $.each(data.cities, function (index, item) {
              if (!item.c.toString().localeCompare(city, 'en', {sensitivity: 'base'})){
                citiesSelect.val(item.c);
              }
            });
          }
      })
      .fail(function() {
        console.log( "error" );
      });
}

//Formata a data UTC eno formato  yyyy-MM-dd
function formatDate (date)
{
  date = new Date(date);
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  if(d < 10) {
    d = '0' + d
  }
  if(m < 10) {
    m = '0' + m
  }
  return y + "-" + m + "-" + d;
}

function dateToText (date)
{
  date = new Date(date);
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  if(d < 10) {
    d = '0' + d
  }
  if(m < 10) {
    m = '0' + m
  }
  return d + "/" + m + "/" + y;
}