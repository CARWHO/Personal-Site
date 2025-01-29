import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Kahu",
  lastName: "Hutton",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Embedded Systems Engineer & AI Developer",
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
    link: "https://github.com/carwho",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kahuhutton/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "kahuhutton.business@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Embedded Systems Engineer and AI Developer</>,
  subline: (
    <>
      I'm Kahu, an engineer passionate about AI, embedded systems, and
      software development. I work on CubeSat technology and AI-powered
      education tools.
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
        Kahu is an embedded systems engineer and AI developer currently
        working with CubeSats. He also builds AI-powered tools to help students
        learn more efficiently.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Dawn Aerospace",
        timeframe: "2023 - Present",
        role: "Embedded Systems Engineer (Intern)",
        achievements: [
          <>Worked on CubeSat communication and telemetry systems.</>,
          <>Developed embedded software solutions for space applications.</>,
        ],
        images: [],
      },
      {
        company: "KORA",
        timeframe: "2024 - Present",
        role: "Founder & AI Developer",
        achievements: [
          <>
            Built an AI-powered education platform to help students practice
            coding and generate personalized flashcards.
          </>,
          <>
            Integrated large language models (LLMs) to generate high-quality
            practice problems.
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
        description: <>Further studies in space technology and software engineering.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Embedded Systems",
        description: <>Developing firmware and low-level software for embedded devices.</>,
        images: [],
      },
      {
        title: "AI & Machine Learning",
        description: <>Building AI models for education and automation.</>,
        images: [],
      },
      {
        title: "Full-Stack Development",
        description: <>Experience with Next.js, Node.js, and Supabase.</>,
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
  title: "My Projects",
  description: `Engineering and AI projects by ${person.name}`,
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
