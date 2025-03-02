window.addEventListener('load', async () => {
    const introScreen = document.getElementById('intro-screen');
    const video = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const cards = document.querySelectorAll('.gallery-image');
    const audio = document.getElementById("background-audio");
    const audioToggle = document.getElementById("audio-toggle");
    
    // **Create a Container for Embers Dynamically**
    let emberContainer = document.createElement('div');
    emberContainer.id = "embers-container";
    document.body.appendChild(emberContainer);

    console.log("🚀 Script loaded, checking if video should play...");

    // **Check if Video Was Already Played**
    const hasPlayed = localStorage.getItem("videoPlayed");

    if (!hasPlayed) {
        console.log("🎬 First visit detected, playing video...");

        video.style.display = "block";
        video.currentTime = 0;
        video.play();
        playAudio();

        // **Mark Video as Played**
        localStorage.setItem("videoPlayed", "true");

        setTimeout(() => { introScreen.classList.add('fade-out'); }, 1000);
        setTimeout(() => { introScreen.style.display = 'none'; }, 2000);

        video.addEventListener("ended", () => {
            console.log("📼 Video ended, showing main content...");
            video.classList.add('fade-out');
            video.style.display = 'none';
            showMainContent();
        });
    } else {
        console.log("⏩ Skipping video, showing main content instantly...");
        introScreen.style.display = 'none';
        video.style.display = 'none';
        showMainContent();
    }

    // **Show Main Content + Start Embers**
    function showMainContent() {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');

        createEmbers(); // **Start Embers**
        startEmberSpawn(); // **Continuously Spawn More Embers**

        // **Cards Appear One by One**
        setTimeout(() => {
            cards.forEach((card, index) => {
                setTimeout(() => { card.classList.add('card-animated'); }, index * 100);
            });
        }, 400);
    }

    // **Force Audio to Start with Video**
    async function playAudio() {
        try {
            audio.currentTime = 0;
            audio.volume = 0.8;

            const isMuted = localStorage.getItem("audioMuted");
            if (isMuted === "true") {
                audio.muted = true;
                audioToggle.innerHTML = "🔇";
            } else {
                audio.muted = false;
                audioToggle.innerHTML = "🔊";
                await audio.play();
                console.log("🎵 Audio started successfully!");
            }
        } catch (err) {
            console.warn("🔇 Autoplay blocked. Waiting for user interaction...");
            document.body.addEventListener('click', () => {
                audio.currentTime = 0;
                audio.play();
                console.log("🎵 Audio started after user interaction!");
            }, { once: true });
        }
    }

    // **Audio Toggle Button**
    audioToggle.addEventListener("click", () => {
        if (audio.muted) {
            audio.muted = false;
            localStorage.setItem("audioMuted", "false");
            audioToggle.innerHTML = "🔊";
        } else {
            audio.muted = true;
            localStorage.setItem("audioMuted", "true");
            audioToggle.innerHTML = "🔇";
        }
    });

    // **EMBER EFFECT FUNCTION**
    function createEmbers() {
        if (!emberContainer) return;

        // Create 30 initial embers
        for (let i = 0; i < 30; i++) {
            spawnEmber();
        }
    }

    // **Continuously Spawn Embers Over Time**
    function startEmberSpawn() {
        setInterval(() => {
            spawnEmber();
        }, 300); // Every 0.3 seconds, a new ember appears
    }

    function spawnEmber() {
        let ember = document.createElement("div");
        ember.classList.add("ember");

        ember.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        ember.style.animationDuration = `${3 + Math.random() * 4}s`; // Random speed
        ember.style.width = `${2 + Math.random() * 6}px`; // Random size
        ember.style.height = ember.style.width;
        ember.style.animationDelay = `${Math.random() * 2}s`; // Random delay

        emberContainer.appendChild(ember);

        // Remove ember after animation
        setTimeout(() => {
            ember.remove();
        }, 5000);
    }
});