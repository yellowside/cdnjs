//樱花
var stop, staticx;
var img = new Image();
img.src = "data:image/png;base64,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";

function Sakura(x, y, s, r, fn) {
	this.x = x;
	this.y = y;
	this.s = s;
	this.r = r;
	this.fn = fn;
}

Sakura.prototype.draw = function(cxt) {
	cxt.save();
	var xc = 40 * this.s / 4;
	cxt.translate(this.x, this.y);
	cxt.rotate(this.r);
	cxt.drawImage(img, 0, 0, 48 * this.s, 48 * this.s)
	cxt.restore();
}

Sakura.prototype.update = function() {
	this.x = this.fn.x(this.x, this.y);
	this.y = this.fn.y(this.y, this.y);
	this.r = this.fn.r(this.r);
	if(this.x > window.innerWidth ||
		this.x < 0 ||
		this.y > window.innerHeight ||
		this.y < 0
	) {
		this.r = getRandom('fnr');
		if(Math.random() > 0.4) {
this.x = getRandom('x');
this.y = 0;
this.s = getRandom('s');
this.r = getRandom('r');
		} else {
this.x = window.innerWidth;
this.y = getRandom('y');
this.s = getRandom('s');
this.r = getRandom('r');
		}
	}
}

SakuraList = function() {
	this.list = [];
}
SakuraList.prototype.push = function(sakura) {
	this.list.push(sakura);
}
SakuraList.prototype.update = function() {
	for(var i = 0, len = this.list.length; i < len; i++) {
		this.list[i].update();
	}
}
SakuraList.prototype.draw = function(cxt) {
	for(var i = 0, len = this.list.length; i < len; i++) {
		this.list[i].draw(cxt);
	}
}
SakuraList.prototype.get = function(i) {
	return this.list[i];
}
SakuraList.prototype.size = function() {
	return this.list.length;
}

function getRandom(option) {
	var ret, random;
	switch(option) {
		case 'x':
ret = Math.random() * window.innerWidth;
break;
		case 'y':
ret = Math.random() * window.innerHeight;
break;
		case 's':
ret = Math.random();
break;
		case 'r':
ret = Math.random() * 6;
break;
		case 'fnx':
random = -0.5 + Math.random() * 1;
ret = function(x, y) {
	return x + 0.5 * random - 1.7;
};
break;
		case 'fny':
random = 1.5 + Math.random() * 0.7
ret = function(x, y) {
	return y + random;
};
break;
		case 'fnr':
random = Math.random() * 0.03;
ret = function(r) {
	return r + random;
};
break;
	}
	return ret;
}

function startSakura() {

	requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame;
	var canvas = document.createElement('canvas'),
		cxt;
	staticx = true;
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
	canvas.setAttribute('id', 'canvas_sakura');
	document.getElementsByTagName('body')[0].appendChild(canvas);
	cxt = canvas.getContext('2d');
	var sakuraList = new SakuraList();
	for(var i = 0; i < 20; i++) { // 落下数量
		var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
		randomX = getRandom('x');
		randomY = getRandom('y');
		randomR = getRandom('r');
		randomS = getRandom('s');
		randomFnx = getRandom('fnx');
		randomFny = getRandom('fny');
		randomFnR = getRandom('fnr');
		sakura = new Sakura(randomX, randomY, randomS, randomR, {
x: randomFnx,
y: randomFny,
r: randomFnR
		});
		sakura.draw(cxt);
		sakuraList.push(sakura);
	}
	stop = requestAnimationFrame(function() {
		cxt.clearRect(0, 0, canvas.width, canvas.height);
		sakuraList.update();
		sakuraList.draw(cxt);
		stop = requestAnimationFrame(arguments.callee);
	})
}

window.onresize = function() {
	var canvasSnow = document.getElementById('canvas_snow');
	canvasSnow.width = window.innerWidth;
	canvasSnow.height = window.innerHeight;
}

img.onload = function() {
	startSakura();
}

function stopp() {
	if(staticx) {
		var child = document.getElementById("canvas_sakura");
		child.parentNode.removeChild(child);
		window.cancelAnimationFrame(stop);
		staticx = false;
	} else {
		startSakura();
	}
}