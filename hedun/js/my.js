// JavaScript Document
jQuery(function () {
	//imgBg
	$(".imgBg").each(function (index, element) {$(this).css("background-image", "url(" + $(this).find("img").attr("src") + ")")});
	//DaoHangArrow
	$(".navList > li").each(function(index, element) {
		if($(this).find(".navSub").length > 0){
			$(this).addClass("dropdown")
		}else{
			$(this).removeClass("dropdown")
		}
	});	
	// $(".navThird").each(function(index, element) {
	// 	if($(this).find(".navFourth").length){
	// 		return
	// 	}else{
	// 		$(this).addClass("navFourth noThird").removeClass("navThird")
	// 	}
	// });
	$(".navList > li > a > i").click(function(e){
		if($(this).parent().hasClass('cur')){
			$(this).parent().removeClass('cur');
			$(this).parent().next(".navSub").hide();
		}else{
			$('.navList .cur').removeClass('cur').next('.navSub').hide();
			$(this).parent().addClass('cur')
			$(this).parent().next(".navSub").show();
		}
		e.preventDefault();
	})
    $(".navList li .navSub .navSecond > li:first-child").addClass("active");
    $(".navSecond > li").hover(function(){
        $(this).addClass("active").siblings().removeClass("active")
    })
	//DaoHangOn
	$(".navBtn").click(function(){
		$(".navBox").addClass("active");
		if($(".banner").length > 0) $(".banner").addClass("active");
		if($(".banIn").length > 0) $(".banIn").addClass("active");
		$(".navBg").addClass("active");
		$(".banBotBg").addClass("active");
		$(".mainBg").addClass("active");
		$(".footBg").addClass("active");
	})
	//DaoHangOff
	$(".navClose,.navBg").click(function(){
		$(".navBox").removeClass("active");
		$(".navList > li").each(function(index, element) {
			$(this).removeClass("animated fadeInRight").css("animation-delay", 0 + 's');
		});
		if($(".banner").length > 0) $(".banner").removeClass("active");	
		if($(".banIn").length > 0) $(".banIn").removeClass("active");	
		$(".navBg").removeClass("active");
		$(".mainBg").removeClass("active");
		$(".banBotBg").removeClass("active");
		$(".footBg").removeClass("active");
	})
	//nav-search
	$(".navRig li.navSearch a").click(function(){
		$(".searchBox").slideDown(200);
		$(".searchInput").focus();
	})
	$(".searchClose").click(function(){
		$(this).parents(".searchBox").slideUp(200);
		$(".searchInput").val("")
	})
	$(window).scroll(function(){
		$(".searchBox").slideUp(200);
		$(".searchInput").val("")
	})
	
	$(".banner .swiper-slide").each(function (index) { $(this).addClass("ban" + (index + 1)); });
	var banner = new Swiper('.banner .swiper-container', {
		loop:true,
		autoplay: 4000,
		autoplayDisableOnInteraction: false,
		speed: 300,
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		effect: 'fade',
		pagination: '.banner .banPage',
		paginationClickable: true,
		onInit: function (swiper) {
			swiperAnimateCache(swiper);
			swiperAnimate(swiper);
		},
		onSlideChangeStart: function (swiper) {
			$(".banLine span").removeClass("active");
		},
		onSlideChangeEnd: function (swiper) {
			swiperAnimate(swiper);
			$(".banLine span").addClass("active");
		}
	})
	
	$(".banLink li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})
	$(".topList li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})

	//hm1	
	var hm1List = new Swiper('.hm1List .swiper-container', {
		observer: true,
		observeParents: true,
		simulateTouch : false,
		autoHeight:'auto'
	})
	$(".hm1List").css({"width":$(".hm1Rig").width(),"max-height":$(".hm1Rig").height()});
	// $(".hm1Tab li:not(.noClick)").click(function(e){
	// 	var clickNum = $(this).index();
	// 	if($(this).hasClass("active")){
	// 		$(this).removeClass("active")
	// 		$(".hm1List").removeClass("active");
	// 		$(".hm1Item").hide();
	// 		//hm1List.slideTo(0, 1000, false);
	// 	}else{
	// 		//hm1List.slideTo(clickNum, 1000, false);
	// 		$(this).addClass("active").siblings().removeClass("active");
	// 		$(".hm1List").addClass("active");            
	// 		$(".hm1Item").eq(clickNum).show().siblings().hide();
	// 	}
	// 	e.stopPropagation();
	// })
    $(".hm1Tab > li").hover(function(e){
        //var clickNum = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        //$(".hm1List").addClass("active");
        //$(".hm1Item").eq(clickNum).show().siblings().hide();
	},function(){
		$(this).removeClass("active")
	})
    // $(".hm1Box").on("mouseleave",function(){
    //     $(".hm1Tab li").removeClass("active")
    //     $(".hm1List").removeClass("active");
    //     $(".hm1Item").hide();
    // })
	// $(window).click(function(){
	// 	$(".hm1Tab li").removeClass("active")
	// 	$(".hm1List").removeClass("active")
	// 	$(".hm1List").length > 0 && hm1List.slideTo(0, 1000, false);
	// })
	$(".hm1Default li").each(function(){
		if($(this).hasClass("hot")){
			$(this).find(".hm1Link").prepend("<span class='hot'></span>");
		}
		if($(this).hasClass("new")){
			$(this).find(".hm1Link").prepend("<span class='new'></span>");
		}
	})

	//hm2-img
	var hm2Img = new Swiper('.hm2Img .swiper-container', {
		loop : true,
		loopAdditionalSlides : 2,
		roundLengths : true,
		observer: true,
		observeParents: true,
		pagination: '.swiper-pagination',
        paginationClickable: true,
		simulateTouch : false,
		onlyExternal : true,
		effect:'fade'
	})
	// $(".hm2Img .swiper-pagination-bullet").hover(function() {
	// 	$(this).click();
	// },function() {
	// 	hm2Img.autoplay.start();
	// })
	//hm2-text
	var hm2Text = new Swiper('.hm2Text .swiper-container', {
		loop : true,
		loopAdditionalSlides : 2,
		autoplay:3000,
		autoplayDisableOnInteraction : false,
		spaceBetween: 30,
		roundLengths : true,
		observer: true,
		observeParents: true,
		pagination: '.swiper-pagination',
        paginationClickable: true,
		effect : 'cube',
		cube: {
			slideShadows: false,
			shadow: false,
			shadowOffset: 100,
			shadowScale: 0.6
		},
		onInit: function(swiper){
			$(".hm2Tab li").eq(swiper.realIndex).addClass("active").siblings().removeClass("active");
		},
		onSlideChangeStart: function(swiper){
			$(".hm2Tab li").eq(swiper.realIndex).addClass("active").siblings().removeClass("active");
		}
	})
    hm2Img.params.control = hm2Text;
    hm2Text.params.control = hm2Img;
	//hm2-Tab
	$(".hm2Tab li").hover(function(){
		var clickNum = $(this).index() + 3;
		console.log(clickNum)
		hm2Text.slideTo(clickNum, 1000, false);
		$(this).addClass("active").siblings().removeClass("active");
	})

	//hm3	
	var hm3List = new Swiper('.hm3List .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 40,
		roundLengths : true,
		observer: true,
		observeParents: true,
		prevButton: '.hm3Prev',
		nextButton: '.hm3Next',
		breakpoints: {
            1600: {
				slidesPerView: 4,
                spaceBetween: 20
            },
			1200: {
				slidesPerView: 3,
                spaceBetween: 15
            },
			640: {
				slidesPerView: 2,
                spaceBetween: 15
            },
			460: {
				slidesPerView: 2,
                spaceBetween: 5
            }
        }
	})
	
	//hm-6
	var hm6List = new Swiper('.hm6List .swiper-container', {
		loop:true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false,
		slidesPerView: 5,
		spaceBetween: 15,
		roundLengths : true,
		observer: true,
		observeParents: true,
		prevButton: '.hm6Prev',
		nextButton: '.hm6Next',
		breakpoints: {
            1200: {
				slidesPerView: 4,
                spaceBetween: 10
            },
			991: {
				slidesPerView: 3,
                spaceBetween: 10
            },
			640: {
				slidesPerView: 2,
                spaceBetween: 10
            },
			460: {
				slidesPerView: 1,
                spaceBetween: 10
            }
        }
	})

	//返回顶部
	$("#top").click(function(){
		$("html,body").animate({scrollTop:'0px'},500);
	})
	//pro
	$(".proList li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})
	$(".proItem").each(function(){
		if($(this).find(".proCon").length > 0){
			$(this).find("h4").addClass("dropdown")
			$(this).find("h4 a").attr("href","JavaScript:;");
		}
	})
	$(document).on("click",".proItem .dropdown",function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open")
			$(this).next(".proCon").stop(true,true).slideUp();
		}else{
			$(this).addClass("open")
			$(this).next(".proCon").stop(true,true).slideDown();
		}
	})	
	$(".proYs li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})

	//solution
	$(".soluList li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})
	//service	
	$(".ser2List li").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})
	$(".ser3List li").each(function(index){
		$(this).attr("data-wow-delay", index / 5 + 's');
		switch(index%3){
			case 0:
				$(this).addClass("ser3Li1");
				break;
			case 1:
				$(this).addClass("ser3Li2");
				break;
			case 2:
				$(this).addClass("ser3Li3");
				break;
		}
	})
	//join
	$(".joinItem").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')})
	$(".joinList li.active").find(".joinText").show();
	$(".joinTit").click(function(){
		if($(this).parent().hasClass("active")){
			$(this).parent().removeClass("active");
			$(this).next(".joinText").stop().slideUp();
		}else{
			$(".joinList li").removeClass("active");
			$(".joinText").slideUp();
			$(this).parent().addClass("active");
			$(this).next(".joinText").stop().slideDown();
		}
	})
	//contact
	$(".conItem").each(function(index){$(this).attr("data-wow-delay", index / 5 + 's')});
	//honor	
	$(".honTop li").each(function(index){$(this).attr("data-wow-delay", index / 4 + 's')});
	$(".honItem").eq($(".honYear li.active").index()).show();
	$(".honYear li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".honItem").eq($(this).index()).addClass("animated fadeInUp").show().siblings().hide();
	})
	//login
	$(".login").eq($(".loginTab li.active").index()).show();
	$(".loginTab li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".login").eq($(this).index()).show().siblings(".login").hide();
	})
	
	

	//hm3	
	var box3Bot = new Swiper('.box3Bot .swiper-container', {
		slidesPerView: 3,
		slidesPerGroup :3,
		spaceBetween: 30,
		roundLengths : true,
		observer: true,
		observeParents: true,
		prevButton: '.box3Prev',
		nextButton: '.box3Next',
		pagination: '.box3Page',
        paginationClickable: true,
		paginationBulletRender: function (swiper, index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
		simulateTouch : false,
		breakpoints: {
            1600: {
				slidesPerView: 3,
				slidesPerGroup :3,
                spaceBetween: 20
            },
            1200: {
				slidesPerView: 2,
				slidesPerGroup : 2,
                spaceBetween: 15
            },
            640: {
				slidesPerView: 1,
				slidesPerGroup : 1,
                spaceBetween: 15
            }
        }
	})

	//case	
	$(".caseItem").each(function(index, element) {
		var $that = $(this);
		var caseList = new Swiper($(this).find('.caseList .swiper-container'),{
			loop:true,
			slidesPerView: 1,
			spaceBetween: 10,
			prevButton: $(this).find('.casePrev'),
			nextButton: $(this).find('.caseNext'),
			observer: true,
			observeParents: true,
			onlyExternal : true,
			onInit: function(swiper){
				$that.find(".caseLi").eq(swiper.realIndex).fadeIn().siblings().hide();
			},
			onSlideChangeStart: function(swiper){
				$that.find(".caseLi").eq(swiper.realIndex).fadeIn().siblings().hide();
			}
		});
	});
	$(window).resize(function () { 
		$(".hm1List").css({"width":$(".hm1Rig").width(),"max-height":$(".hm1Rig").height()});
	});
})