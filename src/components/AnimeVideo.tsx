import { useEffect, useRef, useState } from "react";
import { isSoundEnabled, toggleMute } from "../utils/cyberSound";
import { claimCharacterMedia, releaseCharacterMedia } from "../utils/characterMedia";

interface AnimeVideoProps {
  clip: string;
  poster: string;
  className?: string;
  label: string;
  loop?: boolean;
  audible?: boolean;
  playbackKey?: number;
  onComplete?: () => void;
  onInterrupted?: () => void;
  onFailure?: () => void;
}

/** Foreground playback uses the video's embedded soundtrack: buffering cannot split its clocks. */
export function AnimeVideo({ clip, poster, className = "", label, loop = true, audible = false, playbackKey = 0, onComplete, onInterrupted, onFailure }: AnimeVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const callbacks = useRef({ onComplete, onInterrupted, onFailure });
  callbacks.current = { onComplete, onInterrupted, onFailure };
  const settled = useRef(false);
  const userPaused = useRef(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(audible);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [sound, setSound] = useState(isSoundEnabled);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const sync = () => setSound(isSoundEnabled());
    window.addEventListener("jjk-sound-change", sync);
    return () => window.removeEventListener("jjk-sound-change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    let cancelled = false;
    settled.current = false;
    userPaused.current = false;
    setFailed(false);
    setNeedsGesture(false);
    setLoading(audible);
    video.volume = .85;
    video.muted = !audible || !isSoundEnabled();
    if (audible) {
      try { video.currentTime = 0; } catch { /* New media already starts at zero before metadata arrives. */ }
      claimCharacterMedia(video, () => {
        cancelled = true;
        callbacks.current.onInterrupted?.();
      });
    }
    const update = () => {
      // Motion settings govern decoration; an explicitly requested cinematic remains playable.
      const allowed = audible || document.documentElement.dataset.jjkMotion !== "paused";
      if (visible && !document.hidden && allowed && !cancelled && !userPaused.current && !video.ended) {
        video.play().then(() => {
          if (cancelled) video.pause();
        }).catch(error => {
          if (!cancelled && error.name !== "AbortError") {
            setLoading(false);
            setNeedsGesture(audible);
          }
        });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    const motion = new MutationObserver(update);
    const escape = (event: KeyboardEvent) => {
      if (!audible || event.key !== "Escape") return;
      cancelled = true;
      releaseCharacterMedia(video);
      callbacks.current.onInterrupted?.();
    };
    observer.observe(video);
    motion.observe(document.documentElement, { attributes: true, attributeFilter: ["data-jjk-motion"] });
    document.addEventListener("visibilitychange", update);
    document.addEventListener("keydown", escape);
    return () => {
      cancelled = true;
      observer.disconnect();
      motion.disconnect();
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("keydown", escape);
      releaseCharacterMedia(video);
    };
  }, [clip, audible, playbackKey]);

  const complete = () => {
    if (settled.current) return;
    settled.current = true;
    setLoading(false);
    callbacks.current.onComplete?.();
  };
  return <div className={`anime-video ${className}`}>
    {failed && <img src={poster} alt={`${label} — video unavailable`} />}
    <video hidden={failed}
      ref={ref} src={`/assets/jjk/media/${clip}-synced.mp4?v=av-2`} poster={poster}
      muted={!audible || !sound} loop={loop} playsInline preload={audible ? "auto" : "metadata"}
      aria-label={label} onEnded={complete}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onWaiting={() => { if (audible && !userPaused.current) setLoading(true); }}
      onPlaying={() => { setLoading(false); setNeedsGesture(false); }}
      onError={() => { setFailed(true); setLoading(false); callbacks.current.onFailure?.(); complete(); }}
    />
    {audible && loading && !failed && !needsGesture && <span className="media-loading" role="status">Loading cinematic…</span>}
    {audible && needsGesture && !failed && <button type="button" className="media-play-prompt" onClick={() => {
      setLoading(true);
      userPaused.current = false;
      ref.current?.play().catch(() => { setLoading(false); setNeedsGesture(true); });
    }}>Tap to play video + sound</button>}
    {audible && !failed && <div className="media-controls" role="group" aria-label={`${label} playback controls`}>
      <button type="button" aria-label={playing ? "Pause cinematic" : "Resume cinematic"} onClick={() => {
        const video = ref.current;
        if (!video) return;
        if (!video.paused) { userPaused.current = true; video.pause(); setLoading(false); }
        else { userPaused.current = false; video.play().catch(() => setNeedsGesture(true)); }
      }}>{playing ? "Pause" : "Play"}</button>
      <button type="button" aria-label="Replay cinematic" onClick={() => {
        const video = ref.current;
        if (!video) return;
        settled.current = false;
        userPaused.current = false;
        try { video.currentTime = 0; } catch { /* Loading metadata still starts at zero. */ }
        video.play().catch(() => setNeedsGesture(true));
      }}>Replay</button>
      <button type="button" aria-label={sound ? "Mute cinematic" : "Unmute cinematic"} aria-pressed={sound} onClick={toggleMute}>{sound ? "Sound on" : "Sound off"}</button>
      <button type="button" aria-label="Close cinematic" onClick={() => {
        if (ref.current) releaseCharacterMedia(ref.current);
        callbacks.current.onInterrupted?.();
      }}>Close</button>
    </div>}
  </div>;
}
