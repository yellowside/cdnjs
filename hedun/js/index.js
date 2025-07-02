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



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Point = function (_F3$Obj) {
    _inherits(Point, _F3$Obj);

    function Point() {
        var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

        _classCallCheck(this, Point);

        var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

        _this.radius = radius;
        _this.color = 'rgba(' + [Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random()].join(',') + ')';
        _this.prevCrood = null;
        return _this;
    }

    _createClass(Point, [{
        key: 'render',
        value: function render(ctx) {

            ctx.fillStyle = '#fff';
            ctx.fillRect(this.croods2D.position.x, this.croods2D.position.y, this.radius * this.croods2D.scale * this.yScale, this.radius * this.croods2D.scale * this.yScale);
        }
    }]);

    return Point;
}(F3.Obj);

var planeFunctions = {
    'sin(sqrt(x^2+z^2))': function sinSqrtX2Z2(x, z, offset) {
        return Math.sin(Math.sqrt(Math.pow(x / 2, 2) + Math.pow(z / 2, 2)) - offset);
    },
    'cos(x)*sin(z)': function cosXSinZ(x, z, offset) {
        return Math.cos(x / 4 + offset) * Math.sin(z / 4 + offset) * 1;
    }
};

var Effect = function (_F3$Time) {
    _inherits(Effect, _F3$Time);

    function Effect(renderer, scene, camera, cvs) {
        _classCallCheck(this, Effect);

        var _this2 = _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).call(this));

        _this2.renderer = renderer;
        _this2.scene = scene;
        _this2.camera = camera;
        _this2.cvs = cvs;

        _this2.xOffset = 0;
        _this2.waveHeight = 0.4; // 波高
        _this2.waveWidth = 8; // 波长

        _this2.col = 33;
        _this2.colPointNum = 33;

        _this2.flyTime = 2000;
        _this2.timePass = 0;

        _this2.scale = 1;
        _this2.scaleStep = 0.01;

        _this2.planeFunction = function () {
            return 0;
        };
        _this2.rotate = { x: false, y: false, z: false };

        _this2.pointGroup = new F3.Obj();
        _this2.scene.add(_this2.pointGroup);

        _this2.resize(cvs.width, cvs.height);
        _this2.init();
        return _this2;
    }

    _createClass(Effect, [{
        key: 'resize',
        value: function resize(width, height) {
            this.cvs.width = width;
            this.cvs.height = height;
            // this.pointGroup.position.set(this.cvs.width/2, this.cvs.height, 0);
            this.stepWidth = width * 1.8 / this.col;
            this.pointGroup.setPosition(this.cvs.width / 2, this.cvs.height * 1.2, -this.col * this.stepWidth / 2);
            this.pointGroup.setRotation(0.1, 0, 0);
            // this.waveHeight = height/2;
            // this.waveWidth = this.waveHeight * 4;
            // console.log(this.stepWidth);
        }
    }, {
        key: 'init',
        value: function init() {
            // create point
            var point;
            for (var x = -(this.col - 1) / 2, count = 0; x <= (this.col - 1) / 2; x++) {
                for (var z = -(this.colPointNum - 1) / 2; z <= (this.colPointNum - 1) / 2; z++) {
                    point = new Point(10);
                    this.pointGroup.add(point);
                    /*point.initPos = new F3.Vector3(
                         x + Math.random() * -2 + 1,
                         -30 + -10 * Math.random(),
                         z + Math.random() * -2 + 1
                    );*/
                    point.initPos = new F3.Vector3(0, 0, 0);
                    point.flyDelay = 0; //Math.random() * 1000 | 0;
                }
            }
        }
    }, {
        key: 'update',
        value: function update(delta) {
            this.timePass += delta;
            this.xOffset = this.timePass / 500;

            var point = void 0;
            var flyPecent = void 0;
            var x = void 0,
                y = void 0,
                z = void 0;
            var count = 0;

            // if (this.timePass < 100)
            for (x = -(this.col - 1) / 2; x <= (this.col - 1) / 2; x++) {
                for (z = -(this.colPointNum - 1) / 2; z <= (this.colPointNum - 1) / 2; z++) {

                    // let y = Math.cos(x*Math.PI/this.waveWidth + this.xOffset)*Math.sin(z*Math.PI/this.waveWidth + this.xOffset) * this.waveHeight;

                    y = this.planeFunction(x, z, this.xOffset);
                    // let y = Math.sin(Math.sqrt(Math.pow(x/v, 2)+Math.pow(z/v, 2)) - this.xOffset) * 1
                    // console.log(y);

                    point = this.pointGroup.children[count];
                    point.yScale = 1; //(-y + 0.6)/(this.waveHeight) * 1.5;

                    flyPecent = (this.timePass - point.flyDelay) / this.flyTime;
                    flyPecent = flyPecent > 1 ? 1 : flyPecent < 0 ? 0 : flyPecent;

                    point.setPosition(x * this.stepWidth, y * this.stepWidth, z * this.stepWidth);
                    count++;
                }
            }
            if (this.rotate.x || this.rotate.y || this.rotate.z) {
                this.pointGroup.setRotation(this.rotate.x ? this.pointGroup.rotation.x + 0.001 : 0, this.rotate.y ? this.pointGroup.rotation.y + 0.001 : 0, this.rotate.z ? this.pointGroup.rotation.z + 0.001 : 0);
            }
        }
    }, {
        key: 'setFunction',
        value: function setFunction(fun) {
            this.planeFunction = fun;
        }
    }, {
        key: 'toggleRotate',
        value: function toggleRotate(r) {
            this.rotate[r] = !this.rotate[r];
            if (!this.rotate[r]) {
                this.pointGroup.rotation[r] = 0;
            }
        }
    }, {
        key: 'animate',
        value: function animate() {
            var _this3 = this;

            this.addTick(function (delta) {
                _this3.update(delta);
                _this3.renderer.render(_this3.scene, _this3.camera);
            });
        }
    }]);

    return Effect;
}(F3.Time);

function init(cvs) {
    var ctx = cvs.getContext('2d');

    var scene = new F3.Scene();
    var camera = new F3.Camera();
    camera.origin = new F3.Vector3(cvs.width / 2, cvs.height / 3);
    camera.p = 1200;

    var renderer = new F3.Renderer(ctx, cvs);
    var effect = new Effect(renderer, scene, camera, cvs);
    effect.animate();

    var functions = document.querySelector('.functions');
    var btnHTML = '';
    for (var name in planeFunctions) {
        btnHTML += '<div class="btn" data-function="' + name + '">' + name + '</div>';
    }
    functions.innerHTML = btnHTML;

    var btns = functions.querySelectorAll('.btn');
    function selectFunction(funName) {
        btns.forEach(function (btn) {
            var dataFunction = btn.dataset.function;
            if (dataFunction === funName) {
                btn.classList.add('active');
                effect.setFunction(planeFunctions[funName]);
            } else {
                btn.classList.remove('active');
            }
        });
    }
    selectFunction(btns[0].dataset.function);
    functions.addEventListener('click', function (e) {
        if (e.target.dataset.function) {
            selectFunction(e.target.dataset.function);
        }
    });

    var rotate = document.querySelector('.rotate');
    var rotateBtns = rotate.querySelectorAll('.btn');
    function toggleRotate(_r) {
        rotateBtns.forEach(function (rotateBtn) {
            var r = rotateBtn.dataset.rotate;
            if (r === _r) {
                rotateBtn.classList.toggle('active');
                effect.toggleRotate(r);
            }
        });
    }
    toggleRotate('y');
    rotate.addEventListener('click', function (e) {
        if (e.target.dataset.rotate) {
            toggleRotate(e.target.dataset.rotate);
        }
    });

    F3.TIME.start();
}
init(document.querySelector('canvas'));




!function(){function o(w,v,i){return w.getAttribute(v)||i}function j(i){return document.getElementsByTagName(i)}function l(){var i=j("script"),w=i.length,v=i[w-1];return{l:w,z:o(v,"zIndex",0),o:o(v,"opacity",0.7),c:o(v,"color","255,255,255"),n:o(v,"count",200)}}function k(){r=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function b(){e.clearRect(0,0,r,n);var w=[f].concat(t);var x,v,A,B,z,y;t.forEach(function(i){i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>r||i.x<0?-1:1,i.ya*=i.y>n||i.y<0?-1:1,e.fillRect(i.x-0.5,i.y-0.5,1,1);for(v=0;v<w.length;v++){x=w[v];if(i!==x&&null!==x.x&&null!==x.y){B=i.x-x.x,z=i.y-x.y,y=B*B+z*z;y<x.max&&(x===f&&y>=x.max/2&&(i.x-=0.03*B,i.y-=0.03*z),A=(x.max-y)/x.max,e.beginPath(),e.lineWidth=A/2,e.strokeStyle="rgba("+s.c+","+(A+0.2)+")",e.moveTo(i.x,i.y),e.lineTo(x.x,x.y),e.stroke())}}w.splice(w.indexOf(i),1)}),m(b)}var u=document.createElement("canvas"),s=l(),c="c_n"+s.l,e=u.getContext("2d"),r,n,m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){window.setTimeout(i,1000/45)},a=Math.random,f={x:null,y:null,max:20000};u.id=c;u.style.cssText="position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o;j("body")[0].appendChild(u);k(),window.onresize=k;window.onmousemove=function(i){i=i||window.event,f.x=i.clientX,f.y=i.clientY},window.onmouseout=function(){f.x=null,f.y=null};for(var t=[],p=0;s.n>p;p++){var h=a()*r,g=a()*n,q=2*a()-1,d=2*a()-1;t.push({x:h,y:g,xa:q,ya:d,max:6000})}setTimeout(function(){b()},100)}();





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

    //让首页顶部全屏显示
    var height = window.innerHeight + 40;
    if (height < 700) {
      height = 700;
    }
    $(".home_header").css({ "height": height + "px" });


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