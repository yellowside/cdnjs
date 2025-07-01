var $window = $(window),           
	ww = $window.width(),
	wh = $window.height();

if(ww<=500){
    $('#message').removeClass('pc_msg');
    $('#message').addClass('position_center');
    $('.message-box').addClass('position_center');
    
}

$(function() {
    var ws = new ScrollWatch({
        watchOffset: -50,
        onElementInView:function(data){

        }
    });
	$('.m-close').click(function() {
		if ($('body').hasClass('on')) {
			$('body').removeClass('on');
		} else {
			$('body').addClass('on');
		} 
	});

	if(ww <= 1200){
		$('nav.nav-top > ul > li').click(function() {
            var that = $(this);
            var m = null;
            var Switch = $(this).attr('date-switch');
            if(Switch==0){
                Switch=1;
                $(this).find('.top-sub-menu').stop().slideDown(600, 'easeOutBack');
                that.attr('date-switch',Switch);
            }else{
                Switch=0;
                $(this).find('.top-sub-menu').stop().slideUp(500, 'easeInOutBack');
                that.attr('date-switch',Switch);
            }        
        })
	}else{
        $('nav.nav-top > ul > li').hover(function() {
            $(this).find('.top-sub-menu').stop().slideDown(400, 'easeInOutQuad');
        },
        function() {
            $(this).find('.top-sub-menu').stop().slideUp(400, 'easeInOutQuad');
        });
    }
    if(ww>768){
        // 侧栏
        $('.aside-nav-close').click(function() {
            $('.aside-nav').stop().animate({right:"-100px"},625,"easeOutCubic");
        });
       

        $(function () {  
            $(window).scroll(function(){  
                if ($(window).scrollTop()<=100){  
                    $('.aside-nav').stop().animate({right:"30px",opacity:1},625,"easeOutCubic");
                }  
            });  
        });
    }
    
})

window.onload = function(){
    $('aside').css('opacity',1);
    $('#message').css('opacity',1);

}

function backTop(){
    $('body,html').animate({scrollTop: 0},600);
}

var IE = null;
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") 
{ 
    IE = 6;
} 
else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
{ 
    IE = 7;
} 
else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
{ 
    IE = 8;
} 
else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") 
{ 
    IE = 9;
} 

if (IE==6||IE==7||IE==8){
    window.location.href='http://cdn.dmeng.net/upgrade-your-browser.html?referrer='+location.href;
}

/**
* [isNeeded 判断页面是否有这个元素 ]
* @param  {String}  selectors [JQ选择符]
* @return {Boolean}           [返回true/false]
*/
function isNeeded(selectors){
    var selectors = (typeof selectors == 'string') ? [selectors] : selectors,
        isNeeded;
    for(var i=0;i<selectors.length;i++){
        var selector = selectors[i];
        if( $(selector).length > 0 ) { 
            isNeeded = true; 
            break; 
        }
    };
    return isNeeded ;
};
//playbox
if(isNeeded('#playbox')){
$(
 function(){
	 if (classid && id){
		 $("#playbox").load("http://home.qianqi.net/e/DownSys/play/?classid="+classid+"&id="+id+"&pathid=0");
	 }
 }
)
}