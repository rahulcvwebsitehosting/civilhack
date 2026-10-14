import React, { useState } from "react";
import { playBlackFlashSound, playDomainExpansionSound, playClickSound, playHoverSound } from "../utils/cyberSound";
import { Sparkles, Shield, Zap, Flame, Compass, ChevronRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SorcererArchitect {
  id: string;
  name: string;
  japanese: string;
  title: string;
  grade: string;
  quote: string;
  image: string;
  accent: string;
  glow: string;
  technique: string;
  civilApplication: string;
  stats: {
    infinityOutput: number;
    structuralPrecision: number;
    barrierEndurance: number;
  };
}

const SORCERER_ARCHITECTS: SorcererArchitect[] = [
  {
    id: "gojo",
    name: "Satoru Gojo",
    japanese: "THE HONORED ARCHITECT",
    title: "Master of Spatial Infinity",
    grade: "SPECIAL GRADE SORCERER",
    quote: "Throughout heaven and earth, I alone draft the limitless blueprints.",
    image: "/assets/jjk/jjk-gojo-realistic.jpg",
    accent: "#dfb8af",
    glow: "rgba(200,59,53, 0.5)",
    technique: "Limitless Void & Spatial Infinity Gantry",
    civilApplication: "Parametric 3D Concrete Printing, Infinite Space Optimization & Zero-Defect Cantilevers.",
    stats: {
      infinityOutput: 100,
      structuralPrecision: 100,
      barrierEndurance: 98
    }
  },
  {
    id: "sukuna",
    name: "Ryomen Sukuna",
    japanese: "KING OF CURSES",
    title: "Master of Demolition & Foundations",
    grade: "SPECIAL GRADE CURSE",
    quote: "Know your structural limits before you dare build in my territory.",
    image: "/assets/jjk/jjk-sukuna-realistic.jpg",
    accent: "#c83b35",
    glow: "rgba(200,59,53, 0.5)",
    technique: "Malevolent Shrine · Cleave & Dismantle",
    civilApplication: "Finite Element Shear Analysis, Rapid Structural Cleaving, Seismic Monolithic Rafts.",
    stats: {
      infinityOutput: 99,
      structuralPrecision: 97,
      barrierEndurance: 95
    }
  },
  {
    id: "itadori_squad",
    name: "Yuji, Megumi & Nobara",
    japanese: "SQUAD 1 · BLACK FLASH",
    title: "Black Flash Construction Brigade",
    grade: "FIRST GRADE SQUAD",
    quote: "Hit the structural critical limit at 0.000001 seconds—Black Flash!",
    image: "/assets/jjk/jjk-sorcerer-team.jpg",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.5)",
    technique: "Black Flash Impact & Ten Shadows Prefab",
    civilApplication: "Eco-Concrete High-Impact Curing, Modular Shadow Fabrication, Steel Rebar Resonance.",
    stats: {
      infinityOutput: 94,
      structuralPrecision: 92,
      barrierEndurance: 96
    }
  },
  {
    id: "barrier_shibuya",
    name: "Tokyo Jujutsu High Architects",
    japanese: "BARRIER ENGINEERS",
    title: "Master Curtain Barrier Engineers",
    grade: "BARRIER CORPS SPECIAL GRADE",
    quote: "Emerge from darkness, blacker than darkness. Purify that which is impure.",
    image: "/assets/jjk/shibuya-blueprint-barrier.jpg",
    accent: "#b39bb3",
    glow: "rgba(179,155,179, 0.5)",
    technique: "Metropolitan Curtain Barrier Enclosure",
    civilApplication: "Smart City Disaster Enclosures, Resilient Seismic Shrouds, Carbon-Negative Urban Shells.",
    stats: {
      infinityOutput: 91,
      structuralPrecision: 95,
      barrierEndurance: 100
    }
  }
];

export const JJKCharacterShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("gojo");
  const current = SORCERER_ARCHITECTS.find(s => s.id === selectedId) || SORCERER_ARCHITECTS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (id === "gojo") playDomainExpansionSound();
    else if (id === "sukuna" || id === "itadori_squad") playBlackFlashSound();
    else playClickSound();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 px-4">
      {/* Background Subtle Silhouette */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-5 font-mono text-[90px] sm:text-[140px] font-black text-white whitespace-nowrap overflow-hidden">
        SORCERY
      </div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#201819]/90 border border-stone-500/40 text-stone-300 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SPECIAL GRADE CIVIL MENTORS · SORCERER DOSSIER</span>
        </div>
        <h3 className="font-barlow text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          SORCERER ARCHITECTS <span className="text-[#dfb8af]">& TECHNIQUES</span>
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#bcaea2] max-w-xl mx-auto mt-1">
          Inspired by Jujutsu High sorcery: meet the legendary domain masters guiding the INNO360 engineering tracks.
        </p>
      </div>

      {/* Character Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 relative z-10">
        {SORCERER_ARCHITECTS.map((sorcerer) => {
          const isSelected = sorcerer.id === selectedId;
          return (
            <button
              key={sorcerer.id}
              onClick={() => handleSelect(sorcerer.id)}
              onMouseEnter={() => playHoverSound()}
              className={`px-4 py-2 rounded-sm font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 border ${
                isSelected
                  ? "bg-[#201819] text-white shadow-lg scale-105"
                  : "bg-[#141011]/80 text-[#bcaea2] hover:text-white border-[#463236] hover:border-stone-500/50"
              }`}
              style={{
                borderColor: isSelected ? sorcerer.accent : undefined,
                boxShadow: isSelected ? `0 0 20px ${sorcerer.glow}` : undefined
              }}
            >
              <span className="font-serif text-sm">{sorcerer.japanese}</span>
              <span>{sorcerer.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 rounded-sm overflow-hidden border bg-[#141011]/90 backdrop-blur-xl shadow-2xl grid grid-cols-1 md:grid-cols-12"
          style={{ borderColor: current.accent }}
        >
          {/* Left Character 4K Visual */}
          <div className="md:col-span-5 relative min-h-[340px] sm:min-h-[420px] overflow-hidden group">
            <img
loading="lazy" decoding="async"               src={current.image}
              alt={current.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Anime Glow Gradient Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, #141011 0%, transparent 60%), linear-gradient(to right, transparent 70%, #141011 100%)`
              }}
            />
            {/* Floating Sorcerer Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 font-mono text-white font-bold text-xs flex items-center space-x-1.5">
              <span style={{ color: current.accent }}>●</span>
              <span>{current.grade}</span>
            </div>
            {/* Floating Character Name */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-mono text-xs font-bold text-stone-300 tracking-wider">
                {current.japanese}
              </div>
              <div className="font-barlow text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg">
                {current.name}
              </div>
            </div>
          </div>

          {/* Right Technique & Civil Engineering Integration Specs */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Tag and Title */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest text-black"
                  style={{ backgroundColor: current.accent }}
                >
                  {current.title}
                </span>
                <span className="font-mono text-xs text-[#bcaea2]">
                  CAD · JJK RESIDUALS ACTIVE
                </span>
              </div>

              {/* Quote */}
              <blockquote className="font-serif italic text-base sm:text-lg text-white border-l-2 pl-4 py-1 mb-5" style={{ borderColor: current.accent }}>
                "{current.quote}"
              </blockquote>

              {/* Technique Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="p-3.5 rounded-sm bg-[#201819]/70 border border-[#513b3b]">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase mb-1" style={{ color: current.accent }}>
                    <Zap className="w-4 h-4" />
                    <span>Inherent Cursed Technique</span>
                  </div>
                  <div className="font-sans text-sm font-semibold text-white">
                    {current.technique}
                  </div>
                </div>

                <div className="p-3.5 rounded-sm bg-[#201819]/70 border border-[#513b3b]">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase mb-1 text-[#d4bd88]">
                    <Compass className="w-4 h-4" />
                    <span>Civil Engineering Application in INNO360</span>
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#d8c9bb]">
                    {current.civilApplication}
                  </div>
                </div>
              </div>

              {/* Power / Precision Stats Meters */}
              <div className="space-y-2.5 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#bcaea2] mb-1">
                    <span>SPATIAL / INFINITY CALCULATION</span>
                    <span className="text-white font-bold">{current.stats.infinityOutput}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#201819] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.stats.infinityOutput}%`,
                        backgroundColor: current.accent,
                        boxShadow: `0 0 10px ${current.accent}`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-[#bcaea2] mb-1">
                    <span>STRUCTURAL PRECISION & SHEAR TOLERANCE</span>
                    <span className="text-white font-bold">{current.stats.structuralPrecision}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#201819] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.stats.structuralPrecision}%`,
                        backgroundColor: "#d4bd88",
                        boxShadow: `0 0 10px #d4bd88`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-[#bcaea2] mb-1">
                    <span>BARRIER ENDURANCE & SEISMIC SHIELD</span>
                    <span className="text-white font-bold">{current.stats.barrierEndurance}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#201819] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.stats.barrierEndurance}%`,
                        backgroundColor: "#e49b8b",
                        boxShadow: `0 0 10px #e49b8b`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-4 border-t border-[#463236] flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#bcaea2]">
                Track Relevance: <strong>EcoThon & CADathon 2026</strong>
              </span>
              <button
                type="button"
                onClick={() => handleSelect(current.id)}
                className="px-4 py-2 rounded-sm font-mono text-xs font-bold text-white transition-all flex items-center space-x-1.5 cursor-pointer shadow-md hover:brightness-125"
                style={{ backgroundColor: current.accent, color: "#000" }}
              >
                <span>CAST TECHNIQUE RESONANCE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
