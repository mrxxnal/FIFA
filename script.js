window.addEventListener('load', () => {
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');

    // Create Glitch Overlay Element
    const glitchOverlay = document.createElement('div');
    glitchOverlay.classList.add('glitch-overlay');
    document.body.appendChild(glitchOverlay);

    // Force video playback
    video.play().catch((error) => {
        console.log('Autoplay failed. Muting and retrying...');
        video.muted = true;
        video.play();
    });

    // When the video ends, trigger the glitch effect before transitioning
    video.onended = () => {
        // Fade out video smoothly
        video.classList.add('fade-out');

        // Show glitch effect
        setTimeout(() => {
            glitchOverlay.style.display = 'block'; // Show the glitch overlay
        }, 500); // Delay before glitch starts

        // Remove glitch effect and show main content
        setTimeout(() => {
            glitchOverlay.style.display = 'none'; // Hide glitch overlay
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            video.style.display = 'none'; // Hide the video after fade-out

            // Add animation to cards after 3-second delay
            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-animated');
                    }, index * 300); // Staggering the animation of cards
                });
            }, 800); // Delay after main content is visible

        }, 1500); // Total glitch duration before transition
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