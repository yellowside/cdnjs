(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // 1. 动态创建并注入 CSS 样式
        // 注意：补充了 @keyframes floatUp，否则爱心只会出现而不会飘动
        const style = document.createElement('style');
        style.innerHTML = `
            #hearts-layer {
                position: fixed;
                inset: 0; /* 相当于 top:0; right:0; bottom:0; left:0; */
                pointer-events: none; /* 不阻挡鼠标点击 */
                z-index: 9999; /* 设置高层级，确保在网页内容之上显示 */
                overflow: hidden;
            }
            .heart {
                position: absolute;
                bottom: -30px; /* 从屏幕底部下方开始 */
                color: #ff69b4; /* 爱心颜色 */
                animation: floatUp linear forwards; /* 应用飘动动画 */
                will-change: transform, opacity;
            }
            @keyframes floatUp {
                0% {
                    transform: translateY(0) scale(0.5) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-110vh) scale(1.2) rotate(360deg); /* 向上飘出屏幕并旋转 */
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // 2. 动态创建容器层
        const layer = document.createElement('div');
        layer.id = 'hearts-layer';
        document.body.appendChild(layer);

        // 3. 定义生成爱心的逻辑
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

        // 4. 启动效果
        spawnHearts();
    });
})();