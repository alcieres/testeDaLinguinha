$(document).ready(function() {
   if($('#inputCPF').val().length > 0){
       $('#inputCPF').mask('000.000.000-00');
   }

   //Exibição de usuário
   if(userConfig === 'show'){
    $('#passwordContainer').css('display', 'none');
    $('input').prop('readonly', true);
    $("#cbAdm").on("click", false);
    $("#deleteBtn").css('display', 'none');
    $("#confirmBtn").css('display', 'none');

    //Edição de usuário
    } else if(userConfig === 'edit'){
    $("#deleteBtn, #resetPasswordBtnRow").show();
    $("#passwordTitle").text("Reinicializar Senha do Usuário");
    if (user.cpf === profile.cpf) {
        $("#cbAdm").on("click", false);
    }
    $('#confirmBtn').click(function(e) {
        e.preventDefault();
        if(userValidateForm()) {
            $(function () {
                $('#dialogMsg').text('Confirma a alteração dos dados do usuário?');
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
                        url: '/users/' + profile._id,
                        method: 'PUT',
                        data: $('#userForm').serialize(),
                        success: successHandler,
                        error: errorHandler
                    }).done(function (res) {
                        if (typeof res.success !== 'undefined') {
                            //console.log((res));
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

    //Novo de usuário
    } else if (userConfig === 'new'){
        $("#passwordContainer").insertBefore("#btnContainer");
        $("#passwordTitle").text("Senha do Usuário");
        $('#confirmBtn').click(function(e) {
            e.preventDefault();
            //console.log("User: " + userValidateForm() + "\nSenha: " + passwordValidateForm())
            if(userValidateForm() && passwordValidateForm()) {
                $(function () {
                    $('#dialogMsg').text('Confirma a inclusão do usuário?');
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
                            url: '/users',
                            method: 'POST',
                            data: $('#userForm, #passwordReset').serialize(),
                            //success: successHandler,
                            error: errorHandler
                        }).done(function (res) {
                            if (typeof res.success !== 'undefined') {
                                dialogHandler("Sucesso!", "Usuário adicionado ao sistema");
                                $('#dialog-message').on('dialogclose', function(event) {
                                    window.location.replace('/users');
                                });
                                //console.log((res));
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
    }

    // Configuração do botão voltar
    $('#prevBtn').click(function() {
        //window.history.back();
        window.location = "/users";
    });
    
    // Configuração do botão deletar
    $('#deleteBtn').click(function() {
        $(function () {
            $('#dialogMsg').text('Tem certeza que deseja apagar esse usuário?');
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
                            url: '/users/' + profile._id,
                            method: 'DELETE',
                            data: {id: profile._id},
                            error: errorHandler
                        }).done(function (res) {
                            if (typeof res.success !== 'undefined') {
                                dialogHandler("Sucesso!", "Usuário excluído do sistema");
                                $('#dialog-message').on('dialogclose', function(event) {
                                    window.location.replace('/users');
                                });
                            }
                        });
                    },
                    'Não': function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    });

    // Configuração do botão Reinicializar senha;
    $('#resetPasswordBtn').click(function(e) {
        e.preventDefault();
        if(passwordValidateForm()) {
            $(function () {
                $('#dialogMsg').text('Confirma a alteração da senha do usuário?');
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
                                url: '/users/' + profile._id + '/passwordReset',
                                method: 'PUT',
                                data: $('#passwordReset').serialize(),
                                success: successHandler,
                                error: errorHandler
                            }).done(function (res) {
                                if (typeof res.success !== 'undefined') {
                                    $('#inputPassword').val('');
                                    $('#inputPasswordConfirm').val('');
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
});

function successHandler (data) {
    //console.log(data);
    //teste = data;
    let success = data.success;
    $('#userMessage').prop('class', 'alert alert-success text-center mt-3 mb-0 p-0').text('')
    $(success).each(function (key, value) {
        $('#userMessage').append(value.msg + '<br>').show(0).delay(5000).hide(0);
    });
    //setTimeout(function(){ window.location.reload(); }, 5000);
}

function errorHandler (data) {
    let errors = data.responseJSON.error;
    $('#userMessage').prop('class', 'alert alert-danger text-center mt-3 mb-0 p-0').text('');
    $(errors).each(function (key, value) {
        $('#userMessage').append(value.msg + '<br>').show(0).delay(5000).hide(0);
    });
}


function dialogHandler (title, msg) {
    let dialog = $('#dialog-message');
    dialog.empty();
    dialog.append( "<p>" + msg + "</p>" );
    $( function() {
        $("#dialog-message").dialog({
            dialogClass: "no-close",
            width: 500,
            title: title,
            modal: true,
            buttons: {
                Ok: function() {
                        $( this ).dialog( "close" );
                    }
            }
        });
    });
}
