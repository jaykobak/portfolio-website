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