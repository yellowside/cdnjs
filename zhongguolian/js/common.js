 var host="www.zhongguolian.vip"; 
 function rechange(str){
	c_str=str.replace(/document.write\("/g,"").replace(/"\);/g,"").replace(/\\\"/g,"\"").replace(/\\\'/g,"\'").replace(/\\\//g,"\/").replace(/\\\\/g,"\\");
	return c_str;
 } 
$(document).ready(function(){
/*  新增一个菜单 */	
$(".topbar").append("")
  $(".search-show").click(function(){  
    $(".site-search,.navto-search").toggleClass("active");
	$(".sbtn").toggleClass("fa-remove");
  });
$(".minnav").click(function(){
    $(".minul").toggleClass("active");
  });  
//用户中心左边导航
$("#nav_id li a").each(function(i){	
  if($(this).html()==$("#title_id").html()){
  $(this).parent().addClass("crt");	
  }
});
//用户登录状态
url="//"+host+"/e/member/login/loginjs.php";
$.get(url,function(data){
	if(data.length>21){
	loginjs=rechange(data);	
	$(".loginjs").html(loginjs);
	}
})
//回顶部
$(window).scroll(function(){
	//设置回顶部按钮的位置
		if($(window).width()>1200){
			cha_width=$(window).width()-1200;
			width=cha_width/2-30;
			$("#elevator_item").css("width",width+"px");
		}
		var scrolltop=$(this).scrollTop();
		if(scrolltop>=200){
			$("#elevator_item").fadeIn();
		}else{
			$("#elevator_item").fadeOut();
		}		
	});
	$("#elevator").click(function(){
		$("html,body").animate({scrollTop: 0}, 500);
	});
	$(".qr").hover(function(){
		$(".qr-popup").fadeIn();
	},function(){
		$(".qr-popup").fadeOut();
	});
  
}); 
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
function length() {
    $(".cli").each(function() {
        if ($(this).find("li").size() > 1) {
            var mun = 0;
            var $this = $(this);
            console.log($this.find("li").size());
            for (i = 1; i <= $this.find("li").size(); i++) {
                mun = mun + $this.find("li").eq(i - 1).width() + 50;
            }
            $this.css("width", mun + 'px');
        }
    })
}

if(isNeeded('.game_Commend')){
$(function(){topBlock($(".topBlock_B"));topBlock($(".topBlock_A"));tab1($(".game_com_tab li"),$(".game_com_list"),"on","click");tab1($(".flink_tab li p"),$(".flink_con"),"on","click");});function topBlock(obj){$(".topBlock_B").find(".topBlock-bg").hide();$(".topBlock_B").find(".topBlock-bg-on").show().css({"width":$(".topBlock_B").width()-6+"px","height":$(".topBlock_B").height()-6+"px"});obj.each(function(){if($.browser.msie&&parseInt($.browser.version)<=6){obj.find(".topBlock-bg").css("height",obj.height()+'px');}
	obj.hover(function(){if(obj.has("topBlock_A")){$(".topBlock_B").find(".topBlock-bg").show();$(".topBlock_B").find(".topBlock-bg-on").hide();}
	$(this).find(".topBlock-bg").hide();$(this).find(".topBlock-bg-on").show().css({"width":$(this).width()-6+"px","height":$(this).height()-6+"px"});},function(){$(this).find(".topBlock-bg").show();$(this).find(".topBlock-bg-on").hide();})})
	$(".topBlock").mouseleave(function(){$(".topBlock_B").find(".topBlock-bg").hide();$(".topBlock_B").find(".topBlock-bg-on").show().css({"width":$(".topBlock_B").width()-6+"px","height":$(".topBlock_B").height()-6+"px"});})}
	
	$(function(){$(".game_com_list").each(function(){var line=$(this).find(".line");$(this).find("li").each(function(i){$(this).hover(function(){$(this).siblings().removeClass("on");$(this).addClass("on");line.stop(true,false).animate({"left":$(this).position().left+25+'px'},500)});});});$(".game_top_app").each(function(){$(this).find(".top_app").each(function(){$(this).mouseover(function(){$(this).siblings().removeClass("hover");$(this).addClass("hover");})});});$(".game_package .package").each(function(){$(this).mouseover(function(){$(this).siblings().removeClass("on");$(this).addClass("on");})});$(".flink_tab li p").bind("click",function(){$(".flink_tab .line").animate({"left":$(this).position().left+'px'},500);});$(".evaluating li").each(function(){$(this).hover(function(){$(this).find(".tit_bg").hide().fadeIn(300);$(this).find(".big").css("top",-$(this).find(".big").height()+'px').animate({top:0},300);},function(){});});bline($(".week_img"));bline($(".game_newgonglue .gonglue_img"));bline($(".game_zone .zone_img"));bline($(".video_A"));bline($(".video_B"));bline($(".game_zixun .zixun"));$(".game_gonglue .bd li").each(function(){if($(this).find(".c a").height()<48){$(this).find(".c").css("padding-top","16px");}});});
	
	$(function(){var roll=$(".albums_list ul"),roll_w=roll.find("li"),r_s=roll_w.size(),r_w=roll_w.width()+19,next=$(".albums_btn .next"),prve=$(".albums_btn .prve"),page=1,num=Math.ceil(r_s/3);roll.css("width",r_s*r_w+'px');prve.addClass("on");prve.bind("click",function(){if(page>0&&!roll.is(':animated')){if(page==1){return false;}else{roll.animate({left:'+='+r_w+'px'},500);page--;if(page==1){prve.addClass("on");}else{prve.removeClass("on");}
	if(page==num){next.addClass("on");}else{next.removeClass("on");}}}});next.bind("click",function(){if(page<=num&&!roll.is(':animated')){if(page==num){return false;}else{roll.animate({left:'-='+r_w+'px'},500);page++;if(page==num){next.addClass("on");}else{next.removeClass("on");}	
	if(page==1){prve.addClass("on");}else{prve.removeClass("on");}}}});});
	
	function init_imglazyload(){var showeffect="fadeIn";if($.browser.msie&&parseInt($.browser.version)<=7){showeffect="show";}
	$("img[data-original]").lazyload({placeholder:" ",effect:showeffect,failurelimit:5,threshold:100});}
}
if(isNeeded('#slide')){
	$(function(){(function($){$.fn.Slide=function(options){var defaults={item:"slide-item",nav:"slide-nav",nowClass:"nownav",loading:"slide-loading"},options=options||{};options=$.extend(defaults,options);var cont=$(this),item=cont.find("."+options.item),nav=cont.find("."+options.nav),curr=options.nowClass,len=item.length,width=item.width(),html="",index=order=0,timer=null,lw="-"+width+"px",rw=width+"px",newtimer,ld=cont.find("."+options.loading);item.each(function(i){$(this).css({left:i===index?0:(i>index?width+'px':'-'+width+'px')});html+='<a href="javascript:">'+(i+1)+'</a>';});$("#slide").hover(function(){$('#next').fadeIn();$('#prev').fadeIn();},function(){$('#next').fadeOut();$('#prev').fadeOut();});nav.html(html);var navitem=nav.find("a");navitem.eq(index).addClass(curr);function anim(index,dir){loading();if(order===len-1&&dir==='next'){item.eq(order).stop(true,false).animate({left:lw});item.eq(index).css({left:rw}).stop(true,false).animate({left:0});}else if(order===0&&dir==='prev'){item.eq(0).stop(true,false).animate({left:rw});item.eq(index).css({left:lw}).stop(true,false).animate({left:0});}else{item.eq(order).stop(true,false).animate({left:index>order?lw:rw});item.eq(index).stop(true,false).css({left:index>order?rw:lw}).animate({left:0});}
	order=index;navitem.removeClass(curr).eq(index).addClass(curr);}
	function next(){index=order>=len-1?0:order+1;_stop();ld.stop(true,true).animate({"width":0},0);anim(index,'next');timer=setInterval(next,5000);}
	function prev(){index=order<=0?len-1:order-1;_stop();ld.stop(true,true).animate({"width":0},0);anim(index,'prev');timer=setInterval(next,5000);}
	function auto(){loading();timer=setInterval(next,5000);}
	function _stop(){clearInterval(timer);}
	function loading(){ld.css({"height":"0","height":"5px","position":"absolute","left":"0","bottom":"0","background":"#FF4939","z-index":"10"});ld.animate({"width":"100%"},5000).animate({"width":0},0);}
	return this.each(function(){auto();navitem.hover(function(){_stop();var i=navitem.index(this);if(/nownav/.test($(this).attr('class'))){return false;}
	if(newtimer)clearTimeout(newtimer);newtimer=setTimeout(function(){_stop();ld.stop(true,true).animate({"width":0},0);anim(i,this);},250);},auto);$('#next').on('click',next);$('#prev').on('click',prev);});};})(jQuery);$("#slide").Slide();})
}

//增加文章阅读数
if(isNeeded('.art_info')){
	url="//"+host+"/e/public/onclick/?enews=donews&classid="+classid+"&id="+id;
    $.post(url,function(){});
}

//模板列表
if(isNeeded(".hc_piclist_box")){
	var $container = $('.hc_piclist_box');
	wd=window.screen.width;
	if(wd>480){	
		$container.imagesLoaded( function(){
		  $container.masonry({
			itemSelector : '.picbox'
		  });
		});
	}
}

//加载会员中心表格样式
if(isNeeded('.usercp')){
	$(".usercp table").addClass("hc-table");
}

//加载百度分享
if(isNeeded('.bdsharebuttonbox')){

	window._bd_share_config={"common":{"bdSnsKey":{"tsina":"312908333","tqq":"801233427"},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//cdn.bingdou.vip/gh/yellowside/baiduShare/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}

//playbox
if(isNeeded('#playbox')){
$(
 function(){
	 if (classid && id){
		 $("#playbox").load("//"+host+"/e/DownSys/play/?classid="+classid+"&id="+id+"&pathid=0");
	 }
 }
)
}

//判断是不是有右边浮动广告
if(isNeeded('.float_ad')){
	$(function(){$(function() {
	// 检查对象，#sidebar-tab是要随滚动条固定的ID，可根据需要更改
		var offset = $('.float_ad').offset(); //1965		
		fh_left=$('.fh_left').height();
		fh_right=$('.fh_right').height();
		if(fh_left>fh_right){
		$(window).scroll(function () {	
		// 检查对象的顶部是否在游览器可见的范围内		
		var scrollTop = $(window).scrollTop();		
			if (offset.top < scrollTop){
				$('.float_ad').addClass('float_ad_fixed');
				}else{
					$('.float_ad').removeClass('float_ad_fixed');
				}
			});
		}
		});
	})	
}