import { InlineCode } from "@/once-ui/components";

// Person Information
const person = {
  firstName: "Kahu",
  lastName: "Hutton",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Electrical Engineering Student at UC",
  avatar: "/images/avatar.jpg",
  location: "Pacific/Auckland", // Expecting the IANA time zone identifier
  languages: ["English"], // Optional
};

// Newsletter Configuration
const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about embedded systems, AI, and share insights on
      technology and innovation.
    </>
  ),
};

// Social Links
const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/kahuHutton",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kahuHutton/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:example@gmail.com",
  },
];

// Home Page
const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Kahu Hutton</>,
  subline: (
    <>
      I'm an Electrical Engineer, founder of KORA, and currently interning at Dawn Aerospace,
      messing around with spacecraft propulsion and CubeSats. I tinker with both hardware
      and software—basically, if it flies or runs code, I’m into it. 🚀
    </>
  ),
};

// About Page
const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        My latest venture was an internship at Dawn Aerospace, where I worked in the 
        software team, developing satellite communication software and contributing 
        to spacecraft life-cycle testing.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Dawn Aerospace",
        timeframe: "2024 - Present",
        role: "Spacecraft Propulsion Development Intern (Software team)",
        logo: "/images/companies/dawnlogo.png",
        achievements: [
          <>
            Developed in-house satellite communication tools currently used in flight 
            and testing
          </>,
          <>
            Hardware and software integration for spacecraft applications (PixxelSpace, Argotec)
          </>,
        ],
        images: [],
      },
      {
        company: "KORA",
        timeframe: "2024 - Present",
        role: "Founder, App Developer",
        logo: "/images/companies/kora.png",
        achievements: [
          <>AI-powered education platform for institutes and students</>,
          <>200+ Daily active users</>,
        ],
        images: [],
      },
      {
        company: "Halo Vision",
        timeframe: "2023-2024",
        role: "Personal project to improve motorcycle safety",
        logo: "/images/companies/hv.png",
        achievements: [
          <>Developed an advanced motorcycle navigation system</>,
          <>Embedded system design, software, PCB manufacturing, app design</>,
        ],
        images: [],
      },
      {
        company: "Wellington City Council",
        timeframe: "2024",
        role: "CFD Engineer (Wind Loading)",
        logo: "/images/companies/wcc.png",
        achievements: [
          <>Conducted wind loading simulations for public event safety</>,
          <>
            Analyzed Computational Fluid Dynamics (CFD) models for structural
            safety assessments
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Canterbury",
        description: <>Further studies in Electrical Engineering (Graduating 2026)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Hardware Development",
        description: <>Design and development of electrical systems for spacecraft applications.</>,
        images: [],
      },
      {
        title: "Software Development",
        description: <>Integration of hardware and software systems for space applications.</>,
        images: [],
      },
    ],
  },
};

// Blog Page
const blog = {
  label: "Blog",
  title: "Writing about AI, Embedded Systems, and Technology...",
  description: `Read what ${person.name} has been up to recently.`,
};

// Work Page
const work = {
  label: "Work",
  title: "My Work",
  description: `Engineering projects and work experience by ${person.name}`,
  sections: [
    {
      company: "Dawn Aerospace",
      description: "Software development and testing for spacecraft propulsion systems",
      summary:
        "Developed in-house satellite control software for monitoring and logging CubeDrive and SatDrive telemetry, including thruster temperature and performance data. Designed and built custom testing equipment for spacecraft life-cycle testing.",
      logo: "/images/companies/dawnlogo.png",
      fullReportLink: "/work/dawn-aerospace",
    },
    {
      company: "KORA",
      description: "AI-powered education platform for institutes and students",
      summary:
        "Developed a learning management system (LMS) plugin that enables AI-driven content generation and grading, including automated exam creation, flashcards, and programming question generation. Models trained specifically around the New Zealand university curriculum.",
      logo: "/images/companies/kora.png",
      fullReportLink: "/work/kora",
    },
    {
      company: "Halo Vision",
      description: "Helmet-mounted display system for motorcycle safety",
      summary:
        "Designed and developed a heads-up display system for motorcycle navigation and indicator notifications. Created custom PCBs, aerodynamic helmet mounts, and a mobile app for real-time, hands-free updates. Conducted safety testing using Computational Fluid Dynamics (CFD) in collaboration with Dr. Finn McIntyre, validating results through wind tunnel experiments at the University of Canterbury.",
      logo: "/images/companies/hv.png",
      fullReportLink: "/work/halo-vision",
    },
    {
      company: "Wellington City Council",
      description: "Wind loading analysis and public safety assessments",
      summary:
        "Conducted Computational Fluid Dynamics (CFD) simulations for wind loading analysis on structures to ensure public safety during large-scale events. Produced technical reports covering structural safety requirements, mathematical analysis, and rendered visualizations.",
      logo: "/images/companies/wcc.png",
      fullReportLink: "/work/wellington-city-council",
    },
  ],
};

// Gallery Page
const gallery = {
  label: "Gallery",
  title: "My Photo Gallery",
  description: `A collection of my projects and experiences`,
  images: [
    {
      src: "/images/gallery/project-01.jpg",
      alt: "Project Image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/project-02.jpg",
      alt: "Project Image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
