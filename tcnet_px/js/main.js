(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports !== "undefined") {
		factory();
	} else {
		var mod = {
			exports: {},
		};
		factory();
		global.main = mod.exports;
	}
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
	"use strict";

	new Swiper(".banner", {
		autoplay: {
			disableOnInteraction: false,
			delay: 3000,
		},
		loop: true,
		pagination: {
			el: ".banner-swiper-pagination",
			clickable: true,
		},
	});
	var module2Active = 0;
	var module2LeftList = $(".module2 .main .left .list");
	var module2RightList = $(".module2 .main .right .list");
	module2LeftList.each(function (index, item) {
		item.onmouseover = function () {
			module2LeftList[module2Active].classList.remove("active");
			module2RightList[module2Active].classList.remove("active");
			module2Active = index;
			item.classList.add("active");
			module2RightList[module2Active].classList.add("active");
		};
	});
	new Swiper(".pro-swiper", {
		autoplay: {
			disableOnInteraction: false,
			delay: 3000,
		},
		loop: true,
		pagination: {
			el: ".pro-swiper-pagination",
		},
	});
	var module7Active = 0;
	var module7List = $(".module7 .main .tabs .tab");
	var module7DirectionList = $(".module7 .main .direction-list");
	module7List.each(function (index, item) {
		item.onmouseover = function () {
			module7List[module7Active].classList.remove("active");
			module7DirectionList[module7Active].classList.remove("active");
			module7Active = index;
			item.classList.add("active");
			module7DirectionList[module7Active].classList.add("active");
		};
	});
	new Swiper(".teacher-swiper", {
		autoplay: {
			disableOnInteraction: false,
			delay: 3000,
		},
		loop: true,
		pagination: {
			el: ".teacher-swiper-pagination",
		},
		navigation: {
			nextEl: ".teacher-swiper-button-next",
			prevEl: ".teacher-swiper-button-prev",
		},
	});
	var systemActive = 0;
	$(".module9 .main .left .tab").each(function (index, item) {
		item.onmouseover = function () {
			$(".module9 .main .left .tab")[systemActive].classList.remove("active");
			$(".module9 .main .right .system")[systemActive].classList.remove("active");
			systemActive = index;
			item.classList.add("active");
			$(".module9 .main .right .system")[systemActive].classList.add("active");
		};
	});
	var module11Active = 0;
	var module11List = $(".module11 .main .left .list");
	module11List.each(function (index, item) {
		item.onmouseover = function () {
			module11List[module11Active].classList.remove("active");
			module11Active = index;
			item.classList.add("active");
		};
	});
	(function () {
		// 就业班列表
		var courseList = [];
		// 就业班列表元素
		var courseListRef = document.querySelector(".module4 .tbody"); // 就业班元素高度
		var courseDomHeight = 0;
		$.ajax({
			url: "",
			success: function success(res) {
				courseList = res
					.reduce(function (a, b) {
						return b.student ? a.concat(b.student) : a;
					}, [])
					.sort(function (a, b) {
						return parseInt(b.salary) - parseInt(a.salary);
					});
				courseList.forEach(function (item) {
					var dom = document.createElement("div");
					dom.className = "tr";
					dom.innerHTML = '\n                <p class="td">'
						.concat(item.studentName, '</p>\n                <p class="td">')
						.concat(item.studentEducation, '</p>\n                <p class="td">')
						.concat(item.studentProfessional, '</p>\n                <p class="td">')
						.concat(item.company, '</p>\n                <p class="td">')
						.concat(item.salary, "</p>\n            ");
					courseListRef.appendChild(dom);
				});
				courseDomHeight = courseListRef.children[0].offsetHeight;
				courseListRef.classList.add("running");
				courseListRef.style.transform = "translateY(-".concat(courseDomHeight, "px)");
				courseListRef.addEventListener("transitionend", scrollList);
			},
		}); // 向上滚动事件

		function scrollList() {
			courseListRef.classList.remove("running");
			courseListRef.style.transform = "translateY(0)";
			var firstDom = courseListRef.children[0];
			courseListRef.removeChild(courseListRef.children[0]);
			courseListRef.appendChild(firstDom);
			setTimeout(function () {
				courseListRef.classList.add("running");
				courseListRef.style.transform = "translateY(-".concat(courseDomHeight, "px)");
			});
		}
	})();
});
