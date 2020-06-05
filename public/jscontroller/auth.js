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
                        window.location = "/user/profile";
                        let pageURL = window.location.pathname;
                        if(pageURL!=="/login"){
                            location.reload();
                        }else{
                            window.location = "/user/"
                        }
                        // }else {
                        //     //window.location = "/user/workspace/1"
                        //     location.reload();
                        // }
                    }else {
                        alert(response.loginRes);
                        // location.reload();
                    }
                }
            });
        } else {
            alert("Enter your login details");
            location.reload();

        }
        $("#btnlogin").val("Login");
        $("#btnlogin").attr("disabled", false);

    });


});
