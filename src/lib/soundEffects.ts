// SAPTHA — Web Audio API Procedural Sound Engine
// Crisp, low-latency, futuristic UI sound synthesizer (zero external asset dependencies)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('saptha_sound_enabled');
      // Default to enabled (true) unless user explicitly turned it off
      this.isMuted = saved === 'false';
    } catch {
      this.isMuted = false;
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.isMuted = !enabled;
    try {
      localStorage.setItem('saptha_sound_enabled', enabled ? 'true' : 'false');
    } catch {}
  }

  public toggleSound(): boolean {
    const newState = !this.isSoundEnabled();
    this.setSoundEnabled(newState);
    if (newState) {
      this.playChime();
    }
    return newState;
  }

  // 1. Crisp tactile button click (short subtle click)
  public playClick(pitch: number = 1.0): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {}
  }

  // 2. Navigation / Tab switch (gentle futuristic blip)
  public playNav(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }

  // 3. Card Select / Modal Open (warm resonant pop)
  public playCardSelect(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {}
  }

  // 4. Uplifting Chime (Primary action, explore trigger)
  public playChime(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
      });
    } catch {}
  }

  // 5. Success Chime (Submit, Copy link, Action complete)
  public playSuccess(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.26);
      });
    } catch {}
  }

  // 6. Dismiss / Close / Back (gentle descending tone)
  public playDismiss(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.07);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  // 7. Toggle switch (glassy ping)
  public playToggle(): void {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }
}

export const sound = new SoundEngine();

// Global listener helper: plays appropriate sound based on clicked element attributes
export function handleGlobalClick(e: MouseEvent): void {
  const target = (e.target as HTMLElement | null)?.closest(
    'button, a, input[type="button"], input[type="submit"], [role="button"], [role="tab"], [role="article"], .card-3d'
  ) as HTMLElement | null;

  if (!target) return;

  // If element or parent has data-sound attribute, respect that
  const customSound = target.getAttribute('data-sound');
  if (customSound === 'none') return;
  if (customSound === 'success') {
    sound.playSuccess();
    return;
  }
  if (customSound === 'chime') {
    sound.playChime();
    return;
  }
  if (customSound === 'dismiss') {
    sound.playDismiss();
    return;
  }
  if (customSound === 'toggle') {
    sound.playToggle();
    return;
  }
  if (customSound === 'card') {
    sound.playCardSelect();
    return;
  }

  // Otherwise infer from role and tags
  const tagName = target.tagName.toLowerCase();
  const ariaLabel = (target.getAttribute('aria-label') || '').toLowerCase();
  const title = (target.getAttribute('title') || '').toLowerCase();
  const text = (target.textContent || '').toLowerCase();

  // Close / cancel / dismiss
  if (
    ariaLabel.includes('close') ||
    ariaLabel.includes('cancel') ||
    title.includes('close') ||
    text.includes('close') ||
    text.includes('cancel')
  ) {
    sound.playDismiss();
    return;
  }

  // Toggle buttons (like theme toggle or sound toggle)
  if (
    ariaLabel.includes('theme') ||
    ariaLabel.includes('toggle') ||
    ariaLabel.includes('sound') ||
    ariaLabel.includes('switch')
  ) {
    sound.playToggle();
    return;
  }

  // Cards or project article selection
  if (target.getAttribute('role') === 'article' || target.classList.contains('card-3d')) {
    sound.playCardSelect();
    return;
  }

  // Links / navigation
  if (tagName === 'a' || target.getAttribute('role') === 'tab') {
    sound.playNav();
    return;
  }

  // Primary buttons or submit
  if (
    text.includes('submit') ||
    text.includes('explore') ||
    text.includes('launch') ||
    text.includes('approve') ||
    text.includes('create')
  ) {
    sound.playChime();
    return;
  }

  // Default button click
  sound.playClick();
}
