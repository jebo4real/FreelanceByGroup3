$(document).ready(function() {
    $("#job_cat_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     true,
        "searching": true,
        "lengthChange": false,
    });

    $("#job_cat_tb tbody").on("click","tr",function(){
        let table = $("#job_cat_tb").DataTable();
        let data = table.row(this).data();
        $("#id").val(data[1]);
        $("#name").val(data[2]);
        $("#btnaddcat").attr("disabled", true);
        $("#btnupdatecat").removeAttr("disabled");
    });

    $("#btnaddcat").click(function(event){
        event.preventDefault();
        $("#btnaddcat").removeAttr("disabled");
        $("#btnupdatecat").attr("disabled", true);
        let data = $('#fmjobcat').serialize();
        $("#btnaddcat").val('Adding...');
        $("#fmjobcat input,textarea,select").prop("disabled",true);
        let name = $("#name").val().trim();
        if( name !== ""){
            $.ajax({
                url:'/admin/add-job-category',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Category added");
                        location.reload();
                    }else {
                        alert("Error Adding Category");
                    }
                }
            });

        } else {
            alert("Enter all required details");
        }
        $("#btnaddcat").val('Add');
        $("#fmjobcat input,textarea,select").prop("disabled",false);
        $("#fmjobcat")[0].reset();
    });

    $("#btnupdatecat").click(function(event){
        event.preventDefault();
        let data = $('#fmjobcat').serialize();
        $("#btnupdatecat").val('Updating...');
        $("#fmjobcat input,textarea,select").prop("disabled",true);
        let name = $("#name").val().trim();
        if( name !== ""){
            $.ajax({
                url:'/admin/update-job-category',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Category Updated");
                        location.reload();
                    }else {
                        alert("Error Updating Category");
                    }
                }
            });
        } else {
            alert("Enter all required details");
        }
        $("#btnupdatecat").val('Update');
        $("#fmjobcat input,textarea,select").prop("disabled",false);
        $("#fmjobcat")[0].reset();
    });

});