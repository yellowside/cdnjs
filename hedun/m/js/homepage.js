//window.innerHeight
var localVar = {};
localVar.canvas = {};

//文档加载就绪
$(document).ready(function () {


  var PHI = (1 + Math.sqrt(5)) / 2; // 1.618033988749895
  maxGeneration = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 5 : 6;
  frameDuration = 1000 / 60;
  duration = 3000;
  rotationSpeed = 0.3;
  totalIterations = Math.floor(duration / frameDuration);
  maxBaseSize = 100;
  baseSizeSpeed = 0.02;

  var canvas = $("[data-canvas]")[0],
    ctx = canvas.getContext("2d"),
    canvasWidth = document.documentElement.clientWidth,
    canvasHeight = document.documentElement.clientHeight,
    shapes = [],
    sizeVariation,
    iteration = 0,
    animationDirection = 1,
    sizeVariationRange = .15,
    baseRotation = 0,
    baseSize = 50,
    c1 = 43,
    c1S = 1,
    c2 = 205,
    c2S = 1,
    c3 = 255,
    c3S = 1;

  var scal = 4;
  var changeW = canvasWidth / 1.5;

  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);

  function Shape(gen, x, y, size, rotation) {
    this.generation = gen;
    this.size = size;
    this.rotation = -rotation;
    this.start = {
      x: x,
      y: y
    };
    this.end = {
      x_1: this.start.x + Math.cos(degToRad(this.rotation)) * this.size,
      y_1: this.start.y + Math.sin(degToRad(this.rotation)) * this.size,
      x_2: this.start.x + Math.cos(degToRad(this.rotation + 360 / 3)) * this.size,
      y_2: this.start.y + Math.sin(degToRad(this.rotation + 360 / 3)) * this.size,
      x_3:
        this.start.x +
        Math.cos(degToRad(this.rotation + 360 / 3 * 2)) * this.size,
      y_3:
        this.start.y + Math.sin(degToRad(this.rotation + 360 / 3 * 2)) * this.size
    };
    this.init();
  }

  Shape.prototype.init = function () {
    if (this.generation < maxGeneration) {
      var gen = this.generation + 1,
        newSize = this.size * sizeVariation,
        newRotation = this.rotation;

      shapes.push(
        new Shape(gen, this.end.x_1, this.end.y_1, newSize, newRotation)
      );
      shapes.push(
        new Shape(gen, this.end.x_2, this.end.y_2, newSize, newRotation)
      );
      shapes.push(
        new Shape(gen, this.end.x_3, this.end.y_3, newSize, newRotation)
      );
    }
    this.draw();
  };

  Shape.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x_1, this.end.y_1);
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x_2, this.end.y_2);
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x_3, this.end.y_3);
    //ctx.closePath();
    ctx.strokeStyle =
      "rgba(" + c1 + "," + c2 + "," + c3 + "," + 1 / this.generation / 5 + ")";
    ctx.stroke();
    //ctx.fill();
  };

  function animate() {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(7,17,36,.1)";
    // ctx.fillStyle = "rgba(5,15,36,.1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // cxt.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.globalCompositeOperation = "lighter";
    shapes = [];
    scal = scal - 0.003;
    if (scal < 1) { scal = 1; }
    // console.log("scal",scal);
    //屏幕宽度大于1100，图形居左
    if (window.innerWidth > 1100) {
      changeW = changeW - 2;
      if (changeW < 100) { changeW = 100; }
    } else {  //屏幕宽度小于1100，图形居中
      changeW = changeW + 2;
      if (changeW > canvasWidth / 2) { changeW = canvasWidth / 2; }
    }

    shapes.push(
      // new Shape(0, canvasWidth / 2, canvasHeight / 2, baseSize*scal, baseRotation)
      new Shape(0, changeW, canvasHeight / 2, baseSize * scal, baseRotation)
    );
    changeColor();
    iteration++;
    if (baseSize < maxBaseSize) baseSize += baseSizeSpeed;
    baseRotation += rotationSpeed;
    sizeVariation = easeInOutSine(
      iteration,
      1 - sizeVariationRange * animationDirection,
      sizeVariationRange * 2 * animationDirection,
      totalIterations
    );
    if (iteration >= totalIterations) {
      iteration = 0;
      animationDirection *= -1;
    }
    requestAnimationFrame(animate);
  }

  function degToRad(deg) {
    return Math.PI / 180 * deg;
  }

  function easeInOutSine(
    currentIteration,
    startValue,
    changeInValue,
    totalIterations
  ) {
    return (
      changeInValue /
      2 *
      (1 - Math.cos(Math.PI * currentIteration / totalIterations)) +
      startValue
    );
  }

  function changeColor() {
    if (c1 == 0 || c1 == 255) c1S *= -1;
    if (c2 == 0 || c2 == 255) c2S *= -1;
    if (c3 == 0 || c3 == 255) c3S *= -1;
    c1 += 1 * c1S;
    c2 += 1 * c2S;
    c3 += 1 * c3S;
  }

  ctx.globalCompositeOperation = "lighter";
  animate();



  setTimeout(function () {
    new Swiper('[data-num-1]', {
      loop: true, //让Swiper看起来是循环的。
      // effect: 'cube', //默认为" slide "（位移切换），可设置为" fade " 淡入 "  cube " 方块  " coverflow " 3d流  " flip " 3d翻转 。
      effect: 'cube', //默认为" slide "（位移切换），可设置为" fade " 淡入 "  cube " 方块  " coverflow " 3d流  " flip " 3d翻转 。
      cubeEffect: {
        slideShadows: true,
        shadow: false,
        shadowOffset: 100,
        shadowScale: 0.6
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止
      },
      speed: 500,
      autoHeight: true, //高度随内容变化
      // allowTouchMove: false,  //关闭拖动
      slidesPerView: 3,
      slidesPerGroup: 2,
    });
    new Swiper('[data-num-2]', {
      loop: true, //让Swiper看起来是循环的。
      effect: 'coverflow', //默认为" slide "（位移切换），可设置为" fade " 淡入 "  cube " 方块  " coverflow " 3d流  " flip " 3d翻转 。
      autoplay: {
        delay: 4000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止
      },
      speed: 500,
      autoHeight: true, //高度随内容变化
      // allowTouchMove: false,  //关闭拖动
      slidesPerView: 1,
      slidesPerGroup: 1,
    });
    new Swiper('[data-num-3]', {
      loop: true, //让Swiper看起来是循环的。
      //effect: 'slide', //默认为" slide "（位移切换），可设置为" fade " 淡入 "  cube " 方块  " coverflow " 3d流  " flip " 3d翻转 。
      autoplay: {
        // delay: 4000,
        //disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止
      },
      // speed: 500,
      //autoHeight: true, //高度随内容变化
      // allowTouchMove: false,  //关闭拖动
      slidesPerView: 5,
      // slidesPerGroup : 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    new Swiper('.home_page-container', {
      loop: true, //让Swiper看起来是循环的。
      effect: 'fade', //默认为" slide "（位移切换），可设置为" fade " 淡入 "  cube " 方块  " coverflow " 3d流  " flip " 3d翻转 。
      speed: 500,
      autoHeight: true, //高度随内容变化
      allowTouchMove: false,  //关闭拖动
      navigation: {
        prevEl: '.home_page-prev',
        nextEl: '.home_page-next',
      },
    });
  }, 100);

  if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
    new WOW().init();
  };

  $(window).resize(function () {
    canvasWidth = document.documentElement.clientWidth;
    canvasHeight = document.documentElement.clientHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);


  });

  $(window).resize();
  // $(window).scroll();
});//end of $(document).ready


$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();      //窗口滚动的距离
  //首页顶部文字区域
  // var headerTop=$("[data-header-con]").offset().top;
  var headerH = (scrollTop) / 10 * 3;
  $("[data-header-con]").css({ "transform": "translate(0px, " + headerH + "px)" });
  //“众” 字图片
  //var imgTop=$("[data-spui-img]").offset().top;  //图片距离文档顶部距离
  //var imgH=(scrollTop-imgTop)/10*3;
  //$("[data-spui-img] img").css({"transform":"translate(0px, "+imgH+"px)"});
});

//页面全部加载完成
window.onload = function () {
  $(".home_loading").remove();
  setTimeout(function () {
    $(window).scrollTop(0);
  }, 100);

};