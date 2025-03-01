window.addEventListener('load', () => {
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');

    // Create Glitch Overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.classList.add('glitch-overlay');
    document.body.appendChild(glitchOverlay);

    // Generate 7-12 random glitch bars with varied properties
    const glitchCount = Math.floor(Math.random() * 6) + 7; // Between 7 and 12 bars
    for (let i = 0; i < glitchCount; i++) {
        let bar = document.createElement('div');
        bar.classList.add('glitch-bar');
        bar.style.top = `${Math.random() * 100}%`; // Random vertical position
        bar.style.height = `${Math.random() * 15 + 1}px`; // Mix of very thin and thick bars
        bar.style.animationDuration = `${Math.random() * 0.05 + 0.02}s`; // Fast, unpredictable speeds
        bar.style.background = `rgba(${Math.floor(Math.random() * 255)}, 
                                     ${Math.floor(Math.random() * 255)}, 
                                     ${Math.floor(Math.random() * 255)}, 0.9)`;
        glitchOverlay.appendChild(bar);
    }

    // Force video playback
    video.play().catch(() => {
        video.muted = true;
        video.play();
    });

    // When video ends, trigger the glitch effect before transitioning
    video.onended = () => {
        video.classList.add('fade-out');

        setTimeout(() => {
            glitchOverlay.classList.add('glitch-active');
        }, 20); // Almost instant start

        setTimeout(() => {
            glitchOverlay.classList.remove('glitch-active');
            glitchOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            video.style.display = 'none';

            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-animated');
                    }, index * 100);
                });
            }, 400);

        }, 300); // Shorter but extreme glitch effect
    };
});

// Smooth scrolling for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });

        // Close the hamburger menu after clicking a link
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');
    });
});

// Toggle hamburger menu and navbar
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Show player info on card click
function showPlayerInfo(name, country, position, stats) {
    const playerInfo = document.getElementById('player-info');
    playerInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Country: ${country}</p>
        <p>Position: ${position}</p>
        <p>Stats: ${stats}</p>
    `;
    playerInfo.classList.add('visible');
}