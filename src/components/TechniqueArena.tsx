import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Zap, Volume2, VolumeX } from "lucide-react";
import { Technique, TechniqueEnergy } from "./JujutsuMotion";
import { isSoundEnabled, toggleMute } from "../utils/cyberSound";
import { playCharacterVoice, stopCharacterVoice, preloadCharacterVoice, type CharacterClip } from "../utils/characterAudio";
import { AnimeVideo } from "./AnimeVideo";

const techniques: { id: Technique; character: string; name: string; japanese: string; image: string; clip: CharacterClip; description: string; chant: string }[] = [
  { id: "infinity", character: "SATORU GOJO", name: "UNLIMITED VOID", japanese: "無量空処", image: "gojo-infinity", clip: "gojo-void", description: "Between you and the impossible lies an infinity of possibilities.", chant: "DOMAIN EXPANSION · UNLIMITED VOID" },
  { id: "shadows", character: "MEGUMI FUSHIGURO", name: "CHIMERA SHADOW GARDEN", japanese: "嵌合暗翳庭", image: "megumi-shadows", clip: "megumi-garden", description: "Let the shadows take shape. Summon the strength of your shikigami.", chant: "DOMAIN EXPANSION · CHIMERA SHADOW GARDEN" },
  { id: "resonance", character: "NOBARA KUGISAKI", name: "RESONANCE", japanese: "共鳴り", image: "nobara-resonance", clip: "nobara-resonance", description: "A hammer, a nail, and unshakable resolve. Make every strike count.", chant: "STRAW DOLL TECHNIQUE · RESONANCE" },
  { id: "black-flash", character: "YUJI ITADORI", name: "BLACK FLASH", japanese: "黒閃", image: "yuji-black-flash", clip: "yuji-black-flash", description: "Cursed energy and impact become one. Strike beyond your limits.", chant: "BLACK FLASH · CURSED ENERGY RELEASED" },
  { id: "shrine", character: "RYOMEN SUKUNA", name: "MALEVOLENT SHRINE", japanese: "伏魔御厨子", image: "domain-clash", clip: "sukuna-shrine", description: "The king of curses opens his shrine. Every slash finds its mark.", chant: "DOMAIN EXPANSION · MALEVOLENT SHRINE" }
];

export const TechniqueArena: React.FC<{ initialTechnique?: number }> = ({ initialTechnique = 0 }) => {
  const arenaId = useId();
  const [sound, setSound] = useState(isSoundEnabled);
  const [audioError, setAudioError] = useState(false);
  const touchStart = useRef<number | null>(null);
  const [selected, setSelected] = useState(initialTechnique);
  const [casting, setCasting] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = techniques[selected];
  useEffect(() => {
    const sync = () => setSound(isSoundEnabled());
    window.addEventListener("jjk-sound-change", sync);
    return () => { stopCharacterVoice(arenaId); window.removeEventListener("jjk-sound-change", sync); };
  }, []);
  useEffect(() => { preloadCharacterVoice(active.clip); }, [active.clip]);
  const select = (index: number) => {
    stopCharacterVoice(arenaId);
    setAudioError(false);
    setCasting(false);
    setSelected(index);
  };
  const cast = () => {
    if (casting) return;
    setAudioError(false);
    playCharacterVoice(active.clip, arenaId).then(() => setCasting(false)).catch(() => { setAudioError(true); setCasting(false); });
    setCasting(true);
    stage.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  };
  const navigateTabs = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % techniques.length;
    else if (event.key === "ArrowLeft") next = (index + techniques.length - 1) % techniques.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = techniques.length - 1;
    else return;
    event.preventDefault(); select(next); tabs.current[next]?.focus();
  };

  return <section id="cursed-techniques" className="technique-arena" aria-labelledby={`${arenaId}-title`}>
    <div className="section-intro"><div><p className="chapter-label">CURSED TECHNIQUE LAB <span>/</span> TOUCH THE IMPOSSIBLE</p><h2 id={`${arenaId}-title`}>DON’T JUST WATCH.<br /><em>CAST YOUR TECHNIQUE.</em></h2></div><p>Five sorcerers. Anime footage + English dub voices.<br />Swipe to switch. Tap to unleash.</p></div>
    <div className="sorcerer-tabs" role="tablist" aria-label="Choose a sorcerer's technique">
      {techniques.map((technique, index) => <button key={technique.id} ref={node => { tabs.current[index] = node; }} id={`${arenaId}-tab-${technique.id}`} role="tab" aria-selected={index === selected} aria-controls={`${arenaId}-stage`} tabIndex={index === selected ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigateTabs(event, index)}><small>0{index + 1} / {technique.character}</small><strong>{technique.name}</strong><span lang="ja">{technique.japanese}</span></button>)}
    </div>
    <div ref={stage} id={`${arenaId}-stage`} className={`technique-stage stage-${active.id} ${casting ? "is-casting" : ""}`} role="tabpanel" aria-labelledby={`${arenaId}-tab-${active.id}`} tabIndex={0} onTouchStart={event => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={event => {
      if (touchStart.current !== null) { const dx = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(dx) > 70) select((selected + (dx < 0 ? 1 : techniques.length - 1)) % techniques.length); }
      touchStart.current = null;
    }}>
      <div className="technique-scene" key={active.id}>
        <picture><source type="image/webp" srcSet={`/assets/jjk/${active.image}-836.webp 836w, /assets/jjk/${active.image}-1672.webp 1672w`} sizes="(max-width: 1260px) 100vw, 1180px" /><img src={`/assets/jjk/${active.image}-1672.webp`} alt={`${active.character} performing ${active.name} in a cinematic manga scene`} width="1672" height="941" loading="lazy" /></picture>
        <AnimeVideo key={`${active.id}-${casting}`} clip={active.clip} poster={`/assets/jjk/${active.image}-836.webp`} label={`${active.character}: ${active.name} anime sequence`} />
        <TechniqueEnergy technique={active.id} />
      </div>
      <div className="technique-stage-copy" key={`copy-${active.id}`}><p className="chapter-label">ANIME SEQUENCE / 0{selected + 1}</p><span className="technique-kanji" lang="ja">{active.japanese}</span><h3>{active.name}</h3><p>{active.description}</p><button className="seal-button seal-button-red" onClick={cast} disabled={casting}><Zap size={18} />{casting ? "CURSED ENERGY UNLEASHED" : "RELEASE + PLAY VOICE"}<ArrowUpRight size={17} /></button></div>
      <button className="arena-sound" onClick={toggleMute} aria-label={sound ? "Mute character voices" : "Enable character voices"}>{sound ? <Volume2 size={17} /> : <VolumeX size={17} />} {sound ? "VOICE ON" : "VOICE OFF"}</button>
      {casting && <div className="attack-callout" aria-hidden="true"><span lang="ja">{active.japanese}</span><strong>{active.name}</strong><i /></div>}
      <div className="technique-chant" role="status" aria-live="polite">{audioError ? "VOICE UNAVAILABLE · TAP AGAIN TO RETRY" : casting ? active.chant : "ENGLISH DUB · RELEASE TO HEAR THEIR VOICE"}</div>
      <span className="technique-stage-stamp" aria-hidden="true" lang="ja">呪</span>
    </div>
  </section>;
};
