import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { useDomainTheme } from "../context/DomainThemeContext";
import { toggleMute, isSoundEnabled } from "../utils/cyberSound";

const links = [
  ["BATTLE GROUNDS", "tracks"], ["TRANSPORT", "transport"], ["THE LAB", "campus"],
  ["BINDING VOWS", "rules"], ["TIMELINE", "schedule"], ["CURSED TECHNIQUE LAB", "cursed-techniques"], ["SQUAD FEES", "team-rules"],
  ["KNOW ABOUT US", "community"], ["FAQ", "faq"], ["CONTACT", "contacts"]
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const { openDomainOverlay } = useDomainTheme();
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    const sync = () => setSoundOn(isSoundEnabled());
    window.addEventListener("jjk-sound-change", sync);
    return () => window.removeEventListener("jjk-sound-change", sync);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const close = () => setMenuOpen(false);
  const scrollToSection = (id: string) => {
    close();
    if (location.pathname === "/portal" || location.pathname === "/event") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="domain-navbar">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="domain-topbar"><span>ESEC (AUTONOMOUS) <span className="topbar-detail">/ DEPARTMENT OF CIVIL ENGINEERING</span></span><span>15 OCT 2026 <span className="topbar-detail">· 12 HOURS</span></span></div>
      <div className="domain-nav-inner">
        <Link to="/" className="domain-brand" onClick={close} aria-label="INNO360 home"><span className="brand-seal" lang="ja" aria-hidden="true">呪</span><span>INNO<span className="brand-red">360</span><small>THE JUJUTSU CHAPTER · 2026</small></span></Link>
        <nav className="desktop-domain-nav" aria-label="Main navigation">{links.slice(0, 5).map(([label, id]) => <Link to={`/portal#${id}`} key={id} onClick={() => scrollToSection(id)}>{label}</Link>)}</nav>
        <div className="domain-nav-tools">
          <button className="domain-trigger" aria-label="Expand domain" onClick={() => { close(); openDomainOverlay(); }}><span lang="ja" aria-hidden="true">領域</span><span>EXPAND DOMAIN</span></button>
          <button className="sound-toggle" aria-label={soundOn ? "Mute sound" : "Enable sound"} aria-pressed={soundOn} onClick={() => setSoundOn(toggleMute())}>{soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}</button>
          <Link to="/register" className="nav-register" onClick={close}>REGISTER <ArrowUpRight size={16} /></Link>
          <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-domain-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-domain-menu" className="mobile-domain-menu" aria-label="More navigation">{links.map(([label, id], index) => <Link key={id} to={`/portal#${id}`} onClick={() => scrollToSection(id)}><small>0{index + 1}</small>{label}<ArrowUpRight size={18} /></Link>)}<Link to="/register" onClick={close} className="mobile-register">REGISTER YOUR SQUAD <ArrowUpRight size={18} /></Link></nav>}
    </header>
  );
};
