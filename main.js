document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Navbar: transparent → white on scroll ──
    const header = document.getElementById('site-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── 2. Scroll-reveal for sections (.scroll-reveal) ──
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach((el) => sectionObserver.observe(el));

    // ── 3. Scroll-reveal for individual feature items ──
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-item').forEach((el) => itemObserver.observe(el));

    // ── 4. Hero image hover ──
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.03) translateY(-8px)';
            heroImage.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1) translateY(20px)';
        });
    }

    // ── 5. Wave parallax on scroll ──
    const waveSvg = document.querySelector('.custom-shape-divider-bottom-1710260400 svg');
    if (waveSvg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            // Move the wave gently as the user scrolls
            waveSvg.style.transform = `translateX(${Math.sin(scrolled * 0.005) * 15}px)`;
        }, { passive: true });
    }

    // ── 6. Destinations carousel auto-scroll ──
    const grid = document.querySelector('.destinations-grid');
    const leftBtn = document.querySelector('#slide-left');
    const rightBtn = document.querySelector('#slide-right');

    if (grid && leftBtn && rightBtn) {
        const getCardWidth = () => {
            const card = grid.querySelector('.destination-card');
            if (!card) return 330;
            const style = getComputedStyle(grid);
            const gap = parseInt(style.gap) || 30;
            return card.offsetWidth + gap;
        };

        const slideRight = () => {
            const maxScroll = grid.scrollWidth - grid.clientWidth;
            if (grid.scrollLeft >= maxScroll - 5) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            }
        };

        const slideLeft = () => {
            if (grid.scrollLeft <= 5) {
                grid.scrollTo({ left: grid.scrollWidth, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
            }
        };

        rightBtn.addEventListener('click', () => { slideRight(); pauseAutoScroll(); });
        leftBtn.addEventListener('click', () => { slideLeft(); pauseAutoScroll(); });

        // Auto-scroll every 3 seconds
        let autoTimer = setInterval(slideRight, 3000);

        const pauseAutoScroll = () => {
            clearInterval(autoTimer);
            setTimeout(() => {
                autoTimer = setInterval(slideRight, 3000);
            }, 6000);
        };

        grid.addEventListener('mouseenter', () => clearInterval(autoTimer));
        grid.addEventListener('mouseleave', () => {
            clearInterval(autoTimer);
            autoTimer = setInterval(slideRight, 3000);
        });

        grid.addEventListener('touchstart', () => clearInterval(autoTimer), { passive: true });
        grid.addEventListener('touchend', () => {
            clearInterval(autoTimer);
            autoTimer = setInterval(slideRight, 3000);
        }, { passive: true });
    }
});
