$(document).ready(function() {
    let appId = "";
    $("#client_jobs_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     true,
        "searching": true,
        "lengthChange": false,
    });

    $("#client_jobs_tb tbody").on("click","tr",function(){
        let table = $("#client_jobs_tb").DataTable();
        let data = table.row(this).data();
        let jobId = data[1];
        window.location = "/user/view-job/"+jobId;

    });

    $("#freelancer_jobs_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "ordering": true,
        "info":     true,
        "searching": true,
        "lengthChange": false,
    });

    $("#freelancer_jobs_tb tbody").on("click","tr",function(){
        let table = $("#freelancer_jobs_tb").DataTable();
        let data = table.row(this).data();
        let jobId = data[1];
        window.location = "/user/workspace/"+jobId;

    });

    $("#app_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 10,
        "searching":false,
        "ordering": true,
        "info":     true,
        "lengthChange": false,
    });

    $("#app_tb tbody").on("click","tr",function(){
        let table = $("#app_tb").DataTable();
        let data = table.row(this).data();
        appId = data[1];
        $("#firstname").text(data[2]);
        $("#lastname").text(data[3]);
        $("#pic").attr("src", "/images/"+data[4]);
        $("#jobTitle").text(data[5]);

        //$("freelancer-info").show();
    });

    $("#btnaward").click((e)=>{
        window.location = "/user/award-job/"+appId;
    });

    $("#jobview_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 4,
        "ordering": false,
        "info":     false,
        "searching": false,
        "lengthChange": false,
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