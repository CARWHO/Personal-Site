import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Kahu",
  lastName: "Hutton",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Electrical Engineering Student at UC",
  avatar: "/images/avatar.jpg",
  location: "Pacific/Auckland", // Expecting the IANA time zone identifier
  languages: ["English"], // optional
};

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

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Kahu Hutton</>,
  subline: (
    <>
      I'm an Electrical Engineer, founder of KORA, and currently interning at Dawn Aerospace, messing around with spacecraft propulsion and CubeSats.
      I tinker with both hardware and software—basically, if it flies or runs code, I’m into it. 🚀
    </>
  ),
};

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
        I'm currently interning at Dawn Aerospace, where I work on spacecraft propulsion systems. 
        My role involves developing both hardware and software for CubeSat applications, focusing on integration and performance optimization.
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
        role: "Spacecraft Propulsion Development Intern",
        achievements: [
          <>Development of CubeSat propulsion systems</>,
          <>Hardware and software integration for spacecraft applications</>,
        ],
        images: [],
      },
      {
        company: "KORA",
        timeframe: "2024 - Present",
        role: "Founder, Developer",
        achievements: [
          <>AI-powered education platform for institutes and students</>,
        ],
        images: [],
      },
      {
        company: "Wellington City Council",
        timeframe: "2024",
        role: "CFD Engineer (Wind Loading)",
        achievements: [
          <>Conducted wind loading simulations for public event safety</>,
          <>Analyzed Computational Fluid Dynamics (CFD) models for structural safety assessments</>,
        ],
        images: [],
      },
      {
        company: "Halo Vision",
        timeframe: "2023",
        role: "Founder",
        achievements: [
          <>Developed an advanced motorcycle navigation system</>,
          <>Embedded system design, software, PCB manufacturing, APP design</>,
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

const blog = {
  label: "Blog",
  title: "Writing about AI, Embedded Systems, and Technology...",
  description: `Read what ${person.name} has been up to recently.`,
};

const work = {
  label: "Work",
  title: "My Work",
  description: `Engineering projects and work experience by ${person.name}`,
  sections: [
    {
      company: "Dawn Aerospace",
      description: "Working on spacecraft propulsion systems and CubeSat development",
      summary: "Leading the development of next-generation CubeSat propulsion systems, focusing on integration of hardware and software components for optimal performance and reliability.",
      logo: "/images/companies/dawnlogo.png",
      fullReportLink: "/work/dawn-aerospace"
    },
    {
      company: "KORA",
      description: "Building an AI-powered education platform",
      summary: "Founded and developed an innovative education platform that leverages AI to create personalized learning experiences for students and institutions.",
      logo: "/images/companies/kora.png",
      fullReportLink: "/work/kora"
    },
    {
      company: "Wellington City Council",
      description: "Wind loading analysis and CFD simulations for public safety",
      summary: "Conducted comprehensive wind loading analysis using CFD simulations to ensure public safety during large-scale events and infrastructure projects.",
      logo: "/images/companies/wcc.png",
      fullReportLink: "/work/wellington-city-council"
    },
    {
      company: "Halo Vision",
      description: "Developing advanced motorcycle navigation systems",
      summary: "Founded and led the development of an innovative motorcycle navigation system, including hardware design, embedded systems, and mobile app integration.",
      logo: "/images/companies/hv.png",
      fullReportLink: "/work/halo-vision"
    }
  ]
};

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
