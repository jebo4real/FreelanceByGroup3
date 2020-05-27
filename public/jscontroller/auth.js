$(document).ready(function(){
    //login
    $("#btnlogin").click(function(event){
        event.preventDefault();
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        $("#btnlogin").val("Loading...");
        $("#btnlogin").attr("disabled", true);
        if( username !== "" && password !== "" ){
            $.ajax({
                url:'/login',
                type:'post',
                data:{username:username,password:password},
                success:function(response){
                    if(response.loginRes==="success"){
                        // let pageURL = $(location).attr("href");
                        // alert(pageURL);
                        //window.location = "/user/workspace/1"
                        location.reload();
                    }else {
                        alert(response.loginRes);
                    }
                }
            });
        } else {
            alert("Enter your login details");

        }

    });


});
