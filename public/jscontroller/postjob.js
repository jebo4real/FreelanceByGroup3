$(document).ready(function(){
    
    
    $('#fmupdatejob input').removeClass('form-control');
    $('#fmupdatejob select').removeClass('custom-select');
    $('#fmupdatejob textarea').removeClass('form-control');

    $('#fmupdatejob input').attr('disabled', true);
    $('#fmupdatejob input').addClass('inputdisabled');
    $('#fmupdatejob select').attr('disabled', true);
    $('#fmupdatejob select').addClass('selectdisabled');
    $('#fmupdatejob textarea').attr('disabled', true);
    $('#fmupdatejob textarea').addClass('selectdisabled');



    
    $('#edit').click(function(event){
        $('#fmupdatejob input').removeAttr('disabled');
        $('#fmupdatejob input').removeClass('inputdisabled');
        $('#fmupdatejob select').removeAttr('disabled');
        $('#fmupdatejob textarea').removeAttr('disabled');
        $('#fmupdatejob select').removeClass('selectdisabled');
        $('#fmupdatejob textarea').removeClass('selectdisabled');

        $('#fmupdatejob input[type=text]').addClass('form-control');
        $('#fmupdatejob input[type=number]').addClass('form-control');
        //$('#fmprofile select').addClass('form-control');
        $('#fmupdatejob select').addClass('custom-select');
        $('#fmupdatejob textarea').addClass('form-control');
    });

    $("#btnupdate").click(function(event){
        event.preventDefault();
        let data = $('#fmupdatejob').serialize();
        $("#btnupdate").val('Deleting...');
        $("#fmupdatejob input,textarea,select").prop("disabled",true);
        let title = $("#title").val().trim();
        let details = $("#details").val().trim();
        let price = $("#price").val().trim();
        if( title !== "" || details !== "" || price !==""){
            $.ajax({
                url:'/user/update-job',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Job Updated Successfully");
                        $('#responseMess').html(
                            '<div class="alert alert-success" role="alert">' +
                            'Job Updated Successfully' +
                            '</div>'
                        );
                    }else {
                        alert(response);
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
        $("#btnupdate").val('Update');
        $("#fmupdatejob input,textarea,select").prop("disabled",false);
    });


    //login
    $("#btndelete").click(function(event){
        event.preventDefault();
        $("#btndelete").val('Deleting...');
        $("#fmupdatejob input,textarea,select").prop("disabled",true);
        let id = $("#id").val().trim();
        if( id !== ""){
            $.ajax({
                url:'/user/delete-job',
                type:'post',
                data:{id: id},
                success:function(response){
                    if(response==="success"){
                        alert("Job Deleted");
                        $('#responseMess').html(
                            '<div class="alert alert-success" role="alert">' +
                            'Job Deleted Successfully' +
                            '</div>'
                        );
                        window.location = "/user/my-jobs/all";
                    }else {
                        alert(response);
                        $('#responseMess').html(
                            '<div class="alert alert-danger" role="alert">' +
                            '+ response +' +
                            '</div>'
                        );
                    }
                }
            });

        } else {
            alert("Job not selected");
        }
        $("#btnupdate").val('Delete');
        $("#fmupdatejob input,textarea,select").prop("disabled",false);
    });


});
