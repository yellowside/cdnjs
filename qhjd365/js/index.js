 //banner
$(function()

  {

	  var oBox = document.getElementById('box');

	  var oPrev = getByClass(oBox,'prev')[0];

	  var oNext = getByClass(oBox,'next')[0];

	  var oBigUl = getByClass(oBox,'bigUl')[0];

	  var aLiBig = oBigUl.getElementsByTagName('li');

	  var oNumUl = getByClass(oBox,'numberUl')[0];

	  var aLiNumber = oBigUl.getElementsByTagName('li');

	  var bLiNumber = oNumUl.getElementsByTagName('li');

	  var nowZindex = 1;

	  var now = 0;

	  var btn = "";

	  function tab()

	  {

		   for(var i=0; i<aLiNumber.length; i++)

			  {

				  bLiNumber[i].className = '';

				 

			  }

			  bLiNumber[now].className = 'night';

			

		  aLiBig[now].style.zIndex = nowZindex++;

		  aLiBig[now].style.opacity = 0;

		  startMove(aLiBig[now],'opacity',100);		  

	  }

	  

	  for(var i=0; i<aLiNumber.length; i++)

	  { btn += "<li>" + (i+1) + "</li>";

		 

	  }

	    $(".numberUl").append(btn);  

	   for(var i=0; i<bLiNumber.length; i++)

	  {

		  bLiNumber[i].index = i;

		  bLiNumber[i].onclick = function()

		  {

			 

			  if(this.index==now)return;

			  now = this.index;

			 

			  tab();

		  }

	  }

	

	  oNext.onmouseover = oPrev.onmouseover = oBigUl.onmouseover = function()

	  {

		  startMove(oPrev,'opacity',100);

		   startMove(oNext,'opacity',100)

	  }

	  oNext.onmouseout = oPrev.onmouseout = oBigUl.onmouseout = function()

	  {

		  startMove(oPrev,'opacity',0);

		  startMove(oNext,'opacity',0)

	  }

	  oPrev.onclick = function()

	  {

		  now--

		  if(now==-1)

		  {

			  now=aLiNumber.length-1;

		  }

		  tab();

	  }

	  

	    oNext.onclick = function()

	  {

		  now++

		  if(now==aLiNumber.length)

		  {

			  now=0;

		  }

		  tab();

	  }

	  

	  var timer = setInterval(oNext.onclick,3000)

	  oBox.onmouseover = function()

	  {

		  clearInterval(timer)

	  }

	  oBox.onmouseout = function()

	  {

		  timer = setInterval(oNext.onclick,3000)

	  }

  })
  
$(function(){	
  //切换
  $(".con3").find(".zghd_con3box").hide();
  $(".con3").find(".zghd_con3box:first").show();
  $(".con3_tit a").each(function(c){
	$(this).hover(function(){
	  $(".con3_tit a").removeClass("on");
	  $(this).addClass("on");
	  $(".zghd_con3box").hide();
	  $(".zghd_con3box").eq(c).show();
	})
  });
  
 	//IT在线学习
 	$(".itxx a").each(function(c) {
        $(this).hover(function(){
		$(".itxx a").removeClass("on");
		$(this).addClass("on");
		$(".itxx_nr").hide();
		$(".itxx_nr:eq("+c+")").show();
	})
    });
 
  //就业喜报
  jQuery(".zghd_jyfc").slide({ mainCell:".zghd_jycon2", titCell:".zghd_jybtn span", effect:"left", autoPage:true, autoPlay:true, scroll:3, vis:3});
  
  //合作企业
$(".partner_tit ul li").each(function(c){
	$(this).hover(function(){
		$(".partner_tit ul li").removeClass("on");
		$(this).addClass("on");
		$(".partner").hide();
		$(".partner:eq("+c+")").show();
	})
})
  
  //好书推荐
  jQuery(".zghd_bookbox").slide({mainCell:".zghd_c6", prevCell:".bookprve", nextCell:".booknext", autoPage:true, effect:"left", autoPlay:true, vis:5});
  
  $(".c8_list").each(function(){

		$(this).mousemove(function(){

			$(this).find(".c8_bj").show();

			$(this).find(".c8_nr").show();

			$(this).find(".c8_bm").show();

			}).mouseout(function(){

			$(this).find(".c8_bj").hide();

			$(this).find(".c8_nr").hide();	

			$(this).find(".c8_bm").hide();

				})

		});
		
  //底部微信
  $(".bottelcon dd").hover(function(){
     $(this).addClass("hover").find(".zghd_botwx").show();},function(){
		 $(this).removeClass("hover").find(".zghd_botwx").hide();});
  //滚动条
  var Sca=document.getElementById('sbox');
	bbScroll( Sca );
	function bbScroll(obj){
		new ttScrollBar({
			container:obj,	//要加滚动条的对象
			isBuffer:true,				//是否开启缓冲效果
			isMouseWheel:true,   		//是否开启鼠标滚动
			isOpenKeyEvent:false,	//是否支持键盘按键
			rollScale:100,				//缓冲最小单位值
			focusObj:'scroll',			//鼠标滚轮焦点对象 可选 document,scroll,scrollBar
			scrollEventType:'mouseover', //mousedown,mouseover 两种类型
			scrollBarClass:'scrollBar',  //class
			scrollHandleClass:'scrollHandle',
			scrollDValue:0  	//滚动的差值,上下的和
		})
  }
  
  
    $("#offcn_link dt a").each(function(x){

		$(this).mousemove(function(){

	    $("#offcn_link dt a").removeClass("new_it");

		$(this).addClass("new_it");

		$("#offcn_link dd").hide();

		$("#offcn_link dd:eq("+x+")").show();

			});

		});
	 
	//培训事业部分
	$(".px_change").each(function(){
		$(this).find(".px_change_list").first().show().siblings().hide();
	});
	$(".px_list").each(function(){
		$(this).find("li").mouseover(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(this).parent().next().find(".px_change_list").hide();
			$(this).parent().next().find(".px_change_list").eq($(this).index()).show();
		});
	});

});
