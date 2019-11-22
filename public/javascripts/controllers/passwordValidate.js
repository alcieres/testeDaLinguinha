function passwordValidateForm() {
    //Não validar campos para realização dos testes
    return true;
    $("#passwordReset").validate({
        ignore: ":hidden",
        rules:{
            inputPassword: {
                required: true,
                minlength: 6,
                maxlength: 16
            },
            inputPasswordConfirm: {
                required: true,
                minlength: 6,
                maxlength: 16,
                equalTo: '#password'
            },
        },
        messages: {
            inputPasswordConfirm: {
                equalTo: 'A senha diverge entre os campos'
            }
        }
    }); //Fim validação do formulário
    return ($('#passwordReset').valid());
}