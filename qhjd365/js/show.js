// JavaScript Document
$(function(){
	//总标签页	
	$(".tags_cont").hover(function(){
		$(this).css("background","#f8f8f8");	
		},function(){
		$(this).css("background","none");	
	})
		//热门标签颜色样式
	var itmNum = $("#tagscloud a").length;
	var arr= ['tagc1','tagc2','tagc3','tagc4','tagc5'];
	for(var i=0;i<itmNum;i++){
		var b = arr[i%arr.length];
		$("#tagscloud a").each(function(i) {
			$(this).addClass(arr[i%arr.length]);
		});
	}
 	
	$('.zglh_imah a').find('span').hide();
	$('.zglh_imah a').mouseover(function(){
		$(this).find('span').show();
		});	
	$('.zglh_imah a').mouseout(function(){
		$(this).find('span').hide();
		})
	$('.zglh_pages a').mouseover(function(){
		$(this).css({background:'#ff4a00',color:'#fff'});
		})
	$('.zglh_pages a').mouseout(function(){
		$(this).css({background:'#fff',color:'#666'});
		})
	$('.zglh_ios').mouseover(function(){
		$(this).addClass('zglh_iosbj');
		$('.zglh_poimg01').show();
		});
	$('.zglh_ios').mouseout(function(){
		$(this).removeClass('zglh_iosbj');
		$('.zglh_poimg01').hide();
		});
	$('.zglh_andr').mouseover(function(){
		$(this).addClass('zglh_andrbj');
		$('.zglh_poimg02').show();
		});
	$('.zglh_andr').mouseout(function(){
		$(this).removeClass('zglh_andrbj');
		$('.zglh_poimg02').hide();
		});
		
	$(".oPubNavShow").hover(function(){

		$(".oPubAsideNav").show();

	},function(){
 
		$(".oPubAsideNav").hide();

	});
	
	//固定
	var topMain=$(".heard").height()+$(".offcn_top").height()+$(".nav").height()+$(".zglh_tjydbox").height()+96;
	console.log(topMain);
	var top=$(".zghd_scroll").offset().top;
	console.log(top);
	$(window).scroll(function(){
	  if ($(window).scrollTop()>topMain){
		  $(".zghd_scroll").addClass("zghd_static");}
	  else{
		  $(".zghd_scroll").removeClass("zghd_static");
	  }
	    var doc = document,win = window
		var ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
		var bot = $(".footer").height() + 70;
		if(ScrollBottom < bot){
			$(".zghd_scroll").addClass("nav_scroll_abs");
			$(".zghd_scroll").removeClass("zghd_static");
		}
		else
		{
			$(".zghd_scroll").removeClass("nav_scroll_abs");
		}
	});
	
	//列表分页
	 $(".select_txt,.selet_open").hover(function(event){   
		//event.stopPropagation();
		$(".option").hide();
		$(this).siblings(".option").show();
		$(".select_box").removeClass("uiChooseActiveS");
		$(this).parent(".select_box").addClass("uiChooseActiveS");
	});

	$(document).click(function(event){
		var eo=$(event.target);
		if($(".select_box").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length)
		$('.option').hide();
		$(".select_box").removeClass("uiChooseActiveS");									  
	});

	/*赋值给文本框*/
	$(".option a").click(function(){
		var value=$(this).text();
		$(this).parent().siblings(".select_txt").text(value);
		$(".select_value").val(value);
		$(".option").hide();	
		$(".select_box").removeClass("uiChooseActiveS");
	 })

	$(".option").each(function(d) {
        var optionSize=6;
		 var optionLiHeight=$(".option a").height();
		 var optionVarS=$(this).find("a").length;
		 if(optionVarS>optionSize){
			var optionSheight=175;
			$(this).height(optionSheight);
		}else{
			 var optionLiTal=optionVarS*optionLiHeight;
			$(this).height(optionLiTal);	
		};
    });
	$(".option,.uiChooseTable,.mod_select ").mouseleave(function(){
		$(".select_box").removeClass("uiChooseActiveS");
		$(".option").hide();
	});
	
	
});

