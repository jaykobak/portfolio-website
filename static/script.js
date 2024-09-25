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
        threshold: 0.6 // trigger when 50% of the section is in view
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

// Function to control the skills visibility
document.addEventListener("DOMContentLoaded", function () {
    const viewSkillsBtn = document.getElementById("view-skills");
    const viewAboutBtn = document.getElementById("view-about");

    const aboutSection = document.querySelector(".about-section");
    const skillsSection = document.querySelector(".skills-section");

    // Function to handle smooth fade-in animation
    function fadeIn(element) {
        element.classList.add("active");
    }

    // Function to handle smooth fade-out animation
    function fadeOut(element, callback) {
        element.classList.remove("active");

        // Wait for the fade-out transition to complete before executing the callback
        element.addEventListener("transitionend", function handleTransitionEnd() {
            element.removeEventListener("transitionend", handleTransitionEnd);
            if (callback) callback();
        });
    }

    // Show "My Skills" section when "View My Skills" button is clicked
    viewSkillsBtn.addEventListener("click", function () {
        fadeOut(aboutSection, function () {
            fadeIn(skillsSection);
        });
    });

    // Show "About Me" section when "Go Back to About Me" button is clicked
    viewAboutBtn.addEventListener("click", function () {
        fadeOut(skillsSection, function () {
            fadeIn(aboutSection);
        });
    });
});


