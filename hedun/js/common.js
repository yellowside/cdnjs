$(function () {
    wowInt();
    findTel();
    phoneTargetSelf();
    $(window).resize();
    nav();
    wowDelay(".index_01 ul",$('.index_01 ul li').length,"0.2");
    wowDelay(".index_list ul",$('.index_list ul li').length,"0.2");
    
    select()
})

function nav(){

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('body').addClass('scrollHeader');
			$(".back_top").show().stop().animate({"opacity":1});
           
        } else {
            $('body').removeClass('scrollHeader');
			$(".back_top").stop().animate({"opacity":1},function(){
                $(".back_top").hide();
            });
        }
    });	
	$(".back_top").click(function(){
        $("html,body").stop().animate({scrollTop:0});
    })
    
    
    if($(window).width()>1024){         
        $(".nav li").hover(function() {
            $(this).find(".navlist").stop().slideDown();
            pnav_slide();              
        }, function() {
            $(this).find(".navlist").stop().slideUp();
        });
        $(".pimglist li").eq(0).addClass("on");
        $(".navlist .pli_01>h3").hover(function() {            
            if(!$(this).parent(".pli_01").hasClass("pli_01_safe")){
                $(this).parent(".pli_01").addClass("on").siblings().removeClass("on");
                var ind = $(this).parent(".pli_01").index();
                $(".pimglist li").eq(ind).addClass("on").siblings().removeClass("on");
                pnav_slide();
                $(this).parents(".pro_ser_menu").removeClass("pro_menu_safe");
            }
            else{
                $(this).parent(".pli_01").addClass("on").siblings().removeClass("on");
                $(this).parents(".pro_ser_menu").addClass("pro_menu_safe");
            }
        }, function() {
        });

        /*$(".navlist .pli_02>h4").hover(function() {
            if(!$(this).next(".pitem_block").hasClass("pitem_block_an")){
                $(this).parent(".pli_02").addClass("on").siblings().removeClass("on");
                $(this).parents(".pro_menu_safe").removeClass("pro_menu_an");
            }
            else{
                $(this).parent(".pli_02").addClass("on").siblings().removeClass("on");
                $(this).parents(".pro_menu_safe").addClass("pro_menu_an");
            }
            
        }, function() {
        });*/
       
        $(".navlist .pli_03>h5").hover(function() {
            if($(this).parents(".pli_01").hasClass("pli_01_safe")){
                $(this).parent(".pli_03").addClass("on").siblings().removeClass("on");
            }
            else{
                //$(this).parents(".pli_01").find(".pli_03").addClass("on").siblings().removeClass("on");
            }            
        }, function() {
        });
    }else{
        $(document).on("click",".nav_phone_btn",function(){
            $(this).toggleClass("visible_nav");
            $("body").toggleClass("navbody");
        })
        $(".navlist").siblings("span").addClass("cur");
        $(document).on("click",".nav ul>li>span.cur",function(){
            $(this).parents("li").addClass("on");
        })

        $(document).on("click",".comm_menu>.return_a",function(){
            $(".comm_li").removeClass("on");
        })
        $(document).on("click",".pro_ser_menu .ll>.return_a",function(){
            $(this).parents("li").removeClass("on");
        })

        $(".pro_ser_menu .ll .pli_01").removeClass("on");
        $(document).on("click",".pro_ser_menu .ll .pli_01>h3>span",function(){
            $(this).parents(".pli_01").addClass("on");
        })        
        $(document).on("click",".pro_ser_menu .ll .pli_01>.pitem_block>.return_a",function(){
            $(this).parents(".pli_01").removeClass("on");
        })
        
        $(".pro_ser_menu .ll .pli_02").removeClass("on");
        $(document).on("click",".pro_ser_menu .ll .pli_02>h4>span",function(){
            $(this).parents(".pli_02").addClass("on");
        }) 
        $(document).on("click",".pro_ser_menu .ll .pli_02>.pitem_block>.return_a",function(){
            $(this).parents(".pli_02").removeClass("on");
        })  

        $(".pro_ser_menu .ll .pli_03").removeClass("on");
        $(document).on("click",".pro_ser_menu .ll .pli_03>h5>span",function(){
            $(this).parents(".pli_03").addClass("on");
        }) 
        $(document).on("click",".pro_ser_menu .ll .pli_03>.pitem_block>.return_a",function(){
            $(this).parents(".pli_03").removeClass("on");
        })  

        $(document).on("click",".parn_menu .ll>.return_a",function(){
            $(this).parents("li").removeClass("on");
        })  
    }


    if($(window).width()>1025){
        $(document).on("click",".site_btn i",function(){
            $(".site_nav").addClass("cur");
        })
        $(document).on("click",".site_btn span",function(){
            $(".site_nav").removeClass("cur");
        })
    }else{
        $(document).on("click",".site_btn i",function(){
            $(".site_nav").removeClass("cur02");
        })
        $(document).on("click",".site_btn span",function(){
            $(".site_nav").addClass("cur02");
        })
    }

    $(".back_top").click(function(){
        $("html,body").stop().animate({scrollTop:0});
    })
    
}


function pnav_slide(){
    var indexswiper = []
    for (var i = 0; i < $('.pimglist li').length; i++) {
        indexswiper[i] = new Swiper(
            $('.pimglist li')
                .eq(i)
                .find('.swiper-container')
                .get(0),
            {
                /*nextButton: $('.pimglist li')
                    .eq(i)
                    .find('.swiper-button-next')
                    .get(0),
                prevButton: $('.pimglist li')
                    .eq(i)
                    .find('.swiper-button-prev')
                    .get(0),*/
                pagination : $('.pimglist li')
                .eq(i)
                .find('.swiper-pagination')
                .get(0),
                paginationClickable :true,
                onlyExternal : true,
            }
        )
    }
}

function wowInt(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: false,
            live: true
        });
        wow.init();
    };
}

function wowDelay(box,row,delayTime){
    $(box).children().each(function(index){
        for(var i = 0;i<row;i++){
            if(index%row==i){
                $(this).attr("data-wow-delay",i*delayTime+'s');
            };
        };
    });
};
function ScollText(obj){
    if($(obj).length>0){
       $(obj).mCustomScrollbar({
            mouseWheelPixels:500,
            autoDraggerLength:false,
            advanced: {
                 autoScrollOnFocus: "" 
              }
       });
    }

}

/*手机端链接改为本窗口打开*/
function phoneTargetSelf(context){  
  if ($(window).width()<1024) {
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(){
      var target=$(this);
      var link=target.attr('target');
      target.attr('target','_self');
    })
  }
  // else{
  //     if(context==undefined){
  //       context=$(document);
  //     }
  //     $('a',context).each(function(){
  //       $('a[href^="javascript:void(0);"]').attr("target", "_self"); 
		// $('a[href^="javascript:void(0)"]').attr("target", "_self");
  //       var target=$(this);
  //       var link=target.attr('target');
  //       target.attr('target','_blank');
  //     })
  // }
}


/*电话链接取消默认事件并添加样式*/
function findTel(context){
  if ($(window).width()>1024) {
    var condition = /^tel\:([0-9\-]+)|tel\:\+([0-9\-]+)$/;
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(index, el) {
      var target=$(this);
      var href=target.attr('href');
      if (condition.test(href)) {
        target.addClass('tel_link');
        target.on('click',function(event){
          event.preventDefault();
        })
      }
    });
  }
}


/*ie9的placeholder包含密码框的兼容*/
$(function() {
    // 如果不支持placeholder，用jQuery来完成
    if(!isSupportPlaceholder()) {
        // 遍历所有input对象, 除了密码框
        $('input').not("input[type='password']").each(
            function() {
                var self = $(this);
                var val = self.attr("placeholder");
                input(self, val);
            }
        );

        /**//* 对password框的特殊处理
     * 1.创建一个text框
     * 2.获取焦点和失去焦点的时候切换
     */
        $('input[type="password"]').each(
            function(i) {
                var pwdField    = $(this);
                var pwdVal      = pwdField.attr('placeholder');
                var pwdId       = pwdField.attr('id');
                // 重命名该input的id为原id后跟1
                pwdField.after('<input id="' + pwdId +''+i+'" type="text" value='+pwdVal+' autocomplete="off" />');
                var pwdPlaceholder = $('#' + pwdId + ''+i+'');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function(){
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function(){
                    if(pwdField.val() == '') {
                        pwdPlaceholder.show();
                        pwdField.hide();
                    }
                });
            }
        );
    }
});

// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
    var $input = obj;
    var val = val;
    $input.attr({value:val});
    $input.focus(function() {
        if ($input.val() == val) {
            $(this).attr({value:""});
        }
    }).blur(function() {
        if ($input.val() == "") {
            $(this).attr({value:val});
        }
    });
}
//end



function select(){
    $(".year_select").each(function (i) {
        $(this).find("dt").click(function (e) {
            $(this).siblings().slideToggle();

            $(this).parents("li").siblings().find("dd").slideUp();
             $(this).parents("li").siblings().find("dt").removeClass('on_o');

            $(".option").slideUp();
            $(".info_input").removeClass('on_o');

            if($(this).hasClass('on_o')){
                $(this).removeClass('on_o');
            }else{
                $(this).addClass('on_o');
            }
            
            e.preventDefault();
            e.stopPropagation()
            $(".year_select").eq(i).find("dd a").each(function (x) {
                $(this).click(function () {
                    $(".year_select dt").removeClass("gray");
                    $(".year_select").eq(i).find("dd a").removeClass("on");
                    $(this).addClass("on");
                    $(".year_select").eq(i).find("dt p").text($(this).text());
                })
            })
        })
    })
    $(document).click(function () {
        $(".year_select dd").slideUp();
        $(".year_select dt,.info_input").removeClass('on_o');
    })
 
    $(".year_select dt").on("click", function(e){
        if($(this).siblings(".year_select dd").is(":hidden")){
           $(this).siblings(".year_select dd").slideDown();

        }else{
          
        }           
    });

}



function mapselect(){
    $(".map_select").each(function (i) {
        $(this).find("dt").click(function (e) {
            
            if($(this).hasClass('on_o')){
                $(this).removeClass('on_o');
            }else{
                $(this).addClass('on_o');
            }
            
            e.preventDefault();
            e.stopPropagation()
            $(".map_select").eq(i).find("dd a").each(function (x) {
                $(this).click(function () {
                    $(".map_select").eq(i).find("dd a").removeClass("on")
                    $(this).addClass("on")
                    $(".map_select").eq(i).find("dt p").text($(this).text());

                    $(".map_select").eq(i).find("dt").attr({"data-val":$(this).data("val")});
                    $(".map_select").eq(i).find("dt").attr({"data-city":$(this).text()});
                    $(".map_select").eq(i).find("dt").attr({"data-x":$(this).data("x")});
                    $(".map_select").eq(i).find("dt").attr({"data-y":$(this).data("y")});

                    $(".mapbox_text ul").eq($(this).index()).addClass("on").siblings().removeClass("on");


                })
            })

        })
    })
    $(document).click(function () {
        $(".map_select dd").slideUp();
        $(".map_select dt").removeClass('on_o');
    })
     
    $(".map_select dt").on("click", function(e){
        if($(this).siblings(".map_select dd").is(":hidden")){
           $(this).siblings(".map_select dd").slideDown();
           $(this).parents(".map_select").siblings(".map_select").children(".map_select dd").slideUp();

        }else{
            $(this).siblings(".map_select dd").slideUp();
          
        }           
    });
}
function mapInt(mapTitle,mapAdress,mapx,mapy){
    var num = 0.0025;
    var map = new BMap.Map("map");
    var point = new BMap.Point(mapx+num,mapy);
    var point2 = new BMap.Point(mapx,mapy);
    

    var myIcon = new BMap.Icon("../images/abo_dot06.png", new BMap.Size(48,61));
    var marker2 = new BMap.Marker(point2,{icon:myIcon});  
    map.addOverlay(marker2);             
    map.centerAndZoom(point, 18);

    if($(window).width()<1024){
        num = 0;
        map.centerAndZoom(point2, 18);
    }
    
    var opts = {
      width : 200,     
      height: 100,    
      title : mapTitle 
    
    }
    map.enableScrollWheelZoom();  
    map.enableContinuousZoom();  
}





/*20210916修改首页搜索框位置*/
$(function () {
    $(document).on("click",".head_search",function(e){
         e.preventDefault();
         e.stopPropagation();
         $(this).toggleClass("on");
         $(".banner_search").toggleClass("on");
    })
    $(document).on("click", ".search_input", function (e) {
        e.preventDefault();
        e.stopPropagation();       
    })
    $(document).click(function(){     
        $(".banner_search").removeClass("on");
        $(".head_search").removeClass("on");
    })
})
/*20210916修改首页搜索框位置*/


