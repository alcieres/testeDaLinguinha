function validateForm() {
    //Não validar campos para realização dos testes
    return true;

    //Data máxima para o dia atual
    $.validator.addMethod("maxDate", function(value, element) {
        let valueArray = value.split('-');
        //   let today = new Date();
        let curDate = new Date();
        let inputDate = new Date(valueArray[0], valueArray[1] - 1, valueArray[2]);
        return inputDate < curDate;

    }, "A data digitada não pode ser maior que a data de hoje.");

    //Data não inferior a 100 anos atrás
    $.validator.addMethod("minDate", function(value, element) {
        let valueArray = value.split('-');
        let curDate = new Date();
        let inputDate = new Date(valueArray[0], valueArray[1] - 1, valueArray[2]);

        return curDate.getFullYear() - inputDate.getFullYear() < 100;

    }, "A data digitada não pode ser anterior há 100 anos.");

    // Validação de Celular
    jQuery.validator.addMethod('cellPhone', function (value, element) {
        value = value.replace("(","");
        value = value.replace(")", "");
        value = value.replace("-", "");
        value = value.replace(" ", "").trim();
        if (value == '0000000000') {
            return (this.optional(element) || false);
        } else if (value == '00000000000') {
            return (this.optional(element) || false);
        }
        if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
            return (this.optional(element) || false);
        }
        if (value.length < 10 || value.length > 11) {
            return (this.optional(element) || false);
        }
        if (["6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
            return (this.optional(element) || false);
        }
        return (this.optional(element) || true);
    }, 'Informe um celular válido');

    //Validação de Telefone fixo (que também aceita celular)
    jQuery.validator.addMethod('telephone', function (value, element) {
        value = value.replace("(", "");
        value = value.replace(")", "");
        value = value.replace("-", "");
        value = value.replace(" ", "").trim();
        if (value == '0000000000') {
            return (this.optional(element) || false);
        } else if (value == '00000000000') {
            return (this.optional(element) || false);
        }
        if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
            return (this.optional(element) || false);
        }
        if (value.length < 10 || value.length > 11) {
            return (this.optional(element) || false);
        }
        //if (["1", "2", "3", "4","5"].indexOf(value.substring(2, 3)) == -1) {
        //  return (this.optional(element) || false);
        //}
        return (this.optional(element) || true);
    }, 'Informe um telefone válido');

    $("#assForm").validate({
        ignore: ":hidden",
        rules:{
            inputName: {
                required: true,
                minlength: 3,
                maxlength: 100,
                minWords: 2
            },
            inputBirthDate: {
                required: true,
                minDate: true,
                maxDate: true
            },
            inputAssessmentDate: {
                required: true,
                minDate: true,
                maxDate: true
            },
            rbGenero: {
                required: true,
            },
            inputMotherName: {
                required: true,
                minlength: 3,
                maxlength: 100
            },
            inputMotherCPF: {
                cpfBR: true
            },
            inputFatherName: {
                minlength: 3,
                maxlength: 100,
                minWords: 2
            },
            inputAddress: {
                required: true,
                minlength: 3,
                maxlength: 300
            },
            inputResidenceNumber: {
                required: true,
                minlength: 1,
                maxlength: 15
            },
            inputNeighborhood: {
                required: true,
                minlength: 3,
                maxlength: 100
            },
            inputState: {
                required: true
            },
            inputCity: {
                required: true
            },
            inputCEP: {
                postalcodeBR: true
            },
            inputEmail: {
                email: true
            },
            inputResTel: {
                telephone: true
            },
            inputCommercialTel: {
                telephone: true
            },
            inputCelPhone: {
                cellPhone: true
            },
            inputProblemDescription: {
                minlength: 1,
                maxlength: 1000
            },
        }
    }); //Fim validação do formulário
    return ($('#assForm').valid());
}