/**
 * ============================================================================
 * 🎵 INTERACTIVE AUDIO & BACKGROUND MUSIC ENGINE
 * ============================================================================
 * Features:
 * - Exact MP3 song playback from music/
 * - Starts playback at 00:07 on first interaction
 * - Loops smoothly back to 00:07 when song ends
 * - Soft background volume (15-20%) with gentle fade-in
 * - Seamless playback across all scenes (no resets/restarts on scene change)
 * - Clean toggle (Pause/Resume from current position)
 * - Mobile browser & WebView compatible
 * ============================================================================
 */

class BirthdaySurpriseAudio {
  constructor() {
    this.bgAudio = null;
    this.startTime = 7;   // Start playback at 00:07 (7 seconds)
    this.endTime = 79;    // End/Loop playback at 01:19 (79 seconds)
    this.targetVolume = 0.18; // Soft 18% background volume
    this.isMusicPlaying = false;
    this.hasStarted = false;
    this.fadeInterval = null;

    // Web Audio context for interactive SFX
    this.ctx = null;
    this.gainNode = null;

    this.initBgAudio();
  }

  initBgAudio() {
    const audioUrl = (typeof SURPRISE_CONFIG !== 'undefined' && SURPRISE_CONFIG.music && SURPRISE_CONFIG.music.audioUrl) 
      ? SURPRISE_CONFIG.music.audioUrl 
      : 'music/Birthday Song Piano cover (Happy birthday to me XD).mp3';

    this.startTime = (typeof SURPRISE_CONFIG !== 'undefined' && SURPRISE_CONFIG.music && typeof SURPRISE_CONFIG.music.startTime === 'number')
      ? SURPRISE_CONFIG.music.startTime
      : 7;

    this.endTime = (typeof SURPRISE_CONFIG !== 'undefined' && SURPRISE_CONFIG.music && typeof SURPRISE_CONFIG.music.endTime === 'number')
      ? SURPRISE_CONFIG.music.endTime
      : 79;

    this.targetVolume = (typeof SURPRISE_CONFIG !== 'undefined' && SURPRISE_CONFIG.music && typeof SURPRISE_CONFIG.music.volume === 'number')
      ? SURPRISE_CONFIG.music.volume
      : 0.18;

    this.bgAudio = new Audio(encodeURI(audioUrl));
    this.bgAudio.preload = 'auto';
    this.bgAudio.volume = 0;

    // Set initial start time once metadata is loaded
    this.bgAudio.addEventListener('loadedmetadata', () => {
      if (!this.hasStarted) {
        try {
          this.bgAudio.currentTime = this.startTime;
        } catch (e) {}
      }
    });

    // Enforce strict audio range: never play before 00:07 or after 01:19
    this.bgAudio.addEventListener('timeupdate', () => {
      if (!this.bgAudio) return;
      if (this.bgAudio.currentTime >= this.endTime) {
        this.bgAudio.currentTime = this.startTime;
      } else if (this.isMusicPlaying && this.bgAudio.currentTime < this.startTime - 0.25) {
        this.bgAudio.currentTime = this.startTime;
      }
    });

    // Loop smoothly back to 7s if song ends naturally
    this.bgAudio.addEventListener('ended', () => {
      this.bgAudio.currentTime = this.startTime;
      this.bgAudio.play().catch(() => {});
    });
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Starts background music with smooth fade-in starting from 7s
   */
  startMusic() {
    if (!this.bgAudio) return;

    if (!this.hasStarted) {
      try {
        this.bgAudio.currentTime = this.startTime;
      } catch (e) {}
      this.hasStarted = true;
    }

    this.bgAudio.volume = 0;
    const playPromise = this.bgAudio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isMusicPlaying = true;
        // Verify start position
        if (this.bgAudio.currentTime < this.startTime - 0.5) {
          try {
            this.bgAudio.currentTime = this.startTime;
          } catch (e) {}
        }
        this.fadeInVolume();
      }).catch(err => {
        console.warn('Audio play waiting for further interaction:', err);
      });
    }
  }

  /**
   * Resumes music from current position without resetting
   */
  resumeMusic() {
    if (!this.bgAudio) return;
    if (this.bgAudio.currentTime < this.startTime || this.bgAudio.currentTime >= this.endTime) {
      try {
        this.bgAudio.currentTime = this.startTime;
      } catch (e) {}
    }
    const playPromise = this.bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isMusicPlaying = true;
        this.fadeInVolume();
      }).catch(err => {
        console.warn('Audio resume error:', err);
      });
    }
  }

  /**
   * Pauses background music
   */
  pauseMusic() {
    if (!this.bgAudio) return;
    clearInterval(this.fadeInterval);
    this.bgAudio.pause();
    this.isMusicPlaying = false;
  }

  /**
   * Toggles music on / off preserving current timestamp
   */
  toggleMusic() {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      return false;
    } else {
      if (!this.hasStarted) {
        this.startMusic();
      } else {
        this.resumeMusic();
      }
      return true;
    }
  }

  /**
   * Smooth volume fade-in
   */
  fadeInVolume() {
    if (!this.bgAudio) return;
    clearInterval(this.fadeInterval);

    let currentVol = this.bgAudio.volume;
    const target = this.targetVolume;
    const step = target / 30; // 30 steps over ~1.2s

    this.fadeInterval = setInterval(() => {
      if (!this.bgAudio || !this.isMusicPlaying) {
        clearInterval(this.fadeInterval);
        return;
      }
      currentVol = Math.min(target, currentVol + step);
      this.bgAudio.volume = currentVol;

      if (currentVol >= target) {
        clearInterval(this.fadeInterval);
      }
    }, 40);
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE TOUCH SOUND EFFECTS (Web Audio API)
  // --------------------------------------------------------------------------
  playPop() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playBlow() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);

    // Soft chime sweep
    const notes = [659.25, 880.00, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const chOsc = this.ctx.createOscillator();
      const chGain = this.ctx.createGain();
      const t = now + 0.15 + (idx * 0.06);

      chOsc.type = 'sine';
      chOsc.frequency.setValueAtTime(freq, t);

      chGain.gain.setValueAtTime(0.001, t);
      chGain.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      chGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

      chOsc.connect(chGain);
      chGain.connect(this.ctx.destination);

      chOsc.start(t);
      chOsc.stop(t + 0.75);
    });
  }

  playChime() {
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + (idx * 0.08);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    });
  }
}

const surpriseAudio = new BirthdaySurpriseAudio();
