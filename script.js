// ===================================
// Snowfall Effect
// ===================================
function createSnowfall() {
    const snowfall = document.getElementById('snowfall');
    const symbols = ['❄', '❅', '❆', '✨', '💝', '💕'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = Math.random() * 3 + 7 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        snowfall.appendChild(snowflake);
    }
}

// ===================================
// Navbar Scroll Effect
// ===================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===================================
// Carousel Auto-Scroll
// ===================================
function initCarousel() {
    const carousel = document.getElementById('carousel');
    let isScrolling = false;

    carousel.addEventListener('scroll', () => {
        isScrolling = true;
    });

    setInterval(() => {
        if (!isScrolling && carousel) {
            carousel.scrollLeft += 1;
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollLeft = 0;
            }
        }
        isScrolling = false;
    }, 30);
}

// ===================================
// Modal Functionality
// ===================================
function openModal(element) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const emoji = element.querySelector('.gallery-placeholder').textContent;
    modalContent.innerHTML = `<div style="font-size: 15rem; text-align: center;">${emoji}</div>`;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Close modal when clicking outside
function initModalOutsideClick() {
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
}

// ===================================
// Proposal Section - No Button
// ===================================
let noClickCount = 0;
const sweetMessages = [
    "Are you sure? 🥺",
    "Pretty please? 💕",
    "Think about it... 🌹",
    "I'll wait forever for you ⏰",
    "You're making this hard... 💔",
    "One more chance? 🙏",
    "My heart belongs to you 💝",
    "Don't break my heart 💫",
    "I promise I'll make you happy! 🌈",
    "Please Baby!! 🥺",
];


function handleNo() {
    const noBtn = document.getElementById('noBtn');
    const popup = document.getElementById('sweetPopup');
    
    if (noClickCount < sweetMessages.length) {
        // Show sweet popup
        popup.querySelector('p').textContent = sweetMessages[noClickCount];
        popup.classList.add('active');
        
        setTimeout(() => {
            popup.classList.remove('active');
        }, 2000);
        
        // Make button smaller
        const currentPadding = parseFloat(getComputedStyle(noBtn).padding);
        const currentFontSize = parseFloat(getComputedStyle(noBtn).fontSize);
        noBtn.style.padding = (currentPadding * 0.9) + 'px ' + (currentPadding * 1.5) + 'px';
        noBtn.style.fontSize = (currentFontSize * 0.95) + 'px';
        
        noClickCount++;
        
        // Change button text
       
    }
}



// ===================================
// Dancing Page
// ===================================
function openDancingPage() {
    document.getElementById('dancingPage').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDancingPage() {
    document.getElementById('dancingPage').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================================
// Initialize All Features
// ===================================
function init() {
    // Create snowfall effect
    createSnowfall();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize modal outside click
    initModalOutsideClick();
    
    // Add scroll listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

// Run initialization when DOM is loaded
window.addEventListener('load', init);

/* 🎵 Romantic Playlist */
const audio = document.getElementById("audio");
const vinyl = document.getElementById("vinyl");
const trackName = document.getElementById("trackName");

const tracks = [
  { name: "🌷", src: "src/Die with a Smile.mp3" },
  { name: "💕", src: "src/doAnjaane.mp3" },
  { name: "🌸", src: "src/Hafte4.mp3" }
];

const unlock = document.getElementById("audioUnlock");

unlock.addEventListener("click", () => {
  audio.muted = false;
  audio.volume = 0;

  audio.play().then(() => {
    vinyl.classList.add("playing");
    vinyl.classList.remove("paused");

    unlock.remove(); // remove overlay

    // smooth fade-in
    let fade = setInterval(() => {
      if (audio.volume < 0.6) audio.volume += 0.02;
      else clearInterval(fade);
    }, 150);
  });
}, { once: true });


let currentTrack = 0;

/* Load Track */
function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  audio.volume = 0.6;
}

/* Play */
function playTrack() {
  audio.play();
  vinyl.classList.add("playing");
  vinyl.classList.remove("paused");
}

/* Pause */
function pauseTrack() {
  audio.pause();
  vinyl.classList.add("paused");
  vinyl.classList.remove("playing");
}

/* Autoplay Attempt */
window.addEventListener("load", () => {
  loadTrack(0);          // first romantic track
  audio.muted = true;   // REQUIRED for autoplay
  audio.volume = 0.6;

  audio.play().then(() => {
    vinyl.classList.add("playing");
    vinyl.classList.remove("paused");
  }).catch(() => {
    // fails silently (some browsers)
  });
});


/* Vinyl Toggle */
vinyl.addEventListener("click", () => {
  audio.paused ? playTrack() : pauseTrack();
});

/* Next Track */
document.getElementById("next").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

/* Previous Track */
document.getElementById("prev").addEventListener("click", () => {
  currentTrack =
    (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

/* Auto Next */
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

function handleYes() {
  /* 🎉 Celebration */
  const celebration = document.getElementById('celebration');
  celebration.classList.add('active');

  const heart = document.createElement('div');
  heart.classList.add('heart-burst');
  heart.textContent = '❤️';
  celebration.appendChild(heart);

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + '%';
      celebration.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 25);
  }

  /* 💌 Text Update */
  setTimeout(() => {
    document.querySelector('.proposal-content h2').textContent =
      'I Love You Forever! 💕';
    document.querySelector('.proposal-content p').textContent =
      'Thank you for making me the happiest person alive. Our forever starts now ✨';
    document.querySelector('.proposal-buttons').innerHTML =
      '<p style="font-size:3rem;">❤️ ❤️ ❤️</p>';
  }, 1200);

  /* 🎵 FORCE 3rd SONG WITH SOUND */
  currentTrack = 2;          // 🌸 third song
  loadTrack(currentTrack);

  audio.muted = false;       // 🔥 VERY IMPORTANT
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play();

  vinyl.classList.add("playing");
  vinyl.classList.remove("paused");

  let fade = setInterval(() => {
    if (audio.volume < 0.6) {
      audio.volume += 0.02;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

