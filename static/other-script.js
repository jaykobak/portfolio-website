// Function to add the 'visible' class to elements when they come into view
function animateOnScrollWithDelay() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set a timeout to add the 'visible' class after a delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 500); // 500ms delay, adjust as needed

                // Optional: Stop observing the element once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animation with delay
animateOnScrollWithDelay();

document.addEventListener("DOMContentLoaded", function() {
    const aboutMeSections = document.querySelectorAll('.about-me-intro');
    const observerOptions = {
        root: null, // use the viewport as the container
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is in view
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (window.innerWidth <= 768) {
                if (entry.isIntersecting) {
                    // Add the glow effect when the section is in view
                    entry.target.classList.add('glow-effect');
                } else {
                    // Remove the glow effect when the section is out of view
                    entry.target.classList.remove('glow-effect');
                }
            }
        });
    }, observerOptions);

    // Observe each section with the class 'about-me-intro'
    aboutMeSections.forEach(section => {
        observer.observe(section);
    });

    // Prevent click events from affecting the glow effect
    aboutMeSections.forEach(section => {
        section.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent clicks from toggling the glow effect
        });
    });
});

// JavaScript to animate the progress bars
document.addEventListener('DOMContentLoaded', function () {
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const progressBars = document.querySelectorAll('.progress-bar');

    function animateProgressBars() {
        progressBars.forEach(function (bar) {
            const value = bar.getAttribute('aria-valuenow');
            if (isInViewport(bar)) {
                bar.style.width = value + '%'; // Set width to the value percentage
            }
        });
    }

    // Trigger animation on scroll
    window.addEventListener('scroll', animateProgressBars);
    // Trigger animation on page load (in case the progress bars are already in view)
    animateProgressBars();
});

// Add an event listener to detect scroll events on mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    let isMobile = window.innerWidth < 768;
    let activeCard = null; // To track the currently expanded card

    // Intersection Observer callback
    function handleCardVisibility(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the 'active' class from the previously expanded card
                if (activeCard && activeCard !== entry.target) {
                    activeCard.classList.remove('active');
                }

                // Add the 'active' class to the currently visible card
                entry.target.classList.add('active');
                activeCard = entry.target; // Set this card as the active one
            } else {
                // Only collapse the card if it's the active one
                if (activeCard === entry.target) {
                    entry.target.classList.remove('active');
                    activeCard = null; // Reset active card when it's out of view
                }
            }
        });
    }

    // Intersection Observer options
    const observer = new IntersectionObserver(handleCardVisibility, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Function to handle observer setup for mobile screens
    function setupCards() {
        cards.forEach(card => {
            if (isMobile) {
                // Observe the card for visibility if it's a mobile screen
                observer.observe(card);
            } else {
                // Unobserve cards for larger screens
                observer.unobserve(card);
                card.classList.remove('active');  // Reset card state for larger screens
            }
        });
    }

    // Initialize observer and check on load
    setupCards();

    // Recheck when window is resized
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;

        // If screen size changes between mobile and non-mobile, update cards
        if (wasMobile !== isMobile) {
            setupCards();
        }
    });
});