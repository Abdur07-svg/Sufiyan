/**
 * ============================================================================
 * 🎂 REALISTIC INTERACTIVE BIRTHDAY SURPRISE — SCENE ENGINE
 * Fullscreen 100vw x 100dvh • Zero-Scroll • Typewritten Stationery Letter
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global App State
  let currentScene = 1;
  const totalScenes = 7;
  let isTransitioning = false;
  let isCandleBlown = false;
  let isBalloonPopped = false;
  let isEnvelopeOpened = false;
  let isTyping = false;
  let typeTimeout = null;

  const transitionCurtain = document.getElementById('cinematic-transition');

  // Preload celebration petals image for particle canvas
  const confettiImg = new Image();
  confettiImg.src = 'assets/petals_confetti.png';

  // --------------------------------------------------------------------------
  // 1. DATA HYDRATION FROM CONFIG
  // --------------------------------------------------------------------------
  function hydrateSurprise() {
    if (typeof SURPRISE_CONFIG === 'undefined') return;

    // Scene 1: Opening
    document.getElementById('opening-heading').textContent = SURPRISE_CONFIG.opening.heading;
    document.getElementById('opening-subtitle').textContent = SURPRISE_CONFIG.opening.subtitle;
    document.getElementById('btn-open-surprise').innerHTML = `<span>${SURPRISE_CONFIG.opening.buttonText}</span>`;

    // Scene 2: Balloon
    document.getElementById('balloon-prompt').textContent = SURPRISE_CONFIG.balloon.prompt;
    document.getElementById('balloon-hint').textContent = SURPRISE_CONFIG.balloon.hint;
    document.getElementById('balloon-pop-burst').textContent = SURPRISE_CONFIG.balloon.revealedText;

    // Scene 3: Cake Wish
    document.getElementById('cake-prompt').textContent = SURPRISE_CONFIG.cakeWish.prompt;
    document.getElementById('cake-hint').textContent = SURPRISE_CONFIG.cakeWish.hint;
    document.getElementById('wish-text').textContent = SURPRISE_CONFIG.cakeWish.wishGrantedText;
    document.getElementById('btn-wish-next').innerHTML = `<span>${SURPRISE_CONFIG.cakeWish.nextButtonText}</span>`;

    // Scene 4: Bouquet
    document.getElementById('bouquet-quote').textContent = SURPRISE_CONFIG.bouquet.quote;
    document.getElementById('btn-bouquet-next').innerHTML = `<span>${SURPRISE_CONFIG.bouquet.nextButtonText}</span>`;

    // Scene 5: Envelope
    document.getElementById('envelope-prompt').textContent = SURPRISE_CONFIG.letter.envelopePrompt;
    document.getElementById('envelope-hint').textContent = SURPRISE_CONFIG.letter.envelopeHint;

    // Scene 6: Letter
    document.getElementById('stationery-heading').textContent = SURPRISE_CONFIG.letter.letterHeading;
    document.getElementById('btn-letter-next').innerHTML = `<span>${SURPRISE_CONFIG.letter.nextButtonText}</span>`;

    // Scene 7: Final Photo & Message
    if (SURPRISE_CONFIG.final.photoUrl) {
      const photoEl = document.getElementById('sister-photo-img');
      if (photoEl) photoEl.src = SURPRISE_CONFIG.final.photoUrl;
    }
    document.getElementById('final-heading').textContent = SURPRISE_CONFIG.final.heading;
    document.getElementById('final-message').textContent = SURPRISE_CONFIG.final.message;
    document.getElementById('final-signature').textContent = SURPRISE_CONFIG.final.signature;
    document.getElementById('btn-replay').innerHTML = `<span>${SURPRISE_CONFIG.final.replayButtonText}</span>`;

    // Music control button visibility
    const musicBtn = document.getElementById('music-control-btn');
    if (musicBtn && SURPRISE_CONFIG.music && !SURPRISE_CONFIG.music.enabled) {
      musicBtn.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  // 2. CINEMATIC SCENE TRANSITION ENGINE
  // --------------------------------------------------------------------------
  function transitionToScene(targetSceneNumber) {
    if (isTransitioning || targetSceneNumber < 1 || targetSceneNumber > totalScenes) return;
    isTransitioning = true;

    // 1. Play transition curtain
    if (transitionCurtain) transitionCurtain.classList.add('wiping');

    setTimeout(() => {
      // 2. Deactivate current scene
      document.querySelectorAll('.scene-layer').forEach(sc => sc.classList.remove('active'));

      // 3. Activate target scene
      const targetScene = document.getElementById(`scene-${targetSceneNumber}`);
      if (targetScene) targetScene.classList.add('active');

      currentScene = targetSceneNumber;

      // 4. Hook scene-specific triggers
      onSceneEntered(targetSceneNumber);

      // 5. Open transition curtain smoothly
      setTimeout(() => {
        if (transitionCurtain) transitionCurtain.classList.remove('wiping');
        isTransitioning = false;
      }, 350);

    }, 550);
  }

  function onSceneEntered(sceneNumber) {
    if (sceneNumber === 6) {
      // Scene 6 (Stationery Letter): Trigger typewriter handwriting reveal & celebration cascade
      startLetterTypewriter();
      triggerCelebrationCascade();
    } else if (sceneNumber === 7) {
      // Scene 7 (Sister's Photo Frame reveal): Float gentle petals into the scene
      triggerCelebrationCascade();
    }
  }

  // --------------------------------------------------------------------------
  // 3. SCENE 1: OPENING INTERACTION & MUSIC STARTUP (AT 00:07)
  // --------------------------------------------------------------------------
  const btnOpenSurprise = document.getElementById('btn-open-surprise');
  const musicControlBtn = document.getElementById('music-control-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicTxt = document.getElementById('music-txt');

  function updateMusicUI(isPlaying) {
    if (!musicControlBtn) return;
    if (isPlaying) {
      musicControlBtn.classList.remove('muted');
      if (musicIcon) musicIcon.textContent = '🎵';
      if (musicTxt) musicTxt.textContent = 'Music On';
    } else {
      musicControlBtn.classList.add('muted');
      if (musicIcon) musicIcon.textContent = '🔇';
      if (musicTxt) musicTxt.textContent = 'Music Off';
    }
  }

  if (btnOpenSurprise) {
    btnOpenSurprise.addEventListener('click', () => {
      // Start background music at 00:07 on the first interaction
      if (typeof surpriseAudio !== 'undefined' && (!SURPRISE_CONFIG.music || SURPRISE_CONFIG.music.enabled)) {
        surpriseAudio.startMusic();
        updateMusicUI(true);
      }
      transitionToScene(2);
    });
  }

  // Music On / Off Button Handler (Pause & Resume without losing position)
  if (musicControlBtn) {
    musicControlBtn.addEventListener('click', () => {
      if (typeof surpriseAudio !== 'undefined') {
        const isPlaying = surpriseAudio.toggleMusic();
        updateMusicUI(isPlaying);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. SCENE 2: POP THE BALLOON
  // --------------------------------------------------------------------------
  const balloonStage = document.getElementById('balloon-stage');
  const balloonSvg = document.getElementById('balloon-svg-box');
  const balloonString = document.getElementById('balloon-string-svg');
  const balloonPopBurst = document.getElementById('balloon-pop-burst');

  if (balloonStage) {
    balloonStage.addEventListener('click', () => {
      if (isBalloonPopped) return;
      isBalloonPopped = true;

      if (typeof surpriseAudio !== 'undefined') surpriseAudio.playPop();

      // Mini confetti burst
      triggerElementConfetti(balloonSvg);

      // Pop visual state
      balloonSvg.style.display = 'none';
      balloonString.style.display = 'none';
      balloonPopBurst.style.display = 'block';

      // Transition to Scene 3
      setTimeout(() => {
        transitionToScene(3);
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 5. SCENE 3: MAKE A WISH (CAKE & CANDLES)
  // --------------------------------------------------------------------------
  const cakeStage = document.getElementById('cake-wish-stage');
  const candleFlame = document.getElementById('candle-flame-real');
  const candleSmoke = document.getElementById('candle-smoke-puff');
  const wishRevealBox = document.getElementById('wish-reveal-box');
  const btnWishNext = document.getElementById('btn-wish-next');

  if (cakeStage) {
    cakeStage.addEventListener('click', () => {
      if (isCandleBlown) return;
      isCandleBlown = true;

      // Blow out flame
      candleFlame.classList.add('blown-out');
      candleSmoke.classList.add('show');

      if (typeof surpriseAudio !== 'undefined') surpriseAudio.playBlow();

      // Sparkle burst
      triggerSparkleBurst(cakeStage);

      // Reveal wish text
      setTimeout(() => {
        wishRevealBox.classList.add('active');
      }, 500);
    });
  }

  if (btnWishNext) {
    btnWishNext.addEventListener('click', () => transitionToScene(4));
  }

  // --------------------------------------------------------------------------
  // 6. SCENE 4: FLOWER BOUQUET
  // --------------------------------------------------------------------------
  const btnBouquetNext = document.getElementById('btn-bouquet-next');
  if (btnBouquetNext) {
    btnBouquetNext.addEventListener('click', () => transitionToScene(5));
  }

  // --------------------------------------------------------------------------
  // 7. SCENE 5: REALISTIC ENVELOPE OPENING (sealed -> opened)
  // --------------------------------------------------------------------------
  const envelopeStage = document.getElementById('envelope-png-stage');
  if (envelopeStage) {
    envelopeStage.addEventListener('click', () => {
      if (isEnvelopeOpened) return;
      isEnvelopeOpened = true;

      // Unseal envelope
      envelopeStage.classList.add('opened');
      if (typeof surpriseAudio !== 'undefined') surpriseAudio.playChime();

      // Transition to Scene 6 (Stationery Letter)
      setTimeout(() => {
        transitionToScene(6);
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 8. SCENE 6: TYPEWRITTEN STATIONERY LETTER REVEAL
  // --------------------------------------------------------------------------
  const typewriterText = document.getElementById('typewriter-text');
  const typingCursor = document.getElementById('typing-cursor');
  const btnLetterNext = document.getElementById('btn-letter-next');

  function startLetterTypewriter() {
    if (!typewriterText || !SURPRISE_CONFIG.letter.text) return;

    clearTimeout(typeTimeout);
    typewriterText.textContent = '';
    if (typingCursor) typingCursor.style.display = 'inline-block';
    if (btnLetterNext) btnLetterNext.style.display = 'none';

    const fullText = SURPRISE_CONFIG.letter.text;
    let charIdx = 0;
    isTyping = true;

    function typeNextChar() {
      if (charIdx < fullText.length) {
        typewriterText.textContent += fullText.charAt(charIdx);
        charIdx++;

        // Natural typing pace with slight human variation
        const char = fullText.charAt(charIdx - 1);
        let speed = (char === '.' || char === '\n' || char === '❤️') ? 140 : 36;

        typeTimeout = setTimeout(typeNextChar, speed);
      } else {
        isTyping = false;
        if (typingCursor) typingCursor.style.display = 'none';
        if (btnLetterNext) {
          btnLetterNext.style.display = 'inline-flex';
          btnLetterNext.style.opacity = '0';
          setTimeout(() => {
            btnLetterNext.style.transition = 'opacity 0.6s ease';
            btnLetterNext.style.opacity = '1';
          }, 50);
        }
      }
    }

    // Small initial delay before handwriting begins
    setTimeout(typeNextChar, 350);
  }

  // Tap on stationery card instantly completes the typewriter text
  const stationeryCard = document.getElementById('stationery-letter-card');
  if (stationeryCard) {
    stationeryCard.addEventListener('click', () => {
      if (isTyping) {
        clearTimeout(typeTimeout);
        typewriterText.textContent = SURPRISE_CONFIG.letter.text;
        isTyping = false;
        if (typingCursor) typingCursor.style.display = 'none';
        if (btnLetterNext) {
          btnLetterNext.style.display = 'inline-flex';
          btnLetterNext.style.opacity = '1';
        }
      }
    });
  }

  if (btnLetterNext) {
    btnLetterNext.addEventListener('click', () => transitionToScene(7));
  }

  // --------------------------------------------------------------------------
  // 9. SCENE 7: FINAL SCENE & REPLAY
  // --------------------------------------------------------------------------
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      // Reset interactive state
      isCandleBlown = false;
      isBalloonPopped = false;
      isEnvelopeOpened = false;

      // Reset DOM objects
      if (candleFlame) candleFlame.classList.remove('blown-out');
      if (candleSmoke) candleSmoke.classList.remove('show');
      if (wishRevealBox) wishRevealBox.classList.remove('active');
      if (balloonSvg) balloonSvg.style.display = 'block';
      if (balloonString) balloonString.style.display = 'block';
      if (balloonPopBurst) balloonPopBurst.style.display = 'none';
      if (envelopeStage) envelopeStage.classList.remove('opened');

      transitionToScene(1);
    });
  }

  // --------------------------------------------------------------------------
  // 10. CANVAS PHYSICS: FALLING FLOWERS, CONFETTI & PARTICLES
  // --------------------------------------------------------------------------
  let canvas, ctx;
  let ambientPetals = [];
  let celebrationElements = [];

  function initCanvas() {
    canvas = document.getElementById('celebration-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle ambient floating petals
    ambientPetals = [];
    const count = window.innerWidth > 600 ? 16 : 10;
    for (let i = 0; i < count; i++) {
      ambientPetals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 7 + 4,
        vx: (Math.random() - 0.5) * 0.5 + 0.2,
        vy: Math.random() * 0.6 + 0.35,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        color: ['#fda4af', '#fbcfe8', '#fed7aa', '#f472b6'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.3 + 0.15
      });
    }

    animateCanvas();
  }

  function triggerElementConfetti(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#f43f5e', '#fda4af', '#fed7aa', '#f472b6', '#e9d5ff', '#ffffff'];
    for (let i = 0; i < 26; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      celebrationElements.push({
        x: centerX,
        y: centerY,
        type: 'paper',
        width: Math.random() * 6 + 4,
        height: Math.random() * 8 + 5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        angle: Math.random() * Math.PI,
        vAngle: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        swaySpeed: 0.03,
        swayOffset: 0,
        fadeDelay: 40,
        age: 0
      });
    }
  }

  function triggerSparkleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + 20;

    const colors = ['#fbbf24', '#fef08a', '#fda4af', '#ffffff'];
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      celebrationElements.push({
        x: centerX,
        y: centerY,
        type: 'petal',
        width: Math.random() * 5 + 4,
        height: Math.random() * 5 + 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        angle: Math.random() * Math.PI,
        vAngle: (Math.random() - 0.5) * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        swaySpeed: 0.04,
        swayOffset: 0,
        fadeDelay: 35,
        age: 0
      });
    }
  }

  function triggerCelebrationCascade() {
    const totalCount = window.innerWidth > 600 ? 90 : 60;
    const colors = [
      '#fda4af', '#f43f5e', '#fb7185', '#fef08a', '#f472b6', '#e9d5ff', '#fed7aa', '#ffffff'
    ];

    for (let i = 0; i < totalCount; i++) {
      const isPetalImg = Math.random() > 0.6 && confettiImg.complete && confettiImg.naturalWidth > 0;
      celebrationElements.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * 220 - 20,
        type: isPetalImg ? 'image' : (Math.random() > 0.45 ? 'petal' : 'paper'),
        width: isPetalImg ? Math.random() * 16 + 12 : (Math.random() * 9 + 6),
        height: isPetalImg ? Math.random() * 16 + 12 : (Math.random() * 12 + 7),
        vx: (Math.random() - 0.5) * 1.4 + 0.3,
        vy: Math.random() * 2.0 + 1.2,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        swaySpeed: Math.random() * 0.04 + 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        fadeDelay: Math.random() * 120 + 220,
        age: 0
      });
    }
  }

  function animateCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Ambient Floating Petals
    ambientPetals.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width + 20) {
        p.x = -20;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 2. Draw Falling Celebration Elements
    if (celebrationElements.length > 0) {
      celebrationElements.forEach((el, index) => {
        el.age++;
        el.x += el.vx + Math.sin(el.age * el.swaySpeed + el.swayOffset) * 1.2;
        el.y += el.vy;
        el.angle += el.vAngle;

        if (el.age > el.fadeDelay) {
          el.alpha -= 0.012;
        }

        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.angle);
        ctx.globalAlpha = Math.max(el.alpha, 0);

        if (el.type === 'image') {
          ctx.drawImage(confettiImg, -el.width / 2, -el.height / 2, el.width, el.height);
        } else if (el.type === 'petal') {
          ctx.fillStyle = el.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, el.width, el.height, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = el.color;
          const scaleY = Math.cos(el.age * 0.08);
          ctx.fillRect(-el.width / 2, -el.height * scaleY / 2, el.width, el.height * scaleY);
        }

        ctx.restore();

        if (el.alpha <= 0 || el.y > canvas.height + 60) {
          celebrationElements.splice(index, 1);
        }
      });
    }

    requestAnimationFrame(animateCanvas);
  }

  // Initialize
  hydrateSurprise();
  initCanvas();
});
