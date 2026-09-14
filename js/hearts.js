(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.innerHTML = `
        #hearts-layer { position:fixed; inset:0; pointer-events:none; z-index:1; overflow:hidden; }
.heart { position:absolute; font-size:16px; color:rgba(244,114,182,.55); animation:floatHeart linear forwards; }
@keyframes floatHeart {
  0%   { transform:translateY(100vh) rotate(0deg); opacity:0; }
  10%  { opacity:1; }
  90%  { opacity:1; }
  100% { transform:translateY(-10vh) rotate(360deg); opacity:0; }
}
        `;
        document.head.appendChild(style);
        const layer = document.createElement('div');
        layer.id = 'hearts-layer';
        document.body.appendChild(layer);
        function spawnHearts() {
            setInterval(function() {
                var h = document.createElement('div');
                h.className = 'heart';
                h.textContent = '❤';
                
                // 设置随机水平位置 (0-100vw)
                h.style.left = Math.random() * 100 + 'vw';
                
                // 设置随机大小 (10px - 24px)
                h.style.fontSize = (10 + Math.random() * 14) + 'px';
                
                // 设置随机动画时长 (6s - 14s)
                var dur = 6 + Math.random() * 8;
                h.style.animationDuration = dur + 's';
                
                layer.appendChild(h);

                // 动画结束后移除 DOM 元素，防止内存泄漏
                setTimeout(function() {
                    h.remove();
                }, dur * 1000);
            }, 900);
        }
        spawnHearts();
    });
})();
