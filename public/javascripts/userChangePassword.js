$(document).ready(function() {

    // Configuração do botão voltar
    $('#prevBtn').click(function() {
        window.history.back();
        //window.location = "/users";
    });

    $('#resetPasswordBtn').click(function (e) {
        e.preventDefault();
        if (passwordValidateForm() && confirm("Confirma a alteração de sua senha?")) {
            $.ajax({
                url: '/user/changePassword',
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