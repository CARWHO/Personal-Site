import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Daniel",
  lastName: "Hutton",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Electrical Engineering Student & AI Developer",
  avatar: "/images/avatar.jpg",
  location: "Pacific/Auckland",
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
    name: "Email",
    icon: "email",
    link: "mailto:example@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `Welcome!`,
  description: `Portfolio website for ${person.name}`,
  headline: <>Welcome!</>,
  subline: (
    <>
      I am a third-year electrical engineering undergraduate at the University
      of Canterbury. I also really enjoy racing mountain bikes!
    </>
  ),
};

const about = {
  label: "About",
  title: "About Me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Electrical Engineering Student",
    description: (
      <>
        I am a third-year electrical engineering undergraduate at the
        University of Canterbury. I also really enjoy racing mountain bikes!
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
        role: "Embedded Systems Engineer Intern",
        achievements: [
          <>
            Currently interning as an embedded systems software engineer,
            focusing on satellite propulsion systems.
          </>,
        ],
        images: [],
      },
      {
        company: "KORA",
        timeframe: "2024 - Present",
        role: "Founder",
        achievements: [
          <>
            Developed a generative academic AI aimed at supporting students and
            educators by automating grading and creating study resources.
          </>,
          <>
            KORA strives to enhance the educational experience through
            innovative technology.
          </>,
        ],
        images: [],
      },
    ],
  },
};

const studies = {
  display: true,
  title: "Education",
  institutions: [
    {
      name: "University of Canterbury",
      description: <>Third-year Electrical Engineering undergraduate.</>,
    },
  ],
};

const contact = {
  label: "Contact",
  title: "Get in Touch",
  description: (
    <>
      For more information about KORA, feel free to contact us via{" "}
      <a href="mailto:example@gmail.com">email</a>. You can also learn more on
      our <a href="https://kora-edu.com">website</a> or visit our{" "}
      <a href="https://github.com/kahuHutton">GitHub</a> page.
    </>
  ),
};

const work = {
  label: "Work",
  title: "My Projects",
  description: `Engineering and AI projects by ${person.name}`,
};

const studies = {
  title: "Education",
  display: true,
  institutions: [
    {
      name: "University of Canterbury",
      description: <>Third-year Electrical Engineering undergraduate.</>,
    },
  ],
};

export { person, social, home, about, contact, work };
