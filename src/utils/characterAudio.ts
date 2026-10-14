import { isSoundEnabled } from "./cyberSound";

export type CharacterClip = "gojo-void" | "sukuna-shrine" | "megumi-garden" | "nobara-resonance" | "yuji-black-flash";
const clips = new Map<string, HTMLAudioElement>();
let playback: { audio: HTMLAudioElement; owner?: string; cancel: () => void } | null = null;

export function preloadCharacterVoice(clip: CharacterClip) {
  let audio = clips.get(clip);
  if (!audio) {
    audio = new Audio(`/assets/jjk/media/${clip}-en.mp3?v=complete-2`);
    audio.preload = "auto";
    audio.hidden = true;
    audio.dataset.characterClip = clip;
    audio.volume = .85;
    clips.set(clip, audio);
    audio.load();
  }
  return audio;
}

/** Components stop their own voice without cutting off a new page/entrance. */
export function stopCharacterVoice(owner?: string) {
  if (playback && (!owner || playback.owner === owner)) playback.cancel();
}

/** Resolves after the complete line, rather than as soon as play starts. */
export function playCharacterVoice(clip: CharacterClip, owner?: string): Promise<void> {
  stopCharacterVoice();
  if (!isSoundEnabled()) return Promise.resolve();
  const audio = preloadCharacterVoice(clip);
  audio.currentTime = 0;
  document.body.appendChild(audio);
  return new Promise((resolve, reject) => {
    let finished = false;
    const finish = (error?: Error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      audio.removeEventListener("ended", ended);
      audio.removeEventListener("error", failed);
      audio.pause();
      audio.remove();
      if (playback?.audio === audio) playback = null;
      window.dispatchEvent(new CustomEvent("jjk-voice-state", { detail: { owner, playing: false } }));
      if (error) reject(error); else resolve();
    };
    const ended = () => finish();
    const failed = () => finish(new Error("Character voice unavailable"));
    const timeout = setTimeout(() => finish(new Error("Character voice timed out")), 45000);
    audio.addEventListener("ended", ended);
    audio.addEventListener("error", failed);
    playback = { audio, owner, cancel: () => finish() };
    window.dispatchEvent(new CustomEvent("jjk-voice-state", { detail: { owner, playing: true } }));
    audio.play().catch(finish);
  });
}
window.addEventListener("jjk-sound-change", () => { if (!isSoundEnabled()) stopCharacterVoice(); });
window.addEventListener("pagehide", () => stopCharacterVoice());
