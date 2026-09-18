/* ==========================================================
   ✏️  EDIT ME — everything personal lives right here
   ========================================================== */
const CONFIG = {
  // Her name, shown big and golden on the reveal screen
  name: "My Love",

  // The line under her name
  subline: "Every year with you feels like the best one yet.",

  // The letter — opening line, the body, and how you sign off
  letterOpen: "My love,",
  letterBody:
    "Today isn't just your birthday — it's a celebration of the person " +
    "who makes every ordinary day feel like something worth remembering. " +
    "I love the way you laugh at your own jokes before you finish telling " +
    "them, the way you make even the smallest moments feel warm, and the " +
    "way you've made a home out of my heart. I hope this year gives you " +
    "everything you deserve, and I hope you know that whatever it brings, " +
    "I'll be right here beside you. Happy birthday, my love. Here's to us, " +
    "and to many more.",
  letterSign: "— always yours",

  // Line under the gallery heading
  galleryHeading: "a few of my favorite moments with you",

  // Small line at the very bottom of the page
  footerLine: "made with love, just for you",

  // Your photos. Put image files inside the /photos folder, then list
  // them here in the order you want them to appear. Each one can have a
  // caption (shown under the photo) and a note (a short love note that
  // appears when she taps the photo to flip it over).
  //
  // 👉 These are dummy placeholders for now (photos/1.svg – 5.svg).
  //    Once you have the real photos, put them in /photos (e.g. 1.jpg,
  //    2.jpg...) and swap the src + caption + note values below.
  photos: [
    { src: "photos/1.jpg", caption: "where it began", note: "The moment I knew — I just knew." },
    { src: "photos/2.jpg", caption: "quiet hours, loud hearts", note: "These are my favorite kind of nights." },
    { src: "photos/3.jpg", caption: "you, in every season", note: "I'd choose you in all of them." },
    { src: "photos/4.jpg", caption: "make a wish", note: "I already got mine, the day I found you." },
  ],

  // The little reveal near the bottom of the page
  secretButtonLabel: "one more thing\u2026",
  secretMessage: "No matter how far this year takes us, you are still my favorite place to come home to. Happy birthday, my love.",

  // Optional: put your own song file at photos/song.mp3 and set this to
  // "photos/song.mp3" to play it instead of the built-in birthday chime.
  songFile: "",
};

/* ==========================================================
   Personalize the page from CONFIG (no need to touch the HTML)
   ========================================================== */
document.getElementById('heroName').textContent = CONFIG.name;
document.getElementById('heroSubline').textContent = CONFIG.subline;
document.getElementById('letterOpen').textContent = CONFIG.letterOpen;
document.getElementById('letterBody').textContent = CONFIG.letterBody;
document.getElementById('letterSign').textContent = CONFIG.letterSign;
document.getElementById('galleryHeading').textContent = CONFIG.galleryHeading;
document.getElementById('footerLine').textContent = CONFIG.footerLine;
document.getElementById('secretButtonLabel').textContent = CONFIG.secretButtonLabel;
document.title = `Happy Birthday, ${CONFIG.name}`;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================
   GALLERY — build polaroid cards from CONFIG.photos
   ========================================================== */
(function buildGallery(){
  const track = document.getElementById('galleryTrack');
  const photos = CONFIG.photos;

  if (!photos || photos.length === 0){
    // Friendly placeholders so the page still looks complete before photos are added
    const placeholders = [
      "add your photos in script.js →  CONFIG.photos",
      "drop image files into the /photos folder",
      "then list them here, in order",
    ];
    placeholders.forEach(text => {
      const card = document.createElement('div');
      card.className = 'polaroid is-placeholder';
      card.innerHTML = `<div class="polaroid-inner"><div class="polaroid-front"><div class="polaroid-img">${text}</div></div></div>`;
      track.appendChild(card);
    });
    return;
  }

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'polaroid';

    const inner = document.createElement('div');
    inner.className = 'polaroid-inner';
    inner.setAttribute('role', 'button');
    inner.setAttribute('tabindex', '0');
    inner.setAttribute('aria-pressed', 'false');
    inner.setAttribute('aria-label', 'Tap to flip this photo and read a note');

    // ---- front face: the photo + caption ----
    const front = document.createElement('div');
    front.className = 'polaroid-front';

    const img = document.createElement('img');
    img.className = 'polaroid-img';
    img.src = photo.src;
    img.alt = photo.caption || '';
    img.loading = 'lazy';
    front.appendChild(img);

    if (photo.caption){
      const cap = document.createElement('p');
      cap.className = 'polaroid-caption';
      cap.textContent = photo.caption;
      front.appendChild(cap);
    }

    if (photo.note){
      const hint = document.createElement('span');
      hint.className = 'polaroid-flip-hint';
      hint.textContent = 'tap to flip';
      front.appendChild(hint);
    }

    inner.appendChild(front);

    // ---- back face: the love note (only if provided) ----
    if (photo.note){
      const back = document.createElement('div');
      back.className = 'polaroid-back';
      const note = document.createElement('p');
      note.className = 'polaroid-note';
      note.textContent = photo.note;
      back.appendChild(note);
      inner.appendChild(back);

      function toggleFlip(){
        const flipped = card.classList.toggle('is-flipped');
        inner.setAttribute('aria-pressed', String(flipped));
      }
      inner.addEventListener('click', toggleFlip);
      inner.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          toggleFlip();
        }
      });
    }

    card.appendChild(inner);
    track.appendChild(card);
  });
})();

/* ==========================================================
   FLOATING HEARTS — gentle, continuous, low density
   ========================================================== */
(function floatingHearts(){
  if (prefersReducedMotion) return;

  const field = document.getElementById('heartsField');
  const MAX_HEARTS = 14;
  let active = 0;

  function spawnHeart(){
    if (active >= MAX_HEARTS) return;
    active++;

    const heart = document.createElement('span');
    heart.className = 'heart';
    const size = 12 + Math.random() * 16;
    const duration = 9 + Math.random() * 7;
    const drift = (Math.random() - 0.5) * 120;

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty('--drift', `${drift}px`);
    heart.style.opacity = String(0.25 + Math.random() * 0.35);

    heart.addEventListener('animationend', () => {
      heart.remove();
      active--;
    });

    field.appendChild(heart);
  }

  setInterval(spawnHeart, 1400);
  spawnHeart();
})();

/* ==========================================================
   SHOOTING STARS — a quiet bit of magic, every so often
   ========================================================== */
(function shootingStars(){
  if (prefersReducedMotion) return;

  const field = document.getElementById('heartsField');

  function spawnStar(){
    const star = document.createElement('span');
    star.className = 'shooting-star';

    const startX = 20 + Math.random() * 60; // vw
    const startY = 5 + Math.random() * 25;  // vh
    const travel = 260 + Math.random() * 160;

    star.style.left = `${startX}vw`;
    star.style.top = `${startY}vh`;
    star.style.setProperty('--sx', `${-travel}px`);
    star.style.setProperty('--sy', `${travel * 0.55}px`);

    star.addEventListener('animationend', () => star.remove());
    field.appendChild(star);
  }

  function loop(){
    spawnStar();
    setTimeout(loop, 6000 + Math.random() * 7000);
  }
  setTimeout(loop, 3000);
})();

/* ==========================================================
   HEART BURST — a joyful radial burst launched from a
   specific point on screen (used when the candle is blown)
   ========================================================== */
function burstHeartsFrom(x, y){
  if (prefersReducedMotion) return;

  const field = document.getElementById('heartsField');
  const count = 16;

  for (let i = 0; i < count; i++){
    const heart = document.createElement('span');
    heart.className = 'heart-burst';

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const distance = 90 + Math.random() * 140;
    const bx = Math.cos(angle) * distance;
    const by = Math.sin(angle) * distance;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${14 + Math.random() * 14}px`;
    heart.style.setProperty('--bx', `${bx}px`);
    heart.style.setProperty('--by', `${by}px`);
    heart.style.setProperty('--br', `${(Math.random() - 0.5) * 60}deg`);

    heart.addEventListener('animationend', () => heart.remove());
    field.appendChild(heart);
  }
}

/* ==========================================================
   CONFETTI BURST — the one big orchestrated moment
   ========================================================== */
function burstConfetti(){
  const layer = document.getElementById('confettiLayer');
  const colors = ['#E8B94E', '#F2879E', '#FF7A5C', '#FBF3E6', '#F3D68A'];
  const count = prefersReducedMotion ? 0 : 70;

  for (let i = 0; i < count; i++){
    const piece = document.createElement('div');
    piece.className = 'confetto';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 300;
    const spin = 360 + Math.random() * 540;
    const delay = Math.random() * 0.4;
    const duration = 2.2 + Math.random() * 1.4;

    piece.style.left = `${left}%`;
    piece.style.background = color;
    piece.style.setProperty('--dx', `${dx}px`);
    piece.style.setProperty('--spin', `${spin}deg`);
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

    piece.addEventListener('animationend', () => piece.remove());
    layer.appendChild(piece);
  }
}

/* ==========================================================
   CANDLE → REVEAL
   ========================================================== */
(function candleInteraction(){
  const candleScene = document.getElementById('candleScene');
  const candleButton = document.getElementById('candleButton');
  const revealScene = document.getElementById('revealScene');
  const screenFlash = document.getElementById('screenFlash');
  let blown = false;

  function blowCandle(){
    if (blown) return;
    blown = true;

    // where the flame is on screen right now, for the heart burst
    const rect = candleButton.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height * 0.28; // roughly where the flame sits

    candleScene.classList.add('is-blown');
    burstConfetti();
    burstHeartsFrom(originX, originY);

    screenFlash.classList.add('is-active');
    setTimeout(() => screenFlash.classList.remove('is-active'), 1200);

    // let the music begin the moment the wish is made
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle && musicToggle.getAttribute('aria-pressed') !== 'true'){
      musicToggle.click();
    }

    setTimeout(() => {
      revealScene.classList.add('is-visible');
      revealScene.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, prefersReducedMotion ? 0 : 500);
  }

  candleButton.addEventListener('click', blowCandle);
})();

const scrollCue = document.getElementById('scrollCue');
scrollCue.addEventListener('click', () => {
  document.querySelector('.section-letter').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ==========================================================
   MUSIC — plays your own file if provided, otherwise an
   original, royalty-free-by-construction birthday chime
   generated live with the Web Audio API.
   ========================================================== */
(function music(){
  const toggle = document.getElementById('musicToggle');
  const audioEl = document.getElementById('bgAudio');
  let playing = false;
  let audioCtx = null;
  let chimeTimer = null;

  const useOwnFile = Boolean(CONFIG.songFile);
  if (useOwnFile) audioEl.src = CONFIG.songFile;

  // "Happy Birthday to You" — the melody itself is public domain (the
  // Warner/Chappell copyright claim was invalidated by a US court in 2015),
  // so we generate the tune live as tones rather than embed any recording.
  // Note: freq in Hz, dur: 1 = eighth, 2 = quarter, 4 = half (beat units).
  const BEAT = 0.34; // seconds per unit — tweak for tempo
  const NOTES = [
    { f: 392.00, d: 1 }, { f: 392.00, d: 1 }, { f: 440.00, d: 2 },
    { f: 392.00, d: 2 }, { f: 523.25, d: 2 }, { f: 493.88, d: 4 },

    { f: 392.00, d: 1 }, { f: 392.00, d: 1 }, { f: 440.00, d: 2 },
    { f: 392.00, d: 2 }, { f: 587.33, d: 2 }, { f: 523.25, d: 4 },

    { f: 392.00, d: 1 }, { f: 392.00, d: 1 }, { f: 783.99, d: 2 },
    { f: 659.25, d: 2 }, { f: 523.25, d: 2 }, { f: 493.88, d: 2 }, { f: 440.00, d: 4 },

    { f: 698.46, d: 1 }, { f: 698.46, d: 1 }, { f: 659.25, d: 2 },
    { f: 523.25, d: 2 }, { f: 587.33, d: 2 }, { f: 523.25, d: 4 },
  ];

  function playChimeNote(freq, time, holdSeconds, ctx){
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + holdSeconds);

    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + holdSeconds + 0.05);
  }

  function startGeneratedChime(){
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();

    function scheduleLoop(){
      const now = audioCtx.currentTime;
      let cursor = 0;
      let totalBeats = 0;
      NOTES.forEach(({ f, d }) => {
        const durSeconds = d * BEAT;
        playChimeNote(f, now + cursor, durSeconds * 0.92, audioCtx);
        cursor += durSeconds;
        totalBeats += d;
      });
      chimeTimer = setTimeout(scheduleLoop, (totalBeats * BEAT + 1.2) * 1000);
    }
    scheduleLoop();
  }

  function stopGeneratedChime(){
    clearTimeout(chimeTimer);
    if (audioCtx){ audioCtx.close(); audioCtx = null; }
  }

  toggle.addEventListener('click', () => {
    playing = !playing;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pause birthday music' : 'Play birthday music');

    if (playing){
      if (useOwnFile){
        audioEl.play().catch(() => {});
      } else {
        startGeneratedChime();
      }
    } else {
      if (useOwnFile){
        audioEl.pause();
      } else {
        stopGeneratedChime();
      }
    }
  });
})();

/* ==========================================================
   ONE MORE THING — a small closing surprise
   ========================================================== */
(function secretMessage(){
  const button = document.getElementById('secretButton');
  const message = document.getElementById('secretMessage');
  let revealed = false;

  button.addEventListener('click', () => {
    if (revealed) return;
    revealed = true;

    message.textContent = CONFIG.secretMessage;
    message.hidden = false;
    button.setAttribute('aria-expanded', 'true');

    const rect = button.getBoundingClientRect();
    burstHeartsFrom(rect.left + rect.width / 2, rect.top);

    message.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  });
})();
