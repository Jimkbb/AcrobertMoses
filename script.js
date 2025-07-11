document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    closeBtn.addEventListener('click', function() {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 70; // Height of fixed header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without refreshing
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Tab functionality for community initiatives
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! Hon. Acrobert will respond to you shortly.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Dynamic content loading for political achievements
    const achievements = [
        "Led education reform initiative benefiting 50 schools",
        "Secured funding for clean water projects in 10 villages",
        "Established youth entrepreneurship program",
        "Advocated for women's rights legislation"
    ];
    
    const achievementsList = document.querySelector('.political-achievements ul');
    if (achievementsList) {
        achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
    }
    
    // School data - could be fetched from an API in a real implementation
    const schools = [
        {
            name: "Hope Academy",
            location: "Kampala",
            founded: 2010,
            students: 1200,
            staff: 85,
            image: "images/hope-academy.jpg"
        },
        {
            name: "Future Leaders School",
            location: "Wakiso",
            founded: 2015,
            students: 800,
            staff: 45,
            image: "images/future-leaders.jpg"
        }
    ];
    
    const schoolsContainer = document.querySelector('.schools-container');
    if (schoolsContainer && schoolsContainer.children.length === 1) {
        // Only populate if placeholder exists
        schoolsContainer.innerHTML = ''; // Remove placeholder
        
        schools.forEach(school => {
            const schoolCard = document.createElement('div');
            schoolCard.className = 'school-card';
            schoolCard.innerHTML = `
                <img src="${school.image}" alt="${school.name}" loading="lazy">
                <h3>${school.name}</h3>
                <p>Founded in ${school.founded}, located in ${school.location}</p>
                <p>${school.students.toLocaleString()} students • ${school.staff} staff members</p>
                <a href="#" class="btn-school">Learn More</a>
            `;
            schoolsContainer.appendChild(schoolCard);
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src') || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (!img.complete) {
                imageObserver.observe(img);
            }
        });
    }
});