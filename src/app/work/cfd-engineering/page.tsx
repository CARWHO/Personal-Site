"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function AccentProductions() {
  const [open, setOpen] = useState(false);

  // Detect if screen is mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Column gap="xl" style={{ alignItems: "center" }}>
      {/* Header section */}
      <Column style={{ width: "100%", maxWidth: "1000px", textAlign: "left", alignItems: "center" }}>
        <Heading variant="display-strong-l" style={{ marginBottom: "16px" }}>
          Accent Productions – CFD Engineer
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Accent Productions, March 2024
        </Text>
        <Text variant="body-default-l" style={{ marginTop: "16px" }}>
          I conducted a detailed wind load analysis on a stage cover using Autodesk CFD
          and SolidWorks. The report clarified discrepancies between client tests and CFD
          results by evaluating wind forces from 10–60 Km/h, highlighting a 19% variance
          in safety margins, and recommending improvements in rope selection and secure
          mounting.
        </Text>

        {/* Download report button */}
        <div style={{ width: "100%" }}>
          <Button
            href="/images/PreliminaryDesignReportAccentProductionsR1.1.pdf"
            variant="secondary"
            size="m"
            arrowIcon
            style={{ marginTop: "24px", marginBottom: "40px" }}
          >
            <Text variant="heading-strong-l">Download Full Report</Text>
          </Button>
        </div>

        {/* Image below the text */}
        {isMobile ? (
          // MOBILE STYLES: ensure it doesn't get cut off
          <img
            src="/images/cfdimagetop.png"
            alt="Accent Productions CFD Analysis"
            style={{
              width: "90%",
              borderRadius: "12px",
              objectFit: "cover",
              transform: "none",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        ) : (
          // DESKTOP STYLES: matched with HaloVision
          <img
            src="/images/cfdimagetop.png"
            alt="Accent Productions CFD Analysis"
            style={{
              width: "90%",
              borderRadius: "12px",
              objectFit: "cover",
              transform: "translateY(-30px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        )}
      </Column>

      {/* Details Section */}
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "left",
          marginTop: "00px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => setOpen(!open)} variant="secondary" size="m" arrowIcon>
            {open ? "Hide Details" : "Show Details"}
          </Button>
        </div>

        {open && (
          <Column gap="xl" style={{ marginTop: "16px" }}>
            <Heading variant="display-strong-s">Key Achievements</Heading>
            <Text variant="body-default-l">
              <ul
                style={{
                  listStyleType: "disc",
                  margin: "0 0 0 20px",
                  padding: 0,
                }}
              >
                <li>
                  Performed comprehensive wind load analysis using Autodesk CFD and
                  SolidWorks.
                </li>
                <li>
                  Identified a 19% variance in safety margins, underscoring the need for
                  design improvements.
                </li>
                <li>
                  Delivered actionable recommendations on rope selection and secure
                  mounting.
                </li>
              </ul>
            </Text>
          </Column>
        )}
      </Column>
    </Column>
  );
}
