$(document).ready(function(){
    $('.codepic').hover(function(){$('.code').fadeIn()},function(){$('.code').fadeOut()});
    $('.backup').click(function(){
        $('body,html').animate({scrollTop:0},500)
    });
    $(".backup").hide();
    $(function () {
        $(window).scroll(function(){
            if ($(window).scrollTop()>500){
                $(".backup").fadeIn(1000);
            }else{
                $(".backup").fadeOut(1000);
            }
        });
    });

    $(".nav a:first").addClass("home");
    $(".left_nav li a").click(function(){
        $(this).parent("li").find("ul").slideToggle();
    });
});