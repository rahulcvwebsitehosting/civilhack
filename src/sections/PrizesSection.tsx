import React from "react";
import { SpotlightCard } from "../components/SpotlightCard";
import { Trophy, Award, Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { playClickSound } from "../utils/cyberSound";

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="relative py-16 sm:py-20 px-4 z-10 max-w-6xl mx-auto select-none">
      <div className="text-center mb-12">
        <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
          // AWARDS & RECOGNITION
        </div>
        <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          ATTRACTIVE <span className="text-[#dfb8af]">CASH PRIZES</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#bcaea2] max-w-xl mx-auto mt-2">
          Rewarding outstanding structural engineering designs, sustainable ecological solutions, and innovative engineering prototypes.
        </p>
      </div>

      {/* Prize Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard
          spotlightColor="rgba(200,59,53, 0.2)"
          className="p-6 sm:p-8 bg-[#201819]/90 border-[#c83b35] text-center rounded-sm relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#c83b35] flex items-center justify-center mx-auto mb-4 text-[#eb9287] shadow-[0_0_20px_rgba(200,59,53,0.3)]">
            <Trophy className="w-7 h-7" />
          </div>
          <span className="font-mono text-xs text-[#eb9287] font-bold uppercase tracking-wider">
            1ST PLACE · CHAMPIONS
          </span>
          <h3 className="font-barlow text-3xl font-extrabold text-white mt-1 mb-2">
            GRAND PRIZE WINNERS
          </h3>
          <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed mb-4">
            Attractive Cash Prize, Winner Trophies, Champion Medals, and Special Commendation from the ESEC Civil Engineering Board.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-[#c83b35]/20 border border-[#c83b35]/50 text-[#eb9287] font-mono text-[10px] font-bold uppercase tracking-wider">
            CASH PRIZE + TROPHY
          </span>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(223,184,175, 0.2)"
          className="p-6 sm:p-8 bg-[#201819]/90 border-[#dfb8af] text-center rounded-sm relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#dfb8af] flex items-center justify-center mx-auto mb-4 text-[#dfb8af] shadow-[0_0_20px_rgba(223,184,175,0.3)]">
            <Award className="w-7 h-7" />
          </div>
          <span className="font-mono text-xs text-[#dfb8af] font-bold uppercase tracking-wider">
            2ND PLACE · RUNNER UP
          </span>
          <h3 className="font-barlow text-3xl font-extrabold text-white mt-1 mb-2">
            RUNNERS UP AWARD
          </h3>
          <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed mb-4">
            Cash Prize, Runner-Up Trophies, Medals of Excellence, and Department Certificates of Merit.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-[#dfb8af]/20 border border-[#dfb8af]/50 text-[#dfb8af] font-mono text-[10px] font-bold uppercase tracking-wider">
            CASH PRIZE + TROPHY
          </span>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(212,189,136, 0.2)"
          className="p-6 sm:p-8 bg-[#201819]/90 border-[#d4bd88] text-center rounded-sm relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#d4bd88] flex items-center justify-center mx-auto mb-4 text-[#d4bd88] shadow-[0_0_20px_rgba(212,189,136,0.3)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="font-mono text-xs text-[#d4bd88] font-bold uppercase tracking-wider">
            TRACK SPECIAL MENTIONS
          </span>
          <h3 className="font-barlow text-3xl font-extrabold text-white mt-1 mb-2">
            INNOVATION HONOURS
          </h3>
          <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed mb-4">
            Cash Rewards, Innovation Certificates, and Jury Citations for standout architectural creativity and sustainability engineering.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-[#d4bd88]/20 border border-[#d4bd88]/50 text-[#d4bd88] font-mono text-[10px] font-bold uppercase tracking-wider">
            SPECIAL RECOGNITION
          </span>
        </SpotlightCard>
      </div>

      {/* Participation Certificate Guarantee */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-[#141011] border border-[#513b3b] text-xs font-mono text-[#f2e9da] shadow-md">
          <CheckCircle2 className="w-4 h-4 text-[#d4bd88]" />
          <span>PHYSICAL CERTIFICATES WILL BE AWARDED TO ALL REGISTERED PARTICIPANTS</span>
        </div>
      </div>
    </section>
  );
};
