// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all sections and specific elements
    const revealElements = document.querySelectorAll('.section, .logo-item, .banner-item, .page-item, .detail-group');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Custom interactions or paranoid checks can go here
    console.log("Portfolio loaded and interactions ready.");

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show-back-to-top');
        } else {
            backToTopButton.classList.remove('show-back-to-top');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scatter Text Interaction
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.innerText;
        mainTitle.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
        
        const letters = mainTitle.querySelectorAll('span');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            letters.forEach(letter => {
                const rect = letter.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;
                
                const distanceX = mouseX - letterCenterX;
                const distanceY = mouseY - letterCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                
                // Interaction radius
                const radius = 300;
                
                if (distance < radius) {
                    const force = (radius - distance) / radius;
                    const moveX = (distanceX / distance) * force * -100; // Repel force
                    const moveY = (distanceY / distance) * force * -100;
                    const randomRotate = (Math.random() - 0.5) * 40 * force;
                    
                    letter.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${randomRotate}deg)`;
                } else {
                    letter.style.transform = 'translate(0, 0) rotate(0deg)';
                }
            });
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
             letters.forEach(letter => {
                letter.style.transform = 'translate(0, 0) rotate(0deg)';
            });
        });
    }
});
