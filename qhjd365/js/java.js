
$(function(){
		$('.itoutside').hover(function(){
			$(this).find('i').css('color','#ff4a00');
		},function(){
			$(this).find('i').css('color','');
		});	
	});


//悬浮
$(function(){

	$(".fixBtnOpen").click(function(){

		$(".indexFix").stop().animate({right:0},500);

		//$(".fixBtnOpen").addClass("fixBtnClose");

		$(".fixBtnOpen").hide();

		$(".fixBtnClose").show();

		});

	$(".fixBtnClose").click(function(){

		$(".fixBtnOpen").show();

		$(".fixBtnClose").hide();

		$(".indexFix").animate({right:-162},500);

	});

	
})





$(function(){
    //侧导航
	$(".aside_nav li").each(function(){

		$(this).mousemove(function(){

			//$(".aside_nav li").children("a").removeClass("click_nav");

			$(this).children("a").addClass("click_nav");

			//$(".aside_nav li").children("div").hide();

			$(this).children("div").show();

			}).mouseout(function(){

				$(".aside_nav li").children("a").removeClass("click_nav");

				$(".aside_nav li").children("div").hide();

				})

		})
    //头部经过效果
	$(".heard_left span").each(function(d) {
        $(this).hover(function(){
            $(this).append("<em></em>");
        },function(){
            $(this).find("em").remove();
        });
    });
	//省份选择
	$(".zghd_city").mouseenter(function(){
		$(".zghd_city").addClass("on");
		$(".zghd_cityh").show();
	})
	$(".zghd_citybox").mouseleave(function(){
		$(".zghd_city").removeClass("on");
		$(".zghd_cityh").hide();
	})	
	//导航	
	$(".zg_nav span").each(function(){
		$(this).hover(function(){
			$(this).children("a").addClass("zg_nav_click");
			$(this).children("div").show();
			},function(){
			$(this).children("a").removeClass("zg_nav_click");
			$(this).children("div").hide();
			})
		})
		
	
})



function timg(){

	var Timg = document.getElementsByTagName('img')

	var Tsrc = Timg[Timg.length-1].src;

	var Tcsrc = Tsrc.split("/");

	if(Tcsrc[2] == 'dt.offcn.com')

	{

		Timg[Timg.length-1].style.display='none';

	}

	else

	{

		setTimeout(timg,1000);	

	}

	/*Timg[Timg.length-1].style.display='none';*/	

}

setTimeout(timg,1000);

