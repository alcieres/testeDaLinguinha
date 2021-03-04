function userValidateForm() {
    //return true;
    $("#userForm").validate({
        ignore: ":hidden",
        rules:{
            inputName: {
                required: true,
                minlength: 1,
                maxlength: 50,
            },
            inputLastName: {
                required: true,
                minlength: 1,
                maxlength: 50,
            },
            inputCPF: {
                required: true,
                cpfBR: true,
                minlength: 14,
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
                maxlength: 100
            }
        }
    }); //Fim validação do formulário
    return ($('#userForm').valid());
}