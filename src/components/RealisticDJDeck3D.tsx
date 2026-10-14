import React, { useState, useRef, useEffect } from "react";
import { playWarpSound, playBassDropSound, playAirhornSound, playLaserSound, playClickSound } from "../utils/cyberSound";
import { Disc, Music, Flame, Zap, Radio } from "lucide-react";

export const RealisticDJDeck3D: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scratchAngle, setScratchAngle] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [activeFx, setActiveFx] = useState<string | null>(null);
  const lastMouseX = useRef(0);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (isPlaying && !isScratching) {
        setScratchAngle(prev => (prev + 1.2) % 360);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isScratching]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    lastMouseX.current = e.clientX;
    playWarpSound();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    const delta = e.clientX - lastMouseX.current;
    if (Math.abs(delta) > 2) {
      setScratchAngle(prev => prev + delta * 2.2);
      playWarpSound();
      lastMouseX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const triggerFx = (type: "bass" | "airhorn" | "laser") => {
    setActiveFx(type);
    if (type === "bass") playBassDropSound();
    else if (type === "airhorn") playAirhornSound();
    else if (type === "laser") playLaserSound();
    setTimeout(() => setActiveFx(null), 1000);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative bg-gradient-to-br from-[#180d04] via-[#120e0f] to-[#12071a] border-2 border-[#ffd700]/50 rounded-sm p-5 sm:p-8 shadow-[0_0_50px_rgba(255,215,0,0.25)] select-none overflow-hidden hud-corner-box"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ffd700]/25 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-sm bg-[#241407] border border-[#ffd700] flex items-center justify-center text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="block font-cinzel text-[10px] text-[#dfb8af] font-bold tracking-widest uppercase">
              MIDNIGHT DJ TAVERN // LIVE DECK
            </span>
            <h3 className="font-pirate text-2xl sm:text-3xl text-white tracking-wide">
              CARIBBEAN FLEET <span className="text-[#ffd700]">TURNTABLE</span>
            </h3>
          </div>
        </div>

        {/* BPM & Status */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#0d0b0b] border border-[#ffd700]/40 px-3 py-1 rounded-sm font-mono text-xs text-[#ffd700] flex items-center space-x-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>128.0 BPM</span>
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-1 rounded-sm bg-[#ffd700]/15 border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {isPlaying ? "PAUSE DECK" : "START DECK"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Scratchable Turntable Vinyl */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#111111] border-4 border-[#333333] shadow-[0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-grab active:cursor-grabbing group hover:border-[#ffd700] transition-colors"
          >
            {/* Vinyl grooves rings */}
            <div className="absolute inset-2 rounded-full border border-neutral-700/50 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-neutral-800/80 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-neutral-700/40 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-neutral-800 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-neutral-700/30 pointer-events-none" />

            {/* Rotating Center Label with Jack Crest */}
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#b8860b] border-2 border-white/60 p-1 flex items-center justify-center shadow-lg pointer-events-none"
              style={{ transform: `rotate(${scratchAngle}deg)` }}
            >
              <img
                src="/codienych-logo-round.png"
                alt="Vinyl Label"
                className="w-full h-full object-contain rounded-full"
              />
              <div className="absolute w-3.5 h-3.5 rounded-full bg-black border border-white" />
            </div>

            {/* Tonearm */}
            <div
              className="absolute -right-2 -top-2 w-20 h-28 pointer-events-none transition-transform duration-300"
              style={{ transform: isPlaying ? "rotate(16deg)" : "rotate(0deg)" }}
            >
              <div className="w-1.5 h-20 bg-neutral-400 rounded origin-top shadow-md ml-auto mr-4" />
              <div className="w-4 h-4 rounded-full bg-amber-500 ml-auto mr-2.5 -mt-20 border border-white" />
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-2 text-xs font-cinzel text-stone-300 font-bold uppercase tracking-wider">
            <Disc className="w-3.5 h-3.5 animate-spin" />
            <span>CLICK & DRAG TO SCRATCH VINYL</span>
          </div>
        </div>

        {/* Right: Sound FX Buttons & Audio Visualizer */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-[#0d0b0b] border border-[#ffd700]/30 rounded-sm p-4">
            <span className="block font-cinzel text-[10px] text-[#ffd700] font-bold tracking-widest uppercase mb-2">
              BASS & AIRHORN SOUNDBOARD
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => triggerFx("bass")}
                className={`py-3 px-2 rounded-sm border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  activeFx === "bass"
                    ? "bg-[#ff4444] border-white text-white scale-105 shadow-[0_0_20px_#ff4444]"
                    : "bg-[#1f0d06] border-[#ffd700]/40 text-[#ffd700] hover:bg-[#2c1409]"
                }`}
              >
                <Flame className="w-4 h-4 text-[#ff4444]" />
                <span className="font-cinzel text-[10px] font-bold uppercase">808 BASS</span>
              </button>

              <button
                type="button"
                onClick={() => triggerFx("airhorn")}
                className={`py-3 px-2 rounded-sm border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  activeFx === "airhorn"
                    ? "bg-[#ffd700] border-white text-black scale-105 shadow-[0_0_20px_#ffd700]"
                    : "bg-[#1f0d06] border-[#ffd700]/40 text-[#ffd700] hover:bg-[#2c1409]"
                }`}
              >
                <Zap className="w-4 h-4 text-[#ffd700]" />
                <span className="font-cinzel text-[10px] font-bold uppercase">AIRHORN</span>
              </button>

              <button
                type="button"
                onClick={() => triggerFx("laser")}
                className={`py-3 px-2 rounded-sm border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  activeFx === "laser"
                    ? "bg-[#dfb8af] border-white text-black scale-105 shadow-[0_0_20px_#dfb8af]"
                    : "bg-[#1f0d06] border-[#ffd700]/40 text-[#ffd700] hover:bg-[#2c1409]"
                }`}
              >
                <Music className="w-4 h-4 text-[#dfb8af]" />
                <span className="font-cinzel text-[10px] font-bold uppercase">LASER</span>
              </button>
            </div>
          </div>

          {/* Equalizer Visualizer */}
          <div className="bg-[#0d0b0b] border border-[#ffd700]/30 rounded-sm p-4 flex items-center justify-between">
            <span className="font-cinzel text-[10px] text-[#cfb07a] font-bold uppercase tracking-wider">
              FLEET FREQUENCY BARS
            </span>
            <div className="flex items-end space-x-1.5 h-8">
              {[12, 24, 18, 30, 14, 28, 20, 32, 16, 26].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t bg-gradient-to-t from-[#ffd700] to-[#dfb8af] transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.floor(Math.sin(Date.now() / 200 + i) * 10 + h)}px` : "4px"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
