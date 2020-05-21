$(document).ready(function(){
    //login
    $("#btnlogin").click(function(event){
        event.preventDefault();
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        if( username !== "" && password !== "" ){
            $.ajax({
                url:'/login',
                type:'post',
                data:{username:username,password:password},
                success:function(response){
                    if(response==="success"){
                        //window.location = "/user/workspace/1"
                        location.reload();
                    }else {
                        alert(response);
                    }
                }
            });
        } else {
            alert("Enter your login details");

        }

    });


});
