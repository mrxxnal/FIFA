window.addEventListener('load', () => {
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');

    // Force video playback
    video.play().catch((error) => {
        console.log('Autoplay failed. Muting and retrying...');
        video.muted = true;
        video.play();
    });

    // When the video ends, transition smoothly to black background
    video.onended = () => {
        // Fade out the video with animation
        video.classList.add('fade-out');

        // Show the main content with a delay
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            video.style.display = 'none'; // Hide the video after fade-out

            // Add animation to cards after a 3-second delay
            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-animated');
                    }, index * 300); // Staggering the animation of cards
                });
            }, 800); // 3-second delay after main content is visible

        }, 2000); // Duration of the fade-out animation
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