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
document.addEventListener("DOMContentLoaded", function () {
    const aboutMeSections = document.querySelectorAll('.intro');
    const observerOptions = {
        root: null, // use the viewport as the container
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is in view
    };

    const observer = new IntersectionObserver(function (entries) {
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
        section.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent clicks from toggling the glow effect
        });
    });
});

/// Global variables
let skillsSection;
let aboutSection;
let toggleButton;
let observer;
let isScrolling = false;

// Function to run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    skillsSection = document.getElementById('skills');
    aboutSection = document.getElementById('about');
    toggleButton = document.querySelector('.toggle-section');

    // Set up the Intersection Observer
    observer = new IntersectionObserver((entries) => {
        if (!isScrolling) {
            entries.forEach(entry => {
                if (!entry.isIntersecting && skillsSection.classList.contains('active')) {
                    hideSkills();
                }
            });
        }
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Add click event listener to the toggle button
    toggleButton.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
    if (!skillsSection.classList.contains('active')) {
        showSkills();
    } else {
        hideSkills();
    }
}

function showSkills() {
    // Disconnect the observer temporarily
    observer.disconnect();

    skillsSection.classList.add('active');
    toggleButton.textContent = 'Go Back to About Me';
    
    // Set isScrolling to true to prevent the observer from hiding the skills section
    isScrolling = true;

    skillsSection.scrollIntoView({ behavior: 'smooth' });

    // After scrolling is complete, reconnect the observer and reset isScrolling
    setTimeout(() => {
        isScrolling = false;
        observer.observe(skillsSection);
    }, 5000); // Adjust this timeout if needed to match your scroll duration
}

function hideSkills() {
    skillsSection.classList.remove('active');
    toggleButton.textContent = 'View My Skills';
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

// Log to console when the script loads
console.log('Skills toggle script loaded');