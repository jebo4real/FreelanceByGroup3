$(document).ready(function(){

    //send message
    $("#btnsendmess").click(function(event){
        event.preventDefault();
        let message = $("#message").val().trim();
        let SenderId = $("#sender").html();
        let JobId = $("#jobid").html();
        if( message !== ""){
            $.ajax({
                url:'/user/send-message',
                type:'post',
                data:{message:message, SenderId:SenderId, JobId:JobId},
                success:function(response){
                    if(response==="success"){
                        $('#messages').append(
                           '<div  class="card card-body col-md-8" style="float: right;">' +
                            '<p>'+message+'</p>' +
                            '</div>'
                        );
                        $("#message").val("");
                    }else {
                       alert('Error sending message')
                    }
                }
            });

        } else {
            alert("Message can not be empty");
        }
    })


});
