import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Kahu",
  lastName: "Hutton",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Electrical Engineer",
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
  headline: <>Electrical Engineer</>,
  subline: (
    <>
      I'm Kahu, an electrical engineer at Dawn Aerospace, where I work on spacecraft propulsion 
      development with a focus on CubeSats. I specialize in both software and hardware development.
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
        I'm an electrical engineer specializing in spacecraft propulsion systems at Dawn Aerospace. 
        My work involves both hardware and software development for CubeSat applications.
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
        role: "Spacecraft Propulsion Development Intern",
        achievements: [
          <>Development of CubeSat propulsion systems</>,
          <>Hardware and software integration for spacecraft applications</>,
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
