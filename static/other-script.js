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

// add glow effect
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

// Add an event listener to the show more button to toggle btw show more and show less
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const collapseElement = document.querySelector(this.getAttribute('data-bs-target'));

        // Use Bootstrap's `shown.bs.collapse` and `hidden.bs.collapse` events for toggling text
        collapseElement.addEventListener('shown.bs.collapse', () => {
          this.textContent = 'See less';
        });

        collapseElement.addEventListener('hidden.bs.collapse', () => {
          this.textContent = 'Show more';
        });
      });
    });
  });