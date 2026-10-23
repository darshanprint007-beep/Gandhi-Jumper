/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural sound effects & Audio playback manager
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private spidermanAudio: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;

  // Track URLs
  private readonly bgmSrc: string = '/assets/aistudio/pakad-mc_0350fb0e.mp3';
  private readonly spidermanSrc: string = '/assets/aistudio/spiderman-meme-song__1__a029a61b.mp3';

  // Alternating jump counter
  private jumpToggle: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private getAudioElement(): HTMLAudioElement {
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio(this.bgmSrc);
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = 'auto';
    }
    return this.bgmAudio;
  }

  private getSpidermanAudio(): HTMLAudioElement {
    if (!this.spidermanAudio) {
      this.spidermanAudio = new Audio(this.spidermanSrc);
      this.spidermanAudio.preload = 'auto';
    }
    return this.spidermanAudio;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = muted;
    }
    if (this.spidermanAudio) {
      this.spidermanAudio.muted = muted;
    }
    if (muted) {
      if (this.isBgmPlaying) this.pauseBGM();
      this.stopSpidermanMeme();
    } else if (!muted && this.isBgmPlaying) {
      this.resumeBGM();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Play Spiderman meme song when Gandhiji jumps alternatingly
  public playSpidermanMeme() {
    if (this.isMuted) return;
    try {
      const audio = this.getSpidermanAudio();
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.muted = this.isMuted;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch {
      // Audio playback catch
    }
  }

  public stopSpidermanMeme() {
    if (this.spidermanAudio) {
      this.spidermanAudio.pause();
      this.spidermanAudio.currentTime = 0;
    }
  }

  // Classic procedural jump sound: cheerful snappy upward chirp
  public playClassicJump() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.16);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Main Jump Sound: Alternates between Spiderman Meme and Classic Jump every time Gandhiji jumps
  public playJump() {
    if (this.isMuted) return;
    this.jumpToggle = !this.jumpToggle;

    if (this.jumpToggle) {
      // Alternating jump: Play Spiderman Meme track!
      this.playSpidermanMeme();
    } else {
      // Alternating jump: Play Classic Jump chirp
      this.playClassicJump();
    }
  }

  // Double jump: high pitched double chime or Spiderman meme
  public playDoubleJump() {
    if (this.isMuted) return;
    this.jumpToggle = !this.jumpToggle;

    if (this.jumpToggle) {
      this.playSpidermanMeme();
    } else {
      try {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.24);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.28);
      } catch {
        // Audio error
      }
    }
  }

  // Slide swoosh: filtered white noise burst
  public playSlide() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.22);
      filter.Q.value = 2.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.22);
    } catch {
      // Ignore
    }
  }

  // Coin collect: bright, musical two-tone bell chime
  public playCoin() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const baseFreq = 987.77 + (Math.random() * 80 - 40); // B5 note

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.setValueAtTime(baseFreq * 1.334, now + 0.06);

      osc2.frequency.setValueAtTime(baseFreq * 2, now);
      osc2.frequency.setValueAtTime(baseFreq * 2.668, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.25);
      osc2.stop(now + 0.25);
    } catch {
      // Audio error
    }
  }

  // Powerup collect: energetic fanfare chord
  public playPowerup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const noteTime = now + index * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // Shield pop / shatter
  public playShieldBreak() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Ignore
    }
  }

  // Crash sound: deep boom with noise impact
  public playCrash() {
    if (this.isMuted) return;
    try {
      this.stopSpidermanMeme();
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sub-bass thud
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      bassGain.gain.setValueAtTime(0.6, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.45);

      // Noise crunch
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(100, now + 0.35);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.35);
    } catch {
      // Ignore
    }
  }

  // Play the uploaded custom soundtrack when game starts
  public startBGM() {
    this.isBgmPlaying = true;
    this.jumpToggle = false; // Reset alternating jump sequence
    if (this.isMuted) return;

    try {
      this.initContext();
      const audio = this.getAudioElement();
      audio.currentTime = 0;
      audio.volume = 0.85;
      audio.muted = this.isMuted;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play was interrupted or requires user interaction:', err);
        });
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  public pauseBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    if (this.spidermanAudio) {
      this.spidermanAudio.pause();
    }
  }

  public resumeBGM() {
    if (this.isMuted || !this.isBgmPlaying) return;
    if (this.bgmAudio) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    this.jumpToggle = false;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }
    this.stopSpidermanMeme();
  }
}

export const soundManager = new SoundManager();
