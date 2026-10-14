import React from "react";
import { playClickSound, playHoverSound } from "../utils/cyberSound";
import { Activity, Clock, Trophy, Printer, Utensils } from "lucide-react";
import { motion } from "motion/react";

export const LiveWarRoomTelemetry: React.FC = () => {
  const metrics = [
    {
      label: "EVENT DURATION",
      value: "12 HOURS",
      desc: "Rapid Planning, Structural Drafting & Prototyping",
      icon: Clock,
      color: "text-[#eb9287]",
      border: "border-[#c83b35]/50"
    },
    {
      label: "AWARDS & RECOGNITION",
      value: "CASH PRIZES",
      desc: "Attractive Cash Awards & Physical Certificates",
      icon: Trophy,
      color: "text-[#dfb8af]",
      border: "border-[#dfb8af]/50"
    },
    {
      label: "CENTRE OF EXCELLENCE",
      value: "3D CONCRETE",
      desc: "ESEC In-House Gantry Additive Concrete Lab",
      icon: Printer,
      color: "text-[#d4bd88]",
      border: "border-[#d4bd88]/50"
    },
    {
      label: "HOSPITALITY INCLUDED",
      value: "MEALS & TEA",
      desc: "South Indian Lunch & Refreshments Provided",
      icon: Utensils,
      color: "text-[#eab6a1]",
      border: "border-[#eab6a1]/50"
    }
  ];

  return (
    <div className="relative bg-[#120e0f]/90 border border-[#513b3b] rounded-sm p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] my-8 select-none cad-corner-box">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#513b3b] pb-4 mb-6">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c83b35] animate-ping flex-shrink-0" />
          <Activity className="w-5 h-5 text-[#eb9287] flex-shrink-0" />
          <h3 className="font-barlow font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
            YOUR MISSION BRIEF
          </h3>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="bg-[#201819] border border-[#dfb8af]/40 px-3 py-1 rounded-full text-[#dfb8af] shadow-sm whitespace-nowrap text-[10px] sm:text-xs">
            SPECIAL GRADE · INNO360
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => playHoverSound()}
              onClick={() => playClickSound()}
              className={`bg-[#201819]/70 border ${m.border} p-5 rounded-sm flex flex-col justify-between transition-all shadow-md hover:shadow-[0_0_20px_rgba(223,184,175,0.2)] cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#bcaea2] font-semibold uppercase tracking-wider">
                  {m.label}
                </span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>

              <div className={`font-barlow text-3xl sm:text-4xl font-black ${m.color} my-1`}>
                {m.value}
              </div>

              <p className="font-sans text-xs text-[#bcaea2] mt-1 leading-snug">
                {m.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
