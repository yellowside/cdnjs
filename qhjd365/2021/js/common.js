 var host="qh.qianqi.net"; 
 function rechange(str){
	c_str=str.replace(/document.write\("/g,"").replace(/"\);/g,"").replace(/\\\"/g,"\"").replace(/\\\'/g,"\'").replace(/\\\//g,"\/").replace(/\\\\/g,"\\");
	return c_str;
 }
$(document).ready(function(){
//搜索
  $(".search-show").click(function(){  
    $(".site-search,.navto-search").toggleClass("active");
	$(".sbtn").toggleClass("fa-remove");
  });
$(".minnav").click(function(){
    $(".minul").toggleClass("active");
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
//用户中心左边导航
$("#nav_id li a").each(function(i){	
  if($(this).html()==$("#title_id").html()){
  $(this).parent().addClass("crt");	
  }
});
//用户登录状态
url="http://"+host+"/e/member/login/loginjs.php";
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

//playerbox
if(isNeeded('#playbox')){
$(
 function(){
	 if (classid && id){
		 $("#playbox").load("http://"+host+"/e/DownSys/play/?classid="+classid+"&id="+id+"&pathid=0");
	 }
 }
)
}
