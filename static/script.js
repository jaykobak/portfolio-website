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

// Function to toggle project descriptions based on interaction
function toggleProject(event) {
    // Determine the source of the event
    const isBadge = event.target.classList.contains('status-badge');

    // Identify the project endpoint container
    const projectEndpoint = isBadge
        ? event.target.closest('.project-endpoint')
        : event.target.closest('.project-endpoint');

    const header = projectEndpoint.querySelector('.endpoint-header');
    const badge = projectEndpoint.querySelector('.status-badge');
    const description = projectEndpoint.querySelector('.endpoint-description');

    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        // Collapse the project
        header.setAttribute('aria-expanded', 'false');
        badge.textContent = 'Click me';
        badge.classList.remove('disabled-glow');
        badge.classList.add('glow');
        description.classList.remove('visible');
    } else {
        // Collapse any other expanded projects
        const allProjects = document.querySelectorAll('.project-endpoint');
        allProjects.forEach(project => {
            const projHeader = project.querySelector('.endpoint-header');
            const projBadge = project.querySelector('.status-badge');
            const projDescription = project.querySelector('.endpoint-description');

            if (project !== projectEndpoint) {
                projHeader.setAttribute('aria-expanded', 'false');
                projBadge.textContent = 'Click me';
                projBadge.classList.remove('disabled-glow');
                projBadge.classList.add('glow');
                projDescription.classList.remove('visible');
            }
        });

        // Expand the clicked project
        header.setAttribute('aria-expanded', 'true');
        badge.textContent = '201 Created';
        badge.classList.remove('glow');
        badge.classList.add('disabled-glow');
        description.classList.add('visible');
    }
}

// Function to handle keyboard accessibility for endpoint headers
function handleHeaderKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent scrolling on space
        toggleProject(event);
    }
}

// Attach event listeners to all endpoint headers and status badges once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const endpointHeaders = document.querySelectorAll('.endpoint-header');
    const statusBadges = document.querySelectorAll('.status-badge');

    // Initialize all badges
    statusBadges.forEach(badge => {
        badge.textContent = 'Click me';
        badge.classList.add('glow');
        badge.setAttribute('aria-expanded', 'false');

        // Attach click event listener to badges
        badge.addEventListener('click', (event) => {
            toggleProject(event);
            event.stopPropagation(); // Prevent the header's click event from firing
        });

        // Attach keyboard accessibility to badges
        badge.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleProject(event);
            }
        });
    });

    // Attach click and keyboard event listeners to endpoint headers
    endpointHeaders.forEach(header => {
        header.addEventListener('click', toggleProject);

        // Keyboard accessibility
        header.addEventListener('keydown', handleHeaderKeyPress);
    });
});