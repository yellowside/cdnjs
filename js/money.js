(function() {
    // 金钱飘落
    function initMoneyEffect() {
        // 1. 动态创建并插入 CSS 样式
        const style = document.createElement('style');
        style.innerHTML = `
            #moneyCanvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none; /* 确保不阻挡鼠标点击 */
                z-index: 9999; /* 设置为高层级以确保显示在最前，原代码为 0 */
            }
        `;
        document.head.appendChild(style);

        // 2. 动态创建 Canvas 元素并添加到 body
        const canvas = document.createElement('canvas');
        canvas.id = 'moneyCanvas';
        document.body.appendChild(canvas);

        // 3. 动画核心逻辑
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let symbols = [];
        const moneySymbols = ['￥', '$', '€', '￡'];

        class Symbol {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * -h;
                this.size = Math.random() * 14 + 12;
                this.speed = Math.random() * 2 + 1;
                this.char = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
                this.opacity = Math.random() * 0.25 + 0.08;
                this.rotate = 0;
                this.rs = Math.random() * 0.02 - 0.01;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#F59E0B'; // 金色
                ctx.font = `${this.size}px Arial`;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotate);
                ctx.fillText(this.char, 0, 0);
                ctx.restore();
            }
            update() {
                this.y += this.speed;
                this.rotate += this.rs;
                if (this.y > h) this.y = -30;
            }
        }

        function init() {
            symbols = [];
            for (let i = 0; i < 40; i++) symbols.push(new Symbol());
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            symbols.forEach(s => { 
                s.draw(); 
                s.update(); 
            });
            requestAnimationFrame(animate);
        }

        // 使用 addEventListener 监听窗口大小变化，避免覆盖其他事件
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        // 启动
        init();
        animate();
    }

    // 判断文档加载状态
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoneyEffect);
    } else {
        // 如果文档已经加载完成，直接执行
        initMoneyEffect();
    }
})();