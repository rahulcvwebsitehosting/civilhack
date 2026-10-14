import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";

export const CyberBotAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  return <aside className="shikigami-guide" aria-label="Shikigami event guide">{open && <div id="shikigami-guide-panel" className="shikigami-panel"><button className="shikigami-close" aria-label="Close shikigami guide" onClick={() => setOpen(false)}><X size={18} /></button><p className="chapter-label">YOUR SHIKIGAMI GUIDE</p><h3>NEED A HAND?</h3><p>3–4 teammates. ₹250 each. One team registration. Lunch, refreshments, and certificates included.</p><Link to="/register">REGISTER YOUR SQUAD <ArrowUpRight size={16} /></Link><a href="#transport" onClick={() => setOpen(false)}>FIND YOUR BUS ROUTE <ArrowUpRight size={16} /></a><a href="#contacts" onClick={() => setOpen(false)}>CONTACT A COORDINATOR <ArrowUpRight size={16} /></a></div>}<button className="shikigami-trigger" aria-expanded={open} aria-controls="shikigami-guide-panel" aria-label={open ? "Close event guide" : "Open shikigami event guide"} onClick={() => setOpen(!open)}><span lang="ja" aria-hidden="true">式神</span><span>GUIDE</span></button></aside>;
};
