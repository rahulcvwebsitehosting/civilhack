import { CollegeCommunitySection } from "../sections/CollegeCommunitySection";
import React from "react";
import { Navbar } from "../components/Navbar";
import { InteractiveCursor } from "../components/InteractiveCursor";
import { CinematicBackground } from "../components/CinematicBackground";
import { CyberBotAssistant } from "../components/CyberBotAssistant";
import { JJKCursedTalismans } from "../components/JJKCursedTalismans";
import { useDomainTheme } from "../context/DomainThemeContext";
import { AboutSection } from "../sections/AboutSection";
import { DatesSection } from "../sections/DatesSection";
import { CountdownSection } from "../sections/CountdownSection";
import { ProblemStatementSection } from "../sections/ProblemStatementSection";
import { DomainsSection } from "../sections/DomainsSection";
import { BusTransportSection } from "../sections/BusTransportSection";
import { PrizesSection } from "../sections/PrizesSection";
import { EntertainmentSection } from "../sections/EntertainmentSection";
import { TeamRulesSection } from "../sections/TeamRulesSection";
import { HackathonRulesSection } from "../sections/HackathonRulesSection";
import { RefreshmentScheduleSection } from "../sections/RefreshmentScheduleSection";
import { TimelineSection } from "../sections/TimelineSection";
import { FaqSection } from "../sections/FaqSection";
import { ContactSection } from "../sections/ContactSection";
import { Footer } from "../sections/Footer";

export const EventPortalPage: React.FC = () => {
  const { activeDomain } = useDomainTheme();

  return (
    <div className="relative min-h-screen bg-[#0e0b0c] text-[#f2e9da] selection:bg-[#c83b35] selection:text-white font-sans overflow-x-hidden pt-32">
      {/* Interactive CAD Crosshair Cursor */}
      <InteractiveCursor />

      {/* Cinematic Blueprint Atmosphere & Jujutsu Kaisen Manga artwork Layer */}
      <CinematicBackground />

      {/* Floating Animated Japanese Cursed Talismans */}
      <JJKCursedTalismans />


      {/* Top Floating Navbar with Sound & Domain Controls */}
      <Navbar />

      {/* InnoBot Floating Help Assistant */}
      <CyberBotAssistant />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10 space-y-12 sm:space-y-16">
        <div className="portal-chapter"><span lang="ja" aria-hidden="true">領域</span><div><p>THE CURTAIN HAS FALLEN / YOUR MISSION BEGINS</p><h1>WELCOME TO THE DOMAIN.</h1></div><small>{activeDomain.name}</small></div>
        <AboutSection />
        <CollegeCommunitySection />
        <DatesSection />
        <CountdownSection />
        <DomainsSection />
        <BusTransportSection />
        <ProblemStatementSection />
        <PrizesSection />
        <HackathonRulesSection />
        <TeamRulesSection />
        <TimelineSection />
        <RefreshmentScheduleSection />
        <EntertainmentSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
