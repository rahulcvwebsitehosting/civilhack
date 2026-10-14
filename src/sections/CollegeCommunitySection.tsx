import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, Users, Building2 } from "lucide-react";
import registrations from "../config/collegeRegistrations.json";
import "./college-community.css";

const totalMembers = registrations.colleges.reduce((sum, college) => sum + college.members, 0);
const snapshotDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${registrations.updatedAt}T12:00:00Z`));
const totalTeams = registrations.colleges.reduce((sum, college) => sum + college.teams, 0);

export function CollegeCommunitySection() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const matching = registrations.colleges.filter(item => item.college.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = query.trim() || showAll ? matching : matching.slice(0, 6);

  return <section id="community" className="college-community" aria-labelledby="community-title">
    <div className="community-about">
      <div><p className="chapter-label">KNOW ABOUT US <span>/</span> THE ALLIANCE</p><h2 id="community-title">MANY COLLEGES.<br /><em>ONE DOMAIN.</em></h2></div>
      <div><p>INNO360 brings curious minds together at Erode Sengunthar Engineering College. Hosted by the Department of Civil Engineering, our 12-hour challenge turns ideas into solutions through EcoThon and CADathon.</p><Link to="/portal#contacts" className="community-link">MEET THE ORGANIZERS <ArrowUpRight size={18} /></Link></div>
    </div>
    <div className="community-totals" aria-label="Registration totals">
      <div><Users aria-hidden="true" /><strong>{totalMembers}</strong><span>MEMBERS LISTED</span></div>
      <div><span className="community-mark" lang="ja" aria-hidden="true">絆</span><strong>{totalTeams}</strong><span>TEAM SUBMISSIONS</span></div>
      <div><Building2 aria-hidden="true" /><strong>{registrations.colleges.length}</strong><span>COLLEGES REPRESENTED</span></div>
    </div>
    <div className="community-directory-heading"><div><p className="chapter-label">COLLEGE REGISTRATION ROSTER</p><h3>FIND YOUR ALLIANCE.</h3></div><label className="college-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search colleges</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search your college" /></label></div>
    <p className="community-snapshot">Snapshot · {snapshotDate} · Members counted from names listed in submitted registrations. Payment verification and final team eligibility are pending.</p>
    <p className="sr-only" role="status">{matching.length} colleges found</p>
    <ol className="college-roster">
      {visible.map(item => <li key={item.college} className="college-roster-row"><span className="college-rank" aria-hidden="true">{String(registrations.colleges.indexOf(item) + 1).padStart(2, "0")}</span><div className="college-name"><h4>{item.college}</h4><span>{item.teams} team {item.teams === 1 ? "submission" : "submissions"}</span></div><div className="college-members"><strong>{item.members}</strong><span>{item.members === 1 ? "member" : "members"}</span></div><div className="college-power" aria-hidden="true" style={{ "--participation": `${item.members / registrations.colleges[0].members * 100}%` } as CSSProperties} /></li>)}
    </ol>
    {matching.length === 0 && <p className="college-empty">No college matches “{query}”. Try a shorter name.</p>}
    {!query.trim() && <button className="seal-button community-more" onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>{showAll ? "SHOW TOP SIX" : `VIEW ALL ${registrations.colleges.length} COLLEGES`}<ArrowUpRight size={18} /></button>}
    <p className="community-footnote">College name variants are grouped together. This is a dated registration snapshot; new form submissions appear after the next data update.</p>
  </section>;
}
