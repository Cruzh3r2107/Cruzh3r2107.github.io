// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#navbar ul');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Active Navigation Link
    function highlightNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    highlightNavLink();
    
    // Typed.js for Dynamic Text
    const options = {
        strings: ['Embedded Software Engineer', 'UCI Grad', 'Firmware Engineer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    };
    
    const typed = new Typed('.typed-text', options);
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Experience Section Toggle
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        const header = item.querySelector('.experience-header');
        const details = item.querySelector('.experience-details');
        
        header.addEventListener('click', function() {
            // Close all other open items
            experienceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Skills Animation
    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        const progressBars = document.querySelectorAll('.progress');
        let animated = false;
        
        function checkScroll() {
            const triggerBottom = window.innerHeight / 5 * 4;
            const skillsTop = skillsSection.getBoundingClientRect().top;
            
            if (skillsTop < triggerBottom && !animated) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 100);
                });
                animated = true;
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        // Check once when page loads
        checkScroll();
    }
    
    animateSkills();
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // This is where you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form Submitted:', { name, email, subject, message });
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you can replace this with a proper UI notification)
        alert('Thank you for your message! I will get back to you soon.');
    });
});