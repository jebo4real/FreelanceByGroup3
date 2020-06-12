$(document).ready(function(){

    $('#fmprofile input').attr('readonly', 'readonly');
    $('#fmprofile select').attr('readonly', 'readonly');


    
    $('#edit').click(function(event){
        $('#fmprofile input').removeAttr('readonly');
        $('#fmprofile select').removeAttr('readonly');
    });


});
