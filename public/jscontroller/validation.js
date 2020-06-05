$(document).ready(function () {
    $('#password').keyup(function () {
        $('#strengthMessage').html(checkStrength($('#password').val()))
    });
    $('#conpassword').keyup(function () {
        $('#matchMessage').html(checkEquals($('#conpassword').val()))
    });
    function checkEquals(password){
        if(password!==$('#password').val()){
            $('#matchMessage').removeClass();
            $('#matchMessage').addClass('Short');
            return 'Passwords do not match'
        }else if(password===$('#password').val()){
            $('#matchMessage').removeClass();
            $('#matchMessage').addClass('Good');
            return 'Passwords match'
        }
    }
    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Short');
            return 'Too short'
        }
        if (password.length > 7) strength += 1;
        // If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        // If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        // If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // Calculated strength value, we can return messages
        // If value is less than 2
        if (strength < 2) {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Weak');
            return 'Weak'
        } else if (strength == 2) {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Good');
            return 'Good'
        } else {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Strong');
            return 'Strong'
        }
    }


    $('#city').keydown(function(er){
        if(er.altKey||er.ctrlKey||er.shiftKey){
            er.preventDefault();
        }else{var key=er.keyCode;
            if(!((key==8)||(key==9)||(key==32)||(key==46)||(key>=65 && key<=90))){
                er.preventDefault();
            }
        }
    }); 
});
