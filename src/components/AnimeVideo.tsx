import { useEffect, useRef, useState } from "react";

/** Play only the visible clip; the shared energy switch also stops decoding video. */
export function AnimeVideo({ clip, poster, className = "", label }: { clip: string; poster: string; className?: string; label: string }) {
  const sourceClip = clip === "sukuna-shrine" ? "sukuna-cinema" : clip;
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && document.documentElement.dataset.jjkMotion !== "paused") video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    const motion = new MutationObserver(update);
    observer.observe(video);
    motion.observe(document.documentElement, { attributes: true, attributeFilter: ["data-jjk-motion"] });
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); motion.disconnect(); document.removeEventListener("visibilitychange", update); video.pause(); };
  }, [clip]);
  return <div className={`anime-video ${className}`}>
    {failed ? <img src={poster} alt={`${label} — video unavailable`} /> : <video ref={ref} src={`/assets/jjk/media/${sourceClip}.mp4`} poster={poster} muted loop playsInline preload="metadata" aria-label={label} onError={() => setFailed(true)} />}
  </div>;
}
