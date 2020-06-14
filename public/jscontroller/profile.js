$(document).ready(function(){

    $('#fmprofile input').removeClass('form-control');
    $('#fmprofile select').removeClass('form-control');
    $('#fmprofile select').removeClass('custom-select');
    $('#fmprofile textarea').removeClass('form-control');

    $('#fmprofile input').attr('disabled', true);
    $('#fmprofile input').addClass('inputdisabled');
    $('#fmprofile select').attr('disabled', true);
    $('#fmprofile select').addClass('selectdisabled');
    $('#fmprofile textarea').attr('disabled', true);
    $('#fmprofile textarea').addClass('selectdisabled');



    
    $('#edit').click(function(event){
        $('#fmprofile input').removeAttr('disabled');
        $('#fmprofile input').removeClass('inputdisabled');
        $('#fmprofile select').removeAttr('disabled');
        $('#fmprofile select').removeClass('selectdisabled');
        $('#fmprofile textarea').removeAttr('disabled');
        $('#fmprofile textarea').removeClass('selectdisabled');

        $('#fmprofile input[type=text]').addClass('form-control');
        $('#fmprofile input[type=number]').addClass('form-control');
        $('#fmprofile input[type=email]').addClass('form-control');
        $('#fmprofile input[type=tel]').addClass('form-control');
        $('#fmprofile input[type=date]').addClass('form-control');
        $('#fmprofile select').addClass('form-control');
        $('#fmprofile select').addClass('custom-select');
    });


});
