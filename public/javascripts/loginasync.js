$(document).ready(function () {
    let errormsg = $('#errormsg').html().trim();
    if(errormsg) {
        alert(errormsg);
    }else{

    }

    $('#btnlogin').click(function () {
        let username = $('#username').val();
        let password = $('#password').val();
        $.ajax({
            type: "POST",
            url: "/login",
            data: { username: username , password: password },
            success: function(response){
                alert(response);
            }
        });

    });


});