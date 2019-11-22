$(document).ready(function() {
    $("#inputCPF").mask('000.000.000-00');

    $("#form-signin").validate({
        ignore: ":hidden",
        rules: {
            inputCPF: {
                required: true,
                cpfBR: true
            },
            inputPassword: {
                required: true
            }
        }
    });
    $("#formLogin").submit(function(e){
        $("#inputCPF").unmask();
    });
});
