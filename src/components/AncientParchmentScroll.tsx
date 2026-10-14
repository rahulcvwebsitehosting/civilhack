import React, { useState, useEffect } from "react";
import { playClickSound } from "../utils/cyberSound";
import { ChevronDown, ChevronUp, Scroll as ScrollIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface AncientParchmentScrollProps {
  id?: string;
  subtitle?: string;
  title?: string;
  goldTitle?: string;
  description?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const AncientParchmentScroll: React.FC<AncientParchmentScrollProps> = ({
  id,
  subtitle = "// PIRATE CODE",
  title = "CREW FORMATION",
  goldTitle = "ARTICLES",
  description = "Mandatory pirate maritime bylaws binding every crew docking at the hackathon fleet.",
  badge = "9 ARTICLES",
  defaultOpen = false,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      if (!customEvent.detail?.id || customEvent.detail.id === id) {
        setIsOpen(true);
      }
    };
    window.addEventListener("open-parchment-scroll", handleOpenEvent);
    return () => window.removeEventListener("open-parchment-scroll", handleOpenEvent);
  }, [id]);

  const toggleScroll = () => {
    playClickSound();
    setIsOpen(prev => !prev);
  };

  return (
    <div id={id} className="relative py-8 sm:py-16 px-2 sm:px-6 z-10 max-w-5xl mx-auto select-none">
      <div className="text-center mb-5 sm:mb-8">
        <div className="inline-block font-cinzel font-bold text-[11px] sm:text-xs text-[#ffd700] tracking-widest uppercase mb-1.5">
          {subtitle}
        </div>
        <h2 className="font-pirate text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight">
          {title} <span className="text-[#ffd700] pirate-gold-title">{goldTitle}</span>
        </h2>
        {description && (
          <p className="font-cinzel text-[11px] sm:text-sm text-gray-300 mt-1 max-w-xl mx-auto px-2">
            {description}
          </p>
        )}
      </div>

      {!isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-expanded={false}
          onClick={toggleScroll}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleScroll();
            }
          }}
          className="group relative cursor-pointer focus:outline-none flex flex-col items-center justify-center max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative w-full max-w-xl sm:max-w-2xl px-2 sm:px-4">
            <img
              src="/pirate-scroll-closed.png"
              alt="Ancient Closed Pirate Scroll with Wax Seal"
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] filter transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(255,215,0,0.45)]"
            />
          </div>

          <div className="mt-3 sm:mt-4">
            <div className="relative inline-flex items-center space-x-2.5 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1c1208] via-[#331f0e] to-[#1c1208] border-2 border-[#ffd700] group-hover:border-[#ffe885] shadow-[0_0_25px_rgba(255,215,0,0.35),0_8px_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_35px_rgba(255,215,0,0.6)] transition-all duration-300">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#b31b1b] via-[#820d0d] to-[#450505] border border-[#ff8585] shadow-[0_2px_5px_rgba(0,0,0,0.6)] flex items-center justify-center flex-shrink-0">
                <ScrollIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffd700]" />
              </div>
              <span className="font-cinzel font-bold text-[11px] sm:text-sm text-[#ffd700] tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Click to Unroll Scroll ({badge})
              </span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd700] transition-transform group-hover:translate-y-0.5 animate-bounce" />
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.85, y: -20 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.9, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="origin-top"
          >
            {/* Top Scroll Wooden Rod */}
            <div className="w-full max-w-4xl mx-auto -mb-3 sm:-mb-4 relative z-20">
              <img
                src="/pirate-scroll-rod.png"
                alt="Scroll Top Rod"
                className="w-full h-auto object-contain filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Antique Parchment Body */}
            <div className="relative mx-auto max-w-[94%] sm:max-w-[92%] bg-[#ebd9b4] text-[#331c09] p-4 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.95)] border-x-4 border-[#8c5a27] relative z-10 overflow-hidden">
              {/* Parchment background texture effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, transparent 60%, rgba(100, 60, 20, 0.45) 100%),
                                    linear-gradient(to right, rgba(100, 60, 20, 0.25) 0%, transparent 8%, transparent 92%, rgba(100, 60, 20, 0.25) 100%)`
                }}
              />

              {/* Watermark crest */}
              <div className="absolute right-4 top-4 w-32 h-32 opacity-10 pointer-events-none">
                <img src="/codienych-logo-round.png" alt="Watermark" className="w-full h-full object-contain" />
              </div>

              <div className="relative z-10">{children}</div>
            </div>

            {/* Bottom Scroll Wooden Rod */}
            <div className="w-full max-w-4xl mx-auto -mt-3 sm:-mt-4 relative z-20">
              <img
                src="/pirate-scroll-rod.png"
                alt="Scroll Bottom Rod"
                className="w-full h-auto object-contain filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)] rotate-180"
              />
            </div>

            {/* Roll-Up Control Button */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={toggleScroll}
                className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#1c1208]/90 border border-[#ffd700]/70 hover:border-[#ffd700] text-[#ffd700] hover:text-white transition-all text-xs font-cinzel font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] active:scale-95"
              >
                <span>Click to Roll Up Scroll</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
