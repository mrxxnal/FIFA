window.addEventListener('load', async () => {
    const introScreen = document.getElementById('intro-screen');
    const glitchText = document.getElementById('glitch-text');
    const subtitle = document.querySelector('.subtitle');
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');
    const audio = document.getElementById("background-audio");
    const audioToggle = document.getElementById("audio-toggle");

    console.log("🚀 Script loaded, checking if video should play...");

    // **Check if Video Was Already Played**
    const hasPlayed = localStorage.getItem("videoPlayed");

    if (!hasPlayed) {
        console.log("🎬 Playing video since it's the first visit...");

        video.style.display = "block"; // Show Video
        video.currentTime = 0;
        video.play();
        playAudio();

        // **Mark Video as Played**
        localStorage.setItem("videoPlayed", "true");

        // **Hide Intro Screen After Video Starts**
        setTimeout(() => {
            introScreen.classList.add('fade-out');
        }, 1000);

        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 2000);

        // **Video Ends, Show Main Content**
        video.addEventListener("ended", () => {
            console.log("📼 Video ended, showing main content...");
            video.classList.add('fade-out');
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
    } else {
        console.log("⏩ Skipping video, showing main content instantly...");
        introScreen.style.display = 'none';
        video.style.display = 'none';
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
});