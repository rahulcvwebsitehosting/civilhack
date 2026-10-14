import React, { useState } from "react";
import confetti from "canvas-confetti";
import { RealisticTreasureChest3DCanvas } from "./RealisticTreasureChest3DCanvas";
import { playClickSound, playSuccessSound, playCannonSound } from "../utils/cyberSound";
import { Trophy, Sparkles, Award, Lock, Unlock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TreasureBoxProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const TreasureBox: React.FC<TreasureBoxProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    playClickSound();

    setTimeout(() => {
      setIsOpening(false);
      if (onOpenChange) {
        onOpenChange(true);
      } else {
        setInternalIsOpen(true);
      }
      playSuccessSound();
      playCannonSound();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ffd700", "#dfb8af", "#ffffff", "#e5c158"]
        });
      } catch {}
    }, 600);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClickSound();
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 text-center px-4">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-b from-[#241a0e] via-[#201819] to-[#0b0909] border-2 border-[#ffd700] rounded-sm p-6 sm:p-10 shadow-[0_0_70px_rgba(229,193,88,0.6)] text-left hud-corner-box overflow-hidden"
          >
            {/* 3D Chest Header Canvas */}
            <div className="relative mx-auto w-full max-w-xs -mt-4 mb-2">
              <RealisticTreasureChest3DCanvas isOpen={true} onClick={handleClose} />
            </div>

            <div className="flex items-center justify-between border-b border-[#e5c158]/40 pb-4 mb-6">
              <div className="inline-flex items-center space-x-2 bg-[#ffd700]/15 border border-[#ffd700] px-4 py-1.5 rounded-full text-xs font-cinzel text-[#ffd700] uppercase tracking-widest shadow-[0_0_15px_rgba(229,193,88,0.4)] font-bold">
                <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
                <span>PIRATE VAULT UNSEALED • BOUNTIES REVEALED</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center space-x-1.5 font-cinzel text-xs text-gray-300 hover:text-[#ffd700] transition-colors bg-[#100c0d] border border-[#3b2b19] hover:border-[#ffd700] px-3.5 py-1.5 rounded-sm active:scale-95 shadow-md cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Re-lock Chest</span>
              </button>
            </div>

            {/* Grand Bounty Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-gradient-to-tr from-[#ffd700] to-amber-500 rounded-sm flex items-center justify-center shadow-[0_0_35px_#ffd700] text-black">
                <Trophy className="w-9 h-9 sm:w-11 sm:h-11 animate-bounce" />
              </div>
              <h3 className="font-pirate text-3xl sm:text-5xl text-white tracking-wide">
                CASH PRIZE <span className="text-[#ffd700] pirate-gold-title">UPTO ₹50,000+</span>
              </h3>
              <p className="font-cinzel text-xs sm:text-sm text-[#e5c158] uppercase tracking-widest mt-2 font-bold flex items-center justify-center flex-wrap gap-1.5">
                <span>+ EXCLUSIVE FREE INTERNSHIP OPPORTUNITIES BY</span>
                <span className="text-[#dfb8af] font-extrabold tracking-wider">amasQIS.ai</span>
                <span>FOR TOP CREWS!</span>
              </p>
            </motion.div>

            {/* amasQIS.ai Official Jury Partner Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-r from-[#ffd700]/20 via-[#181614] to-[#dfb8af]/25 border-2 border-[#ffd700] rounded-sm p-5 sm:p-6 shadow-[0_0_35px_rgba(200,59,53,0.25)] relative overflow-hidden mb-6"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-[#100c0d] border-2 border-[#dfb8af]/60 hover:border-[#dfb8af] p-2 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(200,59,53,0.35)] transition-all">
                    <img
                      src="/amasqis-icon.png"
                      alt="amasQIS.ai"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(200,59,53,0.5)]"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-cinzel text-[10px] sm:text-xs text-[#ffd700] font-bold uppercase tracking-wider">
                        👑 EXCLUSIVE PIRATE VAULT PERK
                      </span>
                      <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                      <span className="bg-[#dfb8af]/15 border border-[#dfb8af]/40 text-[#dfb8af] text-[10px] font-cinzel font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        OFFERED BY amasQIS.ai
                      </span>
                    </div>
                    <h4 className="font-pirate text-2xl sm:text-3xl text-white">
                      FREE INTERNSHIP <span className="text-[#ffd700]">OPPORTUNITY</span>
                    </h4>
                    <p className="font-cinzel text-xs text-gray-200 mt-1 max-w-xl">
                      Winning pirate crews & top performers receive direct Free Internship offers from{" "}
                      <span className="text-[#dfb8af] font-bold">amasQIS.ai</span> (Official Jury Partner) for real-world hands-on project experience!
                    </p>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 flex-shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[#ffd700]/20">
                  <div className="bg-[#100c0d]/95 border border-[#dfb8af]/50 hover:border-[#dfb8af] px-3.5 py-2 rounded-sm flex items-center space-x-2.5 shadow-[0_0_25px_rgba(200,59,53,0.25)] transition-all">
                    <div className="text-right">
                      <span className="block font-cinzel text-[9px] text-[#dfb8af] font-bold uppercase tracking-widest leading-none">
                        JURY PARTNER
                      </span>
                      <span className="block font-cinzel text-[10px] text-gray-300 tracking-wider">
                        amasQIS.ai
                      </span>
                    </div>
                    <img
                      src="/amasqis-logo.png"
                      alt="amasQIS.ai Logo"
                      className="h-7 sm:h-8 w-auto object-contain rounded"
                    />
                  </div>

                  <div className="bg-[#100c0d] border border-[#ffd700]/50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-cinzel text-[11px] text-[#ffd700]">
                    <Award className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>Real-World Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="text-center font-cinzel text-xs text-gray-300">
              Prize pool of Upto ₹50,000+ with individual 1st, 2nd & 3rd prize breakdowns will be proclaimed during the Grand Opening Ceremony!
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onClick={handleOpen}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            className="relative group cursor-pointer"
          >
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500">
              <RealisticTreasureChest3DCanvas isOpen={false} onClick={handleOpen} />
            </div>

            <p className="relative z-10 font-cinzel text-xs sm:text-sm text-[#cfb07a] mb-5 uppercase tracking-widest font-semibold mt-2">
              TAP THE 3D CHEST TO UNSEAL GRAND CASH PRIZES & FREE INTERNSHIPS
            </p>

            <button
              type="button"
              className="relative z-10 px-8 py-3.5 sm:px-10 sm:py-4 rounded-sm font-pirate text-xl sm:text-2xl text-black bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#b8860b] hover:from-[#fff2a3] hover:to-[#ffd700] transition-all duration-300 shadow-[0_0_25px_#ffd700] hover:shadow-[0_0_45px_#ffd700] uppercase tracking-wider active:scale-95 flex items-center space-x-2 mx-auto font-bold cursor-pointer"
            >
              <Unlock className="w-5 h-5" />
              <span>{isOpening ? "UNLOCKING PIRATE VAULT..." : "TAP TO UNLOCK 3D CHEST"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
