$(document).ready(function(){
    //login
    $("#btnupdate").click(function(event){
        event.preventDefault();
        let fmdata = $('#fmprofile');
            $.ajax({
                url:'client/updateclient_info',
                type:'post',
                data:{username:username,password:password},
                success:function(response){
                    if(response.response){
                        if(response.role==="client"){
                            window.location="client/";
                        }else if(response.role==="freelancer"){
                            //window.location="freelancer/";
                        }else if(response.role==="admin"){

                        }
                    }else{
                        alert()
                    }
                }
            });
    });


});
