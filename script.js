// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link');
const navLinksMobile = document.querySelectorAll('.nav-link-mobile');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    
    if (navMobile.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on a link
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        menuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'about', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                navLinksMobile.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section links
                const activeLinks = document.querySelectorAll(`[data-section="${section}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
                break;
            }
        }
    }
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillsSection = document.getElementById('about');
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > skillsSectionTop + skillsSectionHeight / 2) {
        skillProgress.forEach(skill => {
            const width = skill.getAttribute('data-width');
            skill.style.width = width + '%';
        });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        observer.observe(title);
    });
});

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

navLinksMobile.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Handle contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:maxyong798@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message (you can customize this)
    alert('Thank you for your message! Your email client should open now.');
    
    // Reset form
    contactForm.reset();
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    animateSkillBars();
});

// Handle button clicks
window.scrollToSection = scrollToSection;

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add smooth transitions on page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease-in-out';

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (uncomment if desired)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// });

// Add smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll(".about-text, .about-image, .contact-info, .contact-form-container, .experience-card");
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll(".about-text, .about-image, .contact-info, .contact-form-container, .experience-card");
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

window.addEventListener('scroll', revealOnScroll);

// Add click ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

