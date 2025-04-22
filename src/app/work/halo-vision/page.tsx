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
          HaloVision is a heads-up display system designed to improve motorcycle safety
          by providing turn-by-turn navigation and indicator notifications on a
          helmet-mounted display. Inspired by personal experiences with motorcycle
          safety, HaloVision evolved from a simple indicator broadcaster into a full
          display system with custom-designed PCBs and a mobile app for real-time,
          hands-free updates.
        </Text>

        <Flex direction="column" gap="s" style={{ marginTop: "24px", alignItems: "flex-start" }}>
          <Button href="/images/halovision.pdf" variant="secondary" size="m" arrowIcon>
            <Text variant="heading-strong-l">Download Full Report</Text>
          </Button>
          <Button href="/images/CFDReport.pdf" variant="tertiary" size="m" arrowIcon>
            <Text variant="body-default-m">Download CFD Report</Text> {/* Adjusted text variant for tertiary button */}
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
            <Text variant="body-default-l">
              <ul
                style={{
                  listStyleType: "disc",
                  margin: "0 auto",
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
                </li>
                <li>
                  <strong>Collaboration:</strong> Worked alongside app developers,
                  engineers, and industry professionals to bring HaloVision from concept
                  to prototype.
                </li>
              </ul>
            </Text>
          </Column>
        </Column>
      )}
    </Column>
  );
}
