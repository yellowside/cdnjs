// JavaScript Document
$(function(){
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
	})