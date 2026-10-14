import React, { useState, useEffect } from "react";
import { CIVIL_EVENT_CONFIG } from "../config/constants";
import { Clock, ExternalLink } from "lucide-react";
import { playClickSound } from "../utils/cyberSound";

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isConcluded: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(CIVIL_EVENT_CONFIG.HACKATHON_START_DATE).getTime();
      const end = new Date(CIVIL_EVENT_CONFIG.HACKATHON_END_DATE).getTime();
      const now = Date.now();

      if (now < start) {
        const diff = start - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isLive: false,
          isConcluded: false
        });
      } else if (now >= start && now <= end) {
        const diff = end - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isLive: true,
          isConcluded: false
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: false,
          isConcluded: true
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds }
  ];

  return (
    <section className="relative py-14 px-4 z-10 max-w-5xl mx-auto select-none">
      <div className="bg-[#201819]/90 border border-[#513b3b] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div>
          <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] text-[#eb9287] tracking-widest uppercase mb-1">
            <Clock className="w-3.5 h-3.5 text-[#eb9287] animate-spin" />
            <span>15TH OCTOBER 2026 · THURSDAY</span>
          </div>
          <h2 className="font-barlow text-3xl sm:text-4xl font-extrabold text-white">
            COUNTDOWN TO EVENT DAY
          </h2>
          <p className="font-mono text-xs text-[#bcaea2] mt-1">
            Counting down to 15th October 2026 · IST
          </p>
        </div>

        {/* 4 Digital Timer Blocks */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {timeBlocks.map((block, idx) => (
            <div
              key={idx}
              className="bg-[#141011] border border-[#513b3b] rounded-sm px-3 py-2.5 sm:px-5 sm:py-3.5 flex flex-col items-center justify-center min-w-[62px] sm:min-w-[80px]"
            >
              <div className="font-barlow text-3xl sm:text-4xl font-black text-[#dfb8af] leading-none">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-[#bcaea2] font-semibold tracking-wider uppercase mt-1">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA */}
        <div>
          <a
            href={CIVIL_EVENT_CONFIG.GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-sm bg-[#c83b35] hover:bg-[#a62c28] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(200,59,53,0.5)] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>REGISTER NOW</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
