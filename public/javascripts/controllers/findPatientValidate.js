function validateFindPatient() {
  //Não validar campos para realização dos testes
  //return true;
  $("#findPatientsForm").validate({
    ignore: ":hidden",
    rules:{
      inputName: {
        maxlength: 100,
      },
      inputMotherName: {
        maxlength: 100
      },
      inputMotherCPF: {
        cpfBR: true
      },
      inputFatherName: {
        maxlength: 100,
      }
    }
  }); //Fim validação do formulário

  return $('#findPatientsForm').valid();
}

function formNotEmpty(){
  let allFieldsEmpty = 0;
  let formToValidate = $("#findPatientsForm input");

  formToValidate.each(function(){
    if ($.trim($(this).val()).length === 0){
      allFieldsEmpty ++;
    }
  });
  console.log(allFieldsEmpty);

  return allFieldsEmpty !== formToValidate.length;
}
