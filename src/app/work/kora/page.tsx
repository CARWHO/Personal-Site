"use client";

import { Column, Heading, Text } from "@/once-ui/components";

export default function Kora() {
  // Accent colour for links (lighter blue)
  const linkStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#66B3FF",
  };

  /**
   * Generic section wrapper ‑ keeps padding consistent and
   * adds a subtle divider between major blocks so the page
   * feels more structured.
   */
  const Section = ({ children }) => (
    <Column gap="m" style={{ paddingBlock: "1.5rem", borderBottom: "1px solid #2A2A2A" }}>
      {children}
    </Column>
  );

  /**
   * Re‑usable team member card – scales nicely on smaller
   * screens using CSS Grid instead of stacking everything
   * in a long column.
   */
  const TeamMember = ({ photo, name, role }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <img
        src={photo}
        alt={name}
        style={{ width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0 }}
      />
      <div>
        <Heading variant="heading-default-m">{name}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {role}
        </Text>
      </div>
    </div>
  );

  return (
    <Column
      maxWidth="l"
      gap="xl"
      padding="xl"
      style={{ margin: "0 auto" }}
    >
      {/* ----------------------------- Video ----------------------------- */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,.35)",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/6oEbYZ52Qeo"
          title="KORA – LKYGBPC Submission Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* ------------------------- Header / Logo ------------------------- */}
      <Section>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <Heading variant="display-strong-l">KORA</Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak">
              Founder &amp; Developer
            </Text>
          </div>
          <img
            src="/images/KoraSymbol23.svg"
            alt="KORA logo"
            style={{ width: "120px", height: "auto" }}
          />
        </div>
      </Section>

      {/* --------------------------- Description -------------------------- */}
      <Section>
        <Text variant="body-default-l">
          KORA is an AI‑powered platform revolutionising education with its smart LMS
          plugin. Leveraging Retrieval‑Augmented Generation (RAG), KORA delivers
          laser‑precise, up‑to‑date content by tapping directly into university
          databases.
        </Text>
        <Text variant="body-default-l">
          Backed by Google Cloud, we harness advanced cloud technologies to build a
          robust and scalable platform.
        </Text>
        <Text variant="body-default-l">
          Explore more:&nbsp;
          <a href="https://kora.ac" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            kora.ac
          </a>
          &nbsp;|&nbsp;
          <a href="https://blog.kora.ac" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            blog.kora.ac
          </a>




        </Text>
      </Section>

      {/* ---------------------- My Contributions ------------------------- */}
      <Section>
        <Heading variant="display-strong-s">My Contributions</Heading>
        <ul style={{ listStyle: "square", paddingLeft: "1.25rem", lineHeight: 1.6 }}>
          <li>
            <strong>Developed full‑stack web app:</strong> built with React &amp; Next.js
            and containerised with Docker; integrated secure, cloud‑hosted databases
            for reliability and scale.
          </li>
          <li>
            <strong>Led a cross‑functional team</strong> to design, deploy and maintain a
            stand‑alone LMS plugin powered by RAG.
          </li>
          <li>
            <strong>Implemented automated cloud deployment</strong> pipelines to
            minimise downtime and accelerate iteration.
          </li>
          <li>
            <strong>Owned the full product lifecycle:</strong> from concept and UI/UX to
            user feedback loops – ensuring alignment with business goals.
          </li>
          <li>
            <strong>Maintained close stakeholder communication</strong> to rapidly
            iterate on features based on real‑world usage.
          </li>
        </ul>
      </Section>

      {/* -------------------------- Team Section -------------------------- */}
      <Section>
        <Heading variant="display-strong-m">Meet the Team</Heading>
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <TeamMember
            photo="/images/kahu.jpg"
            name="Kahu Hutton (Me)"
            role="Founder & Web‑app Developer"
          />
          <TeamMember
            photo="/images/joel.jpg"
            name="Joel Bannister"
            role="Co‑founder, Backend & Dev‑ops Engineer"
          />
          <TeamMember
            photo="/images/lev.jpg"
            name="Lev Petersen"
            role="Co‑founder, LMS Plugin Lead Developer"
          />
        </div>
      </Section>

      {/* ----------------------------- Demo Video ----------------------------- */}
      <Section>
        <Heading variant="display-strong-m">Web App Demo Video</Heading>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%", // 16:9
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,.35)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/LEGDE9n_7P4" // Updated video ID
            title="KORA Demo Video" // Updated title
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </Section>
    </Column>
  );
}
