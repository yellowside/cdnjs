const menuData = [{
            type: 'link',
            label: '首页',
            icon: 'fa-home',
            href: '../'
//             active: true
        }, {
            type: 'link',
            label: '直播',
            icon: 'fa-video-camera',
            href: '../live/'
        }, {
            type: 'link',
            label: '美景',
            icon: 'fa-image',
            href: '../beautiful/'
        }, {
            type: 'link',
            label: '快办',
            icon: 'fa-external-link',
            href: '../kuaiban/'
        }, {
            type: 'link',
            label: '问政',
            icon: 'fa-comment-o',
            href: '../askzheng/'
        }, {
            type: 'link',
            label: '公务',
            icon: 'fa-suitcase',
            href: '../official/'
        }, {
            type: 'link',
            label: '举报',
            icon: 'fa-volume-up',
            href: '../jubao/'
        }, {
            type: 'link',
            label: '招标',
            icon: 'fa-bell',
            href: '../business/'
        }, {
            type: 'dropdown',
            label: '更多',
            children: [
                { label: '山水志', icon: 'fa-area-chart', href: '../landscape/' },
                { label: '人物志', icon: 'fa-vcard-o', href: '../figure/' },
                { label: '文物志', icon: 'fa-building', href: '../writer/' },
                { label: '政策库', icon: 'fa-clone', href: '../policy/' }
            ]
        }];

        function renderDesktopNav(data, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            let html = '';
            data.forEach(item => {
                if (item.type === 'link') {
                    const activeClass = item.active ? ' active' : '';
                    html += `<a href="${item.href}" class="${activeClass}"><i class="fa ${item.icon}"></i> ${item.label}</a>`;
                } else if (item.type === 'dropdown') {
                    html += `<div class="dropdown" data-dropdown>
                                <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa ${item.icon}"></i> ${item.label} <i class="fa fa-chevron-down"></i>
                                </button>
                                <div class="dropdown-menu" role="menu">`;
                    item.children.forEach(child => {
                        html += `<a href="${child.href}" role="menuitem"><i class="fa ${child.icon}"></i> ${child.label}</a>`;
                    });
                    html += `</div></div>`;
                }
            });
            container.innerHTML = html;
        }

        function renderMobileNav(data, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            let html = '';
            data.forEach(item => {
                if (item.type === 'link') {
                    html += `<a href="${item.href}"><i class="fa ${item.icon}"></i> ${item.label}</a>`;
                } else if (item.type === 'dropdown') {
                    html += `<div class="mobile-dropdown" data-mobile-dropdown>
                                <div class="mobile-dropdown-toggle" role="button" aria-expanded="false">
                                    <span class="toggle-left"><i class="fa ${item.icon}"></i> ${item.label}</span>
                                    <i class="fa fa-chevron-down toggle-arrow"></i>
                                </div>
                                <div class="mobile-dropdown-menu">`;
                    item.children.forEach(child => {
                        html += `<a href="${child.href}"><i class="fa ${child.icon}"></i> ${child.label}</a>`;
                    });
                    html += `</div></div>`;
                }
            });
            container.innerHTML = html;
        }

        document.addEventListener('DOMContentLoaded', function() {
            renderDesktopNav(menuData, 'desktopNav');
            renderMobileNav(menuData, 'mobileMenu');
            initMobileDropdowns();
            initDesktopDropdowns();
        });

        function initMobileDropdowns() {
            const toggles = document.querySelectorAll('.mobile-dropdown .mobile-dropdown-toggle');
            toggles.forEach(toggle => {
                toggle.removeEventListener('click', mobileToggleHandler);
                toggle.addEventListener('click', mobileToggleHandler);
            });
            // 移动端子菜单链接点击后关闭整个菜单
            const subLinks = document.querySelectorAll('.mobile-dropdown-menu a');
            subLinks.forEach(link => {
                link.removeEventListener('click', closeMobileMenu);
                link.addEventListener('click', closeMobileMenu);
            });
        }

        function mobileToggleHandler(e) {
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown');
            if (!parent) return;
            parent.classList.toggle('open');
            const expanded = parent.classList.contains('open');
            this.setAttribute('aria-expanded', expanded);
        }

        function closeMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const toggle = document.getElementById('menuToggle');
            if (menu) menu.classList.remove('show');
            if (toggle) toggle.classList.remove('active');
            // 收起所有展开的子菜单
            document.querySelectorAll('.mobile-dropdown.open').forEach(dd => {
                dd.classList.remove('open');
                const btn = dd.querySelector('.mobile-dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }

        function initDesktopDropdowns() {
            const toggles = document.querySelectorAll('.nav-links .dropdown > .dropdown-toggle');
            toggles.forEach(toggle => {
                toggle.removeEventListener('click', desktopToggleHandler);
                toggle.addEventListener('click', desktopToggleHandler);
            });
            // 点击页面其他地方关闭
            document.removeEventListener('click', closeDesktopDropdowns);
            document.addEventListener('click', closeDesktopDropdowns);
        }

        function desktopToggleHandler(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.dropdown');
            if (!parent) return;
            parent.classList.toggle('active');
            const expanded = parent.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        }

        function closeDesktopDropdowns(e) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                document.querySelectorAll('.nav-links .dropdown.active').forEach(dd => {
                    dd.classList.remove('active');
                    const btn = dd.querySelector('.dropdown-toggle');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });
            }
        }

        (function() {
            // 移动菜单整体切换
            const menuToggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            if (menuToggle && mobileMenu) {
                menuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.classList.toggle('active');
                    mobileMenu.classList.toggle('show');
                });
            }
            // 点击其他区域关闭移动菜单
            document.addEventListener('click', function(e) {
                if (menuToggle && mobileMenu) {
                    const isToggle = e.target.closest('#menuToggle');
                    const isMenu = e.target.closest('#mobileMenu');
                    if (!isToggle && !isMenu) {
                        mobileMenu.classList.remove('show');
                        menuToggle.classList.remove('active');
                    }
                }
            });
            // 窗口resize重置
            window.addEventListener('resize', function() {
                if (window.innerWidth > 900 && mobileMenu && menuToggle) {
                    mobileMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                }
            });

        })();