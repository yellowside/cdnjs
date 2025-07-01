if(window.screen.width>728){
//全站通栏，当分辨率大于728才显示
	if(isNeeded('#all_ad')){
		$(document).ready(function(){
			$("#all_ad").html('<div class="ad1" style="width:1000px!important; height:90px;margin: 0 auto;"><a href="http://www.zhongguolian.vip/" target="_blank"><img src="http://web.bingdou.net/d/file/d2d59cf8407e7a51040b8881bc4bfd19.jpg" alt="" style="width:1000px!important; height:90px"/></a></div>');
		})
	}
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
/* 内容页广告 */
if(isNeeded('#text_ad1')){
	$(document).ready(function(){
	if(window.screen.width>728){
	$('#text_ad1').html('<a href="http://www.zhongguolian.vip/" target=_self><img src="http://web.bingdou.net/d/file/d2d59cf8407e7a51040b8881bc4bfd19.jpg" border=0 width="" height="60" alt=""></a>');
}else{	
		$('#text_ad1').html('');		
		$("#list_right_ad2_t").after('');
		}
	})
}