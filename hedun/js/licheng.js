$(function () {
	//导航
	var ww = $(window).width();
	//发展历程
	if(ww > 1400){
		$(".course-slider ul").bxSlider({
			slideWidth: 120,
	        minSlides: 4,
	        maxSlides: 4,
			moveSlides: 1,
	        slideMargin: 98,
	        pager:false
		});
	} else if (ww < 1400 && ww > 1023) {
		$(".course-slider ul").bxSlider({
			slideWidth: 120,
	        minSlides: 3,
	        maxSlides: 3,
			moveSlides: 1,
	        slideMargin: 98,
	        pager:false
		});
	}else if(ww < 1000){
		$(".course-slider ul").bxSlider({
		    pager: false,
		    minSlides: 2,
		    maxSlides: 2,
		    moveSlides: 1,
	        slideWidth: 120
		});
	}

	$(document).on("click touchend", ".bx-prev", function () {
	    console.log(1);
	    $(".course-slider ul .on").prev().find("a").click();
	})

	$(document).on("click touchend", ".bx-next", function () {
	    $(".course-slider ul .on").next().find("a").click();
	    console.log(0);
	})

})