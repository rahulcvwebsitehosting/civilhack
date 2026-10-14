import React, { useState } from "react";
import { playClickSound } from "../utils/cyberSound";
import { Clock, MapPin, CheckCircle2, Award, Flag, Code2, Users, Layers } from "lucide-react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";

interface ScheduleStep {
  id: number;
  step: string;
  time: string;
  title: string;
  venue: string;
  tag: string;
  summary: string;
}

const CIVIL_SCHEDULE_STEPS: ScheduleStep[] = [
  {
    id: 1,
    step: "01",
    time: "08:00 AM – 09:00 AM",
    title: "REPORTING & REGISTRATION CHECK-IN",
    venue: "Auditorium Reception Foyer",
    tag: "VERIFICATION",
    summary: "Participant arrival, college ID verification, Google Form submission clearance, and kit handover."
  },
  {
    id: 2,
    step: "02",
    time: "09:00 AM – 09:30 AM",
    title: "INAUGURATION & PROBLEM STATEMENTS REVEAL",
    venue: "Kailaimani A. Munusamy Mudaliyar Arangam",
    tag: "KICKOFF",
    summary: "Inaugural address by college dignitaries, rules briefing, and release of confidential problem statements on the spot."
  },
  {
    id: 3,
    step: "03",
    time: "09:30 AM – 01:00 PM",
    title: "PHASE 1 BUILD & STRUCTURAL DRAFTING",
    venue: "Design & Drafting Bays",
    tag: "12-HR SPRINT",
    summary: "Teams start architectural floor planning, CAD drafting, algorithm coding, IoT wiring, and eco-solution modeling."
  },
  {
    id: 4,
    step: "04",
    time: "11:30 AM – 12:00 PM",
    title: "MORNING TEA & HIGH ENERGY SNACKS",
    venue: "Arangam Refreshment Counters",
    tag: "REFRESHMENTS",
    summary: "Complimentary tea and snacks served to recharge drafting teams mid-morning."
  },
  {
    id: 5,
    step: "05",
    time: "01:00 PM – 02:00 PM",
    title: "WORKING LUNCH & MID-WAY JURY REVIEW",
    venue: "Campus Main Dining Hall",
    tag: "EVALUATION 1",
    summary: "Wholesome South Indian lunch buffet followed by informal desk reviews by civil & tech mentors."
  },
  {
    id: 6,
    step: "06",
    time: "02:00 PM – 04:30 PM",
    title: "PHASE 2 BUILD & STRESS SIMULATION",
    venue: "Design & Drafting Bays",
    tag: "FINAL SPRINT",
    summary: "Structural load calculations, BIM model coordination, prototype assembly, and presentation slide preparation."
  },
  {
    id: 7,
    step: "07",
    time: "04:30 PM – 05:00 PM",
    title: "EVENING TEA & SNACKS",
    venue: "Arangam Refreshment Counters",
    tag: "REFRESHMENTS",
    summary: "Hot tea and savouries ahead of final model submission and jury pitches."
  },
  {
    id: 8,
    step: "08",
    time: "05:00 PM – 06:45 PM",
    title: "DESIGN FREEZE & FINAL JURY EVALUATION",
    venue: "Evaluation Stage & Display Bays",
    tag: "FINAL JURY",
    summary: "Teams present their 2D CAD drawings, 3D BIM models, structural calculations, and working prototypes to the expert jury."
  },
  {
    id: 9,
    step: "09",
    time: "07:00 PM – 08:00 PM",
    title: "VALEDICTORY & CASH PRIZE DISTRIBUTION",
    venue: "Main Auditorium Hall",
    tag: "VALEDICTORY",
    summary: "Announcement of EcoThon & CADathon champions, distribution of cash prize awards, and physical certificates."
  }
];

export const TimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="schedule" className="relative py-16 sm:py-20 px-4 z-10 max-w-6xl mx-auto select-none">
      <div className="text-center mb-12">
        <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
          // 12-HOUR HACKATHON SCHEDULE · 15TH OCTOBER 2026
        </div>
        <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          EVENT <span className="text-[#dfb8af]">SCHEDULE & SEQUENCE</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#bcaea2] max-w-xl mx-auto mt-2">
          A meticulously structured 12-hour itinerary ensuring seamless build time, mentor consultations, nutritious meals, and fair judging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Timeline Navigation */}
        <div className="md:col-span-5 space-y-2.5">
          {CIVIL_SCHEDULE_STEPS.map(step => {
            const isSelected = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveStep(step.id);
                }}
                className={`w-full p-4 rounded-sm border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-[#332326] border-[#c83b35] text-white shadow-lg translate-x-1"
                    : "bg-[#201819]/70 border-[#513b3b] text-[#bcaea2] hover:border-[#dfb8af] hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`font-mono text-sm font-bold ${
                      isSelected ? "text-[#eb9287]" : "text-[#dfb8af]"
                    }`}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-barlow text-lg font-bold text-white leading-tight">
                      {step.title}
                    </h4>
                    <span className="font-mono text-[11px] text-[#bcaea2]">
                      {step.time}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    isSelected
                      ? "bg-[#c83b35] text-white"
                      : "bg-[#141011] text-[#dfb8af] border border-[#513b3b]"
                  }`}
                >
                  {step.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Active Step Detailed Card */}
        <div className="md:col-span-7 sticky top-24">
          {(() => {
            const current = CIVIL_SCHEDULE_STEPS.find(s => s.id === activeStep) || CIVIL_SCHEDULE_STEPS[0];
            return (
              <div className="bg-[#141011] border-2 border-[#513b3b] rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#dfb8af]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#eb9287] font-bold">
                    STAGE {current.step} OF 09
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#201819] border border-[#dfb8af]/40 text-[#dfb8af] font-mono text-xs font-semibold">
                    {current.time}
                  </span>
                </div>

                <h3 className="font-barlow text-3xl sm:text-4xl font-black text-white mb-3">
                  {current.title}
                </h3>

                <div className="flex items-center space-x-2 font-mono text-xs text-[#d4bd88] mb-5">
                  <MapPin className="w-4 h-4 text-[#d4bd88]" />
                  <span>{current.venue}</span>
                </div>

                <p className="font-sans text-sm text-[#f2e9da] leading-relaxed mb-6">
                  {current.summary}
                </p>

                <div className="bg-[#201819] border border-[#463236] rounded-sm p-4 flex items-center justify-between text-xs font-mono text-[#bcaea2]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#dfb8af]" />
                    <span>Venue: Kailaimani A. Munusamy Mudaliyar Arangam</span>
                  </div>
                  <span className="text-[#eb9287] font-bold">15 OCT 2026</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
