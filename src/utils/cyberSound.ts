// Audio Engine for INNO360 (Civil CAD Synthesizer & Speech)
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const getAudioContext = (): AudioContext | null => {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleMute = (): boolean => {
  soundEnabled = !soundEnabled;
  window.dispatchEvent(new Event("jjk-sound-change"));
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

// Hover Sound (Quick sine chirp 800Hz -> 1400Hz)
export const playHoverSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {}
};

// JJK Domain Expansion Activation Sound (Eerie cosmic chime + resonant spatial hum + sub boom)
export const playDomainExpansionSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 1.2);
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

    // Cosmic shimmer frequencies (Unlimited Void / Malevolent Shrine chime)
    [528, 741, 963, 1188].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + idx * 0.08);
      osc.frequency.exponentialRampToValueAtTime(f * 1.5, now + 0.8 + idx * 0.08);
      gain.gain.setValueAtTime(0.07, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0 + idx * 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + 1.0 + idx * 0.08);
    });
  } catch {}
};

// JJK Black Flash (Kokusen) Crackle (Sharp distorted burst + lightning strike)
export const playBlackFlashSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sharp strike
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    // Lightning discharge noise
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  } catch {}
};

// JJK Cursed Energy Charge / Blue Aura Hum
export const playCursedEnergyCharge = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch {}
};

// Click Sound (Triangle blip 1200Hz -> 1600Hz -> 2000Hz)
export const playClickSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.03);
    osc.frequency.setValueAtTime(2000, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {}
};

// Fanfare / Success Arpeggio (C5, E5, G5, C6)
export const playSuccessSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
    });
  } catch {}
};

// Cannon Boom Sound (180Hz down to 35Hz sub rumble)
export const playCannonSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.85);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.9);
  } catch {}
};

// DJ Scratch / Warp Sound
export const playWarpSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sawtooth";
    filter.type = "bandpass";
    filter.Q.setValueAtTime(4, t);
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.linearRampToValueAtTime(860, t + 0.07);
    osc.frequency.linearRampToValueAtTime(180, t + 0.15);
    filter.frequency.setValueAtTime(650, t);
    filter.frequency.linearRampToValueAtTime(1900, t + 0.07);
    filter.frequency.linearRampToValueAtTime(420, t + 0.15);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  } catch {}
};

// DJ Airhorn Sound
export const playAirhornSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const freqs = [466.16, 587.33];
    const bursts = [
      { start: 0, dur: 0.1 },
      { start: 0.14, dur: 0.1 },
      { start: 0.28, dur: 0.1 },
      { start: 0.42, dur: 0.35 }
    ];
    const baseT = ctx.currentTime;
    bursts.forEach(b => {
      freqs.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, baseT + b.start);
        osc.frequency.linearRampToValueAtTime(f * 1.02, baseT + b.start + b.dur);
        gain.gain.setValueAtTime(0.08, baseT + b.start);
        gain.gain.exponentialRampToValueAtTime(0.001, baseT + b.start + b.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(baseT + b.start);
        osc.stop(baseT + b.start + b.dur);
      });
    });
  } catch {}
};

// DJ 808 Sub-Bass Drop
export const playBassDropSound = (): void => {
  playCannonSound();
};

// Laser Synth Sound
export const playLaserSound = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(3200, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.28);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.28);
  } catch {}
};

// Speech Synthesis (Captain's voice readout)
export const stopSpeech = (): void => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
};

export const speakSpeech = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): void => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/₹/g, "Rupees ")
      .replace(/@CUB/gi, " at C U B")
      .replace(/UG/g, "Undergraduate")
      .replace(/ESEC/g, "E S E C")
      .replace(/24-HR/gi, "24 hour")
      .replace(/\(/g, ", ")
      .replace(/\)/g, ", ")
      .replace(/\//g, " and ");

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = 0.88;
    utter.pitch = 0.95;
    utter.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const chosenVoice =
      voices.find(v => (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("David") || v.name.includes("Daniel")) && v.lang.startsWith("en")) ||
      voices.find(v => v.lang.startsWith("en"));
    if (chosenVoice) {
      utter.voice = chosenVoice;
    }

    if (onStart) utter.onstart = onStart;
    if (onEnd) {
      utter.onend = onEnd;
      utter.onerror = onEnd;
    }
    window.speechSynthesis.speak(utter);
  } catch {
    onEnd?.();
  }
};
