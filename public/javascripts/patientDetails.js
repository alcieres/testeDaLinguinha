$(document).ready(function() {
  //Atualizar a página quando acessada a partir dos botões voltar e avançar
  // $(window).on('popstate', function() {
  //   location.reload(true);
  // });

  // $('#deleteBtn').click(function() {
  //   alert("Esse botão vai APAGAR o paciente");
  // });

  $('#backBtn').click(function() {
    window.history.back();
  });
});

let deletePatient = (patientId) => {
  $(function () {
    $('#dialogText').text('Confirma a exclusão do paciente?');
    $("#dialog-confirm").dialog({
      resizable: false,
      height: "auto",
      dialogClass: "no-close",
      width: 400,
      modal: true,
      buttons: {
        Sim: function () {
          $(this).dialog("close");
          $.ajax({
            method: 'DELETE',
            url: '/delete/patient/' + patientId + '/delete',
            success: successHandler,
            error: errorHandler
          });
        },
        'Não': function () {
          $(this).dialog("close");
        }
      }
    });
  });
  function successHandler () {
    window.location.replace("/findPatient/");
  }
};

let deleteAssessment = (patientId, assessmentId) => {
  $(function () {
    $('#dialogText').text('Deseja realmente excluir esse teste?');
    $("#dialog-confirm").dialog({
      resizable: false,
      height: "auto",
      dialogClass: "no-close",
      width: 400,
      modal: true,
      buttons: {
        Sim: function () {
          $(this).dialog("close");
          $.ajax({
            method: 'DELETE',
            url: '/delete/patient/' + patientId + '/assessment/' + assessmentId + '/delete',
            success: successHandler,
            error: errorHandler
          });
        },
        'Não': function () {
          $(this).dialog("close");
        }
      }
    });
  });
  function successHandler () {
    location.reload();
  }
};

function errorHandler (data) {
  let dialog = $('#dialog-message');
  dialog.empty();
  data.responseJSON.error.forEach(error => (dialog.append( "<p>" + error.msg + "</p>" )));
  $( function() {
    $( "#dialog-message" ).dialog({
      dialogClass: "no-close",
      width: 500,
      title: "Erro ao deletar paciente",
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  });
}