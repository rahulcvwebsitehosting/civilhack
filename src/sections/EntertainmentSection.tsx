import React, { useEffect, useRef, useState } from "react";
import { SpotlightCard } from "../components/SpotlightCard";
import { playClickSound, playSuccessSound } from "../utils/cyberSound";
import { Printer, Compass, Award, Zap, Timer, CheckCircle, Crosshair } from "lucide-react";
import { TechniqueEnergy } from "../components/JujutsuMotion";

export const EntertainmentSection: React.FC = () => {
  // CAD Precision Reaction Challenge
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "too-early" | "success">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [readyTimestamp, setReadyTimestamp] = useState<number | null>(null);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerId.current) clearTimeout(timerId.current); }, []);

  const startTest = () => {
    playClickSound();
    setGameState("waiting");
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 2000) + 1500;
    const tid = setTimeout(() => {
      setGameState("ready");
      setReadyTimestamp(Date.now());
    }, delay);
    timerId.current = tid;
  };

  const handleClickTarget = () => {
    if (gameState === "waiting") {
      if (timerId.current) clearTimeout(timerId.current);
      setGameState("too-early");
      playClickSound();
    } else if (gameState === "ready" && readyTimestamp) {
      const time = Date.now() - readyTimestamp;
      setReactionTime(time);
      setGameState("success");
      playSuccessSound();
    }
  };

  const activities = [
    {
      icon: Printer,
      title: "Live 3D Concrete Printing Demo",
      tag: "CENTRE OF EXCELLENCE",
      desc: "Experience live robotic additive manufacturing as ESEC's gantry 3D printer extrudes mortar layer-by-layer directly from digital toolpaths.",
      badge: "In-House Lab Demo",
      color: "text-[#eb9287]"
    },
    {
      icon: Compass,
      title: "Parametric CAD & Structural Hub",
      tag: "HANDS-ON MENTORSHIP",
      desc: "Faculty mentors and industry structural consultants available for on-the-spot technical advice on load framing and CAD detailing.",
      badge: "Industry Mentors",
      color: "text-[#dfb8af]"
    },
    {
      icon: Award,
      title: "Spot Trivia & Speed Modeling",
      tag: "INSTANT REWARDS",
      desc: "Participate in spontaneous civil engineering and sustainability quizzes between review sessions to win instant spot rewards and goodies.",
      badge: "Spot Awards",
      color: "text-[#d4bd88]"
    }
  ];

  return (
    <section id="activities" className="relative py-16 sm:py-20 px-4 z-10 max-w-6xl mx-auto select-none">
      <div className="text-center mb-12">
        <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
          // EXPERIENTIAL LEARNING & LAB EXCELLENCE
        </div>
        <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          CAMPUS LABS & <span className="text-[#dfb8af]">INTERACTIVE SPOT CHALLENGES</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#bcaea2] max-w-xl mx-auto mt-2">
          Beyond the intense 12-hour build sprint, explore live 3D concrete printing robotics, mentor sessions, and precision speed tests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {activities.map((act, idx) => {
          const Icon = act.icon;
          return (
            <SpotlightCard
              key={idx}
              className="p-6 sm:p-7 bg-[#201819]/90 border-[#513b3b] rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-[#bcaea2] font-semibold uppercase tracking-wider">
                    {act.tag}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#141011] border border-[#513b3b] ${act.color}`}>
                    {act.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-sm bg-[#141011] border border-[#513b3b] flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${act.color}`} />
                </div>

                <h3 className="font-barlow text-2xl font-bold text-white mb-2">
                  {act.title}
                </h3>

                <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed mb-4">
                  {act.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#463236] flex items-center text-[10px] font-mono text-[#dfb8af]">
                <span>✓ Included for all participants</span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Interactive CAD Snap Reflex Game */}
      <div className={`black-flash-challenge bg-[#141011] border-2 border-[#513b3b] rounded-sm p-6 sm:p-8 max-w-2xl mx-auto text-center shadow-xl ${gameState === "success" ? "is-casting" : ""}`}>
        <img className="black-flash-art" src="/assets/jjk/yuji-black-flash-836.webp" alt="" width="836" height="470" loading="lazy" />
        <TechniqueEnergy technique="black-flash" />
        <div className="flex items-center justify-center space-x-2 font-mono text-xs text-[#dfb8af] uppercase tracking-wider mb-2">
          <Crosshair className="w-4 h-4 text-[#eb9287]" />
          <span>BLACK FLASH · REFLEX CHALLENGE</span>
        </div>
        <h3 className="font-barlow text-2xl sm:text-3xl font-extrabold text-white mb-2">
          AWAKEN YOUR BLACK FLASH
        </h3>
        <p className="font-sans text-xs text-[#bcaea2] max-w-md mx-auto mb-6">
          Timing is everything. Start the challenge, wait for the crimson signal, then strike when “CLICK NOW!” appears.
        </p>

        {gameState === "idle" && (
          <button
            type="button"
            onClick={startTest}
            className="px-6 py-3 rounded-sm bg-[#c83b35] hover:bg-[#a62c28] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            START BLACK FLASH TEST
          </button>
        )}

        {gameState === "waiting" && (
          <button type="button"
            onClick={handleClickTarget}
            className="w-full h-32 rounded-sm bg-[#463236] border border-[#513b3b] flex flex-col items-center justify-center cursor-pointer select-none"
          >
            <Timer className="w-8 h-8 text-[#dfb8af] animate-pulse mb-2" />
            <span className="font-mono text-xs text-white uppercase tracking-wider">
              GATHERING CURSED ENERGY… WAIT…
            </span>
          </button>
        )}

        {gameState === "ready" && (
          <button type="button"
            onClick={handleClickTarget}
            className="w-full h-32 rounded-sm bg-[#7f1d1d] border-2 border-[#eb9287] flex flex-col items-center justify-center cursor-pointer select-none"
          >
            <Zap className="w-10 h-10 text-[#d4bd88] mb-1" />
            <span className="font-barlow text-3xl font-black text-white uppercase">
              CLICK NOW!
            </span>
          </button>
        )}

        {gameState === "too-early" && (
          <div className="space-y-3">
            <div className="p-4 rounded-sm bg-red-950/60 border border-red-500/50 text-red-300 font-mono text-xs">
              Too early! You clicked before the signal.
            </div>
            <button
              type="button"
              onClick={startTest}
              className="px-5 py-2.5 rounded-lg bg-[#201819] border border-[#513b3b] text-white font-mono text-xs hover:border-[#dfb8af] cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {gameState === "success" && (
          <div className="space-y-3">
            <div className="p-4 rounded-sm bg-[#201819] border border-[#d4bd88] text-white">
              <span className="font-mono text-xs text-[#d4bd88] block mb-1">
                CURSED ENERGY RELEASED!
              </span>
              <strong className="font-barlow text-4xl text-white block">
                {reactionTime} ms
              </strong>
              <span className="font-mono text-[11px] text-[#bcaea2]">
                {reactionTime && reactionTime < 240
                  ? "SPECIAL GRADE · BLACK FLASH!"
                  : reactionTime && reactionTime < 350
                  ? "GRADE ONE · SHARP INSTINCTS!"
                  : "KEEP REFINING YOUR TECHNIQUE!"}
              </span>
            </div>
            <button
              type="button"
              onClick={startTest}
              className="px-5 py-2.5 rounded-lg bg-[#c83b35] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#a62c28] cursor-pointer"
            >
              Test Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
