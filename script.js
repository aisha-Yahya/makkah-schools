/* ============================================
   مدارس مكة الأهلية - JavaScript
   Animations, Interactions, & Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Preloader
    // ============================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800);
        });
        // Fallback: hide after 3 seconds max
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // Scroll Reveal Animations (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve so animations can replay if scrolled away and back
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // Counter Animation
    // ============================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            // Add + sign for larger numbers
            if (target >= 100) {
                element.textContent = current.toLocaleString('ar-SA') + '+';
            } else {
                element.textContent = current.toLocaleString('ar-SA');
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // Hero Particles
    // ============================================
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.2;

            particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
        background: ${Math.random() > 0.5 ? 'rgba(200,151,62,0.4)' : 'rgba(74,173,229,0.3)'};
      `;

            particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Smooth Scroll for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Contact Form Submission (Visual feedback)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '⏳ جارٍ الإرسال...';
            submitBtn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                submitBtn.innerHTML = '✅ تم الإرسال بنجاح!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2500);
            }, 1500);
        });
    }

    // ============================================
    // Parallax Effect on Hero (subtle)
    // ============================================
    const hero = document.getElementById('hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        });
    }

    // ============================================
    // Tilt Effect on Feature Cards
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card, .branch-card, .testimonial-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // Typing Effect for tagline (optional enhancement)
    // ============================================
    const tagline = document.querySelector('.hero-content .tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderLeft = '2px solid var(--gold)';

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    tagline.style.borderLeft = 'none';
                }, 1000);
            }
        }, 80);
    }
});
