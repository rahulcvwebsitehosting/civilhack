import { RegistrationNotice } from "../components/RegistrationNotice";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CIVIL_EVENT_CONFIG, CIVIL_THEMES } from "../config/constants";
import { Navbar } from "../components/Navbar";
import { InteractiveCursor } from "../components/InteractiveCursor";
import { CinematicBackground } from "../components/CinematicBackground";
import { playClickSound, playSuccessSound } from "../utils/cyberSound";
import {
  Users,
  CheckCircle2,
  Copy,
  ExternalLink,
  CreditCard,
  Building2,
  Leaf,
  FileCheck,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCount = searchParams.get("crew") === "3" ? 3 : 4;
  const [memberCount, setMemberCount] = useState<number>(initialCount);
  const [selectedTheme, setSelectedTheme] = useState<"ecothon" | "cadathon">("cadathon");
  const [copiedAccount, setCopiedAccount] = useState(false);

  const totalFee = memberCount * CIVIL_EVENT_CONFIG.REGISTRATION_FEE_PER_MEMBER;

  const handleCopyAccount = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(CIVIL_EVENT_CONFIG.BANK_ACCOUNT_NUMBER);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } catch {
      setCopiedAccount(false);
    }
  };

  const handleLaunchGoogleForm = () => {
    playSuccessSound();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.open(CIVIL_EVENT_CONFIG.GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-screen bg-[#141011] text-[#f2e9da] selection:bg-[#c83b35] selection:text-white font-sans overflow-x-hidden pt-32 pb-16">
      <InteractiveCursor />
      <CinematicBackground />
      <Navbar />

      <main id="main-content" className="relative z-10 max-w-4xl mx-auto px-4">
        <RegistrationNotice />
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
            // INNO360 · 2026 OFFICIAL REGISTRATION PORTAL
          </div>
          <h1 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide mb-2">
            TEAM <span className="text-[#dfb8af]">REGISTRATION</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#d8c9bb] max-w-xl mx-auto">
            15th October 2026 · Kailaimani A. Munusamy Mudaliyar Arangam · ESEC Campus
          </p>
        </div>

        {/* Instructions Box */}
        <div className="bg-[#201819]/90 border border-[#513b3b] rounded-sm p-6 sm:p-8 mb-8 shadow-xl">
          <h2 className="font-barlow text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c83b35]" />
            <span>REGISTRATION GUIDELINES & STEP-BY-STEP PROCESS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#141011] border border-[#463236] p-4 rounded-sm">
              <span className="font-mono text-xs text-[#eb9287] font-bold block mb-1">
                STEP 1: TEAM SIZE
              </span>
              <p className="text-xs text-[#d8c9bb]">
                Form a team of <strong>3 or 4 students</strong>. EcoThon is open to all streams; CADathon is exclusively for Civil Engineering students.
              </p>
            </div>

            <div className="bg-[#141011] border border-[#463236] p-4 rounded-sm">
              <span className="font-mono text-xs text-[#dfb8af] font-bold block mb-1">
                STEP 2: PAYMENT
              </span>
              <p className="text-xs text-[#d8c9bb]">
                Pay once for the entire team (<strong>₹750 for 3</strong> or <strong>₹1,000 for 4</strong>). Keep the transaction screenshot ready.
              </p>
            </div>

            <div className="bg-[#141011] border border-[#463236] p-4 rounded-sm">
              <span className="font-mono text-xs text-[#d4bd88] font-bold block mb-1">
                STEP 3: GOOGLE FORM
              </span>
              <p className="text-xs text-[#d8c9bb]">
                Submit one registration per team via the official Google Form with payment proof. Google sign-in required.
              </p>
            </div>
          </div>

          {/* Theme & Complement Selector */}
          <div className="border-t border-[#463236] pt-6 space-y-6">
            <div>
              <label className="block font-mono text-xs text-[#bcaea2] uppercase tracking-wider mb-2">
                CHOOSE PARTICIPATION THEME
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTheme("ecothon")}
                  aria-pressed={selectedTheme === "ecothon"}
                  className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                    selectedTheme === "ecothon"
                      ? "bg-[#332326] border-[#d4bd88] shadow-[0_0_15px_rgba(212,189,136,0.3)]"
                      : "bg-[#141011] border-[#513b3b] hover:border-[#dfb8af]"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Leaf className="w-4 h-4 text-[#d4bd88]" />
                    <span className="font-mono text-xs text-[#d4bd88] font-bold">THEME 1</span>
                  </div>
                  <strong className="font-barlow text-2xl text-white block">EcoThon</strong>
                  <span className="text-xs text-[#bcaea2]">
                    Open to All Streams (12th+ / Arts / Diploma / Engg)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTheme("cadathon")}
                  aria-pressed={selectedTheme === "cadathon"}
                  className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                    selectedTheme === "cadathon"
                      ? "bg-[#332326] border-[#dfb8af] shadow-[0_0_15px_rgba(223,184,175,0.3)]"
                      : "bg-[#141011] border-[#513b3b] hover:border-[#dfb8af]"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="w-4 h-4 text-[#dfb8af]" />
                    <span className="font-mono text-xs text-[#dfb8af] font-bold">THEME 2</span>
                  </div>
                  <strong className="font-barlow text-2xl text-white block">CADathon</strong>
                  <span className="text-xs text-[#bcaea2]">
                    Exclusively for Civil Engineering Students
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#bcaea2] uppercase tracking-wider mb-2">
                CHOOSE TEAM COMPLEMENT
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[3, 4].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setMemberCount(count)}
                    aria-pressed={memberCount === count}
                    className={`p-4 rounded-sm border-2 flex flex-col sm:flex-row gap-2 items-center justify-between transition-all cursor-pointer ${
                      memberCount === count
                        ? "bg-[#2b1e20] border-[#c83b35] text-white shadow-md"
                        : "bg-[#141011] border-[#513b3b] text-[#bcaea2] hover:border-[#dfb8af]"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 shrink-0 text-[#eb9287]" />
                      <span className="font-barlow text-lg sm:text-2xl font-black whitespace-nowrap">{count} STUDENTS</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#dfb8af]">
                      ₹{(count * 250).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Card Box */}
          <div className="mt-8 bg-[#141011] border border-[#c83b35] rounded-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#463236] pb-4 mb-4">
              <div>
                <span className="font-mono text-xs text-[#bcaea2] uppercase block">
                  COMBINED TEAM TRIBUTE
                </span>
                <div className="font-barlow text-4xl sm:text-5xl font-black text-white mt-1">
                  ₹{totalFee.toLocaleString()}
                </div>
                <span className="font-mono text-xs text-[#dfb8af]">
                  (₹250 per student × {memberCount} members)
                </span>
              </div>

              <div className="bg-[#201819] border border-[#513b3b] p-3 rounded-sm space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#bcaea2]">Account no.:</span>
                  <strong className="text-white">{CIVIL_EVENT_CONFIG.BANK_ACCOUNT_NUMBER}</strong>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    aria-label="Copy account number"
                    className="min-w-11 min-h-11 flex items-center justify-center rounded bg-[#141011] text-[#dfb8af] hover:text-white cursor-pointer"
                    title="Copy account number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedAccount && (
                  <span className="text-[10px] text-[#d4bd88] block">✓ Account number copied!</span>
                )}
                <div className="text-[11px] text-[#bcaea2]">
                  Account: {CIVIL_EVENT_CONFIG.BANK_ACCOUNT_NAME}
                  <div>{CIVIL_EVENT_CONFIG.BANK_NAME}</div>
                  <div>IFSC: {CIVIL_EVENT_CONFIG.BANK_IFSC}</div>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-[#d8c9bb] mb-6">
              Use the payment instructions in the official Google Form and pay once for all {memberCount} team members. Keep the transaction ID and payment proof ready. Contact a coordinator if you need payment assistance.
            </p>

            {/* Launch Form Button */}
            <button
              type="button"
              onClick={handleLaunchGoogleForm}
              className="w-full py-4 px-6 rounded-sm font-mono font-bold text-sm uppercase tracking-wider text-white bg-[#c83b35] hover:bg-[#a62c28] shadow-[0_0_25px_rgba(200,59,53,0.6)] transition-all flex items-center justify-center space-x-2 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>PROCEED TO OFFICIAL GOOGLE FORM</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Back navigation */}
        <div className="text-center">
          <Link
            to="/portal"
            className="text-xs font-mono text-[#dfb8af] hover:underline"
          >
            ← Return to Event Portal
          </Link>
        </div>
      </main>
    </div>
  );
};
