/*! LazyLoad 1.0 - Copyright 2026 bingdou.com.cn */
(function () {
    'use strict';

    /* ========== 1. 可配置项（对应原 jQuery 参数） ========== */
    var config = {
        selector: 'img.lazy',                  // 懒加载目标选择器
        placeholder: 'https://ps.ssl.qhimg.com/t02e03ad9cda20f5542.jpg', // 占位图
        threshold: 200,                        // 距离视口 200px 提前加载
        fadeIn: true                           // 加载后淡入
    };

    /* ========== 2. 注入样式：淡入效果 + 占位兜底 ========== */
    var style = document.createElement('style');
    style.textContent =
        'img.lazy{opacity:0;transition:opacity .4s ease}' +
        'img.lazy.loaded{opacity:1}';
    document.head.appendChild(style);

    /* ========== 3. 核心：替换占位图为真实图片 ========== */
    function loadImage(img) {
        // 兼容 data-src 和 data-original 两种属性
        var realSrc = img.getAttribute('data-src') || img.getAttribute('data-original');
        if (!realSrc) return;

        img.src = realSrc;
        img.removeAttribute('data-src');
        img.removeAttribute('data-original');

        var show = function () {
            img.classList.add('loaded');
        };
        var onErr = function () {
            img.classList.add('loaded'); // 失败也淡入占位，避免一直空白
        };

        if (img.complete) {
            show();
        } else {
            img.addEventListener('load', show);
            img.addEventListener('error', onErr);
        }
    }

    /* ========== 4. 方案一：IntersectionObserver ========== */
    function initIO(images) {
        var io = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: config.threshold + 'px 0px', // 等价于 jQuery 的 threshold
            threshold: 0
        });
        images.forEach(function (img) { io.observe(img); });
    }

    /* ========== 5. 方案二：scroll 降级（老浏览器） ========== */
    function initScroll(images) {
        var ticking = false;

        function check() {
            var viewportH = window.innerHeight || document.documentElement.clientHeight;
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;

            for (var i = images.length - 1; i >= 0; i--) {
                var img = images[i];
                if (!img) continue;

                var rect = img.getBoundingClientRect();
                if (rect.top < viewportH + config.threshold) {
                    loadImage(img);
                    images.splice(i, 1);
                }
            }

            if (images.length === 0) {
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
            }
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(check);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        check();
    }

    /* ========== 6. 初始化：补占位图 + 启动监听 ========== */
    function init() {
        var images = Array.prototype.slice.call(
            document.querySelectorAll(config.selector)
        );
        if (images.length === 0) return;

        images.forEach(function (img) {
            // 若没有 src（或为空），注入占位图，避免 404 与布局抖动
            if (!img.getAttribute('src')) {
                img.src = config.placeholder;
            }
        });

        if ('IntersectionObserver' in window) {
            initIO(images);
        } else {
            initScroll(images);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();