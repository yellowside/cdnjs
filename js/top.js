document.addEventListener('DOMContentLoaded', function() {
    // 回到顶部
    const style = document.createElement('style');
    style.innerHTML = `
        #scrollTop {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #fff;
            font-weight: 700;
            border-radius: 50%;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            /* 兼容性处理：将 var(--transition) 替换为通用值，确保在所有网站都有动画 */
            transition: all 0.3s ease; 
            border: none;
            z-index: 200;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            user-select: none;
        }
        #scrollTop.show {
            opacity: 1;
            visibility: visible;
        }
        #scrollTop:hover {
            transform: translateY(-3px);
            background: linear-gradient(135deg, #d97706, #b45309);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        #scrollTop:active {
            transform: translateY(0);
            box-shadow: 0 4px 16px rgba(245,158,11,0.35);
        }
    `;
    document.head.appendChild(style);

    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.title = '回到顶部';
    scrollTopBtn.textContent = 'TOP';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollPosition > 0) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
});