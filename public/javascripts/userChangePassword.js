$(document).ready(function() {

    // Configuração do botão voltar
    $('#prevBtn').click(function() {
        window.history.back();
        //window.location = "/users";
    });

    // Configuração do botão de "REINICIALIZAR"
    $('#resetPasswordBtn').click(function (e) {
        e.preventDefault();
        if (passwordValidateForm()) {
            $(function () {
                $('#dialogMsg').text('Confirma a alteração de sua senha?');
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
                        url: '/user/changePassword',
                        method: 'PUT',
                        data: $('#passwordReset').serialize(),
                        success: successHandler,
                        error: errorHandler
                    }).done(function (res) {
                        if (typeof res.success !== 'undefined') {
                            //console.log((res));
                            $('#inputPassword').val('');
                            $('#inputPasswordConfirm').val('');
                            //window.location.replace('/users')
                        }
                    });
                },
                'Não': function () {
                  $(this).dialog("close");
              }
          }
      });
            });
        }
    });
    function successHandler (data) {
        //console.log(data);
        //teste = data;
        let success = data.success;
        $('#passwordMessage').prop('class', 'alert alert-success text-center mt-3 mb-0 p-0').text('').append(success.msg + '<br>').show(0).delay(5000).hide(0);
        //setTimeout(function(){ window.location.reload(); }, 5000);
    }

    function errorHandler (data) {
        let errors = data.responseJSON.error;
        $('#passwordMessage').prop('class', 'alert alert-danger text-center mt-3 mb-0 p-0').text('');
        $(errors).each(function (key, value) {
            $('#passwordMessage').append(value.msg + '<br>').show(0).delay(5000).hide(0);
        });
    }

});