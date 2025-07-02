 var host="www.yongzhoudao.com";
 function rechange(str){
	c_str=str.replace(/document.write\("/g,"").replace(/"\);/g,"").replace(/\\\"/g,"\"").replace(/\\\'/g,"\'").replace(/\\\//g,"\/").replace(/\\\\/g,"\\");
	return c_str;
 } 
$(document).ready(function(){
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
//加载会员中心表格样式
if(isNeeded('.usercp')){
	$(".usercp table").addClass("hc-table");
}
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
//playerbox
if(isNeeded('#playerbox')){
$(
 function(){
	 if (classid && id){
		 $("#playerbox").load("//"+host+"/e/DownSys/play/?classid="+classid+"&id="+id+"&pathid=0");
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

//加载百度分享
if(isNeeded('.bdsharebuttonbox')){
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}
// 百度推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
// 360推送
(function(){
var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?e141dc1d6903e1110bd8fe1fa4fc52c9":"https://jspassport.ssl.qhimg.com/11.0.1.js?e141dc1d6903e1110bd8fe1fa4fc52c9";
document.write('<script src="' + src + '" id="sozz"></script>');
})();