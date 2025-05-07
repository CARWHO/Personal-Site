"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button, Flex } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function HaloVision() {
  const [open, setOpen] = useState(false);

  // Track if user is on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check immediately on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Column gap="xl" style={{ alignItems: "center" }}>
      {/* Always visible header */}
      <Column style={{ width: "100%", maxWidth: "1000px", textAlign: "left" }}>
        <Heading variant="display-strong-l" style={{ marginBottom: "16px" }}>
          HaloVision: Enhancing Motorcycle Safety and Navigation
        </Heading>
        <Text
          variant="heading-default-m"
          onBackground="neutral-weak"
          style={{ marginTop: "8px" }}
        >
          December 2023 - August 2024
        </Text>
        <Text variant="body-default-l" style={{ marginTop: "16px" }}>
          HaloVision is an open-source heads-up display (HUD) system designed to enhance motorcycle safety and navigation.
          It provides turn-by-turn directions and indicator notifications directly on a helmet-mounted display.
          The project is fully open-source, with all hardware (custom PCBs), software (mobile app and firmware),
          CAD models for enclosures and mounts, and detailed assembly instructions available on GitHub.
          This allows anyone to build, modify, and contribute to the HaloVision system.
        </Text>

        <Flex direction="column" gap="s" style={{ marginTop: "24px", alignItems: "flex-start" }}>
          <Button href="/images/halovision.pdf" variant="secondary" size="m" arrowIcon>
            <Text variant="heading-strong-l">Download Full Report</Text>
          </Button>
          <Button href="https://github.com/CARWHO/Halo-Vision" target="_blank" rel="noopener noreferrer" variant="secondary" size="m" arrowIcon>
            <Text variant="heading-strong-l">View on GitHub</Text>
          </Button>
        </Flex>
      </Column>

      {/* Image placed below the text */}
      {isMobile ? (
        // MOBILE STYLES: ensure it doesn’t get cut off
        <img
          src="/images/HV_top.jpg"
          alt="HaloVision Display"
          style={{
            width: "90%",
            borderRadius: "12px",
            objectFit: "cover",
            transform: "none",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      ) : (
        // DESKTOP STYLES: unchanged
        <img
          src="/images/HV_top.jpg"
          alt="HaloVision Display"
          style={{
            width: "50%",
            borderRadius: "12px",
            objectFit: "cover",
            transform: "translateY(-30px) rotate(-2deg)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}

      {/* Show/Hide Details Button */}
      <Column style={{ width: "100%", maxWidth: "1000px", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <Button onClick={() => setOpen(!open)} variant="secondary" size="m" arrowIcon>
            {open ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </Column>

      {/* Accordion content - only rendered when open */}
      {open && (
        <Column gap="xl" style={{ width: "100%", maxWidth: "1000px" }}>
          {/* Key Highlights Section */}
          <Column style={{ width: "100%" }}>
            <Text variant="display-strong-s" style={{ marginBottom: "16px" }}>
              Key Highlights:
            </Text>
            <Flex direction={isMobile ? "column" : "row"} gap="l" style={{ alignItems: "flex-start", marginTop: "16px" }}>
              <div style={{ flex: 1.5 }}> {/* Text content takes more space */}
                <Text variant="body-default-l">
                  <ul
                    style={{
                      listStyleType: "disc",
                      margin: "0", // Adjusted margin
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      <strong>Custom PCBs:</strong> Designed custom PCBs for optimal power
                      efficiency and compactness.
                    </li>
                    <li>
                      <strong>Mounts &amp; Enclosures:</strong> Developed helmet mounts for
                      varied riding speeds, balancing aerodynamics and ease of use.
                    </li>
                    <li>
                      <strong>Safety Testing with CFD:</strong> Conducted simulations to
                      analyze aerodynamic forces, refining the mount design for stability
                      and user safety. Collaborated with Dr. Finn McIntyre, Ph.D. in fluid
                      mechanics, to validate CFD results, utilizing the University of
                      Canterbury’s wind tunnel for comparison.
                      <br />
                      <Button href="/images/CFDReport.pdf" variant="secondary" size="m" arrowIcon style={{ marginTop: "8px" }}>
                        <Text variant="heading-strong-l">Download CFD Report</Text>
                      </Button>
                    </li>
                    <li>
                      <strong>Fully Open Source:</strong> All project files, including hardware schematics (PCBs),
                      firmware, mobile application source code, CAD models for enclosures and mounts,
                      and comprehensive assembly instructions, are publicly available on GitHub,
                      encouraging community contributions and modifications.
                    </li>
                    <li>
                      <strong>Collaboration:</strong> Worked alongside app developers,
                      engineers, and industry professionals to bring HaloVision from concept
                      to prototype.
                    </li>
                  </ul>
                </Text>
              </div>
              <img
                src="/images/halovision.png"
                alt="HaloVision System Diagram"
                style={{
                  flex: 1, // Image takes available space, adjust ratio with text
                  width: isMobile ? "100%" : undefined, // Use flex-basis effectively
                  maxWidth: isMobile ? "100%" : "400px",
                  borderRadius: "12px",
                  objectFit: "contain",
                  alignSelf: "flex-start",
                  marginTop: isMobile ? "24px" : "0",
                  // clipPath: "inset(5% 0 5% 0)", // Removed to allow borderRadius to show
                }}
              />
            </Flex>
          </Column>
        </Column>
      )}
    </Column>
  );
}
