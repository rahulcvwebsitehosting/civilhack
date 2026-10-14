import React, { useState } from "react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";
import { playClickSound } from "../utils/cyberSound";
import { Calculator, Users, CheckCircle2, ArrowRight, ExternalLink, CreditCard } from "lucide-react";

export const TeamFeeCalculator: React.FC = () => {
  const [memberCount, setMemberCount] = useState<number>(4);
  const [selectedTheme, setSelectedTheme] = useState<"ecothon" | "cadathon">("cadathon");

  const totalFee = memberCount * CIVIL_EVENT_CONFIG.REGISTRATION_FEE_PER_MEMBER;

  const handleSelectCount = (count: number) => {
    playClickSound();
    setMemberCount(count);
  };

  const handleSelectTheme = (theme: "ecothon" | "cadathon") => {
    playClickSound();
    setSelectedTheme(theme);
  };

  return (
    <div id="calculator" className="relative bg-[#201819]/90 border border-[#513b3b] rounded-sm p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] my-8 select-none cad-corner-box">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#513b3b] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-[11px] text-[#eb9287] uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-[#eb9287]" />
            <span>REGISTRATION FEE ESTIMATOR</span>
          </div>
          <h3 className="font-barlow font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
            TEAM REGISTRATION & FEE CALCULATOR
          </h3>
          <p className="text-xs font-mono text-[#bcaea2] mt-1">
            Submit 1 registration per team · Pay once for the whole team
          </p>
        </div>

        <div className="bg-[#141011] border border-[#dfb8af]/40 px-3.5 py-2 rounded-sm font-mono text-xs text-[#dfb8af]">
          FIXED RATE: <span className="font-bold text-white">₹{CIVIL_EVENT_CONFIG.REGISTRATION_FEE_PER_MEMBER}</span> / STUDENT
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Team & Theme Selector */}
        <div className="md:col-span-7 space-y-5">
          {/* Theme selector */}
          <div>
            <label className="block font-mono text-xs text-[#bcaea2] uppercase tracking-wider mb-2">
              STEP 1: SELECT HACKATHON THEME
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelectTheme("ecothon")}
                aria-pressed={selectedTheme === "ecothon"}
                className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                  selectedTheme === "ecothon"
                    ? "bg-[#332326] border-[#d4bd88] shadow-[0_0_15px_rgba(212,189,136,0.3)]"
                    : "bg-[#141011] border-[#513b3b] hover:border-[#dfb8af]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#d4bd88] block">THEME 1</span>
                <strong className="font-barlow text-xl text-white block">EcoThon</strong>
                <span className="text-[10px] text-[#bcaea2] block">Open to All Streams · 12th+</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTheme("cadathon")}
                aria-pressed={selectedTheme === "cadathon"}
                className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                  selectedTheme === "cadathon"
                    ? "bg-[#332326] border-[#dfb8af] shadow-[0_0_15px_rgba(223,184,175,0.3)]"
                    : "bg-[#141011] border-[#513b3b] hover:border-[#dfb8af]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#dfb8af] block">THEME 2</span>
                <strong className="font-barlow text-xl text-white block">CADathon</strong>
                <span className="text-[10px] text-[#bcaea2] block">Civil Engineering Only</span>
              </button>
            </div>
          </div>

          {/* Member selector */}
          <div>
            <label className="block font-mono text-xs text-[#bcaea2] uppercase tracking-wider mb-2">
              STEP 2: SELECT TEAM COMPLEMENT (3 OR 4 STUDENTS)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[3, 4].map(count => {
                const isSelected = memberCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleSelectCount(count)}
                    aria-pressed={isSelected}
                    className={`py-3 px-4 rounded-sm border-2 flex flex-col sm:flex-row gap-2 items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#2b1e20] border-[#c83b35] text-white shadow-[0_0_15px_rgba(200,59,53,0.4)]"
                        : "bg-[#141011] border-[#513b3b] text-[#bcaea2] hover:border-[#dfb8af]"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className={`w-5 h-5 ${isSelected ? "text-[#eb9287]" : "text-[#dfb8af]"}`} />
                      <span className="font-barlow text-lg sm:text-2xl font-black whitespace-nowrap">{count} MEMBERS</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#dfb8af]">
                      ₹{(count * 250).toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-1.5 pt-2 font-sans text-xs text-[#f2e9da]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4bd88] flex-shrink-0" />
              <span>Full Access to 12-Hour Non-Stop Multi-Department Hackathon</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4bd88] flex-shrink-0" />
              <span>Wholesome South Indian Lunch + Morning & Evening Refreshments Included</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4bd88] flex-shrink-0" />
              <span>Physical Certificates of Participation for All Team Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4bd88] flex-shrink-0" />
              <span>Eligibility for Attractive Cash Prizes & Department Accolades</span>
            </div>
          </div>
        </div>

        {/* Right: Total Fee & Register Action */}
        <div className="md:col-span-5 bg-[#141011] border-2 border-[#c83b35] rounded-sm p-6 text-center shadow-[0_0_30px_rgba(200,59,53,0.2)]">
          <span className="font-mono text-xs text-[#bcaea2] uppercase tracking-widest block mb-1">
            TOTAL TEAM PAYMENT
          </span>
          <div className="font-barlow text-5xl sm:text-6xl font-black text-white my-2">
            ₹{totalFee.toLocaleString()}
          </div>
          <p className="font-mono text-xs text-[#dfb8af] mb-4">
            (₹{CIVIL_EVENT_CONFIG.REGISTRATION_FEE_PER_MEMBER} × {memberCount} Students)
          </p>

          <div className="bg-[#201819] border border-[#513b3b] rounded-lg p-2.5 text-left text-[11px] font-mono text-[#bcaea2] mb-5 space-y-1">
            <div>• Make <strong>one single payment</strong> for entire team.</div>
            <div>• Save payment screenshot & transaction ID.</div>
            <div>• Upload proof in the official Google Form.</div>
          </div>

          <a
            href={CIVIL_EVENT_CONFIG.GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-sm font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#c83b35] hover:bg-[#a62c28] shadow-[0_0_20px_rgba(200,59,53,0.6)] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <span>REGISTER TEAM ON GOOGLE FORM</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
