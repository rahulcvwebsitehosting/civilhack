import React from "react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";
import { SpotlightCard } from "../components/SpotlightCard";
import { Calendar, Flag, Award, Clock, MapPin } from "lucide-react";

export const DatesSection: React.FC = () => {
  return (
    <section id="brief" className="relative py-16 sm:py-20 px-4 z-10 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
          // IMPORTANT DATES & FACT SHEET
        </div>
        <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          EVENT <span className="text-[#dfb8af]">DETAILS & TIMELINE</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#bcaea2] mt-1">
          15th October 2026 · Thursday · Kailaimani A. Munusamy Mudaliyar Arangam
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Registration Deadline */}
        <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between bg-[#201819]/90 border-[#513b3b] rounded-sm">
          <div>
            <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#c83b35] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(200,59,53,0.35)]">
              <Calendar className="w-7 h-7 text-[#eb9287]" />
            </div>
            <h3 className="font-mono text-xs text-[#bcaea2] uppercase tracking-widest mb-2 text-center">
              01 / REGISTRATION DEADLINE
            </h3>
            <div className="font-barlow text-3xl font-extrabold text-white mb-2 text-center">
              {CIVIL_EVENT_CONFIG.REGISTRATION_DEADLINE_DISPLAY}
            </div>
            <p className="font-sans text-xs text-[#d8c9bb] text-center leading-relaxed">
              Teams of 3 or 4 students must complete the Google Form with one combined team payment transaction proof.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#513b3b] text-center">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#c83b35]/15 border border-[#c83b35]/60 text-[#eb9287] font-mono text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#eb9287] animate-pulse" />
              <span>REGISTRATION OPEN</span>
            </span>
          </div>
        </SpotlightCard>

        {/* Card 2: Hackathon Day */}
        <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between bg-[#201819]/90 border-[#513b3b] rounded-sm">
          <div>
            <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#dfb8af] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(223,184,175,0.35)]">
              <Flag className="w-7 h-7 text-[#dfb8af]" />
            </div>
            <h3 className="font-mono text-xs text-[#bcaea2] uppercase tracking-widest mb-2 text-center">
              02 / EVENT DAY & KICKOFF
            </h3>
            <div className="font-barlow text-3xl font-extrabold text-white mb-2 text-center">
              15th October 2026 · 08:00 AM
            </div>
            <p className="font-sans text-xs text-[#d8c9bb] text-center leading-relaxed">
              Reporting, student check-in, inaugural ceremony, and on-the-spot confidential problem statement reveal.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#513b3b] text-center">
            <span className="text-xs font-mono text-[#dfb8af] uppercase tracking-wider font-semibold">
              12-Hour Build Sprint
            </span>
          </div>
        </SpotlightCard>

        {/* Card 3: Valediction & Awards */}
        <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between bg-[#201819]/90 border-[#513b3b] rounded-sm">
          <div>
            <div className="w-14 h-14 rounded-sm bg-[#141011] border border-[#d4bd88] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(212,189,136,0.35)]">
              <Award className="w-7 h-7 text-[#d4bd88]" />
            </div>
            <h3 className="font-mono text-xs text-[#bcaea2] uppercase tracking-widest mb-2 text-center">
              03 / JURY & VALEDICTORY
            </h3>
            <div className="font-barlow text-3xl font-extrabold text-white mb-2 text-center">
              15th October 2026 · 07:00 PM
            </div>
            <p className="font-sans text-xs text-[#d8c9bb] text-center leading-relaxed">
              Jury evaluations, live model demos, award ceremony, cash prize handouts, and physical certificates distribution.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#513b3b] text-center">
            <span className="text-xs font-mono text-[#d4bd88] uppercase tracking-wider font-semibold">
              Cash Prizes & Physical Certificates
            </span>
          </div>
        </SpotlightCard>
      </div>

      {/* 6-Fact Grid from civilhack.vercel.app */}
      <div className="bg-[#141011] border border-[#513b3b] rounded-sm p-6 sm:p-8">
        <div className="text-xs font-mono text-[#eb9287] uppercase tracking-wider mb-4">
          QUICK EVENT SUMMARY · 6 ESSENTIAL FACTS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">01 / DURATION</span>
            <strong className="font-barlow text-2xl text-white block mt-1">12 hours</strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">Non-stop build</p>
          </div>
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">02 / DATE</span>
            <strong className="font-barlow text-2xl text-white block mt-1">15 Oct 2026</strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">Thursday</p>
          </div>
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">03 / VENUE</span>
            <strong className="font-barlow text-xl text-white block mt-1 truncate" title="Kailaimani A. Munusamy Mudaliyar Arangam">
              ESEC Arangam
            </strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">Perundurai, Erode</p>
          </div>
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">04 / REGISTRATION</span>
            <strong className="font-barlow text-2xl text-white block mt-1">₹250 / student</strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">3–4 members</p>
          </div>
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">05 / HOSPITALITY</span>
            <strong className="font-barlow text-2xl text-white block mt-1">Lunch + Tea</strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">Included in fee</p>
          </div>
          <div className="border-t-2 border-[#513b3b] pt-3">
            <span className="text-[10px] font-mono text-[#bcaea2] block">06 / REWARDS</span>
            <strong className="font-barlow text-2xl text-[#d4bd88] block mt-1">Cash Prizes</strong>
            <p className="text-[11px] text-[#bcaea2] mt-1">Certificates for all</p>
          </div>
        </div>
      </div>
    </section>
  );
};
