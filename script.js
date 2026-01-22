// XPLOIT OPS - JavaScript Interativo
// Adiciona interatividade sutil e moderna ao site

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de parallax sutil no background pattern
    let lastScroll = 0;
    const bgPattern = document.querySelector('.bg-pattern');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (bgPattern && Math.abs(currentScroll - lastScroll) > 5) {
            bgPattern.style.transform = `translateY(${currentScroll * 0.1}px)`;
            lastScroll = currentScroll;
        }
    });

    // Animação de entrada para elementos ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards e seções
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de digitação no código (opcional)
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.transition = 'opacity 0.3s ease';
                line.style.opacity = '1';
            }, index * 200);
        });
    }

    // Formulário de contato - validação e feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar lógica de envio real
            // Por enquanto, apenas feedback visual
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>&gt;_</span> Enviando...';
            submitButton.disabled = true;
            
            // Simulação de envio
            setTimeout(() => {
                submitButton.innerHTML = '<span>&gt;_</span> Enviado ✓';
                submitButton.style.backgroundColor = 'rgba(0, 240, 255, 0.3)';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Highlight do item de navegação ativo baseado no scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Chamar uma vez no carregamento
});
