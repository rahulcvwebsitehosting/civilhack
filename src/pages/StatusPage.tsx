import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CIVIL_EVENT_CONFIG } from "../config/constants";
import { Navbar } from "../components/Navbar";
import { InteractiveCursor } from "../components/InteractiveCursor";
import { CinematicBackground } from "../components/CinematicBackground";
import { playClickSound } from "../utils/cyberSound";
import {
  Search,
  Clock,
  AlertTriangle,
  ArrowLeft,
  ExternalLink
} from "lucide-react";

interface RegistrationRecord {
  regId: string;
  teamName: string;
  themeName: string;
  totalMembers: number;
  status: "CONFIRMED" | "SUBMITTED_ON_GOOGLE_FORM" | "PENDING_VERIFICATION";
  leadName: string;
}

export const StatusPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [regInput, setRegInput] = useState(searchParams.get("id") || "");
  const [record, setRecord] = useState<RegistrationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchRegistration = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (!cleanId) {
      setErrorMessage("Please enter a team name or email address.");
      return;
    }

    playClickSound();
    setErrorMessage("");
    setHasSearched(true);

    // The public website has no roster API. Never fabricate a confirmation.
    setRecord({
      regId: "COORDINATOR REVIEW REQUIRED",
      teamName: cleanId,
      themeName: "CADathon / EcoThon Track",
      totalMembers: 4,
      status: "PENDING_VERIFICATION",
      leadName: "Registered Team Lead"
    });
  };

  return (
    <div className="relative min-h-screen bg-[#141011] text-[#f2e9da] selection:bg-[#c83b35] selection:text-white font-sans overflow-x-hidden pt-32 pb-16">
      <InteractiveCursor />
      <CinematicBackground />
      <Navbar />

      <main id="main-content" className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
            // INNO360 VERIFICATION DISPATCH
          </div>
          <h1 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide mb-2">
            TEAM <span className="text-[#dfb8af]">STATUS CHECK</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#d8c9bb] max-w-lg mx-auto">
            View squad reporting instructions and event resources. Registration is handled through the official Google Form; a coordinator must confirm your submission and payment.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#201819]/90 border border-[#513b3b] rounded-sm p-6 sm:p-8 mb-8 shadow-xl">
          <form
            onSubmit={e => {
              e.preventDefault();
              searchRegistration(regInput);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#bcaea2] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                aria-label="Team name or lead email for your reporting reference"
                type="text"
                value={regInput}
                onChange={e => setRegInput(e.target.value)}
                placeholder="Enter Team Name or Lead Email..."
                className="w-full pl-11 pr-4 py-3.5 rounded-sm bg-[#141011] border border-[#513b3b] focus:border-[#dfb8af] text-sm font-mono text-white placeholder-[#bcaea2] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-sm bg-[#c83b35] hover:bg-[#a62c28] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-all whitespace-nowrap"
            >
              VIEW REPORTING GUIDE
            </button>
          </form>

          {errorMessage && (
            <p className="mt-3 text-xs font-mono text-red-400">{errorMessage}</p>
          )}
        </div>

        {/* Result Card */}
        {hasSearched && record && (
          <div className="bg-[#141011] border-2 border-[#d4bd88] rounded-sm p-6 sm:p-8 shadow-2xl mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#463236] pb-4 mb-4">
              <div>
                <span className="font-mono text-xs text-[#bcaea2] uppercase block">
                  REGISTRATION STATUS
                </span>
                <strong className="font-mono text-xl text-[#dfb8af]">
                  {record.regId}
                </strong>
              </div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#d4bd88]/20 border border-[#d4bd88] text-[#d4bd88] font-mono text-xs font-bold">
                <Clock className="w-4 h-4" />
                <span>NOT VERIFIED ONLINE</span>
              </span>
            </div>

            <div className="space-y-3 font-sans text-xs sm:text-sm text-[#f2e9da] mb-6">
              <div className="flex justify-between py-1 border-b border-[#463236]/50">
                <span className="text-[#bcaea2]">Team Identifier:</span>
                <strong>{record.teamName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#463236]/50">
                <span className="text-[#bcaea2]">Event Tracks:</span>
                <strong className="text-[#dfb8af]">{record.themeName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#463236]/50">
                <span className="text-[#bcaea2]">Event Date & Reporting:</span>
                <span>15th October 2026 · 08:00 AM IST</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#bcaea2]">Venue:</span>
                <span>Kailaimani A. Munusamy Mudaliyar Arangam, ESEC</span>
              </div>
            </div>

            <div className="p-4 rounded-sm bg-[#201819] border border-[#513b3b] text-xs font-mono text-[#bcaea2] mb-6 space-y-1">
              <div>This reporting guide does not confirm registration. Check your Google Form confirmation or contact an event coordinator.</div>
              <div>✓ Carry valid student identity card for all members.</div>
              <div>✓ Bring at least 1 laptop per team with CAD software pre-installed.</div>
              <div>✓ Lunch and refreshments will be served at the venue.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CIVIL_EVENT_CONFIG.GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-sm bg-[#c83b35] hover:bg-[#a62c28] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2"
              >
                <span>Google Form Submission</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={CIVIL_EVENT_CONFIG.BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-sm bg-[#201819] border border-[#513b3b] text-[#dfb8af] font-mono text-xs font-bold uppercase tracking-wider text-center"
              >
                Download Brochure
              </a>
            </div>
          </div>
        )}

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
