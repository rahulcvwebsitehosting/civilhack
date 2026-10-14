import React, { useState } from "react";
import { FAQS } from "../config/constants";
import { playClickSound } from "../utils/cyberSound";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = (idx: number) => {
    playClickSound();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQS.filter(
    f =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-16 sm:py-20 px-4 z-10 max-w-5xl mx-auto select-none">
      <div className="text-center mb-10">
        <div className="inline-block font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-2">
          // COMMON QUESTIONS & QUERIES
        </div>
        <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          COMMON <span className="text-[#dfb8af]">QUESTIONS.</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#bcaea2] max-w-lg mx-auto mt-1">
          Everything you need to know about eligibility, registration, software, and logistics.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#bcaea2] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            aria-label="Search frequently asked questions"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. software, team size, food)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#141011] border border-[#513b3b] focus:border-[#dfb8af] text-xs font-mono text-white placeholder-[#bcaea2] outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#201819]/80 border border-[#513b3b] rounded-sm overflow-hidden transition-all hover:border-[#dfb8af]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => handleToggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer"
              >
                <span className="font-barlow text-xl sm:text-2xl font-bold text-white pr-4">
                  {faq.q}
                </span>
                <span className="text-[#dfb8af] font-mono text-xl flex-shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm font-sans text-[#d8c9bb] leading-relaxed border-t border-[#463236] pt-3">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
