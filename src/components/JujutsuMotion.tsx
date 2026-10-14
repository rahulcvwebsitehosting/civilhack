import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AnimeVideo } from "./AnimeVideo";
import { domainClip, useDomainTheme } from "../context/DomainThemeContext";

/** Decorative movement stays optional and never intercepts navigation. */
export const JujutsuMotion: React.FC = () => {
  const { pathname } = useLocation();
  const { activeDomain } = useDomainTheme();
  const clip = domainClip(activeDomain.id);
  const previousDomain = useRef(activeDomain.id);
  const [manifesting, setManifesting] = useState(false);
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem("jjk_motion_paused_v2") === "true"; } catch { return false; }
  });
  const enabled = !paused;

  useEffect(() => {
    document.documentElement.dataset.jjkMotion = enabled ? "running" : "paused";
    try {
      localStorage.setItem("jjk_motion_paused_v2", String(paused));
    } catch { /* Session control still works. */ }
  }, [enabled, paused]);

  useEffect(() => {
    const syncVoice = (event: Event) => {
      const { owner, playing } = (event as CustomEvent<{ owner?: string; playing: boolean }>).detail;
      if (owner === "domain-selection") setManifesting(enabled && playing);
    };
    window.addEventListener("jjk-voice-state", syncVoice);
    return () => window.removeEventListener("jjk-voice-state", syncVoice);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) { setManifesting(false); previousDomain.current = activeDomain.id; return; }
    if (previousDomain.current === activeDomain.id) return;
    previousDomain.current = activeDomain.id;
    if (clip) return; // The voice start/end events control actual technique scenes.
    setManifesting(true);
    const timer = window.setTimeout(() => setManifesting(false), 3000);
    return () => window.clearTimeout(timer);
  }, [activeDomain.id, enabled, clip]);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("jjk-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    const ambientObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("is-in-view", entry.isIntersecting));
    }, { threshold: 0 });
    const ambientElements = new WeakSet<Element>();
    const discover = () => {
      document.querySelectorAll(".technique-arena, .domain-hero").forEach(element => {
        if (ambientElements.has(element)) return;
        ambientElements.add(element); ambientObserver.observe(element);
      });
      document.querySelectorAll<HTMLElement>(
        ".section-intro, .technique-panel, .mission-facts > *, .domain-card, .portal-chapter, main > section[id] > .text-center, main > section[id] > .grid > *, .binding-vow > h2"
      ).forEach((element, index) => {
        if (element.classList.contains("jjk-revealed")) return;
        element.classList.add("jjk-reveal");
        element.style.setProperty("--reveal-delay", `${index % 3 * 85}ms`);
        observer.observe(element);
      });
    };
    discover();
    const mutations = new MutationObserver(discover);
    mutations.observe(document.getElementById("root")!, { childList: true, subtree: true });
    return () => { observer.disconnect(); ambientObserver.disconnect(); mutations.disconnect(); };
  }, [pathname, enabled]);

  return <>
    <div className="cursed-energy-field" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--i": i, "--drift": `${i % 2 ? -36 : 44}px` } as React.CSSProperties} />)}
    </div>
    {manifesting && <div className={`domain-manifestation manifest-${activeDomain.id}`} aria-hidden="true" key={activeDomain.id}>
      {clip ? <AnimeVideo clip={clip} poster={activeDomain.wallpaper} label={`${activeDomain.name} domain animation`} /> : <img className="manifest-poster" src={activeDomain.wallpaper} alt="" />}
      <div className="manifest-ring" /><div className="manifest-ring ring-two" />
      <span lang="ja">{activeDomain.japanese}</span><small>{activeDomain.name}</small>
    </div>}
    <button type="button" className="motion-control" aria-label={enabled ? "Pause JJK animations" : "Enable JJK animations"} aria-pressed={enabled} onClick={() => { setPaused(value => !value) }}>
      {enabled ? <Pause size={13} /> : <Play size={13} />}<span>{enabled ? "PAUSE ENERGY" : "ENABLE ANIMATIONS"}</span>
    </button>
  </>;
};

export type Technique = "infinity" | "shadows" | "resonance" | "black-flash" | "shrine";

/** SVG geometry is intentionally separate from the character artwork. */
export const TechniqueEnergy: React.FC<{ technique: Technique }> = ({ technique }) => (
  <div className={`technique-energy energy-${technique}`} aria-hidden="true">
    <div className="energy-orbit orbit-one" /><div className="energy-orbit orbit-two" /><div className="energy-orbit orbit-three" />
    <svg className="energy-strokes" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <path className="stroke-one" d="M-40 430L280 245L208 235L480 110L430 170L840 25" />
      <path className="stroke-two" d="M-40 80L260 230L215 270L580 340L520 385L840 480" />
      <path className="shadow-wave" d="M-40 480Q80 270 180 440T410 410T620 380T840 450" />
    </svg>
    <div className="resonance-nails"><i /><i /><i /><i /><i /></div>
    <div className="energy-sparks">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
    <div className="energy-impact" />
  </div>
);
