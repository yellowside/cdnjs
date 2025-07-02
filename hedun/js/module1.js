$(function () {  
    wowDelay(".pro-module05 ul",$('.pro-module05 ul li').length,"0.2");
    wowDelay(".pro-module07 ul",$('.pro-module07 ul li').length,"0.2");
    wowDelay(".pro-module08 ul",$('.pro-module08 ul li').length,"0.2");
    wowDelay(".pro-module09 ul",$('.pro-module09 ul li').length,"0.2");
    wowDelay(".pro-module14 ul",$('.pro-module14 ul li').length,"0.2");
    wowDelay(".pro-module16 ul",$('.pro-module16 ul li').length,"0.2");
    wowDelay(".news-part01 ul",$('.news-part01 ul li').length,"0.2");
    wowDelay(".news-part03 ul",$('.news-part03 ul li').length,"0.2");
    wowDelay(".conn-part02 .bb-box ul",$('.conn-part02 .bb-box ul li').length,"0.2");
    wowDelay(".case-module01 ul",$('.case-module01 ul li').length,"0.2");
    wowDelay(".partner-pbb ul",$('.partner-pbb ul li').length,"0.2");
    wowDelay(".searchlist_txt ul",$('.searchlist_txt ul li').length,"0.2");
    wowDelay(".sitemap ul",$('.sitemap ul li').length,"0.2");

    
    $(".about-part03 dd .txt").mCustomScrollbar();
    $(".about-module01 .rr-tabc li .con").mCustomScrollbar();
	$(".pro-module06 li dd p").mCustomScrollbar();
	$(".pro-module19 li dl").mCustomScrollbar();
	
	

    //合作伙伴查看架构图
    $(document).on("click", ".partner-ptt .rr", function() {
        $(this).parents(".partner-ptt").toggleClass('on');
        $(this).toggleClass("on");
        if($(this).hasClass("on")){
            $(this).find("p").text("收起");
        }
        else{
            $(this).find("p").text("查看渠道体系架构");
        }        
    })

    if($(window).width()>767){
        var h_max = 0;
        $('.sitemap li.long01 dl dd').each(function() {
            var h = $(this).height();
            h_max = h > h_max ? h : h_max; 
        });
        $('.sitemap li.long01 dl dd').height(h_max); 
    }

    /**判断最后一个版块是模块10的话下面的间距放出来 */
    $(".comm_modulebox").each(function(){
        if($(".comm_modulebox:last").has("pro-module10")){
            $(".comm_modulebox:last").removeClass("no_padb");
        }
    })
    //比较高度
	if($(window).width()>767){
        var h_max = 0;
        $('.pro-module05 li').each(function() {
            var h = $(this).height(); 
            h_max = h > h_max ? h : h_max; 
        });
        $('.pro-module05 li').height(h_max); 
    }
	
	/*if($(window).width()>767){
        var h_max = 0;
        $('.pro-module06 dl').each(function() {
            var h = $(this).height(); 
            h_max = h > h_max ? h : h_max; 
        });
        $('.pro-module06 dl').height(h_max); 
    }*/
	
    if($(window).width()>767){
        var h_max = 0;
        $('.pro-module07 dl').each(function() {
            var h = $(this).height(); 
            h_max = h > h_max ? h : h_max; 
        });
        $('.pro-module07 dl').height(h_max); 
    }
	
	/*if($(window).width()>767){
        var h_max = 0;
        $('.pro-module19 li dl').each(function() {
            var h = $(this).height(); 
            h_max = h > h_max ? h : h_max; 
        });
        $('.pro-module19 li dl').height(h_max); 
    }*/
	
	
	
	
	
	

    

    promenu();
    promod_vid();
    promod01_Tab();
    promod04_TabVideo();
    promod06();
    promod10_Tab();
    promod12();
    promod13();
    promod15();
    promod18();
    promod19();
    promod20(); 
	promod22();
    promenua()
    //solutionpart(); 
    hisbox();
    logopic();
    safemod01();
    Countdown();
    rswitch();
    newspart();
    casemod03(); 
    solution_slide();
    flink_list();


})


//60秒倒计时
function Countdown(){
    var countdown = 60;
    //$('.count button').on('click',function(){
    //    var obj = $(".count button");
    //    settime(obj);
    //})
    function settime(obj) { 
            if (countdown == 0) {
                $('.count button').text('获取手机验证码(60s)').removeAttr('disabled');
                $(".count button").removeAttr("style");
                countdown = 60;
                return;
            } else {
                $('.count button').attr('disabled', true);
                $('.count button').text("获取手机验证码 ("+ countdown +"s)");
                countdown--;
            }
            setTimeout(function () {
                settime(obj)
            }
            , 1000)
    }
}

    
function promenu(){
    //pro_menu悬浮
    if($(".pro_menu").length>0){
        $anchorTop=$('.pro_menu').offset().top;
        //console.log($anchorTop);
        $(window).scroll(function(){
            wint=$(window).scrollTop();
            $anchor=$('.pro_menu');
            if (wint>$anchorTop) {
                $('body').addClass('pro_menu_fixed');
            }
            else{
                $('body').removeClass('pro_menu_fixed');
            }
        })
    }
    //锚点
    $(document).on("click", ".pro_menu li[link]", function() {
        $(".pro_menu").find('li').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr("link")
        var topH = $(".pro_menu").height();
        var headH = $(".header").height()
        var divH = $("#" + id).offset().top - topH - headH
        $('html,body').animate({
            scrollTop : divH
        }, 500);
    })

    //切换
    var promenuSwiper = new Swiper('.pro_menu .swiper-container', {
        slidesPerView :5,
        slidesPerGroup : 5,
        prevButton:'.pro_menu .swiper-button-prev',
        nextButton:'.pro_menu .swiper-button-next',
        breakpoints: { 
            1023: {
            slidesPerView: 3,
            slidesPerGroup : 3,
            },
            767: { 
            slidesPerView: 2,
            slidesPerGroup : 2,
            }
        }
    })
   
    if($(window).width()<=767){
         if($(".pro_menu li").size()<=2){
            $(".pro_menu .swiper-button-prev,.pro_menu .swiper-button-next").hide();
         }
         if($(".pro_menu li").size()<2){
            $(".pro_menu").addClass("cen");
         }
    }
    else if($(window).width()>1023){ 
         if($(".pro_menu li").size()<=5){            
            $(".pro_menu .swiper-button-prev,.pro_menu .swiper-button-next").hide();
         }
         if($(".pro_menu li").size()<5){
            $(".pro_menu").addClass("cen");
         }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".pro_menu li").size()<=3){
           $(".pro_menu .swiper-button-prev,.pro_menu .swiper-button-next").hide();
        }
        if($(".pro_menu li").size()<3){
            $(".pro_menu").addClass("cen");
        }
    }
}

function promenua(){
    //锚点
    $(document).on("click", ".pro_menua li", function() {
        $(".pro_menua").find('li').removeClass('active');
        $(this).addClass('active');
        /*var divH = $(".pro-kuang").offset().top;
        $('html,body').animate({
            scrollTop : divH
        }, 500);*/
    })
    //切换
    var promenuaSwiper = new Swiper('.pro_menua .swiper-container', {
        slidesPerView :4,
        slidesPerGroup : 4,
        prevButton:'.pro_menua .swiper-button-prev',
        nextButton:'.pro_menua .swiper-button-next',
        breakpoints: { 
            1023: {
            slidesPerView: 3,
            slidesPerGroup : 3,
            },
            767: { 
            slidesPerView: 2,
            slidesPerGroup : 2,
            }
        }
    })    
    if($(window).width()<=767){
        if($(".pro_menua li").size()<=2){
           $(".pro_menua .swiper-button-prev,.pro_menua .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".pro_menua li").size()<=4){            
            $(".pro_menua .swiper-button-prev,.pro_menua .swiper-button-next").hide();
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".pro_menua li").size()<=3){
            $(".pro_menua .swiper-button-prev,.pro_menua .swiper-button-next").hide();
        }
    }    
}


function promod01_Tab(){
    $(".pro-module01 .ll-tabt li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".pro-module01 .rr-tabc li").eq($(this).index()).addClass("on").siblings().removeClass("on");
    })
}

function promod04_TabVideo(){    
    $(".pro-module04 .rr-tabt li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".pro-module04 .ll-tabc li").eq($(this).index()).addClass("on").siblings().removeClass("on");
        promod_vid();
    })
	
	$(".pro-module04 .ll-tabc li.video-box").each(function(){
		var v_src=$(this).find("video").attr("src");
		if(v_src==""){
			$(this).find("i").remove();
		}
	})
}
function promod_vid(){
    $(".video-box").addClass('pause');
    $(".video-box").find("video").trigger("pause");
    $(document).on("click", ".video-box", function () {
      var this_v = $(this).find("video");
      if ($(this).hasClass('pause')) {
        this_v.trigger("play");
        $(this).removeClass('pause');
        $(this).addClass('play');
        $(this).find("i").hide();
      }
      else {
        this_v.trigger("pause");
        $(this).removeClass('play');
        $(this).addClass('pause');
        $(this).find("i").show();
      }
    })
}

function promod06(){
    var promod06Swiper = new Swiper('.pro-module06 .swiper-container', {
        //autoplay: 5000,
        slidesPerView : 3,
        slidesPerGroup : 1,
        prevButton:'.pro-module06 .swiper-button-prev',
        nextButton:'.pro-module06 .swiper-button-next',
        spaceBetween: 30,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            spaceBetween: 10
            }
        }
    })
    if($(window).width()<=767){
        if($(".pro-module06 li").size()<=1){
           $(".pro-module06 .swiper-button-prev,.pro-module06 .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".pro-module06 li").size()<=3){            
            $(".pro-module06 .swiper-button-prev,.pro-module06 .swiper-button-next").hide();
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".pro-module06 li").size()<=2){
            $(".pro-module06 .swiper-button-prev,.pro-module06 .swiper-button-next").hide();
        }
    }     
}

function promod10_Tab(){
    $(".pro-module10 .tt-tabt li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
		var ind=$(this).index();
        $(".pro-module10 .bb-tabc li").eq(ind).addClass("on").siblings().removeClass("on");
		//console.log(1)
        imgratio();
        promod_vid();  
        flink_list();      
    })

    $(".pro-module10 .bb-tabc li dd .inner").mCustomScrollbar();
}


function promod12(){
    var promod12Swiper = new Swiper('.pro-module12 .swiper-container', {
        slidesPerView : 3,
        slidesPerGroup : 3,
        spaceBetween: 30,
        pagination : '.pro-module12 .swiper-pagination',
        paginationClickable :true,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            slidesPerGroup :2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            slidesPerGroup : 1,
            spaceBetween: 10
            }
        }
    })
}
 
function promod13(){
    var promod13Swiper = new Swiper('.pro-module13 .swiper-container', {
        spaceBetween: 10,
        pagination : '.pro-module13 .swiper-pagination',
        paginationClickable :true,
        onTouchStart: function(swiper){
           //promod_vid();
        }
    })
	$(".pro-module13 li").each(function(){
		var v_src=$(this).find("video").attr("src");
		if(v_src==""){
			$(this).find("i").remove();
		}
	})
}

function promod15(){
    var promod15Swiper = new Swiper('.pro-module15 .swiper-container', {
        slidesPerView : 3,
        slidesPerGroup : 3,
        spaceBetween: 30,
        pagination : '.pro-module15 .swiper-pagination',
        paginationClickable :true,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            slidesPerGroup : 2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            slidesPerGroup : 1,
            spaceBetween: 10
            }
        }
    })
}

function promod18(){
    var promod18Swiper = new Swiper('.pro-module18 .swiper-container', {
        slidesPerView : 4,
        slidesPerGroup : 1,
        prevButton:'.pro-module18 .swiper-button-prev',
        nextButton:'.pro-module18 .swiper-button-next',
        spaceBetween: 32,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            spaceBetween: 10
            }
        }
    })
    if($(window).width()<=767){
        if($(".pro-module18 li").size()<=1){
           $(".pro-module18 .swiper-button-prev,.pro-module18 .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".pro-module18 li").size()<=4){            
            $(".pro-module18 .swiper-button-prev,.pro-module18 .swiper-button-next").hide();
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".pro-module18 li").size()<=2){
            $(".pro-module18 .swiper-button-prev,.pro-module18 .swiper-button-next").hide();
        }
    }     
}

function promod19(){
    var promod19Swiper = new Swiper('.pro-module19 .swiper-container', {
        slidesPerView : 4,
        slidesPerGroup : 1,
        spaceBetween: 16,
		//autoHeight: true, 
        slidesPerColumn : 3,
        slidesPerColumnFill : 'row',
        pagination : '.pro-module19 .swiper-pagination',
        paginationClickable :true,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            slidesPerColumn : 2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            slidesPerColumn : 1,
            spaceBetween: 10
            }
        }
    })
}
function promod20(){
    var promod20Swiper = new Swiper('.pro-module20 .swiper-container', {
        slidesPerView : 3,
        slidesPerGroup : 1,
        spaceBetween: 30,
        prevButton:'.pro-module20 .swiper-button-prev',
        nextButton:'.pro-module20 .swiper-button-next',
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            spaceBetween: 20
            },
            480: { 
            slidesPerView: 1,
            spaceBetween: 10
            }
        }
    })
    
    if($(window).width()<=767){
        if($(".pro-module20 li").size()<=1){
           $(".pro-module20 .swiper-button-prev,.pro-module20 .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".pro-module20 li").size()<=3){            
            $(".pro-module20 .swiper-button-prev,.pro-module20 .swiper-button-next").hide();
            }
            if($(".pro-module20 li").size()<3){
                $(".pro-module20 .swiper-wrapper").addClass("cen");
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".pro-module20 li").size()<=2){
            $(".pro-module20 .swiper-button-prev,.pro-module20 .swiper-button-next").hide();
        }
    }     
}


function promod22(){
        if($(".pro-module22 li").length>1){
            var prom22Swiper = new Swiper('.pro-module22 .swiper-container', {
                autoplay: false, 
                speed:1000,
                loop: true,
                prevButton:'.pro-module22 .swiper-button-prev',
                nextButton:'.pro-module22 .swiper-button-next',
                autoplayDisableOnInteraction : false,
            })            
        }
        else{
            $(".pro-module22 .swiper-button-prev,.pro-module22 .swiper-button-next").hide();
        }
}

function solutionpart(){
    var solutionSwiper = new Swiper('.solution-part .swiper-container', {
        slidesPerView : 4,
        slidesPerGroup : 1,
        spaceBetween: 0,
        prevButton:'.solution-part .swiper-button-prev',
        nextButton:'.solution-part .swiper-button-next',
        breakpoints: { 
            1023: {
            slidesPerView: 3
            },
            767: { 
            slidesPerView: 1
            }
        }
    })
    if($(window).width()<=767){
        if($(".solution-part li").size()<=1){
           $(".solution-part .swiper-button-prev,.solution-part .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".solution-part li").size()<=4){            
            $(".solution-part .swiper-button-prev,.solution-part .swiper-button-next").hide();
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".solution-part li").size()<=3){
            $(".solution-part .swiper-button-prev,.solution-part .swiper-button-next").hide();
        }
    }    
}

function hisbox(){   
var _ind = 0;
var _len = $(".his-box .swiper-slide").length;
var leftbox_swiper = new Swiper('.his-box .swiper-container', {
    nextButton: '.his-box .swiper-button-next',
    prevButton: '.his-box .swiper-button-prev',
    grabCursor : true,
    slidesPerView:8,
    spaceBetween : 0,
    breakpoints: {       
        1023: {
           slidesPerView: 6,
          },
        767: {
            slidesPerView: 2,
        }
    }
});
if($(window).width()<=767){
    if($(".his-box li").size()<=2){
       $(".his-box .swiper-button-prev,.his-box .swiper-button-next").hide();
    }
}
else if($(window).width()>1023){ 
        if($(".his-box li").size()<=8){            
        $(".his-box .swiper-button-prev,.his-box .swiper-button-next").hide();
        }
}
else if(767<$(window).width()<=1023){ 
    if($(".his-box li").size()<=6){
        $(".his-box .swiper-button-prev,.his-box .swiper-button-next").hide();
    }
}    
    

btnJudge();

$(".his-box .swiper-button-prev").click(function() {
    _ind--;
    btnJudge()
    $(".his-box .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
    $(".his-box .swiper-slide.on").click();
})

$('.his-box .swiper-button-next').click(function() {
    _ind++;
    btnJudge()
    $(".his-box .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
    $(".his-box .swiper-slide.on").click();
})

$(".his-box .swiper-slide").click(function(){
    _ind = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    btnJudge();
    var url = $(this).data("src");
    if(url == ""){
      return false;
    }else{
      caseAjax(".his-cons",url);
    }
})
$(".his-box .swiper-slide").eq(0).click();
    function btnJudge() {
        //console.log(_ind,_len)
        if(_ind >= _len - 1) {
            $('.his-box .swiper-button-next').addClass("disabled")
            _ind = _len - 1;
        } else {
            $('.his-box .swiper-button-next').removeClass("disabled")
        }
        if(_ind <= 0) {
            $(".his-box .swiper-button-prev").addClass("disabled")
            _ind = 0;
        } else {
            $(".his-box .swiper-button-prev").removeClass("disabled")
        }
    }

}



function logopic(){ 
    var logopicSwiper = new Swiper('.logo_pic .swiper-container', {
        slidesPerView : 5,
        slidesPerGroup : 5,
        spaceBetween: 10,
        pagination : '.logo_pic .swiper-pagination',
        paginationClickable :true,
        breakpoints: { 
            1023: {
            slidesPerView: 3,
            slidesPerGroup : 3,
            },
            480: { 
            slidesPerView: 2,
            slidesPerGroup : 2,
            },
            340: { 
            slidesPerView: 1,
            slidesPerGroup : 1,
            }
        }
    })
}


function safemod01(){ 
    var safeSwiper = new Swiper('.safe-module01 .swiper-container', {
        slidesPerView : 3,
        slidesPerGroup : 3,
        spaceBetween: 30,
        prevButton: '.safe-module01 .swiper-button-prev',
        nextButton: '.safe-module01 .swiper-button-next',    
        pagination : '.safe-module01 .swiper-pagination',
        paginationClickable :true,
        breakpoints: { 
            1023: {
            slidesPerView: 2,
            slidesPerGroup : 2,
            spaceBetween: 20
            },
            767: { 
            slidesPerView: 1,
            slidesPerGroup : 1,
            spaceBetween: 10
            }
        }
    })
    if($(window).width()<=767){
        if($(".safe-module01 li").size()<=1){
           $(".safe-module01 .swiper-button-prev,.safe-module01 .swiper-button-next").hide();
        }
    }
    else if($(window).width()>1023){ 
            if($(".safe-module01 li").size()<=3){            
            $(".safe-module01 .swiper-button-prev,.safe-module01 .swiper-button-next").hide();
            }
    }
    else if(767<$(window).width()<=1023){ 
        if($(".safe-module01 li").size()<=2){
            $(".safe-module01 .swiper-button-prev,.safe-module01 .swiper-button-next").hide();
        }
    }    
}



//开关
function rswitch(){
    $('.switch em').on('click',function(){
         if (!$(this).parent().hasClass('on')) {
             $(this).parent().addClass("on");
             //$(this).text("ON");
         } else {
             $(this).parent().removeClass("on");
             //$(this).text("OFF");
         }
     });
}

function newspart(){
        var _ind = 0;
        var _len = $(".news-partt .swiper-slide").length;
        var newspt_swiper = new Swiper('.news-partt .swiper-container', {
            nextButton: '.news-partt .swiper-button-next',
            prevButton: '.news-partt .swiper-button-prev',
            slidesPerView:5,
            spaceBetween : 0,
            //grabCursor : true,
            breakpoints: { 
                1023: {
                    slidesPerView: 3,
                }
            }
        });
        
        btnJudge();
        $(".news-partt .swiper-button-prev").click(function() {
            _ind--;
            btnJudge()
            $(".news-partt .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
            $(".news-partt .swiper-slide.on").click();
        })
        $('.news-partt .swiper-button-next').click(function() {
            _ind++;
            btnJudge()
            $(".news-partt .swiper-slide").eq(_ind).addClass("on").siblings().removeClass("on");
            $(".news-partt .swiper-slide.on").click();
        })
        //$(".news-partt .swiper-slide").click(function(){
            //_ind = $(this).index();
            //$(this).addClass("on").siblings().removeClass("on");
            //btnJudge();
            //var url = $(this).data("src");
            //if(url == ""){
            //return false;
            //}else{
            //caseAjax(".news-partc",url);
            //}
        //})
        //$(".news-partt .swiper-slide").eq(0).click();

        function btnJudge() {
            //console.log(_ind,_len)
            if(_ind >= _len - 1) {
                $('.news-partt .swiper-button-next').addClass("disabled")
                _ind = _len - 1;
            } else {
                $('.news-partt .swiper-button-next').removeClass("disabled")
            }
            if(_ind <= 0) {
                $(".news-partt .swiper-button-prev").addClass("disabled")
                _ind = 0;
            } else {
                $(".news-partt .swiper-button-prev").removeClass("disabled")
            }
        }
}

 //caseAjax
 function caseAjax(str,url){
    $.ajax({
        url:url,
        success:function(msg){
            $(str).html("");
            $(str).append(msg);
            $(".news-partc li").each(function(){
                imgratio()
            })
        }
    });
}


function casemod03(){
    $(".case-module03 li").each(function() {
        if($(this).find(".links p").size() < 5){
            $(this).find("i").hide();
        }
    })
    $(document).on("click", ".case-module03 li .bb", function () {
         $(this).prev(".mm").find(".links").toggleClass("on");
    })
    
}

function share(){

    $(".share_wb").click(function () {
        var url = $(this).data("txt");
        var url = window.location.href;
        var title = document.title;
        var op = "http://service.weibo.com/share/share.php?title=" + title + "&url=" + encodeURIComponent(url) + "";
        window.open(op)
    })
    $(".share_wx").attr("data-qrcode","http://www.xinhongru.com/qrcode/qrcode.php?content="+window.location.href); 
    //$(".share_wx").attr("data-qrcode", "/qrCode/Index.aspx?url=" + window.location.href);
   
    $(".share_wx").click(function () {
		//var url = "/qrCode/Index.aspx?url=" + window.location.href;
		var url = $(this).attr("data-qrcode")
        console.log(url)
        var title = ""
        title += "<div class='weixin'>"
        title += "<i class='c'>x</i>"
        title += "<h2>二维码</h2>"
        title += "<div class='img'><img src='" + url + "' width='100px;' height='100px;'></div>"
        title += "<p>扫一扫</p>"
        title += "</div>"
        $("body").remove(".weixin");
        $("body").append(title)
    })
    $(document).on("click", ".weixin .c", function () {
        $(".weixin").remove();
    })
}


function solution_slide() {
    var sizesnum=10;
    if($(window).width()<1023){
        var sizesnum=6;
    }
    if($(window).width()<767){
        var sizesnum=2;
    }
    var dlCount=Math.ceil($(".solution-slide_hide").find('dl').size()/sizesnum)        
    for(i=0;i<dlCount;i++){
        $('.solution-slide ul').append('<li class="swiper-slide"></li>')
        for(x=0;x<sizesnum;x++){
            $('.solution-slide_hide dl').eq(0).appendTo('.solution-slide li:nth-child('+(i+1)+')')
        }
    }
    var t02Swiper = new Swiper('.solution-slide .swiper-container', {
        autoplay: false,
        prevButton:'.solution-slide .swiper-button-prev',
        nextButton:'.solution-slide .swiper-button-next',
    })
}

function flink_list() {
    var sizesnum=12;
	if($(".flink_list").hasClass("num10")){
        var sizesnum=10;
    }
    if($(window).width()<1279){
        var sizesnum=8;
    }
    if($(window).width()<767){
        var sizesnum=4;
    }
    var dlCount=Math.ceil($(".flink_list_hide").find('dl').size()/sizesnum)        
    for(i=0;i<dlCount;i++){
        $('.flink_list .swiper-wrapper').append('<div class="swiper-slide"></div>')
        for(x=0;x<sizesnum;x++){
            $('.flink_list_hide dl').eq(0).appendTo('.flink_list .swiper-slide:nth-child('+(i+1)+')')
        }
    }
    var t02Swiper = new Swiper('.flink_list .swiper-container', {
        autoplay: false,
        prevButton:'.flink_list .swiper-button-prev',
        nextButton:'.flink_list .swiper-button-next',
    })
}
//
function imckshow(iten) {
	console.log('11')
	$('#imgck').addClass('shou')
 	var swiper = new Swiper('#imgck .swiper-container', {
						nextButton: ' #imgck .swiper-button-next',
						prevButton: ' #imgck .swiper-button-prev',
						initialSlide :iten,
						spaceBetween: 30
					});
}
function guan(){
	$('#imgck').removeClass('shou')
}


//









/*20210621修改：完善个人信息-感兴趣的方向改为多选*/
$(function () {
    monicheckbox();
    check();
})
//模拟多选
function monicheckbox(){
    $(document).on("change", ".label-checkbox input", function () {
        if ($(this).prop("checked")) {
            $(this).parent().addClass("on")
			
			var values="";
                  var checkBoxs = $("#interestlist").find("[type=checkbox]");
                  for(var i =0;i <checkBoxs.length;i++){
                      if(checkBoxs[i].checked){
                          values += $(checkBoxs[i]).val()+",";
                      }
                  }
				  
			if(values.length>0){
                     $("#interest1").html(values.substring(0,values.length-1));
                  }else{
                     $("#interest1").html("您感兴趣的方向");
                  }
			
        } else {
            $(this).parent().removeClass("on")
			
			
			var values="";
                  var checkBoxs = $("#interestlist").find("[type=checkbox]");
                  for(var i =0;i <checkBoxs.length;i++){
                      if(checkBoxs[i].checked){
                          values += $(checkBoxs[i]).val()+",";
                      }
                  }
				  
			if(values.length>0){
                     $("#interest1").html(values.substring(0,values.length-1));
                  }else{
                     $("#interest1").html("您感兴趣的方向");
                  }
				  
				  
        }
    });
    $(".label-checkbox").each(function () {
        if ($(this).find("input").prop("checked")) {
            $(this).addClass("on")
        }
    });
    
}
//end
//模拟多选下拉checkbox
function check(){
     $(".check-box").each(function (i) {
          $(this).find("dt").click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              var el = $(this).parent(".check-box");
              if(el.hasClass('open')){
                      el.removeClass('open');
              }else{
                      el.addClass('open');
                      el.parents("li").siblings("li").find(".check-box").removeClass('open');
                      el.parents("li").siblings("li").find(".select-box").removeClass('open');
              }
          })
          $(this).find("dd").click(function (e) {
            e.stopPropagation();
          })
          $(".check-box").eq(i).find("dd a").each(function (x) {
			    
				
              $(this).click(function () {   
			
                  var el = $(".check-box.open");
                  el.next(".select-hidden").val($(this).attr("data-val"));

                  var values="";
                  var checkBoxs = $(this).parents(".check-box").find("[type=checkbox]");
                  for(var i =0;i <checkBoxs.length;i++){
                      if(checkBoxs[i].checked){
                          values += $(checkBoxs[i]).val()+",";
                      }
                  }
				 
				  
                  if(values.length>0){
                    el.find("dt a").html(values.substring(0,values.length-1));
                  }else{
                    el.find("dt a").html("您感兴趣的方向");
                  }
              })
          })
      })
}
//end

/*20210621修改：完善个人信息-感兴趣的方向改为多选end*/

/*20210623资料下载页面新*/
/* $(function () {
        $(document).on("click",".news-down li dd .zan",function(){
            if(!$(this).hasClass("on")){
                $(this).addClass("on");
                var inum=$(this).find("i").text();
                inum++;
                $(this).find("i").html(inum);
            }
            else{
                $(this).removeClass("on");
                var inum=$(this).find("i").text();
                inum--;
                $(this).find("i").html(inum);
            }
        })
 })
 */
 //end
 $(document).ready(function() {
     /*20210709新增组件35*/
	 if($(".pro-module35").length>0){
		$(".pro-module35").mCustomScrollbar({
                    axis:"x",
                    advanced:{autoExpandHorizontalScroll:true}
        });
	}
	//end
 })
 
 
 
/*20210730新增咨询综合页面*/
$(function () {
    var _ind = GetQueryString("index");
	if(_ind){
		$(".consult-box li:eq(" + _ind + ")").addClass("on");
	}else{
		$(".consult-box li:eq(0)").addClass("on");
    }
})
function GetQueryString(parm) {
    var reg = new RegExp("(^|&)"+ parm +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    if(r!=null) {
		return  unescape(r[2]); 
	} else {
		return null;
	}
}
/*20210730新增咨询综合页面end*/

/*20210824新增页面&&变更供应商关系页面*/
$(function () {
    public_ajax();    
    $(".education-part04 li .txt").mCustomScrollbar();

    if($(window).width()>767){
        var h_max = 0;
        $('.dasctf-part03 li').each(function() {
            var h = $(this).height();
            h_max = h > h_max ? h : h_max; 
        });
        $('.dasctf-part03 li').height(h_max); 
    }

    //模拟单选
    $(document).on("click", ".label-radio", function () {
        $(this).addClass("on").siblings().removeClass("on");
    });
    $(".label-radio").each(function () {
        if ($(this).find("input").prop("checked"))
        {
            $(this).addClass("on")
        }
    });

    //无限下载
    function public_ajax() {
        if($(".ajLoad").length>0){
            var $resourceTypeList = $('.ajLoad ul');        
            $resourceTypeList.infinitescroll({
                navSelector: "#public_more",
                nextSelector: "#public_more a",
                itemSelector: ".public_li",
                clickb: true,
                clickobj: ".public_loadmore",
                loading: {
                    img: "../images/loading.gif",
                    msgText: ' ',
                    finishedMsg: '',
                    finished: function() {
                        $("#infscr-loading").hide();
                        imgratio();
                    }
                },
                errorCallback: function() {
                    $(".public_loadmore").after("<div class='finMessage' style='background:rgba(0,0,0,0.4); position:fixed; width:100px; height:50px; line-height:50px;overflow:hidden; border-radius:10px; text-align:center; color:#fff; left:50%; top:50%; z-index:1000; margin:-15px 0 0 -50px;'>没有了</div>");
                    $(".public_loadmore").hide();
                    setTimeout(function () {
                        $(".finMessage").fadeOut();
                    }, 500)
                }
            }, function(newElements) {
                var $newElems = $(newElements);
                $newElems.fadeIn();
                return;
            });
        }
    }
})
/*20210824新增页面&&变更供应商关系页面end*/