"use client";

import { Column, Heading, Text } from "@/once-ui/components"; // Removed Button and useState/useEffect

export default function Kora() {
  // Updated lighter blue for links
  const linkStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#66B3FF",
  };

  return (
    <Column maxWidth="m" gap="xl" padding="xl">
      {/* YouTube Video Section */}
      {/* YouTube Video Section - Larger */}
      <div
        style={{
          position: "relative", // Needed for aspect ratio padding trick
          width: "100%",
          paddingTop: "56.25%", // 16:9 Aspect Ratio (9 / 16 * 100)
          marginBottom: "2rem", // Keep space below the video
          backgroundColor: "#000", // Optional: background while loading
          borderRadius: "8px", // Match iframe border radius
          overflow: "hidden", // Ensure iframe stays within bounds
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/6oEbYZ52Qeo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        ></iframe>
      </div>

      {/* Title + Logo Section */}
      <Column
        horizontal="space-between"
        style={{ flexDirection: "row", alignItems: "center" }}
        gap="m"
      >
        <Column gap="s">
          <Heading variant="display-strong-l">KORA</Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            Founder &amp; Developer
          </Text>
        </Column>
        <img
          src="/images/KoraSymbol23.svg"
          alt="KORA Logo"
          style={{
            width: "120px",
            height: "auto",
            borderRadius: "4px",
          }}
        />
      </Column>

      {/* Description Text Section */}
      <Column gap="l">
        <Text variant="body-default-l">
          KORA is an AI-powered platform revolutionizing education with its smart LMS
          plugin. Powered by cutting-edge Retrieval-Augmented Generation (RAG), KORA
          delivers laser-precise, up-to-date content by tapping directly into university
          databases.
        </Text>
        <Text variant="body-default-l">
          Funded by Google Cloud, we harness advanced cloud technologies to build a
          robust and scalable platform.
        </Text>
        <Text variant="body-default-l">
          Explore more:&nbsp;
          <a
            href="https://kora.ac"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            kora.ac
          </a>
          &nbsp;|&nbsp;
          <a
            href="https://blog.kora.ac"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            blog.kora.ac
          </a>
        </Text>
      </Column>

      {/* My Contributions Section */}
      <Column gap="l">
        <Heading variant="display-strong-s">My Contributions</Heading>
        <Text variant="body-default-l">
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>
              <strong>Developed full-stack web app:</strong> built with
              React and Next.js, and leveraged
              containerization with Docker alongside a cloud-hosted database with authentication to ensure scalability and reliability.
            </li>
            <li>
              <strong>Led a team</strong> to design, deploy, and maintain a stand-alone
              LMS plugin utilizing Retrieval-Augmented Generation (RAG).
            </li>
            <li>
              <strong>Implemented containerization and cloud deployment</strong> to ensure scalability and minimize downtime.
            </li>
            <li>
              <strong>Managed end-to-end project lifecycles:</strong> from initial
              concept and UI/UX design through deployment and user feedback, ensuring
              alignment with business objectives.
            </li>
            <li>
              <strong>Maintained ongoing client and stakeholder communication:</strong>{" "}
              gathering requirements, providing updates, and rapidly iterating on
              features based on user input.
            </li>
          </ul>
        </Text>
      </Column>

      {/* Meet the Team Section */}
      <Column gap="l">
        <Heading variant="display-strong-m">Meet the Team</Heading>
        <Column gap="m"> {/* Increased gap between team members */}
          {/* Team Member 1 */}
          <Column
            horizontal="space-between"
            style={{ flexDirection: "row", alignItems: "center" }}
            gap="m"
          >
            <img
              src="/images/kahu.jpg"
              alt="Kahu Hutton (Me)"
              style={{
                width: "80px", // Kept original size, adjust if needed
                height: "80px",
                borderRadius: "50%",
              }}
            />
            <div style={{ flex: 1 }}> {/* Allow text to wrap */}
              <Heading variant="heading-default-m">Kahu Hutton (Me)</Heading>
              <Text variant="body-default-m">
                Founder &amp; Web-app Developer
              </Text>
            </div>
          </Column>
          {/* Team Member 2 */}
          <Column
            horizontal="space-between"
            style={{ flexDirection: "row", alignItems: "center" }}
            gap="m"
          >
            <img
              src="/images/joel.jpg"
              alt="Joel Bannister"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
            />
            <div style={{ flex: 1 }}>
              <Heading variant="heading-default-m">Joel Bannister</Heading>
              <Text variant="body-default-m">
                Co-founder, Backend &amp; Dev-ops Engineer
              </Text>
            </div>
          </Column>
          {/* Team Member 3 */}
          <Column
            horizontal="space-between"
            style={{ flexDirection: "row", alignItems: "center" }}
            gap="m"
          >
            <img
              src="/images/lev.jpg"
              alt="Lev Petersen"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
            />
            <div style={{ flex: 1 }}>
              <Heading variant="heading-default-m">Lev Petersen</Heading>
              <Text variant="body-default-m">
                Co-founder, LMS Plugin Lead Developer
              </Text>
            </div>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
