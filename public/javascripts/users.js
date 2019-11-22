$(document).ready(function() {

    $('#prevBtn').click(function(e) {
        e.preventDefault();
        //window.history.back();
        window.location = "/home";
    });

    $('#newUserBtn').click(function (e) {
        e.preventDefault();
        window.location.href = "/users/new";
    });
});