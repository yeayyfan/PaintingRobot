// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // 显示成功消息
            alert(`感谢您的咨询！\n\n我们已收到您的信息：\n姓名：${name}\n邮箱：${email}\n电话：${phone}\n\n我们会尽快与您联系！`);
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 添加滚动时的阴影效果
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // 为特性卡片添加动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.feature-card, .application-card, .gallery-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 图库项目点击放大效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = createImageModal();
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img && overlay) {
                const imgSrc = img.src;
                const title = overlay.querySelector('h3').textContent;
                const description = overlay.querySelector('p').textContent;
                
                openImageModal(imgSrc, title, description);
            }
        });
    });
    
    // 创建图片模态框
    function createImageModal() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img class="modal-image" src="" alt="">
                <div class="modal-caption">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // 关闭按钮事件
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', closeImageModal);
        overlay.addEventListener('click', closeImageModal);
        
        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeImageModal();
            }
        });
        
        return modal;
    }
    
    // 打开图片模态框
    function openImageModal(imgSrc, title, description) {
        const modal = document.querySelector('.image-modal');
        const modalImg = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-description');
        
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭图片模态框
    function closeImageModal() {
        const modal = document.querySelector('.image-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 为技术参数表格添加悬停高亮效果
    const tableRows = document.querySelectorAll('.specs-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.querySelector('th')) {
                this.style.backgroundColor = '#f0f7ff';
            }
        });
        row.addEventListener('mouseleave', function() {
            if (!this.querySelector('th')) {
                this.style.backgroundColor = '';
            }
        });
    });
    
    // 控制台输出欢迎信息
    console.log('%c🤖 欢迎访问智能喷漆机器人展示页面！', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c如需技术支持，请联系：info@robotpainting.com', 'color: #764ba2; font-size: 14px;');
});

// 性能优化：图片懒加载（如果有实际图片）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}