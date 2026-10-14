import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DomainThemeProvider } from "./context/DomainThemeContext";
import { GlobalDomainExpansionOverlay } from "./components/DomainExpansionOverlay";
import { CursedInteractions } from "./components/CursedInteractions";
import { JujutsuMotion } from "./components/JujutsuMotion";

const PageNavigation: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    let frame = 0;
    let attempts = 0;
    const findSection = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant" });
      else if (attempts++ < 60) frame = requestAnimationFrame(findSection);
    };
    findSection();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const EventPortalPage = lazy(() => import("./pages/EventPortalPage").then(m => ({ default: m.EventPortalPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const StatusPage = lazy(() => import("./pages/StatusPage").then(m => ({ default: m.StatusPage })));
const ReviewCountdownPage = lazy(() => import("./pages/ReviewCountdownPage").then(m => ({ default: m.ReviewCountdownPage })));

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-[#0e0b0c] flex flex-col items-center justify-center text-white select-none">
    <div className="relative w-14 h-14 flex items-center justify-center mb-4">
      <div className="absolute inset-0 border-2 border-[#dfb8af]/30 rounded-full animate-ping" />
      <div className="w-10 h-10 border-2 border-t-[#c83b35] border-r-[#dfb8af] border-b-transparent border-l-transparent rounded-full animate-spin" />
    </div>
    <span className="font-mono text-xs tracking-widest uppercase font-bold text-[#bcaea2]">
      領域展開 · THE CURTAIN IS OPENING…
    </span>
  </div>
);

export default function App() {
  return (
    <DomainThemeProvider>
      <BrowserRouter>
        <JujutsuMotion />
        <CursedInteractions />
        <GlobalDomainExpansionOverlay />
        <Suspense fallback={<LoadingFallback />}>
          <PageNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portal" element={<EventPortalPage />} />
            <Route path="/event" element={<EventPortalPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/review" element={<ReviewCountdownPage />} />
            <Route path="/reviews" element={<ReviewCountdownPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DomainThemeProvider>
  );
}
