import React, { useState, useMemo } from "react";
import { COLLEGE_BUS_ROUTES, TRANSPORT_MANAGER, BusRoute } from "../config/constants";
import { playClickSound, playHoverSound } from "../utils/cyberSound";
import { Bus, Phone, Search, X, MapPin, Clock, ArrowRight, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const QUICK_FILTERS = [
  { label: "All Routes", query: "" },
  { label: "Erode", query: "Erode" },
  { label: "Tirupur", query: "Tirupur" },
  { label: "Gobi", query: "Gobi" },
  { label: "Chennimalai", query: "Chennimalai" },
  { label: "Anthiyur", query: "Anthiyur" },
  { label: "Mettur", query: "Mettur" },
  { label: "Palladam", query: "Palladam" }
];

export const BusTransportSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .replace(/tiruppur|tirpur/g, "tirupur")
      .replace(/avinashi|avinahi/g, "avinashi")
      .replace(/sankagiri|sangiri/g, "sankagiri")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  };

  const filteredRoutes = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q) return COLLEGE_BUS_ROUTES;

    // Check if query is looking for a route number e.g. "26" or "route 26"
    const routeNumMatch = q.match(/^(?:route\s*)?0*(\d+)$/);
    if (routeNumMatch) {
      const targetNum = Number(routeNumMatch[1]);
      return COLLEGE_BUS_ROUTES.filter(r => Number(r.id) === targetNum);
    }

    const words = q.split(" ");
    return COLLEGE_BUS_ROUTES.filter(r => {
      const combined = normalize(`${r.routeNumber} ${r.destination} ${r.via} ${r.startsAt}`);
      return words.every(word => combined.includes(word));
    });
  }, [searchQuery]);

  return (
    <section id="transport" className="relative z-10 max-w-6xl mx-auto px-4 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#463236] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-[#eb9287] tracking-widest uppercase mb-1">
            <Bus className="w-3.5 h-3.5" />
            <span>CAMPUS LOGISTICS & CONNECTIVITY</span>
            <span className="text-[#dfb8af]">· SPECIAL GRADE RAPID CONVOY</span>
          </div>
          <h2 className="font-barlow text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            FIND YOUR <span className="text-[#eb9287]">BUS ROUTE.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#bcaea2] mt-1 max-w-xl">
            <strong className="text-white">41 Dedicated College Bus Routes</strong> running across Erode, Tirupur, Salem, Coimbatore border, Namakkal, and Gobichettipalayam districts directly to ESEC campus for INNO360.
          </p>
        </div>

        {/* Transport Manager Direct Hotline Card */}
        <div className="bg-[#201819]/90 border-2 border-[#dfb8af]/40 p-4 rounded-sm shadow-[0_0_20px_rgba(223,184,175,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] text-[#bcaea2] uppercase tracking-wider block">
              TRANSPORT MANAGER · ESEC
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {TRANSPORT_MANAGER.name}
            </h3>
            <span className="text-[11px] text-[#dfb8af] font-mono">
              Call to confirm pickup stop & hackathon day timing
            </span>
          </div>

          <a
            href={`tel:${TRANSPORT_MANAGER.phone}`}
            onClick={() => playClickSound()}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-[#c83b35] hover:bg-[#a62c28] text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(200,59,53,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>CALL {TRANSPORT_MANAGER.phone} ↗</span>
          </a>
        </div>
      </div>

      {/* Advisory Warning Note */}
      <div className="mb-6 bg-[#1c1516] border border-[#eab6a1]/30 rounded-sm p-3.5 sm:p-4 text-xs text-[#d8c9bb] flex items-start space-x-3">
        <ShieldCheck className="w-4 h-4 text-[#eab6a1] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Before you travel: </span>
          Call your specific route driver or the transport manager above to confirm your pickup stop and boarding time for the 15th October 2026 hackathon. Timings shown below are departures from the starting terminal, not individual interim stops.
        </div>
      </div>

      {/* Search Bar & Quick Filter Pills */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dfb8af]" />
          <input
            type="search"
            aria-label="Search bus routes by town, stop, or route number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your town, stop, or route number (e.g. Erode, Tirupur, Gobi, Route 26)..."
            className="w-full pl-11 pr-12 py-3.5 rounded-sm bg-[#1c1516] border border-[#513b3b] focus:border-[#dfb8af] text-white placeholder-[#b7a49a] text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#dfb8af] shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                playClickSound();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bcaea2] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-[10px] text-[#bcaea2] uppercase mr-1">
            Quick Towns:
          </span>
          {QUICK_FILTERS.map((f) => {
            const active = (searchQuery.trim().toLowerCase() === f.query.toLowerCase());
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => {
                  setSearchQuery(f.query);
                  playClickSound();
                }}
                onMouseEnter={() => playHoverSound()}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  active
                    ? "bg-[#dfb8af] text-[#141011] font-bold shadow-[0_0_10px_rgba(223,184,175,0.5)]"
                    : "bg-[#201819] text-[#bcaea2] hover:text-white border border-[#513b3b] hover:border-[#dfb8af]/50"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between font-mono text-xs text-[#bcaea2] mb-4">
        <span>
          Showing <strong className="text-[#dfb8af]">{filteredRoutes.length}</strong> of {COLLEGE_BUS_ROUTES.length} routes
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-[#eb9287] hover:underline cursor-pointer"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Bus Routes Grid Directory */}
      {filteredRoutes.length === 0 ? (
        <div className="bg-[#201819]/50 border border-dashed border-[#513b3b] rounded-sm p-8 sm:p-12 text-center space-y-3">
          <Bus className="w-10 h-10 text-[#bcaea2] mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white font-barlow uppercase">No Matching Routes Found</h3>
          <p className="text-xs text-[#bcaea2] max-w-md mx-auto">
            Try searching a nearby junction or town, or directly contact the transport manager at <a href={`tel:${TRANSPORT_MANAGER.phone}`} className="text-[#eb9287] underline">{TRANSPORT_MANAGER.phone}</a> for custom boarding assistance.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 rounded-sm bg-[#dfb8af] text-[#141011] font-mono text-xs font-bold cursor-pointer"
          >
            Show All 41 Routes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-[#201819]/75 hover:bg-[#2b1e20] border border-[#513b3b] hover:border-[#dfb8af]/60 rounded-sm p-4 transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c83b35] via-[#dfb8af] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Route Number & Departure Time */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#141011] border border-[#dfb8af]/40 text-[#dfb8af]">
                    {route.routeNumber}
                  </span>
                  <div className="flex items-center space-x-1 font-mono text-xs text-[#d4bd88]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{route.time}</span>
                  </div>
                </div>

                {/* Primary Destination */}
                <h3 className="font-barlow font-bold text-lg sm:text-xl text-white group-hover:text-[#dfb8af] transition-colors leading-tight">
                  {route.destination}
                </h3>

                {/* Via Stops */}
                <p className="text-xs text-[#bcaea2] mt-1 line-clamp-2">
                  <span className="text-[#eab6a1] font-medium font-mono text-[11px]">VIA:</span> {route.via}
                </p>

                {/* Starts At Terminal */}
                <div className="mt-2 text-[11px] font-mono text-[#bcaea2] flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-[#eb9287]" />
                  <span>Starts at: <strong className="text-white">{route.startsAt}</strong> · IST</span>
                </div>
              </div>

              {/* Driver Call Button */}
              <div className="mt-4 pt-3 border-t border-[#463236] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#b7a49a] uppercase">Route In-Charge</span>
                <a
                  href={`tel:${route.phone}`}
                  onClick={() => playClickSound()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#141011] hover:bg-[#c83b35] border border-[#513b3b] hover:border-[#c83b35] text-[#dfb8af] hover:text-white font-mono text-xs font-bold transition-all cursor-pointer group-hover:border-[#dfb8af]/40"
                  aria-label={`Call route ${route.id}: ${route.phone}`}
                >
                  <Phone className="w-3 h-3" />
                  <span>{route.phoneDisplay}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Footnote & Source Citation */}
      <div className="mt-8 pt-4 border-t border-[#463236] flex flex-col sm:flex-row items-center justify-between text-xs text-[#bcaea2] gap-3">
        <div>
          <span>Data verified from </span>
          <a
            href={TRANSPORT_MANAGER.transportPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dfb8af] hover:underline font-mono inline-flex items-center space-x-1"
          >
            <span>Official ESEC Transport Portal</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
          <span className="block text-[11px] text-[#b7a49a] mt-0.5">Checked October 2026 · All timings IST</span>
        </div>

        <a
          href="#contacts"
          className="text-xs font-mono text-[#eb9287] hover:underline inline-flex items-center space-x-1"
        >
          <span>Have travel queries? Ask event coordinators</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
};
