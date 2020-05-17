$(document).ready(function() {

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

    $("#jobview_tb").DataTable({
        "pagingType": "numbers",
        "pageLength": 4,
        "ordering": false,
        "info":     false,
        "searching": false,
        "lengthChange": false,
    });

});