$(document).ready(function() {
    $("#user_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     true,
        "searching": true,
        "lengthChange": false,
    });

    $("#user_tb tbody").on("click","tr",function(){
        let table = $("#user_tb").DataTable();
        let data = table.row(this).data();
        $("#id").val(data[1]);
        $("#fullname").val(data[2]);
        $("#gender").val(data[3]);
        $("#dob").val(data[4]);
        $("#jobTitle").val(data[5]);
        $("#email").val(data[6]);
        $("#mobile").val(data[7]);
        $("#country").val(data[8]);
        $("#city").val(data[9]);
        $("#picture").attr("src", "/images/"+data[10]);

        if(data[11]){
            $("#btnaccept").attr("disabled", "true");
            $("#btnreject").removeAttr("disabled");
        }else{
            $("#btnreject").attr("disabled", "true");
            $("#btnaccept").removeAttr("disabled");
        }

        if(data[12]){
            $("#btnblock").attr("disabled", "true");
            $("#btnunblock").removeAttr("disabled");
        }else{
            $("#btnunblock").attr("disabled", "true");
            $("#btnblock").removeAttr("disabled");
        }

    });

    $("#btnaccept").click(function(event){
        event.preventDefault();
        let uAccId = $("#id").val().trim();
        let email = $("#email").val().trim();
        if( uAccId !== ""){
            $.ajax({
                url:'/admin/accept-user',
                type:'post',
                data:{uAccId:uAccId, email:email},
                success:function(response){
                    if(response==="success"){
                        alert("User accepted");
                        location.reload();
                    }else {
                        alert("Error Accepting user");
                    }
                }
            });

        } else {
            alert("Select a user");
        }
    });

    $("#btnreject").click(function(event){
        event.preventDefault();
        let uAccId = $("#id").val().trim();
        let email = $("#email").val().trim();
        if( uAccId !== ""){
            $.ajax({
                url:'/admin/reject-user',
                type:'post',
                data:{uAccId:uAccId, email:email},
                success:function(response){
                    if(response==="success"){
                        alert("User Rejected");
                        location.reload();
                    }else {
                        alert("Error Rejecting user");
                    }
                }
            });

        } else {
            alert("Select a user");
        }
    });

    $("#btnblock").click(function(event){
        event.preventDefault();
        let uAccId = $("#id").val().trim();
        let email = $("#email").val().trim();
        if( uAccId !== ""){
            $.ajax({
                url:'/admin/block-user',
                type:'post',
                data:{uAccId:uAccId, email:email},
                success:function(response){
                    if(response==="success"){
                        alert("User Blocked");
                        location.reload();
                    }else {
                        alert("Error Blocking user");
                    }
                }
            });

        } else {
            alert("Select a user");
        }
    });

    $("#btnunblock").click(function(event){
        event.preventDefault();
        let uAccId = $("#id").val().trim();
        let email = $("#email").val().trim();
        if( uAccId !== ""){
            $.ajax({
                url:'/admin/unblock-user',
                type:'post',
                data:{uAccId:uAccId, email:email},
                success:function(response){
                    if(response==="success"){
                        alert("User UnBlocked");
                        location.reload();
                    }else {
                        alert("Error Unblocking user");
                    }
                }
            });

        } else {
            alert("Select a user");
        }
    });

});