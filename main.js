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


    // ── 6. Destinations carousel auto-scroll (Replaced by CSS Marquee) ──
    const grid = document.querySelector('.destinations-grid');
    if (grid) {
        // Manual scrolling listeners can be added here if needed
    }

    // Partners carousel functionality removed and replaced with CSS marquee for smoother motion
});
