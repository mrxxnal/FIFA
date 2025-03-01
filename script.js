window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    const glitchText = document.getElementById('glitch-text'); // Ensure correct selection
    const subtitle = document.querySelector('.subtitle');
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');

    console.log("Script loaded, starting typing effect..."); // Debugging check

    // Glitch Overlay Creation (TV Noise Effect)
    const glitchOverlay = document.createElement('div');
    glitchOverlay.classList.add('glitch-overlay');
    document.body.appendChild(glitchOverlay);

    // Typing Effect with Random Glitch Flickers
    const words = "A journey through football history...";
    let index = 0;

    function typeEffect() {
        console.log(`Typing index: ${index}`); // Debugging check

        if (index < words.length) {
            glitchText.textContent += words[index];

            // Glitch effect - Randomly remove letters for a millisecond
            if (Math.random() > 0.75) { 
                let charIndex = glitchText.textContent.length - 1;
                setTimeout(() => {
                    let tempText = glitchText.textContent;
                    glitchText.textContent = tempText.substring(0, charIndex) + "█" + tempText.substring(charIndex + 1);
                }, 50);
                setTimeout(() => {
                    let tempText = glitchText.textContent;
                    glitchText.textContent = tempText.substring(0, charIndex) + words[index] + tempText.substring(charIndex + 1);
                }, 100);
            }

            index++;
            setTimeout(typeEffect, 120); // Typing speed
        } else {
            console.log("Typing complete. Showing subtitle...");
            setTimeout(() => {
                subtitle.style.opacity = "1"; // Reveal subtitle after typing
            }, 500);

            setTimeout(() => {
                console.log("Fading out intro screen...");
                introScreen.classList.add('fade-out');
            }, 2500);

            setTimeout(() => {
                console.log("Hiding intro screen and starting video...");
                introScreen.style.display = 'none';
                video.play();
            }, 4500);
        }
    }

    // Start typing effect
    typeEffect();

    // Force video playback
    video.play().catch(() => {
        video.muted = true;
        video.play();
    });

    // When video ends, apply glitch effect before transitioning
    video.onended = () => {
        console.log("Video ended, starting glitch transition...");
        video.classList.add('fade-out');

        // **5-8 Fast Randomized Glitch Bars**
        const glitchCount = Math.floor(Math.random() * 4) + 5;
        for (let i = 0; i < glitchCount; i++) {
            let bar = document.createElement('div');
            bar.classList.add('glitch-bar');
            bar.style.top = `${Math.random() * 100}%`;
            bar.style.height = `${Math.random() * 20 + 1}px`; // Varied thickness
            bar.style.animationDuration = `${Math.random() * 0.03 + 0.01}s`; // Ultra-fast movement
            bar.style.background = `rgba(${Math.floor(Math.random() * 255)}, 
                                         ${Math.floor(Math.random() * 255)}, 
                                         ${Math.floor(Math.random() * 255)}, 0.9)`;
            glitchOverlay.appendChild(bar);
        }

        setTimeout(() => {
            glitchOverlay.classList.add('glitch-active');
        }, 10); // Instant start of glitch

        setTimeout(() => {
            console.log("Removing glitch effect and showing main content...");
            glitchOverlay.classList.remove('glitch-active');
            glitchOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            video.style.display = 'none';

            // **Staggered Card Reveal (100ms Delay Between Each Card)**
            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-animated');
                    }, index * 100);
                });
            }, 400);
        }, 250); // **Extreme rapid glitch transition**
    };
});