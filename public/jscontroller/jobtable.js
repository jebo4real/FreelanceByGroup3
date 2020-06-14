$(document).ready(function() {
    let appId = "";
    let jobUserId = "";
    $("#client_jobs_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     false,
        "searching": true,
        "lengthChange": false,
        "language": {
            "emptyTable": "No jobs yet."
        }
    });

    $("#client_jobs_tb tbody").on("click","tr",function(){
        let table = $("#client_jobs_tb").DataTable();
        let data = table.row(this).data();
        let jobId = data[1];
        window.location = "/user/view-job/"+jobId;

    });

    //dashboard jobs
    $("#client_dasboard_jobs_tb").DataTable({
        "paging": false,
        "pagingType": "numbers",
        "pageLength": 5,
        "ordering": false,
        "info":     false,
        "searching": false,
        "lengthChange": false,
        "language": {
            "emptyTable": "No applicants yet."
        }
    });

    $("#client_dasboard_jobs_tb tbody").on("click","tr",function(){
        let table = $("#client_dasboard_jobs_tb").DataTable();
        let data = table.row(this).data();
        let jobId = data[4];
        window.location = "/user/view-job/"+jobId;

    });

    let table = $("#jobs_all_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 7,
        "ordering": true,
        "info":     false,
        "searching": true,
        "lengthChange": false,
    });

    $('#searchFilter').on( 'keyup', function () {
        table.search( this.value ).draw();
     } );

    $("#freelancer_jobs_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     false,
        "searching": true,
        "lengthChange": false,
        "language": {
            "emptyTable": "No jobs yet."
        }
    });

    $("#freelancer_jobs_tb tbody").on("click","tr",function(){
        let table = $("#freelancer_jobs_tb").DataTable();
        let data = table.row(this).data();
        let jobId = data[1];
        let jobAppStatus = data[7];
    });

    $("#app_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "searching":false,
        "ordering": true,
        "info":     false,
        "lengthChange": false,
    });

    $("#app_tb tbody").on("click","tr",function(){
        let table = $("#app_tb").DataTable();
        let data = table.row(this).data();
        appId = data[1];
        jobUserId = data[6];
        $.ajax({
            url:'/user/view-freel/'+jobUserId,
            type:'get',
            data:{jobUserId: jobUserId},
            success:function(response){
                $("#firstname").text(response.User.firstname);
                $("#lastname").text(response.User.lastname);
                $("#country").text(response.User.country);
                $("#btnsendfree").attr("href", "/freelancer/"+response.User.id);
                $("#pic").attr("src", "/img/avatar.jpg");
                if(response.User.picture!==""){
                    $("#pic").attr("src", "/images/"+response.User.picture);
                }else{
                    
                }
                
            }
        });

        //$("freelancer-info").show();
    });

    $("#btnaward").click((e)=>{
        window.location = "/user/award-job/"+appId;
    });

    $("#jobview_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 1,
        "ordering": false,
        "info":     false,
        "searching": false,
        "lengthChange": false,
        "language": {
            "emptyTable": "No jobs have been posted yet."
        }
    });

    $("#message_users_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     false,
        "searching": true,
        "lengthChange": true,
        "language": {
            "emptyTable": "No users have joined yet."
        }
    });

    $("#message_other_tb").DataTable({
        "paging":false,
        "pageLength": 5,
        "ordering": false,
        "info":     false,
        "searching": false,
        "lengthChange": false,
        "language": {
            "emptyTable": "No message received yet."
        }
    });

    $("#priceApply").click((e)=>{
        let table = $('#jobview_tb').DataTable();
        let minPrice = $("#minPrice").val();
        let maxPrice = $("#maxPrice").val();
        table
            .column(3)
            .data()
            .filter( function ( value, index ) {
                return (value > minPrice && value <= maxPrice);
            });
        table.draw();
    });

});