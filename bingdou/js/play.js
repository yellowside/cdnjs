var player={
	 AdTime:0,
	AdUrl:'', 
	 initial:function(id,ggTime){
						 this.AdTime=ggTime;
						   $("#movieplay").html("<iframe scrolling='no' src='about:blank' frameborder='0' id='playframe' name='playframe' style='width:100%;min-height:250px;height:100%'></iframe>")
						   this.doPlay(id,0);
	 },
	doPlay:function(id,pathid){
		this.start(id,pathid)
	 },
    start: function(id,pathid){
		$("#playframe").attr("src","http://www.bingdou.net/e/DownSys/play/?classid=1&id="+id+"&pathid="+pathid+"");
	 }
}