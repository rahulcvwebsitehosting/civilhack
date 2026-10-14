import React from "react";
import { useDomainTheme } from "../context/DomainThemeContext";

export const CinematicBackground: React.FC = () => {
  const { activeDomain } = useDomainTheme();
  return <div className="domain-atmosphere" aria-hidden="true"><div className="domain-atmosphere-art" style={{ backgroundImage: `url(${activeDomain.wallpaper})` }} /><div className="domain-atmosphere-vignette" /><span className="domain-watermark" lang="ja">領域展開</span></div>;
};
