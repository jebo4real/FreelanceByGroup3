$(document).ready(function(){
    //login
    $("#btnpost").click(function(event){
        event.preventDefault();
        let data = $('#fmjob').serialize();
        $("#btnpost").val('Posting...');
        $("#fmjob input,textarea,select").prop("disabled",true);
        let title = $("#title").val().trim();
        let details = $("#details").val().trim();
        let price = $("#price").val().trim();
        if( title !== "" || details !== "" || price !==""){
            $.ajax({
                url:'/user/post-job',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        $('#responseMess').html(
                            '<div class="alert alert-success" role="alert">' +
                            'Job Posted Successfully' +
                            '</div>'
                        );
                    }else {
                        $('#responseMess').html(
                            '<div class="alert alert-danger" role="alert">' +
                            '+ response +' +
                            '</div>'
                        );
                    }
                }
            });

        } else {
            alert("Enter all required details");
        }
        $("#btnpost").val('Post');
        $("#fmjob input,textarea,select").prop("disabled",false);
        $("#fmjob")[0].reset();
    });

    //login
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
