/**
 * SatyaBodhi.AI - Main JavaScript
 * 
 * This file contains all the interactive functionality for the SatyaBodhi.AI website
 * 
 * Table of Contents:
 * 1. Global Variables
 * 2. Navigation & Menu
 * 3. Smooth Scrolling
 * 4. Scroll Animations
 * 5. Back to Top Button
 * 6. Form Handling
 * 7. Document Ready / Initialize
 */

/**
 * 1. Global Variables
 */
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const backToTopButton = document.querySelector('.back-to-top');
const newsletterForm = document.querySelector('.newsletter-form');

/**
 * 2. Navigation & Menu
 * Handle mobile menu toggle and header styling on scroll
 */
function setupNavigation() {
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (
        document.body.classList.contains('menu-open') && 
        !e.target.closest('.main-nav') && 
        !e.target.closest('.menu-toggle')
      ) {
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // Add scrolled class to header when page is scrolled
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      document.body.classList.remove('menu-open');
    });
  });
}

/**
 * 3. Smooth Scrolling
 * Enable smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip for links like "#" or links with no href
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 4. Scroll Animations
 * Add animations to elements when they enter the viewport
 */
function setupScrollAnimations() {
  // Fade-in animation for sections
  const fadeElements = document.querySelectorAll('.focus-card, .team-member-preview');
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add staggered delay to focus cards
  const focusCards = document.querySelectorAll('.focus-card');
  focusCards.forEach((card, index) => {
    card.classList.add(`fade-in-delay-${index}`);
  });
}

/**
 * 5. Back to Top Button
 * Show/hide back to top button and scroll to top when clicked
 */
function setupBackToTopButton() {
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * 6. Form Handling
 * Handle form submissions with basic validation
 */
function setupFormHandling() {
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (isValidEmail(email)) {
        // Normally we would submit to a server here
        // For now, just show a success message
        
        // Clear input
        emailInput.value = '';
        
        // Show success message (you could add a hidden success message element in the HTML)
        alert('Thank you for subscribing to our newsletter!');
      } else {
        // Show error message
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Contact form (if added later)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation and submission logic would go here
      // This is a placeholder for future implementation
      
      alert('Thank you for your message. We will get back to you soon!');
    });
  }
}

/**
 * Helper function to validate email
 */
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

/**
 * 7. Initialize when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupBackToTopButton();
  setupFormHandling();
  
  // Check for hash in URL and scroll to it after page load
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        const headerOffset = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

/**
 * Add placeholder SVG for the enlightenment icon if not loaded from server
 * This ensures the layout doesn't break if the SVG file is missing
 */
(() => {
    
  const enlightenmentIcon = document.querySelector('.enlightenment-icon');
  if (enlightenmentIcon && !enlightenmentIcon.getAttribute('src')) {
    const svgPlaceholder = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="enlightenment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f39c12" />
            <stop offset="100%" stop-color="#e67e22" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="50" fill="url(#enlightenment-gradient)" />
        <g fill="none" stroke="#fff" stroke-width="3">
          <path d="M100,30 L100,15" />
          <path d="M100,170 L100,185" />
          <path d="M30,100 L15,100" />
          <path d="M170,100 L185,100" />
          <path d="M48,48 L37,37" />
          <path d="M152,152 L163,163" />
          <path d="M48,152 L37,163" />
          <path d="M152,48 L163,37" />
        </g>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(230, 126, 34, 0.5)" stroke-width="1" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(230, 126, 34, 0.3)" stroke-width="1" />
      </svg>
    `;
    enlightenmentIcon.outerHTML = svgPlaceholder;
  }
})();