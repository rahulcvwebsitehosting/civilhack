import React from "react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";
import { ArrowUp, ExternalLink } from "lucide-react";
import { playClickSound } from "../utils/cyberSound";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/esecindia/" },
    { label: "Facebook", href: "https://www.facebook.com/esecindia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/school/esecindia/" },
    { label: "X (Twitter)", href: "https://x.com/esec_india" },
    { label: "YouTube", href: "https://www.youtube.com/@esecindia" },
    { label: "ESEC TV", href: "https://www.youtube.com/@esectelevision" },
    { label: "College Blog", href: "https://esecupdates.blogspot.com/" }
  ];

  return (
    <footer className="relative z-10 bg-[#100c0d] border-t border-[#463236] text-[#bcaea2] font-mono text-xs py-12 px-4 select-none">
      {/* Social Links Banner */}
      <div className="max-w-6xl mx-auto mb-10 pb-8 border-b border-[#463236]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] text-[#eb9287] uppercase tracking-widest block mb-1">
              KEEP UP WITH ESEC
            </span>
            <h4 className="font-barlow text-2xl font-bold text-white">
              FIND US ONLINE.
            </h4>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#201819] border border-[#513b3b] text-xs text-[#dfb8af] hover:text-white hover:border-[#dfb8af] transition-colors flex items-center space-x-1"
              >
                <span>{s.label}</span>
                <span className="text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white p-1 border border-[#dfb8af]/50">
            <img
              src="/assets/college-transparent.png"
              alt="ESEC Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-barlow text-xl font-black text-white block leading-none">
              INNO<span className="text-[#eb9287]">360</span> · 2026
            </span>
            <span className="text-[10px] text-[#dfb8af]">
              {CIVIL_EVENT_CONFIG.DEPARTMENT}
            </span>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-white">
            {CIVIL_EVENT_CONFIG.COLLEGE_NAME} (AUTONOMOUS)
          </p>
          <p className="text-[11px] text-[#bcaea2] mt-0.5">
            Thudupathi, Perundurai, Erode, Tamil Nadu — 638057
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-sm bg-[#201819] border border-[#513b3b] hover:border-[#dfb8af] flex items-center justify-center text-[#dfb8af] hover:scale-105 transition-all cursor-pointer shadow-md"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#463236]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#bcaea2] gap-3">
        <div>
          © 2026 {CIVIL_EVENT_CONFIG.EVENT_NAME} · {CIVIL_EVENT_CONFIG.MISSION_MOTTO}
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={CIVIL_EVENT_CONFIG.GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#eb9287] hover:underline"
          >
            Google Form Registration ↗
          </a>
          <a
            href={CIVIL_EVENT_CONFIG.BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dfb8af] hover:underline"
          >
            Event Brochure ↗
          </a>
        </div>
      </div>
    </footer>
  );
};
