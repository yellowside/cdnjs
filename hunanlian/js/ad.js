if(window.screen.width>728){
//ȫվͨ�������ֱ��ʴ���728����ʾ
	if(isNeeded('#all_ad')){
		$(document).ready(function(){
			$("#all_ad").html('<div class="ad1" style="width:1000px!important; height:90px;margin: 0 auto;"><a href="http://www.zhongguolian.vip/" target="_blank"><img src="http://web.bingdou.net/d/file/d2d59cf8407e7a51040b8881bc4bfd19.jpg" alt="" style="width:1000px!important; height:90px"/></a></div>');
		})
	}
}
//�ж��ǲ������ұ߸������
if(isNeeded('.float_ad')){
	$(function(){$(function() {
	// ������#sidebar-tab��Ҫ��������̶���ID���ɸ�����Ҫ����
		var offset = $('.float_ad').offset(); //1965		
		fh_left=$('.fh_left').height();
		fh_right=$('.fh_right').height();
		if(fh_left>fh_right){
		$(window).scroll(function () {	
		// ������Ķ����Ƿ����������ɼ��ķ�Χ��		
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
/* ����ҳ��� */
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