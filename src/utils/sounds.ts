class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    const soundEffects = {
      shoot: this.createBeep(800, 0.1, 'square'),
      reload: this.createBeep(400, 0.2, 'sine'),
      click: this.createBeep(600, 0.05, 'sine'),
      buttonHover: this.createBeep(500, 0.03, 'sine'),
      success: this.createBeep(1000, 0.15, 'triangle'),
      error: this.createBeep(200, 0.2, 'sawtooth'),
    };

    Object.entries(soundEffects).forEach(([name, audio]) => {
      this.sounds.set(name, audio);
    });
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): HTMLAudioElement {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    const destination = audioContext.createMediaStreamDestination();
    gainNode.connect(destination);

    const audio = new Audio();
    audio.srcObject = destination.stream;
    audio.volume = 0.3;

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    return audio;
  }

  play(soundName: string) {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = 0.3;
      clone.play().catch(() => {});
    } else {
      this.playTone(soundName);
    }
  }

  private playTone(type: string) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const configs: Record<string, { freq: number; duration: number; type: OscillatorType }> = {
      shoot: { freq: 800, duration: 0.1, type: 'square' },
      reload: { freq: 400, duration: 0.2, type: 'sine' },
      click: { freq: 600, duration: 0.05, type: 'sine' },
      buttonHover: { freq: 500, duration: 0.03, type: 'sine' },
      success: { freq: 1000, duration: 0.15, type: 'triangle' },
      error: { freq: 200, duration: 0.2, type: 'sawtooth' },
    };

    const config = configs[type] || configs.click;

    oscillator.frequency.value = config.freq;
    oscillator.type = config.type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
