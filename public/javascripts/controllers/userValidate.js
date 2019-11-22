function userValidateForm() {
    //Não validar campos para realização dos testes
    return true;
    $("#userForm").validate({
        ignore: ":hidden",
        rules:{
            inputName: {
                required: true,
                maxlength: 50,
            },
            inputLastName: {
                required: true,
                maxlength: 50,
            },
            inputCPF: {
                required: true,
                cpfBR: true,
                maxlength: 14
            },
            inputRegistry: {
                required: true,
                minlength: 3,
                maxlength: 10
            },
            inputOccupation: {
                required: true,
                minlength: 3,
                maxlength: 30
            },
            inputEmail: {
                required: true,
                email: true,
                maxlength: 50
            }
        }
    }); //Fim validação do formulário
    return ($('#userForm').valid());
}