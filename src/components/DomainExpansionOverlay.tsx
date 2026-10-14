import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { JJK_DOMAIN_THEMES, JJKDomainTheme } from "../config/constants";
import { useDomainTheme } from "../context/DomainThemeContext";

export const GlobalDomainExpansionOverlay: React.FC = () => {
  const { activeDomain, setActiveDomain, isDomainOverlayOpen, closeDomainOverlay } = useDomainTheme();
  return <DomainExpansionOverlay isOpen={isDomainOverlayOpen} activeDomain={activeDomain} onSelectDomain={setActiveDomain} onClose={closeDomainOverlay} />;
};

interface DomainExpansionOverlayProps {
  isOpen: boolean;
  activeDomain: JJKDomainTheme;
  onSelectDomain: (domain: JJKDomainTheme) => void;
  onClose: () => void;
}

export const DomainExpansionOverlay: React.FC<DomainExpansionOverlayProps> = ({ isOpen, activeDomain, onSelectDomain, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div className="domain-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><div ref={panelRef} className="domain-modal" role="dialog" aria-modal="true" aria-labelledby="domain-dialog-title"><button className="modal-close" aria-label="Close domain selector" onClick={onClose}><X /></button><p className="chapter-label">INNATE TERRITORY <span>/</span> SELECT YOUR ATMOSPHERE</p><div className="modal-heading"><h2 id="domain-dialog-title">DOMAIN<br /><em>EXPANSION.</em></h2><span lang="ja" aria-hidden="true">領域展開</span></div><p className="modal-description">The barrier takes the shape of your soul. Choose your domain.</p><div className="domain-card-grid">{JJK_DOMAIN_THEMES.map((domain, index) => <button key={domain.id} aria-pressed={domain.id === activeDomain.id} className={`domain-card ${domain.id === activeDomain.id ? "is-active" : ""}`} onClick={() => onSelectDomain(domain)}><img src={domain.wallpaper} alt="" width="1376" height="768" loading="lazy" /><span className="domain-card-index">0{index + 1}</span><span className="domain-card-copy"><small>{domain.user}</small><strong>{domain.name}</strong><span lang="ja">{domain.japanese}</span></span><span className="domain-card-status">{domain.id === activeDomain.id ? "MANIFESTED" : "SELECT DOMAIN"}</span></button>)}</div><div className="modal-footer"><p>Active domain: <strong>{activeDomain.name}</strong></p><button className="seal-button seal-button-red" onClick={onClose}>MANIFEST DOMAIN <ArrowUpRight size={20} /></button></div></div></div>;
};
