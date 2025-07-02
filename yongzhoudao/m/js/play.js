var player={
	 AdTime:0,            //广告加载时间(单位:秒),设为0时不显示
	AdUrl:'', //广告页面地址 
	 initial:function(id,ggTime){
						 this.AdTime=ggTime;
						   $("#movieplay").html("<iframe scrolling='no' src='about:blank' frameborder='0' id='playframe' name='playframe' style='width:100%;min-height:300px;height:100%'></iframe>")
						   this.doPlay(classid,id);
	 },
	doPlay:function(classid,id){
		this.start(classid,id)
	 },
    start: function(classid,id){
		$("#playframe").attr("src","http://m.tv.bingdou.net/e/DownSys/play/?classid="+classid+"&id="+id+"&pathid=0");
	 }
}