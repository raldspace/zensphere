// SereneMind - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initTypewriter();
    initMobileMenu();
    initServiceSelector();
    initAssessmentQuiz();
    initScrollAnimations();
    initTestimonialSlider();
    initSmoothScrolling();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    if (currentPage === 'services') {
        initServicesPage();
    } else if (currentPage === 'about') {
        initAboutPage();
    } else if (currentPage === 'contact') {
        initContactPage();
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('services.html')) return 'services';
    if (path.includes('about.html')) return 'about';
    if (path.includes('contact.html')) return 'contact';
    return 'home';
}

// Typewriter Effect for Hero
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: ['Find Your Path to ', 'Discover Peace of ', 'Embrace Healing and '],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Service Type Selector
function initServiceSelector() {
    const remoteBtn = document.getElementById('remote-btn');
    const inpersonBtn = document.getElementById('inperson-btn');
    const serviceContent = document.getElementById('service-content');
    
    if (!remoteBtn || !inpersonBtn || !serviceContent) return;
    
    // Service data
    const serviceData = {
        remote: {
            title: 'Remote Therapy',
            description: 'Access professional therapy from the comfort of your home.',
            benefits: [
                'Convenient and flexible scheduling',
                'No travel time or transportation costs',
                'Comfortable, familiar environment',
                'Access to specialized therapists',
                'Secure, HIPAA-compliant platform'
            ],
            image: './resources/remote-session.jpg',
            cta: 'Book Remote Session'
        },
        inperson: {
            title: 'In-Person Services',
            description: 'Experience therapy in our warm, professional office environment.',
            benefits: [
                'Face-to-face personal connection',
                'Dedicated therapeutic space',
                'Immediate crisis support',
                'Body language and non-verbal cues',
                'Structured, distraction-free environment'
            ],
            image: './resources/therapy-room.jpg',
            cta: 'Schedule Visit'
        }
    };
    
    function updateServiceContent(type) {
        const data = serviceData[type];
        
        serviceContent.innerHTML = `
            <div class="space-y-8">
                <div>
                    <h3 class="text-2xl font-tiempos text-charcoal mb-4">${data.title}</h3>
                    <p class="text-charcoal/70 text-lg mb-6">${data.description}</p>
                    <ul class="space-y-3">
                        ${data.benefits.map(benefit => `
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-charcoal/80">${benefit}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="text-center">
                    <a href="contact.html" class="btn-primary text-cream px-8 py-3 rounded-full text-lg font-medium">
                        ${data.cta}
                    </a>
                </div>
            </div>
            <div class="relative">
                <img src="${data.image}" alt="${data.title}" class="rounded-2xl shadow-lg w-full h-80 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-sage/20 to-transparent rounded-2xl"></div>
            </div>
        `;
        
        // Animate content change
        anime({
            targets: serviceContent,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }
    
    // Set initial content
    updateServiceContent('remote');
    remoteBtn.classList.add('bg-sage', 'text-cream');
    remoteBtn.classList.remove('text-charcoal');
    
    // Event listeners
    remoteBtn.addEventListener('click', function() {
        updateServiceContent('remote');
        remoteBtn.classList.add('bg-sage', 'text-cream');
        remoteBtn.classList.remove('text-charcoal');
        inpersonBtn.classList.remove('bg-sage', 'text-cream');
        inpersonBtn.classList.add('text-charcoal');
    });
    
    inpersonBtn.addEventListener('click', function() {
        updateServiceContent('inperson');
        inpersonBtn.classList.add('bg-sage', 'text-cream');
        inpersonBtn.classList.remove('text-charcoal');
        remoteBtn.classList.remove('bg-sage', 'text-cream');
        remoteBtn.classList.add('text-charcoal');
    });
}

// Mental Health Assessment Quiz
function initAssessmentQuiz() {
    const startBtn = document.getElementById('start-assessment');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('quiz-progress');
    
    if (!startBtn || !quizContainer) return;
    
    // Quiz questions
    const questions = [
        {
            question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
            category: "depression"
        },
        {
            question: "How often have you felt nervous, anxious, or on edge?",
            options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
            category: "anxiety"
        },
        {
            question: "How would you rate your current stress level?",
            options: ["Very low", "Low", "Moderate", "High", "Very high"],
            category: "stress"
        },
        {
            question: "How often do you have trouble falling or staying asleep?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            category: "sleep"
        },
        {
            question: "How satisfied are you with your current relationships?",
            options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
            category: "relationships"
        },
        {
            question: "How often do you feel overwhelmed by daily responsibilities?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            category: "overwhelm"
        },
        {
            question: "Have you experienced any traumatic events that still affect you?",
            options: ["No", "Yes, but I've processed it", "Yes, it still affects me sometimes", "Yes, it significantly affects me"],
            category: "trauma"
        },
        {
            question: "How motivated do you feel to make positive changes in your life?",
            options: ["Very motivated", "Somewhat motivated", "Neutral", "Not very motivated", "Not motivated at all"],
            category: "motivation"
        }
    ];
    
    let currentQuestion = 0;
    let answers = [];
    
    startBtn.addEventListener('click', function() {
        quizContainer.classList.remove('hidden');
        quizContainer.scrollIntoView({ behavior: 'smooth' });
        showQuestion(0);
    });
    
    function showQuestion(index) {
        if (index >= questions.length) {
            showResults();
            return;
        }
        
        const question = questions[index];
        const progress = ((index + 1) / questions.length) * 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${index + 1}/${questions.length}`;
        
        quizQuestions.innerHTML = `
            <div class="text-center mb-8">
                <h4 class="text-xl font-semibold text-charcoal mb-6">${question.question}</h4>
                <div class="space-y-3">
                    ${question.options.map((option, i) => `
                        <button class="quiz-option w-full text-left p-4 rounded-lg border-2 border-sage/20 hover:border-sage hover:bg-sage/5 transition-all" data-value="${i}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners to options
        const options = quizQuestions.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                answers[index] = { category: question.category, value: value };
                
                // Visual feedback
                options.forEach(opt => {
                    opt.classList.remove('border-sage', 'bg-sage/10');
                    opt.classList.add('border-sage/20');
                });
                this.classList.add('border-sage', 'bg-sage/10');
                
                // Move to next question after delay
                setTimeout(() => {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }, 500);
            });
        });
    }
    
    function showResults() {
        quizQuestions.classList.add('hidden');
        quizResults.classList.remove('hidden');
        
        // Calculate scores by category
        const scores = {};
        answers.forEach(answer => {
            if (!scores[answer.category]) {
                scores[answer.category] = 0;
            }
            scores[answer.category] += answer.value;
        });
        
        // Determine recommendations
        const recommendations = getRecommendations(scores);
        
        document.getElementById('results-content').innerHTML = `
            <div class="bg-white rounded-xl p-6 mb-6">
                <h5 class="text-xl font-semibold text-charcoal mb-4">Your Assessment Summary</h5>
                <p class="text-charcoal/70 mb-6">Based on your responses, here are some areas where therapy might be beneficial:</p>
                <div class="space-y-4">
                    ${recommendations.map(rec => `
                        <div class="flex items-start">
                            <div class="w-3 h-3 bg-sage rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <div>
                                <h6 class="font-semibold text-charcoal">${rec.area}</h6>
                                <p class="text-charcoal/70 text-sm">${rec.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <p class="text-charcoal/70">
                Remember, this assessment is for informational purposes only. A professional consultation 
                will provide personalized recommendations based on your unique situation.
            </p>
        `;
    }
    
    function getRecommendations(scores) {
        const recommendations = [];
        
        if (scores.depression >= 2) {
            recommendations.push({
                area: "Depression Support",
                description: "Cognitive Behavioral Therapy (CBT) can help address depressive thoughts and behaviors."
            });
        }
        
        if (scores.anxiety >= 2) {
            recommendations.push({
                area: "Anxiety Management",
                description: "Anxiety-focused therapy and mindfulness techniques can reduce worry and physical symptoms."
            });
        }
        
        if (scores.stress >= 3) {
            recommendations.push({
                area: "Stress Management",
                description: "Learn healthy coping strategies and stress reduction techniques."
            });
        }
        
        if (scores.trauma >= 2) {
            recommendations.push({
                area: "Trauma Recovery",
                description: "EMDR or trauma-focused therapy can help process difficult experiences."
            });
        }
        
        if (scores.relationships >= 3) {
            recommendations.push({
                area: "Relationship Counseling",
                description: "Individual or couples therapy can improve communication and relationship satisfaction."
            });
        }
        
        if (recommendations.length === 0) {
            recommendations.push({
                area: "Personal Growth",
                description: "Therapy can support your continued personal development and life satisfaction."
            });
        }
        
        return recommendations.slice(0, 3); // Limit to top 3 recommendations
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        new Splide('#testimonial-slider', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
            arrows: false,
            pagination: true,
            gap: '2rem'
        }).mount();
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Services Page Specific Functions
function initServicesPage() {
    initServiceFilters();
    initAppointmentScheduler();
}

function initServiceFilters() {
    // Filter functionality for service categories
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('bg-sage', 'text-cream'));
            this.classList.add('bg-sage', 'text-cream');
            
            // Filter cards
            serviceCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// About Page Specific Functions
function initAboutPage() {
    initTeamMemberInteractions();
}

function initTeamMemberInteractions() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Contact Page Specific Functions
function initContactPage() {
    initAppointmentScheduler();
    initContactForm();
}

function initAppointmentScheduler() {
    const scheduler = document.getElementById('appointment-scheduler');
    if (!scheduler) return;
    
    // Mock calendar functionality
    const calendar = document.getElementById('calendar-grid');
    const timeSlots = document.getElementById('time-slots');
    const bookingForm = document.getElementById('booking-form');
    
    if (calendar) {
        // Generate calendar days
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        
        let calendarHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            const isPast = day < today.getDate();
            const isWeekend = (firstDay + day - 1) % 7 === 0 || (firstDay + day - 1) % 7 === 6;
            
            let dayClass = 'calendar-day p-2 text-center rounded cursor-pointer transition-all';
            if (isToday) dayClass += ' bg-sage text-cream';
            else if (isPast || isWeekend) dayClass += ' text-gray-400 cursor-not-allowed';
            else dayClass += ' hover:bg-sage/10';
            
            calendarHTML += `<div class="${dayClass}" data-day="${day}" ${isPast || isWeekend ? '' : 'data-available="true"'}>${day}</div>`;
        }
        
        calendar.innerHTML = calendarHTML;
        
        // Add event listeners to available days
        calendar.querySelectorAll('[data-available="true"]').forEach(day => {
            day.addEventListener('click', function() {
                // Remove previous selection
                calendar.querySelectorAll('.selected').forEach(el => {
                    el.classList.remove('selected', 'bg-sage/20');
                });
                
                // Select this day
                this.classList.add('selected', 'bg-sage/20');
                
                // Show time slots
                showTimeSlots();
            });
        });
    }
    
    function showTimeSlots() {
        if (!timeSlots) return;
        
        const slots = [
            '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
            '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
        ];
        
        timeSlots.innerHTML = `
            <h4 class="text-lg font-semibold text-charcoal mb-4">Available Times</h4>
            <div class="grid grid-cols-2 gap-3">
                ${slots.map(slot => `
                    <button class="time-slot p-3 border-2 border-sage/20 rounded-lg hover:border-sage hover:bg-sage/5 transition-all" data-time="${slot}">
                        ${slot}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add event listeners to time slots
        timeSlots.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', function() {
                // Remove previous selection
                timeSlots.querySelectorAll('.selected').forEach(el => {
                    el.classList.remove('selected', 'border-sage', 'bg-sage/10');
                });
                
                // Select this time
                this.classList.add('selected', 'border-sage', 'bg-sage/10');
                
                // Show booking form
                if (bookingForm) {
                    bookingForm.classList.remove('hidden');
                    bookingForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        timeSlots.classList.remove('hidden');
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-sage/10 border border-sage/20 rounded-lg p-4 mt-4 text-sage';
        successMessage.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Thank you for your message! We'll get back to you within 24 hours.
            </div>
        `;
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-sage text-cream' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-charcoal text-cream'
    }`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Handle form submissions and interactions
document.addEventListener('click', function(e) {
    // Handle CTA buttons that don't have specific functionality yet
    if (e.target.classList.contains('btn-primary') && !e.target.href) {
        e.preventDefault();
        if (e.target.textContent.includes('Book') || e.target.textContent.includes('Schedule')) {
            window.location.href = 'contact.html';
        } else {
            showNotification('Coming soon! Please contact us directly.', 'info');
        }
    }
});

// Add loading states for better UX
function addLoadingState(element) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    
    return function removeLoadingState() {
        element.textContent = originalText;
        element.disabled = false;
    };
}

// Export functions for use in other files if needed
window.SereneMind = {
    showNotification,
    addLoadingState,
    initAppointmentScheduler,
    initContactForm
};

// Blog Functionality
function initBlogPage() {
    initBlogSearch();
    initBlogFilters();
    initBlogLoadMore();
    initNewsletterSignup();
}

function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.category-filter');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-sage', 'text-cream');
                b.classList.add('border-sage/20', 'text-charcoal');
            });
            this.classList.add('active', 'bg-sage', 'text-cream');
            this.classList.remove('border-sage/20', 'text-charcoal');
            
            // Filter cards
            blogCards.forEach(card => {
                const cardCategories = card.dataset.category.split(' ');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initBlogLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more posts
        showNotification('Loading more articles...', 'info');
        
        setTimeout(() => {
            showNotification('All articles loaded!', 'success');
        }, 1500);
    });
}

function initNewsletterSignup() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[name="email"]').value;
        
        // Simulate newsletter signup
        showNotification('Subscribing to newsletter...', 'info');
        
        setTimeout(() => {
            showNotification('Successfully subscribed! Thank you for joining our community.', 'success');
            this.reset();
        }, 1500);
    });
}

// Update getCurrentPage function to include blog
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('services.html')) return 'services';
    if (path.includes('about.html')) return 'about';
    if (path.includes('contact.html')) return 'contact';
    if (path.includes('blog.html') || path.includes('/blog/')) return 'blog';
    return 'home';
}

// Update initializeApp to include blog initialization
function initializeApp() {
    // Initialize all components
    initTypewriter();
    initMobileMenu();
    initServiceSelector();
    initAssessmentQuiz();
    initScrollAnimations();
    initTestimonialSlider();
    initSmoothScrolling();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    if (currentPage === 'services') {
        initServicesPage();
    } else if (currentPage === 'about') {
        initAboutPage();
    } else if (currentPage === 'contact') {
        initContactPage();
    } else if (currentPage === 'blog') {
        initBlogPage();
    }
}