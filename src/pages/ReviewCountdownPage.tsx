import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { InteractiveCursor } from "../components/InteractiveCursor";
import { CinematicBackground } from "../components/CinematicBackground";
import { playClickSound } from "../utils/cyberSound";
import {
  Clock,
  ArrowLeft,
  Calendar,
  Layers,
  Utensils,
  Coffee,
  Award,
  CheckCircle2,
  Building2
} from "lucide-react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";

interface AgendaEvent {
  id: number;
  title: string;
  time: string;
  category: "General" | "Inauguration" | "Meal" | "Hackathon" | "Refreshment" | "Evaluation";
  details: string;
  highlight?: boolean;
}

const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: 1,
    title: "Registration Check-In & Spot Clearance",
    time: "08:00 AM – 09:00 AM",
    category: "General",
    details: "Participant verification, team ID badge allocation, and welcome morning tea."
  },
  {
    id: 2,
    title: "Official Inauguration Ceremony",
    time: "09:00 AM – 09:30 AM",
    category: "Inauguration",
    highlight: true,
    details: "Dignitaries address, rules briefing, and on-the-spot problem statement release."
  },
  {
    id: 3,
    title: "Sprint Kickoff (12-Hour Build Begins)",
    time: "09:30 AM – 01:00 PM",
    category: "Hackathon",
    details: "Architectural floor planning, CAD drafting, algorithm coding, and IoT circuit wiring."
  },
  {
    id: 4,
    title: "Morning High Tea & Energy Snacks",
    time: "11:30 AM – 12:00 PM",
    category: "Refreshment",
    details: "Complimentary hot tea and snacks served at the Arangam refreshment foyer."
  },
  {
    id: 5,
    title: "Grand Working Lunch & Mid-Way Review",
    time: "01:00 PM – 02:00 PM",
    category: "Meal",
    highlight: true,
    details: "South Indian lunch buffet and informal mentor discussions across drafting bays."
  },
  {
    id: 6,
    title: "Phase 2 Sprint & Simulation Modeling",
    time: "02:00 PM – 04:30 PM",
    category: "Hackathon",
    details: "Structural analysis, 3D printing feasibility checks, and slide deck formulation."
  },
  {
    id: 7,
    title: "Evening High Tea & Snacks",
    time: "04:30 PM – 05:00 PM",
    category: "Refreshment",
    details: "Hot beverages before the final submission sprint and jury demonstrations."
  },
  {
    id: 8,
    title: "Design Freeze & Final Jury Evaluation",
    time: "05:00 PM – 06:45 PM",
    category: "Evaluation",
    highlight: true,
    details: "Formal jury evaluation, CAD drawings review, and team pitch presentations."
  },
  {
    id: 9,
    title: "Valedictory & Cash Prize Handover",
    time: "07:00 PM – 08:00 PM",
    category: "General",
    highlight: true,
    details: "Announcement of winners, trophy distribution, and physical certificates for all."
  }
];

export const ReviewCountdownPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#141011] text-[#f2e9da] selection:bg-[#c83b35] selection:text-white font-sans overflow-x-hidden pt-32 pb-16">
      <InteractiveCursor />
      <CinematicBackground />
      <Navbar />

      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
            // LIVE AUDITORIUM ITINERARY
          </div>
          <h1 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide mb-2">
            WAR ROOM <span className="text-[#dfb8af]">REVIEW SCHEDULE</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#d8c9bb] max-w-xl mx-auto">
            15th October 2026 · Kailaimani A. Munusamy Mudaliyar Arangam · ESEC Campus
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-3.5 mb-10">
          {AGENDA_EVENTS.map(ev => (
            <div
              key={ev.id}
              className={`p-5 rounded-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                ev.highlight
                  ? "bg-[#332326]/90 border-[#dfb8af] shadow-[0_0_20px_rgba(223,184,175,0.2)]"
                  : "bg-[#201819]/70 border-[#513b3b]"
              }`}
            >
              <div className="flex items-start sm:items-center space-x-4">
                <span className="font-mono text-sm text-[#eb9287] font-bold">
                  {String(ev.id).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-barlow text-2xl font-bold text-white">
                    {ev.title}
                  </h3>
                  <p className="font-sans text-xs text-[#d8c9bb] mt-0.5">
                    {ev.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs text-[#dfb8af] bg-[#141011] px-3 py-1.5 rounded-sm border border-[#513b3b] whitespace-nowrap self-start sm:self-center">
                <Clock className="w-3.5 h-3.5 text-[#eb9287]" />
                <span>{ev.time}</span>
              </div>
            </div>
          ))}
        </div>

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
