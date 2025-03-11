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
  interests: ["Enduro Mountain Bike Racing", "Long Distance Running", "FPGA"],
  email: "kahuhutton.business@gmail.com", // Added for calendar integration
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
    link: "https://github.com/carwho",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kahu-hutton/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:kahuhutton.business@gmail.com",
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
      {/* Inline <style> so we don't have to edit any external CSS file */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-smaller {
            font-size: 14px;     /* Smaller font size on mobile */
            line-height: 1.3;    /* Decrease line spacing as well */
          }
        }
      `}</style>

      {/* Wrapped in a <p> with the class "mobile-smaller" */}
      <p className="mobile-smaller">
        Hi, I'm the founder of KORA. Welcome to my personal site—feel free to
        search for content, or explore the live, interactive graph by clicking
        on one of the main nodes to learn more about them. Have fun!
      </p>
    </>
  ),
};

// About Page
const about = {
  label: "About",
  title: " ",
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
        <p>
          My latest venture was an internship at Dawn Aerospace, where I worked in
          the software team, developing satellite communication software and
          contributing to spacecraft life-cycle testing.
        </p>
        <p>
          I also founded KORA, an innovative AI-powered education platform that streamlines content
          creation, grading, and learning management for institutes and students.
          Funded by Google.
        </p>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Dawn Aerospace",
        timeframe: "Nov 2024 – Feb 2025",
        role: "Spacecraft Propulsion Development Intern",
        logo: "/images/companies/dawnlogo.png",
        achievements: [
          <>
            Assisted in software and hardware integration for satellite
            propulsion systems, ensuring smooth communication between thrusters,
            sensors, and telemetry modules.
          </>,
          <>
            Enabled cross-platform builds by adapting DawnLink’s codebase to run
            on Windows, enhancing global team accessibility.
          </>,
          <>
            Developed comprehensive documentation (installation manuals, user
            guides) for in-house tools, streamlining onboarding for new hires.
          </>,
          <>
            Configured life-cycle testing for satellite electronics by
            integrating Grafana for real-time monitoring and creating custom
            GUIs.
          </>,
        ],
        images: [],
      },
      {
        company: "KORA",
        timeframe: "2024 – Present",
        role: "Founder, App Developer",
        logo: "/images/companies/kora.png",
        achievements: [
          <>
            Developed a full-stack web application using React, Next.js, Python,
            and Docker, leveraging cloud services funded by Google Cloud for
            deployment and scalability.
          </>,
          <>
            Led a team to design, deploy, and maintain a stand-alone LMS plugin
            and RAG status-tracking tool, serving 100+ daily users.
          </>,
          <>
            Configured and set up a robust database with integrated authentication
            and authorization, ensuring secure access to the platform.
          </>,
          <>
            Implemented containerization and cloud hosting solutions to ensure
            high availability and performance.
          </>,
          <>
            Managed end-to-end project lifecycles from concept and UI/UX design
            through deployment and continuous user feedback.
          </>,
        ],
        images: [],
      },
      {
        company: "Halo-Vision",
        timeframe: "Feb 2023 – 2024",
        role: "Motorcycle Safety HUD Developer",
        logo: "/images/companies/hv.png",
        achievements: [
          <>
            Designed a helmet-mounted heads-up display (HUD) system integrating
            turn-by-turn navigation and safety indicators.
          </>,
          <>
            Created custom PCBs optimized for power efficiency with a 90%
            improvement over the prototype.
          </>,
          <>
            Conducted aerodynamic simulations (CFD) and wind tunnel tests to
            enhance helmet mount stability by 60% at varied riding speeds.
          </>,
          <>
            Oversaw cross-functional collaboration with app developers, hardware
            engineers, and industry experts to translate concepts into a
            functional prototype.
          </>,
        ],
        images: [],
      },
      {
        company: "CFD-Engineering",
        timeframe: "March 2024",
        role: "CFD Engineer (Wind Load Analysis)",
        logo: "/images/companies/hv.png",
        achievements: [
          <>
            Performed comprehensive wind load analysis on a stage cover using
            Autodesk CFD and SolidWorks to determine critical force thresholds.
          </>,
          <>
            Delivered detailed CFD analysis reports—including graphs,
            visualizations, and risk matrices—highlighting a 19% difference in
            key safety margins.
          </>,
          <>
            Managed the entire analysis process from geometry development and
            meshing to simulation setup, convergence studies, post-processing,
            and report drafting, resulting in actionable design recommendations.
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
        description: (
          <>Bachelor of Electrical Engineering with Honors (2023 – 2026)</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Hardware Development",
        description: (
          <>Design and development of electrical systems for spacecraft applications.</>
        ),
        images: [],
      },
      {
        title: "Software Development",
        description: (
          <>Integration of hardware and software systems for space applications.</>
        ),
        images: [],
      },
      {
        title: "Cloud Infrastructure",
        description: (
          <>Setting up databases with integrated authentication and authorization, leveraging modern cloud services.</>
        ),
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
        "Developed a learning management system (LMS) plugin that enables AI-driven content generation and grading, including automated exam creation, flashcards, and programming question generation. Built on robust cloud infrastructure funded by Google Cloud, with a focus on setting up secure databases with integrated authentication.",
      logo: "/images/companies/kora.png",
      fullReportLink: "/work/kora",
    },
    {
      company: "HaloVision",
      description: "Helmet-mounted display system for motorcycle safety",
      summary:
        "Designed and developed a heads-up display system for motorcycle navigation and indicator notifications. Created custom PCBs, aerodynamic helmet mounts, and a mobile app for real-time, hands-free updates. Conducted safety testing using Computational Fluid Dynamics (CFD) in collaboration with Dr. Finn McIntyre, validating results through wind tunnel experiments at the University of Canterbury.",
      logo: "/images/companies/hv.png",
      fullReportLink: "/work/halo-vision",
    },
    {
      company: "Accent Productions",
      description: "CFD Wind Load Analysis & Safety Validation Report",
      summary:
        "Performed comprehensive wind load analysis using Autodesk CFD and SolidWorks, delivering detailed reports with graphs, visualizations, and risk matrices that identified critical safety margins and recommended design improvements.",
      logo: "/images/companies/hv.png",
      fullReportLink: "/work/cfd-engineering",
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
