$(document).ready(function(){

    $("#tab2").click(e=>{
        window.location = "http://localhost:3000/user/workspace/7#tab-eg7-1";
    });


    //client review
    $("#btnreviewclient").click(function(event){
        event.preventDefault();
        let data = $('#fmclient').serialize();
            $.ajax({
                url:'/user/review-client',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Thank you for your review");                     
                    }else {
                        alert(response);
                    }
                    location.reload();
                }
            }); 
    });

     //client review
     $("#btnreviewfreelancer").click(function(event){
        event.preventDefault();
        let data = $('#fmfree').serialize();
            $.ajax({
                url:'/user/review-freelancer',
                type:'post',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Thank you for your review");                     
                    }else {
                        alert(response);
                    }
                    location.reload();
                }
            }); 
    });

});