export interface Coordinator {
  name: string;
  role: string;
  phone?: string;
  rawPhone?: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  time: string;
  destination: string;
  via: string;
  startsAt: string;
  phone: string;
  phoneDisplay: string;
}

export interface HackathonTheme {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  tagline: string;
  trackType: string;
  eligibility: string;
  description: string;
  topics: string[];
  chips: string[];
  accentColor: string;
  glowColor: string;
}

export interface JJKDomainTheme {
  id: "hero_sorcerers" | "unlimited_void" | "malevolent_shrine" | "shibuya_barrier" | "tokyo_high" | "black_flash_squad";
  name: string;
  japanese: string;
  user: string;
  wallpaper: string;
  accent: string;
  secondaryAccent: string;
  glow: string;
  description: string;
  cursedTechnique: string;
}

export const JJK_DOMAIN_THEMES: JJKDomainTheme[] = [
  {
    "id": "hero_sorcerers",
    "name": "Special Grade Showdown",
    "japanese": "最強の対決",
    "user": "Gojo & Sukuna",
    "wallpaper": "/assets/jjk/domain-clash-1672.webp",
    "accent": "#d7665d",
    "secondaryAccent": "#e8d8bd",
    "glow": "rgba(200,59,53,0.2)",
    "description": "Two overwhelming forces. One battlefield. Step into a clash of limitless creativity and relentless ambition.",
    "cursedTechnique": "Limitless × Shrine"
  },
  {
    "id": "unlimited_void",
    "name": "Unlimited Void",
    "japanese": "無量空処",
    "user": "Satoru Gojo",
    "wallpaper": "/assets/jjk/gojo-infinity-1672.webp",
    "accent": "#baa6bf",
    "secondaryAccent": "#e8d8bd",
    "glow": "rgba(186,166,191,0.2)",
    "description": "An infinity of possibilities. Find your focus in the boundless territory of the strongest sorcerer.",
    "cursedTechnique": "Limitless"
  },
  {
    "id": "malevolent_shrine",
    "name": "Malevolent Shrine",
    "japanese": "伏魔御厨子",
    "user": "Ryomen Sukuna",
    "wallpaper": "/assets/jjk/sukuna-malevolent-shrine.jpg",
    "accent": "#dd534a",
    "secondaryAccent": "#d4bd88",
    "glow": "rgba(221,83,74,0.2)",
    "description": "A shrine without a barrier. Ruthless precision. Take command of your ideas in the territory of the King of Curses.",
    "cursedTechnique": "Cleave & Dismantle"
  },
  {
    "id": "shibuya_barrier",
    "name": "Shibuya Curtain",
    "japanese": "渋谷事変",
    "user": "Shibuya Incident",
    "wallpaper": "/assets/jjk/jjk-shibuya-incident.jpg",
    "accent": "#a592ad",
    "secondaryAccent": "#e8d8bd",
    "glow": "rgba(165,146,173,0.2)",
    "description": "The curtain has fallen over Shibuya. Stay sharp, trust your squad, and solve the challenge together.",
    "cursedTechnique": "Curtain Barrier"
  },
  {
    "id": "tokyo_high",
    "name": "Jujutsu High",
    "japanese": "東京都立呪術高等専門学校",
    "user": "Tokyo Jujutsu High",
    "wallpaper": "/assets/jjk/jjk-tokyo-high.jpg",
    "accent": "#c5a56f",
    "secondaryAccent": "#e8d8bd",
    "glow": "rgba(197,165,111,0.2)",
    "description": "A sanctuary for the next generation. Prepare your tools and refine your technique before stepping into battle.",
    "cursedTechnique": "Barrier Technique"
  },
  {
    "id": "black_flash_squad",
    "name": "Black Flash",
    "japanese": "黒閃",
    "user": "Yuji Itadori",
    "wallpaper": "/assets/jjk/yuji-black-flash-1672.webp",
    "accent": "#d9a4a0",
    "secondaryAccent": "#e8d8bd",
    "glow": "rgba(217,164,160,0.2)",
    "description": "When intent and action align, the impossible becomes possible. Build with the unbreakable resolve of your squad.",
    "cursedTechnique": "Black Flash"
  }
];

export const TRANSPORT_MANAGER = {
  name: "N. Senthilkumar",
  role: "Transport Manager · ESEC",
  phone: "+91 99768 65500",
  rawPhone: "9976865500",
  transportPageUrl: "https://erode-sengunthar.ac.in/transport/",
  totalRoutes: 41
};

export const CIVIL_EVENT_CONFIG = {
  EVENT_NAME: "INNO360 2026",
  SHORT_NAME: "INNO360",
  EVENT_YEAR: "2026",
  EVENT_TYPE: "12-HOUR MULTI-DEPARTMENT HACKATHON",
  TAGLINE: "Think Beyond Boundaries",
  MISSION_MOTTO: "IDEAS · PEOPLE · TECHNOLOGY · A GREENER TOMORROW",
  DATE_DISPLAY: "15th October 2026 (Thursday)",
  HACKATHON_START_DATE: "2026-10-15T08:00:00+05:30",
  HACKATHON_END_DATE: "2026-10-15T20:00:00+05:30",
  REGISTRATION_DEADLINE: "2026-10-14T23:59:59+05:30",
  REGISTRATION_DEADLINE_DISPLAY: "14th October 2026",
  DURATION_HOURS: "12 Hours",
  FORCE_REGISTRATION_CLOSED: false,
  ALLOW_ONE_FINAL_TEAM: false,

  // Registration & Fees
  REGISTRATION_FEE_PER_MEMBER: 250,
  TEAM_SIZE_MIN: 3,
  TEAM_SIZE_MAX: 4,
  TEAM_FEE_3_MEMBERS: 750,
  TEAM_FEE_4_MEMBERS: 1000,
  GOOGLE_FORM_URL: "https://forms.gle/kfuoLc2KXwoyYVcZ8",
  KNOWAFEST_URL: "https://www.knowafest.com/inno360-2026",
  CIVILHACK_URL: "https://civilhack.vercel.app/",
  COLLEGE_URL: "https://erode-sengunthar.ac.in/",
  BROCHURE_URL: "https://drive.google.com/file/d/1k-bzcYdRDF8aInrPaVWb1z1jnrp5fn8i/view?usp=sharing",
  PRINTING_CENTER_URL: "https://erode-sengunthar.ac.in/3dconcreteprinting/",
  STUDENT_PROJECTS_URL: "https://erode-sengunthar.ac.in/students-project/",

  // Venue & Institution
  COLLEGE_NAME: "ERODE SENGUNTHAR ENGINEERING COLLEGE",
  COLLEGE_STATUS: "AUTONOMOUS · ESTD 1996",
  COLLEGE_MOTTO: "SERVICE · EXCELLENCE · CHARACTER",
  ESTABLISHED_YEAR: "1996",
  DEPARTMENT: "DEPARTMENT OF CIVIL ENGINEERING",
  VENUE: "Kailaimani A. Munusamy Mudaliyar Arangam",
  VENUE_DETAILS: "Erode Sengunthar Engineering College Campus, Perundurai",
  COLLEGE_LOCATION: "Thudupathi, Perundurai, Erode District, Tamil Nadu — 638057",
  LOCATION_ADDRESS: "Thudupathi, Perundurai, Erode District, Tamil Nadu — 638057",

  // Payment Details for Team Registration
  BANK_ACCOUNT_NUMBER: "500101012593567",
  BANK_ACCOUNT_NAME: "The Principal, Erode Sengunthar Engineering College",
  BANK_NAME: "City Union Bank, Erode Branch",
  BANK_IFSC: "CIUB0000059",
  ORGANIZER_EMAIL: "civil@erode-sengunthar.ac.in",
  WHATSAPP_GROUP_URL: "https://chat.whatsapp.com/inno360-2026",

  // Accreditations
  ACCREDITATIONS: [
    { title: "NAAC 'A' Grade Badge", badgeSrc: "/assets/naac-transparent.png" },
    { title: "National Board of Accreditation (NBA)", badgeSrc: "/assets/nba-transparent.png" }
  ],

  // Leadership & Contacts
  HOD: {
    name: "Dr. K. M. Gopalakrishnan",
    role: "HOD · Department of Civil Engineering"
  },
  FACULTY_COORDINATOR: {
    name: "Mr. K. Vallarasu",
    role: "Faculty Coordinator",
    phone: "+91 63818 86719",
    rawPhone: "6381886719"
  },
  ASSOCIATION_COORDINATOR: {
    name: "Mr. K. Vallarasu",
    role: "Faculty Coordinator",
    phone: "+91 63818 86719",
    rawPhone: "6381886719"
  },
  STAFF_COORDINATORS: [
    {
      name: "Mr. K. Vallarasu",
      role: "Faculty Coordinator · Civil Engineering",
      phone: "+91 63818 86719",
      rawPhone: "6381886719"
    }
  ],
  STUDENT_COORDINATORS: [
    { name: "Rahul S", role: "Student Coordinator", phone: "+91 73051 69964", rawPhone: "7305169964" },
    { name: "Praveen S", role: "Student Coordinator", phone: "+91 86681 08638", rawPhone: "8668108638" },
    { name: "Pranesh K", role: "Student Coordinator", phone: "+91 97902 80126", rawPhone: "9790280126" },
    { name: "Raja K", role: "Student Coordinator", phone: "+91 75503 51352", rawPhone: "7550351352" }
  ]
};

// Backwards compatibility alias
export const EVENT_CONFIG = CIVIL_EVENT_CONFIG;

export const CIVIL_THEMES: HackathonTheme[] = [
  {
    id: "ecothon",
    number: "THEME 1",
    name: "EcoThon",
    subtitle: "Sustainable Environment & Green Innovation",
    tagline: "IDEAS FOR A SUSTAINABLE TOMORROW",
    trackType: "OPEN SOLUTION TRACK",
    eligibility: "Open to All Streams (12th Standard & Above, Arts, Diploma, Science, All Engineering Streams)",
    description: "Solve an environmental or sustainability problem using modern technologies including AI, IoT, software applications, hardware systems, or robotics automation. Problem statement will be revealed on the spot at the event.",
    topics: [
      "AI & Smart Predictive Environmental Analytics",
      "IoT Sensors for Water, Air, Soil & Energy Monitoring",
      "Software & Mobile Apps for Green Civic Infrastructure",
      "Hardware Automation & Eco-Robotics Systems"
    ],
    chips: ["AI / IOT", "SOFTWARE / HARDWARE", "AUTOMATION", "SUSTAINABILITY", "CIRCULAR ECONOMY"],
    accentColor: "#d4bd88",
    glowColor: "rgba(212,189,136, 0.4)"
  },
  {
    id: "cadathon",
    number: "THEME 2",
    name: "CADathon",
    subtitle: "Civil Solution & Structural Drafting Track",
    tagline: "Plan • Design • Build",
    trackType: "CIVIL ENGINEERING ONLY",
    eligibility: "Exclusively for Civil Engineering Students",
    description: "Building planning, structural design, and construction execution. Put your drafting, CAD, structural modeling, and analysis capabilities to work on a real-world civil engineering challenge provided on the spot.",
    topics: [
      "Building Planning & Architectural Drafting (AutoCAD / Revit)",
      "Structural Design, Analysis & Load Calculation (STAAD.Pro / ETABS)",
      "Construction Execution & Project Scheduling",
      "3D Concrete Printing Feasibility & Additive Construction"
    ],
    chips: ["BUILDING PLANNING", "STRUCTURAL DESIGN", "CONSTRUCTION", "CAD / BIM", "3D CONCRETE PRINTING"],
    accentColor: "#dfb8af",
    glowColor: "rgba(223,184,175, 0.4)"
  }
];

export const HACKATHON_TRACKS = CIVIL_THEMES;

export const STUDENT_RESEARCH_PROJECTS = [
  {
    number: "01",
    title: "Sustainable Drain Covers",
    desc: "Concrete with fly ash and recycled aggregate.",
    tag: "SUSTAINABLE MATERIALS",
    impact: "Reduces cement carbon footprint while utilizing recycled construction aggregates."
  },
  {
    number: "02",
    title: "Waste Tiles to Paver Blocks",
    desc: "Finding a practical use for discarded construction tiles.",
    tag: "CIRCULAR ECONOMY",
    impact: "Transforms non-biodegradable ceramic tile wastage into durable pedestrian walkway pavers."
  },
  {
    number: "03",
    title: "Municipal Waste Composting",
    desc: "Studying bio-treatment at the Perundurai dump yard.",
    tag: "WASTE REMEDIATION",
    impact: "Investigating organic stabilization and leach treatment to mitigate landfill impact."
  }
];

export const CONCRETE_3D_PRINTING_CENTER = [
  {
    index: "01 / THE PRINTER",
    title: "3D Concrete Printing",
    tagline: "From a digital design to concrete.",
    desc: "ESEC's gantry 3D concrete printer inside the college lab deposits cementitious mortar layer-by-layer directly from computer-aided design.",
    image: "/assets/campus/printer-enhanced.webp",
    alt: "ESEC's gantry 3D concrete printer inside the college lab"
  },
  {
    index: "02 / PRINTED PRODUCTS",
    title: "Concrete, Layer by Layer",
    tagline: "Printed forms made in our lab.",
    desc: "ESEC letters, custom furniture, benches, and intricate structural elements printed in layers of concrete under the printer nozzle.",
    image: "/assets/campus/products-enhanced.webp",
    alt: "ESEC letters printed in layers of concrete under the printer nozzle"
  },
  {
    index: "03 / FROM PRINT TO PRODUCT",
    title: "Design. Print. Try it out.",
    tagline: "Hands-on work at the college's 3D Concrete Printing Centre.",
    desc: "Students design 3D CAD models, formulate pumpable concrete mixes, execute toolpath generation, and test structural strength.",
    image: "/assets/campus/printing-work-enhanced.webp",
    alt: "AI-enhanced collage of the college concrete printer and empty printed stools",
    wide: true
  }
];

export const EVENT_RULES = [
  {
    number: "01",
    title: "Bring your laptop.",
    desc: "At least 1 laptop per team is compulsory. Bring your chargers, extension boxes, and required hardware peripherals."
  },
  {
    number: "02",
    title: "Use the given problem.",
    desc: "Work only on the problem statement given on the spot at the event. Pre-built designs or ready-made submissions will be disqualified."
  },
  {
    number: "03",
    title: "Pre-install CAD software.",
    desc: "For CADathon, pre-install your planning, drafting, design, and structural analysis software (AutoCAD, Revit, STAAD.Pro, etc.) before arriving."
  }
];

export const PREPARATION_CHECKLIST = [
  { id: "laptop", label: "Laptop + charger (at least 1 per team compulsory)" },
  { id: "cad", label: "CAD / Structural software installed (AutoCAD, Revit, STAAD.Pro if CADathon)" },
  { id: "form", label: "Registration form completed on Google Form with payment proof" },
  { id: "id", label: "College Student Identity Card (physical or digital)" }
];

export const EVENT_TIMELINE = [
  {
    time: "08:00 AM",
    title: "Reporting & Registered-Team Verification",
    desc: "Teams report at Kailaimani A. Munusamy Mudaliyar Arangam, verify Google Form submission and payment receipts, and receive participant badges.",
    tag: "CHECK-IN"
  },
  {
    time: "09:00 AM",
    title: "Official Inauguration & Problem Statements Release",
    desc: "Keynote address, rules briefing, and the confidential problem statements for EcoThon and CADathon are revealed on the spot.",
    tag: "KICKOFF"
  },
  {
    time: "09:30 AM",
    title: "Hackathon Sprint Starts (12-Hour Build)",
    desc: "Teams initiate brainstorming, drafting architectural plans, wiring IoT circuits, coding algorithms, and structural modeling.",
    tag: "SPRINT"
  },
  {
    time: "11:30 AM",
    title: "Morning Refreshments & Tea",
    desc: "Complimentary tea, coffee, and energy snacks provided at the venue dining hall.",
    tag: "REFRESHMENTS"
  },
  {
    time: "01:00 PM",
    title: "Working Lunch & Mid-Way Review",
    desc: "Delicious South Indian lunch provided. Mentors conduct informal desk checks to guide technical direction.",
    tag: "HOSPITALITY"
  },
  {
    time: "04:30 PM",
    title: "Evening High Tea & Snacks",
    desc: "Quick refreshment break before the final push for drawing freeze and submission.",
    tag: "REFRESHMENTS"
  },
  {
    time: "06:00 PM",
    title: "Design Freeze & Final Submissions",
    desc: "All CAD drawings, BIM files, simulation reports, hardware prototypes, and presentation slides submitted to the jury portal.",
    tag: "SUBMISSION"
  },
  {
    time: "06:30 PM",
    title: "Jury Evaluation & Team Pitches",
    desc: "Expert panel of civil engineers, academicians, and industry mentors evaluate each team's solution, innovation, and structural feasibility.",
    tag: "EVALUATION"
  },
  {
    time: "07:30 PM",
    title: "Valedictory & Cash Prize Distribution",
    desc: "Announcement of winners, distribution of cash awards and physical certificates to all participants.",
    tag: "VALEDICTORY"
  }
];

export const REFRESHMENT_SCHEDULE = [
  {
    time: "08:00 AM – 09:00 AM",
    item: "Welcome Tea & Biscuits",
    desc: "Served upon check-in and registration verification",
    icon: "Coffee"
  },
  {
    time: "11:30 AM – 12:00 PM",
    item: "Morning High Tea & Snacks",
    desc: "Hot tea/coffee and refreshments served at desks",
    icon: "Cookie"
  },
  {
    time: "01:00 PM – 02:00 PM",
    item: "Grand Buffet Working Lunch",
    desc: "Wholesome lunch served to all participants and faculty in the dining area",
    icon: "Utensils"
  },
  {
    time: "04:30 PM – 05:00 PM",
    item: "Evening Tea & Snacks",
    desc: "Hot beverages and crispy savouries for the final stretch",
    icon: "Coffee"
  }
];

export const FAQS = [
  {
    q: "Who can participate?",
    a: "EcoThon is open to all streams, including Arts, Science, and Diploma, for students at 12th-standard level and above. CADathon is exclusively for Civil Engineering students."
  },
  {
    q: "Can we choose our own problem statement in advance?",
    a: "No. Both themes use problems given on the spot at the event to ensure total fairness and spontaneous engineering creativity."
  },
  {
    q: "Which software should I install?",
    a: "For CADathon, pre-install your planning, design, and structural analysis software (such as AutoCAD, Revit, STAAD.Pro, ETABS, or SketchUp). Ask a coordinator if you have questions about accepted software."
  },
  {
    q: "Is on-spot registration available?",
    a: "No. On-spot registration is not available. Only teams that registered online before the deadline may attend."
  },
  {
    q: "How do we register as a team?",
    a: "Teams must have 3 or 4 members, including the team lead. Submit one registration per team via the Google Form (https://forms.gle/kfuoLc2KXwoyYVcZ8). Pay once for the whole team: ₹750 for 3 members or ₹1,000 for 4 members. Add one transaction ID and payment proof screenshot in the form."
  },
  {
    q: "Will food and refreshments be provided?",
    a: "Yes! Wholesome lunch, morning tea, and evening refreshments are fully included in the ₹250 per student registration fee."
  },
  {
    q: "Do we get certificates?",
    a: "Yes! High-quality physical certificates will be awarded to all participants, along with attractive cash prizes for winners and runner-ups."
  },
  {
    q: "When does registration close?",
    a: "Registration closes on 14th October 2026 at 11:59 PM. Make sure to complete your team submission and upload payment receipt before the deadline."
  },
  {
    q: "Where is the venue and how do we reach it?",
    a: "The event is held at Kailaimani A. Munusamy Mudaliyar Arangam, Erode Sengunthar Engineering College (Autonomous), Thudupathi, Perundurai, Erode District, Tamil Nadu — 638057. College buses and public transport from Perundurai / Erode bus stand and railway station are readily accessible."
  }
];

export const isRegistrationClosed = (): boolean => {
  if (CIVIL_EVENT_CONFIG.FORCE_REGISTRATION_CLOSED) return true;
  return new Date().getTime() > new Date(CIVIL_EVENT_CONFIG.REGISTRATION_DEADLINE).getTime();
};

export { COLLEGE_BUS_ROUTES } from "../data/busRoutes";
