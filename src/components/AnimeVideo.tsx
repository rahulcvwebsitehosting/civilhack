import { useEffect, useRef, useState } from "react";
import { isSoundEnabled } from "../utils/cyberSound";
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
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(audible);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [sound, setSound] = useState(isSoundEnabled);

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
      if (visible && !document.hidden && allowed && !cancelled && !video.ended) {
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
    observer.observe(video);
    motion.observe(document.documentElement, { attributes: true, attributeFilter: ["data-jjk-motion"] });
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelled = true;
      observer.disconnect();
      motion.disconnect();
      document.removeEventListener("visibilitychange", update);
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
      ref={ref} src={`/assets/jjk/media/${clip}-synced.mp4?v=av-1`} poster={poster}
      muted={!audible || !sound} loop={loop} playsInline preload={audible ? "auto" : "metadata"}
      aria-label={label} onEnded={complete}
      onWaiting={() => { if (audible) setLoading(true); }}
      onPlaying={() => { setLoading(false); setNeedsGesture(false); }}
      onError={() => { setFailed(true); setLoading(false); callbacks.current.onFailure?.(); complete(); }}
    />
    {audible && loading && !failed && !needsGesture && <span className="media-loading" role="status">Loading cinematic…</span>}
    {audible && needsGesture && !failed && <button type="button" className="media-play-prompt" onClick={() => {
      setLoading(true);
      ref.current?.play().catch(() => { setLoading(false); setNeedsGesture(true); });
    }}>Tap to play video + sound</button>}
  </div>;
}
