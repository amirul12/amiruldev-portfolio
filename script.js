/**
 * Portfolio Website Interactive Features
 * Smooth navigation, animations, and form handling
 */

// === DOM Elements ===
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.getElementById('themeToggle');

// === Dark/Light Mode Toggle ===
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Apply theme transition
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save preference
    localStorage.setItem('theme', newTheme);

    // Remove transition after animation completes
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);

    // Show toast notification
    showToast(`Switched to ${newTheme} mode`);
});

// === Hero Section - Enhanced Coding Symbols Animation ===
const codingSymbols = document.getElementById('codingSymbols');

// Make coding symbols glow on hover
if (codingSymbols) {
    document.addEventListener('mousemove', (e) => {
        const symbols = codingSymbols.querySelectorAll('.code-symbol');
        symbols.forEach(symbol => {
            const rect = symbol.getBoundingClientRect();
            const distance = Math.hypot(
                e.clientX - (rect.left + rect.width / 2),
                e.clientY - (rect.top + rect.height / 2)
            );

            if (distance < 150) {
                const opacity = 1 - (distance / 150);
                symbol.style.opacity = Math.max(0.2, opacity).toString();
                symbol.style.transform = `scale(${1 + opacity * 0.5})`;
            } else {
                symbol.style.opacity = '';
                symbol.style.transform = '';
            }
        });
    });
}

// Add random movement to coding symbols
const symbols = codingSymbols?.querySelectorAll('.code-symbol');
if (symbols) {
    symbols.forEach((symbol, index) => {
        // Randomize initial position slightly
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        symbol.style.marginLeft = `${randomX}px`;
        symbol.style.marginTop = `${randomY}px`;

        // Add pulse effect
        setInterval(() => {
            symbol.style.textShadow = `0 0 ${20 + Math.random() * 30}px rgba(0, 122, 204, ${0.3 + Math.random() * 0.4})`;
        }, 2000 + index * 200);
    });
}

// === Project Filtering ===
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter projects with animation
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            // Remove animation class first
            card.classList.remove('filtered');

            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                // Trigger animation
                setTimeout(() => {
                    card.classList.add('filtered');
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// === Navigation ===

// Navbar scroll effect
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

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            correspondingLink?.classList.add('active');
        }
    });
});

// === Smooth Scroll for Navigation Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === Intersection Observer for Animations ===

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe about cards
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe education cards
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Add animation class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate {
            opacity: 1 !important;
            transform: translateX(0) translateY(0) !important;
        }
    </style>
`);

// === Skill Bar Animation ===
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 100);
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// === Contact Form Handling ===
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Here you would normally send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);

        // Show success toast
        showToast('Message sent successfully!');

        // Reset form
        contactForm.reset();
    });
}

// === Toast Notification ===
function showToast(message, duration = 3000) {
    const toastText = toast.querySelector('span');
    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// === Typing Effect for Hero Subtitle (DISABLED - Clean Text) ===
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const roles = ['Flutter Developer', 'Android Native Developer', 'Fintech Expert'];
//     let roleIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     let typingDelay = 100;
//     let eraseDelay = 50;
//     let newTextDelay = 2000;
//
//     function typeEffect() {
//         const currentRole = roles[roleIndex];
//
//         if (isDeleting) {
//             heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
//             charIndex--;
//         } else {
//             heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
//             charIndex++;
//         }
//
//         let typeSpeed = isDeleting ? eraseDelay : typingDelay;
//
//         if (!isDeleting && charIndex === currentRole.length) {
//             typeSpeed = newTextDelay;
//             isDeleting = true;
//         } else if (isDeleting && charIndex === 0) {
//             isDeleting = false;
//             roleIndex = (roleIndex + 1) % roles.length;
//             typeSpeed = 500;
//         }
//
//         setTimeout(typeEffect, typeSpeed);
//     }
//
//     // Start typing effect after a delay
//     setTimeout(typeEffect, 1000);
// }

// === Parallax Effect for Hero Section (Subtle) ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// === Dynamic Year in Footer ===
const yearSpan = document.querySelector('.footer-copyright');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
}

// === Counter Animation for Stats (if you add stats later) ===
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// === Project Cards Hover Effect Enhancement ===
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(0, 122, 204, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// === Lazy Loading Images (if you add images later) ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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

// === Preloader (Optional) ===
window.addEventListener('load', () => {
    // Add a loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Initial animation trigger for elements in view
    setTimeout(() => {
        document.querySelectorAll('.timeline-item, .project-card, .about-card, .education-card').forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                item.classList.add('animate');
            }
        });
    }, 100);
});

// === Console Signature ===
console.log(
    '%c Portfolio of MD. AMIRUL ISLAM ',
    'background: #007acc; color: white; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log('%c Flutter & Android Developer ', 'color: #007acc; font-size: 14px;');
console.log('🚀 Let\'s build something amazing together!');

// === Enhanced Mouse Glow Effect on Cards ===
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .about-card, .education-card, .timeline-content');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

// Add mouse glow effect CSS dynamically
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .project-card::after,
        .about-card::after,
        .education-card::after,
        .timeline-content::after {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(0, 122, 204, 0.15) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 50%;
        }

        .project-card:hover::after,
        .about-card:hover::after,
        .education-card:hover::after,
        .timeline-content:hover::after {
            opacity: 1;
        }
    </style>
`);

// === Ripple Effect on Buttons ===
document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
`);

// === Scroll Progress Bar ===
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// === Magnetic Effect on Social Icons ===
document.querySelectorAll('.hero-social a').forEach(icon => {
    icon.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// === Text Scramble Effect for Section Titles (DISABLED - Clean Text) ===
// function scrambleText(element, finalText, duration = 1000) {
//     const chars = '!<>-_\\/[]{}—=+*^?#________';
//     let iteration = 0;
//     const interval = setInterval(() => {
//         element.textContent = finalText
//             .split('')
//             .map((letter, index) => {
//                 if (index < iteration) {
//                     return finalText[index];
//                 }
//                 return chars[Math.floor(Math.random() * chars.length)];
//             })
//             .join('');
//
//         if (iteration >= finalText.length) {
//             clearInterval(interval);
//         }
//
//         iteration += 1 / 2;
//     }, 30);
// }
//
// // Apply scramble effect to section titles on scroll
// const titleObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting && !entry.target.classList.contains('scrambled')) {
//             const title = entry.target;
//             const originalText = title.textContent;
//             title.classList.add('scrambled');
//             scrambleText(title, originalText);
//             titleObserver.unobserve(title);
//         }
//     });
// }, { threshold: 0.5 });
//
// document.querySelectorAll('.section-title').forEach(title => {
//     titleObserver.observe(title);
// });

// === Floating Animation for Profile Photo (DISABLED - Clean Look) ===
// const profileImage = document.querySelector('.profile-image');
// if (profileImage) {
//     let floatY = 0;
//     let floatDirection = 1;
//
//     function floatAnimation() {
//         floatY += 0.05 * floatDirection;
//
//         if (floatY > 10 || floatY < -10) {
//             floatDirection *= -1;
//         }
//
//         profileImage.style.transform = `translateY(${floatY}px)`;
//         requestAnimationFrame(floatAnimation);
//     }
//
//     floatAnimation();
// }

// === Stagger Animation for Filter Buttons ===
filterBtns.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.1}s`;
    btn.style.animation = 'fadeInUp 0.5s ease-out forwards';
});

// === Add Number Counter Animation for Skills ===
const skillNumbers = document.querySelectorAll('.skill-name');

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            // Extract percentage from skill bar
            const skillBar = entry.target.parentElement.querySelector('.skill-progress');
            if (skillBar) {
                const targetWidth = skillBar.style.width;
                const targetValue = parseInt(targetWidth);

                let current = 0;
                const increment = targetValue / 50;
                const duration = 1000;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        current = targetValue;
                        clearInterval(counter);
                    }
                }, stepTime);

                entry.target.classList.add('counted');
            }
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillNumbers.forEach(skill => numberObserver.observe(skill));
