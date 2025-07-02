window.requestAnimationFrame ||
  (window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(function () {
        return callback(Date.now());
      }, 1000 / 60);
    });

window.cancelAnimationFrame ||
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function (timeid) {
    return clearTimeout(timeid);
  };

$(function () {
  (function (window) {
    var bannerFomrBox = $(".banner20170923_wrap");
    var mewFormHtml =
      '\
				<h3 class="banner-table-title">14天免费学习限时申请</h3>\
				<div class="banner-time" id="banner-time">\
					<span>7</span>天<span>3</span>时<span>50</span>分<span>50</span>秒\
				</div>\
				<form name="feedback" action="/e/enews/index.php" method="post" class="messages" enctype="multipart/form-data">\
<input name="enews" type="hidden" value="AddFeedback">\
<input type=hidden name=ecmsfrom value="http://px.tcnet.com.cn/">\
				<div class="clearfix banner-table-input"><img src="https://cdn.bingdou.com.cn/tcnet_px/images/banner-table-ico-name.png" alt="" class="fl"><input placeholder="请输入您的姓名" type="text" name="title" class="fl"></div>\
				<div class="clearfix banner-table-input"><img src="https://cdn.bingdou.com.cn/tcnet_px/images/banner-table-ico-phone.png" alt="" class="fl"><input placeholder="您的手机号" type="text" name="tel" class="fl"></div>\
				<div class="clearfix banner-table-input"><img src="https://cdn.bingdou.com.cn/tcnet_px/images/banner-table-ico-qq.png" alt="" class="fl"><input placeholder="您的qq号（资料免费领）" type="text" name="qq" class="fl"></div>\
				<button role="button" type="submit" class="banner-table-submit button--moema">点击立即领取<img src="https://cdn.bingdou.com.cn/tcnet_px/images/banner-btn-ico.png" alt=""></button>\
				</form>\
			</div>\
		';

    var head = $("head");
    head.append(
      '<link rel="stylesheet" href="https://cdn.bingdou.com.cn/tcnet_px/css/addBannerForm.css">'
    );

    bannerFomrBox.html(mewFormHtml);
    if (bannerFomrBox && bannerFomrBox[0]) {
      bannerFomrBox[0].className = "banner-table";
    }

    var bannerOldTime = new Date(2018, 5, 4, 0, 0, 0).getTime() / 1000;
    var bannerTime = $(".banner-time");
    var bannerScrollTable = $(".banner-job-data>div");
    var FPS = 0;
    var startTime = Date.now();
    var totalTime = 0;
    var num = 0;

    updateBannerTime();
    var timer = null;

    timer = window.requestAnimationFrame(loop);

    function loop(n) {
      timer = window.requestAnimationFrame(loop);

      FPS = Date.now() - startTime;
      startTime = Date.now();
      totalTime += FPS;
      if (totalTime >= 1000) {
        totalTime = 0;
        num++;

        if (num % 2 == 0) {
          eleScrollTop(bannerScrollTable, "p", 30);
        }
      }
      updateBannerTime();
    }

    function eleScrollTop(ele, child, top) {
      ele.stop().animate({ top: -top }, 500, function () {
        ele.append(ele.find(child).eq(0));
        ele.css("top", 0);
      });
    }

    function updateBannerTime() {
      //7天循环一次
      var now = new Date().getTime() / 1000;
      var dis = 14 * 86400 - ((now - bannerOldTime) % (14 * 86400));
      //console.log(dis)
      var D = Math.floor(dis / 86400);
      dis %= 86400;
      var H = Math.floor(dis / 3600);
      dis %= 3600;
      var M = Math.floor(dis / 60);
      dis %= 60;
      var S = Math.floor(dis);

      D = D < 10 ? "0" + D : D;
      H = H < 10 ? "0" + H : H;
      M = M < 10 ? "0" + M : M;
      S = S < 10 ? "0" + S : S;

      bannerTime.html(
        "\
				<span>" +
          D +
          "</span>天\
				<span>" +
          H +
          "</span>时\
				<span>" +
          M +
          "</span>分\
				<span>" +
          S +
          "</span>秒\
			"
      );
    }
  })(window);
});