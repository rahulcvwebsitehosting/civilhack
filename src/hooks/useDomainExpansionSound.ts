import { useCallback, useRef } from "react";
import { getAudioContext, isSoundEnabled } from "../utils/cyberSound";

export interface UseDomainExpansionSoundOptions {
  /**
   * Volume scaling factor between 0.0 and 1.0 (defaults to 0.75)
   */
  volume?: number;
  /**
   * Duration in seconds for the domain soundscape (defaults to 1.8s)
   */
  duration?: number;
  /**
   * Optional sorcerer resonance flavor
   */
  flavor?: "void" | "shrine" | "barrier" | "authentic";
}

export interface UseDomainExpansionSoundReturn {
  /**
   * Triggers the subtle, authentic JJK Domain Expansion soundscape
   */
  triggerDomainExpansionSound: (overrideFlavor?: "void" | "shrine" | "barrier" | "authentic") => void;
  /**
   * Checks if sound can currently be played
   */
  isEnabled: boolean;
}

/**
 * useDomainExpansionSound Hook
 *
 * Implements a high-fidelity, subtle Jujutsu Kaisen "Domain Expansion" soundscape
 * modeled after the iconic sound design:
 * 1. Deep Sub-Bass Singularity Drop: low 130Hz -> 32Hz pressure drop representing spatial boundary rupture.
 * 2. Cursed Energy Binaural Shimmer: Harmonic crystalline chord (528Hz, 741Hz, 963Hz, 1056Hz) that expands outward.
 * 3. Spatial Barrier Resonant Ring: Filtered resonant feedback peak giving the acoustic feel of stepping inside an enclosed barrier sphere.
 * 4. Micro Reverse Woosh: Subtle suction sweep before the domain takes over reality.
 */
export const useDomainExpansionSound = (
  options: UseDomainExpansionSoundOptions = {}
): UseDomainExpansionSoundReturn => {
  const isPlayingRef = useRef(false);

  const triggerDomainExpansionSound = useCallback(
    (overrideFlavor?: "void" | "shrine" | "barrier" | "authentic") => {
      if (!isSoundEnabled()) return;

      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Prevent overlapping bursts within 400ms
        if (isPlayingRef.current) return;
        isPlayingRef.current = true;
        setTimeout(() => {
          isPlayingRef.current = false;
        }, 500);

        const now = ctx.currentTime;
        const masterVol = options.volume ?? 0.75;
        const flavor = overrideFlavor || options.flavor || "authentic";

        // Master domain gain node to control overall intensity cleanly
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(masterVol, now);
        masterGain.connect(ctx.destination);

        // 1. STAGE 1: INWARD SUCTION / CURSED ENERGY CONVERGENCE (0.0s -> 0.25s)
        // High-Q bandpass sweep that sucks audio inward like Gojo's fingers interlocking
        const suctionOsc = ctx.createOscillator();
        const suctionFilter = ctx.createBiquadFilter();
        const suctionGain = ctx.createGain();

        suctionOsc.type = "sine";
        suctionOsc.frequency.setValueAtTime(320, now);
        suctionOsc.frequency.exponentialRampToValueAtTime(80, now + 0.22);

        suctionFilter.type = "bandpass";
        suctionFilter.Q.setValueAtTime(8, now);
        suctionFilter.frequency.setValueAtTime(450, now);
        suctionFilter.frequency.exponentialRampToValueAtTime(180, now + 0.22);

        suctionGain.gain.setValueAtTime(0.001, now);
        suctionGain.gain.linearRampToValueAtTime(0.22, now + 0.15);
        suctionGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        suctionOsc.connect(suctionFilter);
        suctionFilter.connect(suctionGain);
        suctionGain.connect(masterGain);

        suctionOsc.start(now);
        suctionOsc.stop(now + 0.26);

        // 2. STAGE 2: SUB-BASS BARRIER RUPTURE (0.15s -> 1.5s)
        // Deep cinematic sub-rumble felt in the chest as the domain barrier encapsulates the target
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        const subFilter = ctx.createBiquadFilter();

        subOsc.type = flavor === "shrine" ? "triangle" : "sine";
        subOsc.frequency.setValueAtTime(140, now + 0.15);
        subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.4);

        subFilter.type = "lowpass";
        subFilter.frequency.setValueAtTime(180, now + 0.15);
        subFilter.frequency.exponentialRampToValueAtTime(45, now + 1.4);

        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.setValueAtTime(0.4, now + 0.18);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        subOsc.connect(subFilter);
        subFilter.connect(subGain);
        subGain.connect(masterGain);

        subOsc.start(now + 0.15);
        subOsc.stop(now + 1.55);

        // 3. STAGE 3: CRYSTALLINE VOID CHORD (0.2s -> 1.6s)
        // Solfeggio / Ethereal JJK chord harmonics: pure, celestial chimes representing the domain interior
        const chordFrequencies =
          flavor === "shrine"
            ? [440, 554.37, 659.25, 880] // Minor/Dominant shrine resonance
            : [528, 741, 963, 1188]; // Unlimited Void miraculous fifths & solfeggio

        chordFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const gain = ctx.createGain();
          const stagger = 0.2 + idx * 0.05;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + stagger);
          // Ethereal subtle pitch drift representing infinite information flooding the mind
          osc.frequency.exponentialRampToValueAtTime(freq * 1.025, now + stagger + 0.9);

          const panValue = (idx % 2 === 0 ? -0.45 : 0.45) * (idx / 3);
          if (panner) {
            panner.pan.setValueAtTime(panValue, now + stagger);
          }

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.setValueAtTime(0.08 / (idx + 1), now + stagger + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + stagger + 1.2);

          if (panner) {
            osc.connect(panner);
            panner.connect(gain);
          } else {
            osc.connect(gain);
          }
          gain.connect(masterGain);

          osc.start(now + stagger);
          osc.stop(now + stagger + 1.25);
        });

        // 4. STAGE 4: BARRIER MEMBRANE RESONANCE (0.25s -> 0.9s)
        // Atmospheric shimmer / glassy hum
        const glassOsc = ctx.createOscillator();
        const glassGain = ctx.createGain();
        glassOsc.type = "sine";
        glassOsc.frequency.setValueAtTime(1760, now + 0.22);
        glassOsc.frequency.exponentialRampToValueAtTime(2640, now + 0.7);

        glassGain.gain.setValueAtTime(0.001, now);
        glassGain.gain.setValueAtTime(0.035, now + 0.25);
        glassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        glassOsc.connect(glassGain);
        glassGain.connect(masterGain);

        glassOsc.start(now + 0.22);
        glassOsc.stop(now + 0.86);
      } catch {
        // Fallback gracefully without breaking UI
      }
    },
    [options.duration, options.flavor, options.volume]
  );

  return {
    triggerDomainExpansionSound,
    isEnabled: isSoundEnabled()
  };
};
