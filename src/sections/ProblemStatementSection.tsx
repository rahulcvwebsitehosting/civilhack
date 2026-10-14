import React from "react";
import { CIVIL_EVENT_CONFIG, CONCRETE_3D_PRINTING_CENTER, STUDENT_RESEARCH_PROJECTS } from "../config/constants";
import { Lock, Printer, ExternalLink, Sparkles, Building, Recycle, Layers } from "lucide-react";
import { playClickSound } from "../utils/cyberSound";

export const ProblemStatementSection: React.FC = () => {
  return (
    <section id="campus" className="relative py-16 sm:py-20 px-4 z-10 max-w-6xl mx-auto">
      {/* Top Banner: Problems Revealed on the Spot */}
      <div className="bg-[#141011] border border-[#513b3b] rounded-sm p-6 sm:p-8 mb-16 text-center max-w-3xl mx-auto shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c83b35]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center space-x-2 font-mono text-[11px] text-[#eb9287] tracking-widest uppercase mb-2">
          <Lock className="w-3.5 h-3.5 text-[#eb9287]" />
          <span>CONFIDENTIAL CHALLENGE MATRICES</span>
        </div>
        <h3 className="font-barlow text-3xl sm:text-4xl font-extrabold text-white mb-2">
          PROBLEMS GIVEN ON THE SPOT
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#d8c9bb] max-w-xl mx-auto leading-relaxed">
          To ensure genuine innovation, equal opportunity, and spontaneous engineering problem-solving, official problem statements for both EcoThon and CADathon are unsealed at 09:00 AM on 15th October 2026.
        </p>
      </div>

      {/* Campus & 3D Concrete Printing Centre Gallery */}
      <div className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs text-[#eb9287] tracking-widest uppercase mb-1">
              // CIVIL ENGINEERING AT ESEC
            </div>
            <h2 className="font-barlow text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
              BUILT RIGHT <span className="text-[#dfb8af]">HERE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-[#d8c9bb] max-w-md">
            A 3D concrete printer. Printed products. Student projects that tackle everyday civic and environmental problems.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONCRETE_3D_PRINTING_CENTER.slice(0, 2).map((item, idx) => (
            <div
              key={idx}
              className="bg-[#201819] border border-[#513b3b] hover:border-[#dfb8af] rounded-sm overflow-hidden shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#171112]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#201819]/90 border-l-2 border-[#c83b35] text-white px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase">
                  {item.index}
                </span>
                <span className="absolute bottom-3 right-3 text-[#dfb8af] text-xl font-mono opacity-80">
                  +
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-barlow text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#dfb8af] mb-2">{item.tagline}</p>
                <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Wide Third Photo */}
          <div className="md:col-span-2 bg-[#201819] border border-[#513b3b] hover:border-[#c83b35] rounded-sm overflow-hidden shadow-xl transition-all duration-300 group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-[#171112]">
              <img
                src={CONCRETE_3D_PRINTING_CENTER[2].image}
                alt={CONCRETE_3D_PRINTING_CENTER[2].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#201819]/90 border-l-2 border-[#c83b35] text-white px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase">
                {CONCRETE_3D_PRINTING_CENTER[2].index}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-barlow text-2xl sm:text-3xl font-bold text-white mb-1">
                  {CONCRETE_3D_PRINTING_CENTER[2].title}
                </h3>
                <p className="font-mono text-xs text-[#eb9287] mb-2">
                  {CONCRETE_3D_PRINTING_CENTER[2].tagline}
                </p>
                <p className="font-sans text-xs text-[#d8c9bb] max-w-2xl leading-relaxed">
                  {CONCRETE_3D_PRINTING_CENTER[2].desc}
                </p>
              </div>
              <a
                href={CIVIL_EVENT_CONFIG.PRINTING_CENTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-[#141011] border border-[#dfb8af]/50 text-[#dfb8af] hover:bg-[#dfb8af] hover:text-[#141011] font-mono text-xs font-bold transition-all whitespace-nowrap self-start md:self-center"
              >
                <span>3D Printing Centre Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Student Research Projects */}
      <div className="border-t border-[#513b3b] pt-12">
        <div className="mb-6">
          <div className="font-mono text-xs text-[#d4bd88] tracking-widest uppercase mb-1">
            // STUDENT PROJECTS AT ESEC CIVIL
          </div>
          <h3 className="font-barlow text-3xl sm:text-4xl font-extrabold text-white">
            REAL PROBLEMS. PRACTICAL IDEAS.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_RESEARCH_PROJECTS.map((proj, idx) => (
            <article
              key={idx}
              className="bg-[#141011] border border-[#513b3b] rounded-sm p-6 transition-all hover:border-[#d4bd88]"
            >
              <span className="font-mono text-sm text-[#eb9287] font-bold block mb-2">
                {proj.number}
              </span>
              <h4 className="font-barlow text-2xl font-bold text-white mb-2">
                {proj.title}
              </h4>
              <p className="font-sans text-xs text-[#d8c9bb] leading-relaxed mb-3">
                {proj.desc}
              </p>
              <span className="inline-block font-mono text-[9px] px-2 py-0.5 rounded bg-[#201819] text-[#d4bd88] border border-[#d4bd88]/30">
                {proj.tag}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#bcaea2]">
          <div>
            College photos · ESEC 3D Concrete Printing Facility & Student Lab Projects
          </div>
          <a
            href={CIVIL_EVENT_CONFIG.STUDENT_PROJECTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dfb8af] hover:underline flex items-center gap-1"
          >
            <span>Explore all ESEC Student Projects</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
