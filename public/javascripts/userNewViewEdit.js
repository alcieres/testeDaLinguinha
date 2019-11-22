$(document).ready(function() {
   if($('#inputCPF').val().length > 0){
       $('#inputCPF').mask('000.000.000-00');
   }

   // Regras da tela de exibição de usuário

    if(userConfig === 'show'){
        $('#passwordContainer').css('display', 'none');
        $('input').prop('readonly', true);
        $("#cbAdm").on("click", false);
        $("#deleteBtn").css('display', 'none');
        $("#confirmBtn").css('display', 'none');

    // Regras da tela de edição de usuário

    } else if(userConfig === 'edit'){
        $("#deleteBtn, #resetPasswordBtnRow").show();
        $("#passwordTitle").text("Reinicializar Senha do Usuário");
        if (user.cpf === profile.cpf) {
            $("#cbAdm").on("click", false);
        }
        $('#confirmBtn').click(function(e) {
            e.preventDefault();
            if(userValidateForm() && confirm("Confirma a alteração dos dados do usuário?")) {
                $.ajax({
                    url: '/users/' + profile._id,
                    method: 'PUT',
                    data: $('#userForm').serialize(),
                    success: successHandler,
                    error: errorHandler
                });
            }
        });

    // Regras da tela de novo de usuário

    } else if (userConfig === 'new'){
        $("#passwordContainer").insertBefore("#btnContainer");
        $("#passwordTitle").text("Senha do Usuário");
        $('#confirmBtn').click(function(e) {
            e.preventDefault();
            if(userValidateForm() && passwordValidateForm() && confirm("Confirma a inclusão do usuário?")) {
                $.ajax({
                    url: '/users',
                    method: 'POST',
                    data: $('#userForm, #passwordReset').serialize(),
                    success: successHandler,
                    error: errorHandler
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
        if(confirm("Tem certeza que deseja apagar esse usuário?")) {
            $.ajax({
                url: '/users/' + profile._id,
                method: 'DELETE',
                data: {id: profile._id}
            }).done(function (res) {
                if (res.success) {
                    //console.log('id from ajax call is', res);
                    window.location.replace('/users')
                    //window.location.reload();
                } else {
                    let errors = res.error;
                    $('#userMessage').prop('class', 'alert alert-danger text-center mt-3 mb-0 p-0').text('');
                    $(errors).each(function (key, value) {
                        $('#userMessage').append(value.msg + '<br>').show(0).delay(5000).hide(0);
                    });
                }
            });
        }
    });

    // Configuração do botão Reinicializar senha;
    $('#resetPasswordBtn').click(function(e) {
        e.preventDefault();
        if(passwordValidateForm() && confirm("Confirma a alteração da senha do usuário?") ) {
            $.ajax({
                url: '/users/' + profile._id + '/passwordReset',
                method: 'PUT',
                data: $('#passwordReset').serialize(),
                success: successHandler,
                error: errorHandler
            }).done(function (res) {
                if (typeof res.success !== 'undefined') {
                    console.log((res));
                    $('#inputPassword').val('');
                    $('#inputPasswordConfirm').val('');
                    //window.location.replace('/users')
                }
            });
        }
    });
    function successHandler (data) {
        //console.log(data);
        //teste = data;
        let success = data.success;
        $('#userMessage').prop('class', 'alert alert-success text-center mt-3 mb-0 p-0').text('').append(success.msg + '<br>').show(0).delay(5000).hide(0);
        //setTimeout(function(){ window.location.reload(); }, 5000);
    }

    function errorHandler (data) {
        let errors = data.responseJSON.error;
        $('#userMessage').prop('class', 'alert alert-danger text-center mt-3 mb-0 p-0').text('');
        $(errors).each(function (key, value) {
            $('#userMessage').append(value.msg + '<br>').show(0).delay(5000).hide(0);
        });
    }
});

