$(document).ready(function(){
    //login
    $("#btnpost").click(function(event){
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
                        alert("Job Posted Successfully");
                        $('#responseMess').html(
                            '<div class="alert alert-success" role="alert">' +
                            'Job Posted Successfully' +
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
            alert("daksas");
        }
        $("#btnpost").val('Post');
        $("#fmjob input,textarea,select").prop("disabled",false);
        $("#fmjob")[0].reset();
        // event.preventDefault();
    });

    //login
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
