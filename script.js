window.addEventListener('load', async () => {
    const introScreen = document.getElementById('intro-screen');
    const glitchText = document.getElementById('glitch-text');
    const subtitle = document.querySelector('.subtitle');
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');
    const audio = document.getElementById("background-audio");
    const audioToggle = document.getElementById("audio-toggle");
    const skipButton = document.getElementById("skip-button");

    console.log("🚀 Script loaded, waiting for text animation...");

    // **Ensure Video & Skip Button Are Initially Hidden**
    video.style.display = "none";
    skipButton.style.opacity = "0"; 
    skipButton.style.visibility = "hidden"; 

    // **Typing Effect**
    const words = "A journey through football history...";
    let index = 0;

    function typeEffect() {
        if (index < words.length) {
            glitchText.textContent += words[index];
            index++;
            setTimeout(typeEffect, 120); 
        } else {
            console.log("✅ Typing complete. Showing subtitle...");
            setTimeout(() => {
                subtitle.style.opacity = "1"; 
            }, 500);

            // **Start Video & Audio Together**
            setTimeout(() => {
                console.log("🎬 Starting video and audio...");
                video.style.display = "block";
                video.currentTime = 0;
                video.play().then(() => {
                    showSkipButton(); // Show Skip Button Instantly When Video Starts
                }).catch(err => console.error("Video autoplay failed:", err));
                
                playAudio();
            }, 500);
            
            setTimeout(() => {
                console.log("📉 Fading out intro screen...");
                introScreen.classList.add('fade-out');
            }, 1000);
            
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 2000);
        }
    }

    // **Force Audio to Start with Video**
    async function playAudio() {
        try {
            audio.currentTime = 0; 
            audio.volume = 0.8; 
            await audio.play();
            console.log("🎵 Audio started successfully!");
        } catch (err) {
            console.warn("🔇 Autoplay blocked. Waiting for user interaction...");
            document.body.addEventListener('click', () => {
                audio.currentTime = 0;
                audio.play();
                console.log("🎵 Audio started after user interaction!");
            }, { once: true });
        }
    }

    // **SHOW SKIP BUTTON INSTANTLY WHEN VIDEO STARTS**
    function showSkipButton() {
        console.log("🔘 Skip button is now visible!");
        skipButton.style.visibility = "visible";
        skipButton.style.opacity = "1";
    }

    // **SKIP BUTTON FUNCTIONALITY**
    skipButton.addEventListener("click", () => {
        console.log("⏩ Skipping intro...");
        video.pause();
        video.style.display = "none"; 
        audio.pause();
        audio.currentTime = 0; 

        // **FADE OUT SKIP BUTTON**
        skipButton.style.opacity = "0"; 
        setTimeout(() => {
            skipButton.style.visibility = "hidden";
        }, 500);

        introScreen.style.display = "none"; 

        // Remove glitch effects if present
        document.querySelectorAll('.glitch-overlay, .glitch-bar').forEach(el => el.remove());

        // **Immediately Show Main Content**
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');

        // **Cards Appear One by One**
        setTimeout(() => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('card-animated');
                }, index * 100);
            });
        }, 400);
    });

    // **Hide Skip Button When Video Ends**
    video.addEventListener("ended", () => {
        console.log("📼 Video ended, transitioning to main content...");
        video.classList.add('fade-out');

        // **FADE OUT SKIP BUTTON WHEN VIDEO ENDS**
        skipButton.style.opacity = "0"; 
        setTimeout(() => {
            skipButton.style.visibility = "hidden"; 
        }, 500);

        // **Show Main Content**
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
    });

    // **Start Typing Effect**
    typeEffect();
});