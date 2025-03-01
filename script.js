window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    const glitchText = document.getElementById('glitch-text'); 
    const subtitle = document.querySelector('.subtitle');
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');

    console.log("🚀 Script loaded, waiting for text animation...");

    // **Ensure Video is Fully Hidden Initially**
    video.style.display = "none";

    // **Typing Effect**
    const words = "A journey through football history...";
    let index = 0;

    function typeEffect() {
        if (index < words.length) {
            glitchText.textContent += words[index];
            index++;
            setTimeout(typeEffect, 120); // Typing speed
        } else {
            console.log("✅ Typing complete. Showing subtitle...");
            setTimeout(() => {
                subtitle.style.opacity = "1"; // Reveal subtitle after typing
            }, 500);

            // **Start Fading Out & Simultaneously Start Video**
            setTimeout(() => {
                console.log("🎬 Starting video slightly earlier...");
                video.style.display = "block";
                video.currentTime = 0;
                video.play();
            }, 700); // Starts ~300ms earlier
            
            setTimeout(() => {
                console.log("📉 Fading out intro screen and starting video...");
                introScreen.classList.add('fade-out');
            }, 1000);
            
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 2000);
        }
    }

    // **Start Typing Effect**
    typeEffect();

    // **Glitch Effect When Video Ends**
    video.onended = () => {
        console.log("📼 Video ended, starting glitch transition...");
        video.classList.add('fade-out');

        // **5-8 Fast Randomized Glitch Bars**
        const glitchCount = Math.floor(Math.random() * 4) + 5;
        const glitchOverlay = document.createElement('div');
        glitchOverlay.classList.add('glitch-overlay');
        document.body.appendChild(glitchOverlay);

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
            console.log("✨ Removing glitches and showing main content...");
            glitchOverlay.classList.remove('glitch-active');
            glitchOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            video.style.display = 'none';

            // **Cards Appear One by One**
            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-animated');
                    }, index * 100);
                });
            }, 400);
        }, 250);
    };
});