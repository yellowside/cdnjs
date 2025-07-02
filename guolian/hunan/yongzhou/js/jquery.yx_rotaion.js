function LbMove(boxID, btn_left, btn_right, btnBox, Car, direction, way,
		moveLengh, speed, Interval, number) {
	var _ID = $("#" + boxID + "");
	var _btn_left = $("#" + btn_left + "");
	var _btn_right = $("#" + btn_right + "");
	var _btnBox = $("#" + btnBox + "");
	var jsq = 0
	var timer;
	var cj;
	var no_way = 0;
	var no_wayGet = 0;
	var fade = 0;
	var new_time = new Date;

	var ID_liLen, ID_liheight, cbtmBtn;
	ID_liLen = _ID.find("li").length;
	ID_liheight = _ID.find("li").innerHeight();

	if (direction == "left" || direction == "right") {
		_ID.find("ul").width(ID_liLen * moveLengh);
	} else if (direction == "top" || direction == "bottom") {
		_ID.find("ul").height(ID_liLen * moveLengh);
		_btnBox.hide()
	} else if (direction == "fade") {
		_ID.find("ul").width(moveLengh).height(ID_liheight);
		_ID.find("li").eq(0).show().siblings().hide();
		_ID.find("li").css({
					"position" : "absolute",
					"left" : 0,
					"top" : 0
				});
	}
	_btnBox.empty();
	for (i = 0; i < ID_liLen; i++) {
		_btnBox.append("<span></span>");
	};
	_btnBox.find("span").eq(0).addClass("cur");

	if (way == false) {
		_btn_left.hide();
		_btn_right.hide();
		_btnBox.hide();
	}

	function Carousel() {
		if (way == false) {
			no_way++;

			if (direction == "left") {
				_ID.find("ul").css({
							"left" : -no_way
						});
				no_wayGet = parseInt(_ID.find("ul").css("left"));
				if (no_wayGet == -moveLengh) {
					no_way = 0
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({
								"left" : 0
							});
				}
			}

			if (direction == "right") {

				no_wayGet = parseInt(_ID.find("ul").css("left"));
				if (no_wayGet == 0) {
					no_way = -moveLengh
					_ID.find("li:last").insertBefore(_ID.find("li:first"));
					_ID.find("ul").css({
								"left" : 0
							});
				}
				_ID.find("ul").css({
							"left" : no_way
						});
			}

			if (direction == "top") {
				_ID.find("ul").css({
							"top" : -no_way
						});
				no_wayGet = parseInt(_ID.find("ul").css("top"));
				if (no_wayGet == -moveLengh) {
					no_way = 0
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({
								"top" : 0
							});
				}
			}

			if (direction == "bottom") {

				no_wayGet = parseInt(_ID.find("ul").css("top"));
				if (no_wayGet == 0) {
					no_way = -moveLengh
					_ID.find("li:last").insertBefore(_ID.find("li:first"));
					_ID.find("ul").css({
								"top" : 0
							});
				}
				_ID.find("ul").css({
							"top" : no_way
						});
			}

		} else if (way == true) {

			if (direction == "left") {
				_ID.find("ul").animate({
							left : -moveLengh
						}, speed, function() {
							_ID.find("li:first").insertAfter(_ID
									.find("li:last"));
							_ID.find("ul").css({
										"left" : 0
									});
						});
				if (jsq < ID_liLen - 1) {
					jsq++;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings()
							.removeClass("cur");
				} else {
					jsq = 0;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings()
							.removeClass("cur");
				}

			}

			if (direction == "right") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({
							"left" : -moveLengh
						});
				_ID.find("ul").stop().animate({
							left : 0
						}, speed);
				if (jsq > 0) {
					jsq--;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings()
							.removeClass("cur");
				} else {
					jsq = ID_liLen - 1;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings()
							.removeClass("cur");
				}

			}

			if (direction == "top") {
				_ID.find("ul").animate({
							top : -moveLengh
						}, speed, function() {
							_ID.find("li:first").insertAfter(_ID
									.find("li:last"));
							_ID.find("ul").css({
										"top" : 0
									});
						});
			}

			if (direction == "bottom") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({
							"top" : -moveLengh
						});
				_ID.find("ul").stop().animate({
							top : 0
						}, speed);

			}
			if (direction == "fade") {

				if (fade < ID_liLen - 1) {
					fade++;
				} else {
					fade = 0
				}
				_ID.find("li").eq(fade).fadeIn(speed).siblings().fadeOut(speed);
				_btnBox.find("span").eq(fade).addClass("cur").siblings()
						.removeClass("cur");

			}

		}
	}

	if (Car == true) {

		if (ID_liLen > number) {
			timer = setInterval(Carousel, Interval);
		} else {
			clearInterval(timer);
			_btn_left.hide();
			_btn_right.hide();
			_btnBox.hide();
		}
	} else {
		clearInterval(timer);
	}
	_ID.find("li").hover(function() {
				clearInterval(timer);
			}, function() {
				if (Car == true) {
					if (ID_liLen > number) {
						timer = setInterval(Carousel, Interval);
					} else {
						clearInterval(timer);
						_btn_left.hide();
						_btn_right.hide();
						_btnBox.hide();
					}
				} else {
					clearInterval(timer);
				}
			});

	_btn_right.hover(function() {
				clearInterval(timer);
			}, function() {
				if (Car == true) {
					if (ID_liLen > number) {
						timer = setInterval(Carousel, Interval);
					} else {
						clearInterval(timer);
						_btn_left.hide();
						_btn_right.hide();
						_btnBox.hide();
					}
				} else {
					clearInterval(timer);
				}

			}).click(function() {
		if (new Date - new_time > 500) {
			new_time = new Date;

			if (direction == "left" || direction == "right") {
				_ID.find("ul").animate({
							left : -moveLengh
						}, speed, function() {
							_ID.find("li:first").insertAfter(_ID
									.find("li:last"));
							_ID.find("ul").css({
										"left" : 0
									});
						});
			}

			if (direction == "top" || direction == "bottom") {
				_ID.find("ul").animate({
							top : -moveLengh
						}, speed, function() {
							_ID.find("li:first").insertAfter(_ID
									.find("li:last"));
							_ID.find("ul").css({
										"top" : 0
									});
						});
			}
			if (direction == "fade") {

				if (fade > 0) {
					fade--;
				} else {
					fade = ID_liLen - 1
				}
				_ID.find("li").stop(true, true).eq(fade).fadeIn(speed)
						.siblings().fadeOut(speed);

			}
			if (jsq < ID_liLen - 1) {
				jsq++;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings()
						.removeClass("cur");
			} else {
				jsq = 0;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings()
						.removeClass("cur");
			};

		} else {
		};
	});
	_btn_left.hover(function() {
				clearInterval(timer);
			}, function() {
				if (Car == true) {
					if (ID_liLen > number) {
						timer = setInterval(Carousel, Interval);
					} else {
						clearInterval(timer);
						_btn_left.hide();
						_btn_right.hide();
						_btnBox.hide();
					}
				} else {
					clearInterval(timer);
				}
			}).click(function() {
		if (new Date - new_time > 500) {
			new_time = new Date;

			if (direction == "left" || direction == "right") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({
							"left" : -moveLengh
						});
				_ID.find("ul").stop().animate({
							left : 0
						}, speed);
			}

			if (direction == "top" || direction == "bottom") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({
							"top" : -moveLengh
						});
				_ID.find("ul").stop().animate({
							top : 0
						}, speed);

			}
			if (direction == "fade") {

				if (fade < ID_liLen - 1) {
					fade++;
				} else {
					fade = 0
				}
				_ID.find("li").stop(true, true).eq(fade).fadeIn(speed)
						.siblings().fadeOut(speed);

			}
			if (jsq > 0) {
				jsq--;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings()
						.removeClass("cur");
			} else {
				jsq = ID_liLen - 1;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings()
						.removeClass("cur");
			};
		} else {
		};
	});

	_btnBox.find("span").hover(function() {
				clearInterval(timer);

			}, function() {
				if (Car == true) {
					if (ID_liLen > number) {
						timer = setInterval(Carousel, Interval);
					} else {
						clearInterval(timer);
						_btn_left.hide();
						_btn_right.hide();
						_btnBox.hide();
					}
				} else {
					clearInterval(timer);
				}
			}).click(function() {
		if (new Date - new_time > 500) {
			new_time = new Date;
			cbtmBtn = $(this).index();
			$(this).addClass("cur").siblings().removeClass("cur");
			if (direction == "fade") {
				_ID.find("li").eq(cbtmBtn).fadeIn(speed).siblings()
						.fadeOut(speed);
			} else {
				if (cbtmBtn > jsq) {
					cj = cbtmBtn - jsq;
					jsq = cbtmBtn;

					_ID.find("ul").stop().animate({
								left : -moveLengh * cj
							}, speed, function() {
								for (i = 0; i < cj; i++) {
									_ID.find("ul").css({
												"left" : 0
											})
									_ID.find("li:first").insertAfter(_ID
											.find("li:last"));
								};
							});
				} else {
					cj = jsq - cbtmBtn;
					jsq = cbtmBtn;
					_ID.find("ul").css({
								"left" : -moveLengh * cj
							});
					for (i = 0; i < cj; i++) {
						_ID.find("ul").stop().animate({
									left : 0
								}, speed);
						_ID.find("li:last").insertBefore(_ID.find("li:first"));
					};
				};
			};
		} else {
		};
	});
}

(function($){   
    $.fn.extend({     
         yx_rotaion: function(options) {   
		    //默认参数
            var defaults = {
			     /**轮换间隔时间，单位毫秒*/
                 during:3000,
				 /**是否显示左右按钮*/
                 btn:true,
				 /**是否显示焦点按钮*/
                 focus:true,
				 /**是否显示标题*/
                 title:true,
				 /**是否自动播放*/
                 auto:true				 
            }        
            var options = $.extend(defaults, options);   
            return this.each(function(){
			    var o = options;   
				var curr_index = 0;
                var $this = $(this);				
                var $li = $this.find("li");
                var li_count = $li.length;
				$this.css({position:'relative',overflow:'hidden',width:$li.find("img").width(),height:$li.find("img").height()});
				$this.find("li").css({position:'absolute',left:0,top:0}).hide();
			    $li.first().show();
			    $this.append('<div class="yx-rotaion-btn"><span class="left_btn"><\/span><span class="right_btn"></span><\/div>');
				if(!o.btn) $(".yx-rotaion-btn").css({visibility:'hidden'});
                if(o.title) $this.append(' <div class="yx-rotation-title"><\/div><a href="" class="yx-rotation-t"><\/a>');
                if(o.focus) $this.append('<div class="yx-rotation-focus"><\/div>');
				var $btn = $(".yx-rotaion-btn span"),$title = $(".yx-rotation-t"),$title_bg = $(".yx-rotation-title"),$focus = $(".yx-rotation-focus");
				//如果自动播放，设置定时器
				if(o.auto) var t = setInterval(function(){$btn.last().click()},o.during);
                $title.text($li.first().find("img").attr("alt"));	
				$title.attr("href",$li.first().find("a").attr("href"));				
				
               // 输出焦点按钮
               for(i=1;i<=li_count;i++){
                 $focus.append('<span>'+i+'</span>');
               }
               // 兼容IE6透明图片   
               if($.browser.msie && $.browser.version == "6.0" ){
                  $btn.add($focus.children("span")).css({backgroundImage:'url(images/ico.gif)'});
               }		
               var $f = $focus.children("span");
               $f.first().addClass("hover");
               // 鼠标覆盖左右按钮设置透明度
               $btn.hover(function(){
	              $(this).addClass("hover");
               },function(){
	              $(this).removeClass("hover");
               });
			   //鼠标覆盖元素，清除计时器
               $btn.add($li).add($f).hover(function(){
                if(t) clearInterval(t);
               },function(){
                if(o.auto) t = setInterval(function(){$btn.last().click()},o.during);
               });
			   //鼠标覆盖焦点按钮效果
               $f.bind("mouseover",function(){
	             var i = $(this).index();
	             $(this).addClass("hover");
	             $focus.children("span").not($(this)).removeClass("hover");
	             $li.eq(i).fadeIn(300);
                 $li.not($li.eq(i)).fadeOut(300);	
	             $title.text($li.eq(i).find("img").attr("alt"));
	             curr_index = i;
               });
			   //鼠标点击左右按钮效果
               $btn.bind("click",function(){
                 $(this).index() == 1?curr_index++:curr_index--;
	             if(curr_index >= li_count) curr_index = 0;
	             if(curr_index < 0) curr_index = li_count-1;
                 $li.eq(curr_index).fadeIn(300);
	             $li.not($li.eq(curr_index)).fadeOut(300);	
	             $f.eq(curr_index).addClass("hover");
	             $f.not($f.eq(curr_index)).removeClass("hover");
	             $title.text($li.eq(curr_index).find("img").attr("alt"));
				 $title.attr("href",$li.eq(curr_index).find("a").attr("href"));	
               });
 
            });   
        }   
    });   
       
})(jQuery);

$(function() {
			function tab(tab, tabList, morelist, className) {
				$(tab).mouseenter(function() {
					$(this).addClass(className).siblings()
							.removeClass(className);
					$(morelist).eq($(this).index()).css('display', 'block')
							.siblings().css('display', 'none');
					$(tabList).eq($(this).index()).css('display', 'block')
							.siblings().css('display', 'none');
						// $(morelist).eq($(this).index()).addClass(more).siblings().removeClass(more);
				});
			}

			function tabnews() {
				$("#news1").mouseenter(function() {
							$("#news1").addClass('selected');
							$("#news2").removeClass('selected');
							$("#newsCon1").css('display', 'block');
							$("#newsCon2").css('display', 'none');
						});
				$("#news2").mouseenter(function() {
							$("#news2").addClass('selected');
							$("#news1").removeClass('selected');
							$("#newsCon2").css('display', 'block');
							$("#newsCon1").css('display', 'none');
						});
			}
			tabnews();
    		tab('#tab2 a', '#tabCon2 ul', '', 'selected');
    		tab('#tab3 a', '#tabCon3 ul', '', 'selected');
			tab('#tab5 a', '#tabCon5 ul', '', 'selected');
    		tab('#tab6 a', '#tabCon6 ul', '', 'selected');
			tab('#tab1 h3', '#tabCon1 ul', '', 'selected');
			tab('#tab2 h3', '#tabCon2 ul', '', 'selected');
			tab('#tab3 h3', '#tabCon3 ul', '', 'selected');
			tab('#tab4 h3', '#tabCon4 ul', '', 'selected2');
			tab('#tab5 h3', '#tabCon5 ul', '', 'selected');
			tab('#tab6 h3', '#tabCon6 ul', '', 'selected');
		});


function nav_parent_style(obj) {
	$("#" + obj).parent().addClass('cur');
}
