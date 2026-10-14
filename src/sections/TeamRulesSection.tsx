import React from "react";
import { TeamFeeCalculator } from "../components/TeamFeeCalculator";
import { Users, CheckCircle, ShieldCheck } from "lucide-react";

const TEAM_GUIDELINES = [
  "Teams must consist of 3 or 4 members, including the team lead.",
  "Submit one registration per team through the official Google Form.",
  "One single team payment covers all members: ₹750 for 3 members or ₹1,000 for 4 members.",
  "Attach the payment transaction ID and screenshot in the Google Form submission.",
  "EcoThon is open to all streams (12th+ / Arts / Science / Diploma / All Engineering branches).",
  "CADathon is open strictly to Civil Engineering students.",
  "All members must carry their College/Institute Student Identity Card on event day.",
  "At least 1 laptop with necessary design or simulation tools is mandatory per team."
];

export const TeamRulesSection: React.FC = () => {
  return (
    <section id="team-rules" className="relative z-10 max-w-6xl mx-auto px-4 py-8">
      {/* Team Guidelines Box */}
      <div className="bg-[#141011] border border-[#513b3b] rounded-sm p-6 sm:p-8 mb-8 shadow-md">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#dfb8af] uppercase tracking-wider mb-2">
          <Users className="w-4 h-4 text-[#dfb8af]" />
          <span>TEAM FORMATION & PAYMENT GUIDELINES</span>
        </div>
        <h3 className="font-barlow text-3xl font-extrabold text-white mb-6">
          HOW TO REGISTER YOUR TEAM
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {TEAM_GUIDELINES.map((guide, idx) => (
            <div
              key={idx}
              className="bg-[#201819]/60 border border-[#463236] p-4 rounded-sm flex items-start space-x-3"
            >
              <CheckCircle className="w-4 h-4 text-[#d4bd88] flex-shrink-0 mt-0.5" />
              <span className="font-sans text-xs text-[#f2e9da] leading-relaxed">
                {guide}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Fee Calculator */}
      <TeamFeeCalculator />
    </section>
  );
};
