// 通用导航组件
class NavigationComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.apiStatus = 'checking';
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '') return 'home';
        if (path === '/web') return 'web';
        if (path === '/demo') return 'demo';
        if (path === '/test') return 'test';
        return 'unknown';
    }

    init() {
        this.createNavigationBar();
        this.checkAPIStatus();
        this.addBackToTopButton();
        this.addKeyboardShortcuts();
        
        // 为页面添加导航样式类
        document.body.classList.add('has-nav');
    }

    createNavigationBar() {
        const nav = document.createElement('nav');
        nav.className = 'navigation-bar';
        nav.innerHTML = `
            <div class="nav-container">
                <a href="/" class="nav-logo">
                    🏥 医疗问诊助手
                </a>
                
                <button class="nav-toggle" onclick="toggleMobileMenu()">
                    ☰
                </button>
                
                <ul class="nav-menu" id="nav-menu">
                    <li class="nav-item">
                        <a href="/" class="nav-link ${this.currentPage === 'home' ? 'active' : ''}" 
                           title="系统主页和导航">
                            🏠 主页
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/web" class="nav-link ${this.currentPage === 'web' ? 'active' : ''}" 
                           title="完整的医疗问诊表单">
                            📋 问诊表单
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/demo" class="nav-link ${this.currentPage === 'demo' ? 'active' : ''}" 
                           title="API功能演示">
                            🧪 API演示
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/test" class="nav-link ${this.currentPage === 'test' ? 'active' : ''}" 
                           title="系统功能测试">
                            🔧 系统测试
                        </a>
                    </li>
                </ul>
                
                <div class="nav-status">
                    <div class="nav-status-dot" id="nav-status-dot"></div>
                    <span id="nav-status-text">检查中...</span>
                </div>
            </div>
        `;

        // 插入到页面顶部
        document.body.insertBefore(nav, document.body.firstChild);
    }

    async checkAPIStatus() {
        const statusDot = document.getElementById('nav-status-dot');
        const statusText = document.getElementById('nav-status-text');

        try {
            const response = await fetch('/api/health');
            const data = await response.json();

            if (response.ok) {
                this.apiStatus = 'online';
                statusDot.className = 'nav-status-dot';
                statusText.textContent = '在线';
                statusDot.title = '服务器连接正常';
            } else {
                throw new Error('API响应异常');
            }
        } catch (error) {
            this.apiStatus = 'offline';
            statusDot.className = 'nav-status-dot offline';
            statusText.textContent = '离线';
            statusDot.title = '服务器连接失败';
        }

        // 每30秒检查一次
        setTimeout(() => this.checkAPIStatus(), 30000);
    }

    addBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.title = '返回顶部';
        backToTop.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        document.body.appendChild(backToTop);

        // 滚动监听
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + 数字键快速导航
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        window.location.href = '/';
                        break;
                    case '2':
                        e.preventDefault();
                        window.location.href = '/web';
                        break;
                    case '3':
                        e.preventDefault();
                        window.location.href = '/demo';
                        break;
                    case '4':
                        e.preventDefault();
                        window.location.href = '/test';
                        break;
                }
            }
        });
    }

    // 显示通知消息
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10001;
            opacity: 0;
            transform: translateX(300px);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // 自动消失
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }
}

// 移动端菜单切换
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', function() {
    // 确保CSS已加载
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/navigation.css';
    document.head.appendChild(link);

    // 初始化导航组件
    window.navigation = new NavigationComponent();

    // 添加页面切换提示
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
        originalPushState.apply(history, arguments);
        if (window.navigation) {
            window.navigation.showNotification('页面已切换', 'info', 2000);
        }
    };

    history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
    };

    // 监听浏览器后退/前进
    window.addEventListener('popstate', function() {
        if (window.navigation) {
            window.navigation.showNotification('页面已切换', 'info', 2000);
        }
    });
});

// 导出给全局使用
window.NavigationComponent = NavigationComponent;
