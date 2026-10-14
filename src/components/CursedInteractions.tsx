import { useEffect, useRef } from "react";

export function CursedInteractions() {
  const layer = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    let lastTouch = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const slash = (x: number, y: number, trail = false) => {
      if (document.documentElement.dataset.jjkMotion === "paused" || !layer.current) return;
      const mark = document.createElement("span");
      mark.className = trail ? "cursed-touch-trail" : "cursed-touch-slash";
      mark.style.left = `${x}px`; mark.style.top = `${y}px`;
      mark.style.setProperty("--slash-rotation", `${x % 60 - 30}deg`);
      layer.current.appendChild(mark);
      const timer = setTimeout(() => { mark.remove(); timers.delete(timer); }, 750);
      timers.add(timer);
    };
    const down = (event: PointerEvent) => slash(event.clientX, event.clientY);
    const move = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && !event.buttons) return;
      if (performance.now() - lastTouch < 55) return;
      lastTouch = performance.now(); slash(event.clientX, event.clientY, true);
    };
    const update = () => {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${maximum > 0 ? scrollY / maximum : 0})`);
      if (document.documentElement.dataset.jjkMotion === "paused") return;
      document.querySelectorAll<HTMLElement>(".domain-hero-art, .hero-anime, .hero-side-script").forEach(node => {
        const offset = Math.min(scrollY, innerHeight) * (node.classList.contains("hero-side-script") ? -.16 : .12);
        node.style.setProperty("--scroll-offset", `${offset}px`);
      });
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      cancelAnimationFrame(frame); timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll);
    };
  }, []);
  return <><div ref={progress} className="cursed-scroll-progress" aria-hidden="true" /><div ref={layer} className="cursed-touch-layer" aria-hidden="true" /></>;
}
