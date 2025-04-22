"use client";

import { useState, useEffect } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";

export default function Kora() {
  // We detect if the user is on mobile (<768px).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Updated lighter blue for links
  const linkStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#66B3FF",
  };

  return (
    <Column maxWidth="m" gap="xl" padding="xl">
      {/* Title + Logo Section (unchanged) */}
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

      {/* 
        TEXT + MEET THE TEAM
        - Mobile: stacked, text above team
        - Desktop: original horizontal layout
      */}
      {isMobile ? (
        /* --- MOBILE: single-column stack with text above team --- */
        <Column gap="l">
          {/* Text section */}
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

          {/* Meet the Team section */}
          <Column gap="l">
            <Heading variant="display-strong-m">Meet the Team</Heading>
            <Column gap="s">
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
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
                <div>
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
                <div>
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
                <div>
                  <Heading variant="heading-default-m">Lev Petersen</Heading>
                  <Text variant="body-default-m">
                    Co-founder, LMS Plugin Lead Developer
                  </Text>
                </div>
              </Column>
            </Column>
          </Column>
        </Column>
      ) : (
        /* --- DESKTOP: original side-by-side layout --- */
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Two main text sections */}
          <Column gap="l" style={{ flex: 1 }}>
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

          {/* Right Column: Meet the Team (shifted 50px left and moved up) */}
          <Column
            gap="l"
            style={{ flex: 1, marginLeft: "50px", marginTop: "-120px" }}
          >
            <Heading variant="display-strong-m">Meet the Team</Heading>
            <Column gap="s">
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
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
                <div>
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
                <div>
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
                <div>
                  <Heading variant="heading-default-m">Lev Petersen</Heading>
                  <Text variant="body-default-m">
                    Co-founder, LMS Plugin Lead Developer
                  </Text>
                </div>
              </Column>
            </Column>
          </Column>
        </div>
      )}

      {/* YouTube Video Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "2rem", // Add some space above the video
          marginBottom: "2rem", // Add some space below the video
        }}
      >
        <iframe
          width="560" // Standard width, can be adjusted
          height="315" // Standard 16:9 aspect ratio height
          src="https://www.youtube.com/embed/6oEbYZ52Qeo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ maxWidth: "100%", borderRadius: "8px" }} // Ensure responsiveness and add rounded corners
        ></iframe>
      </div>

      {/* My Contributions Section - Always visible */}
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
    </Column>
  );
}
