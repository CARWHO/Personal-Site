'use client';
import { useState } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function AccentProductions() {
  const [open, setOpen] = useState(false);

  return (
    <Column gap="xl" style={{ alignItems: 'center' }}>
      {/* Header section */}
      <Column style={{ width: '100%', maxWidth: '1000px', textAlign: 'left' }}>
        <Heading variant="display-strong-l" style={{ marginBottom: '16px' }}>
          Accent Productions – CFD Engineer
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Accent Productions, March 2024
        </Text>
        <Text variant="heading-default-m" onBackground="neutral-weak" style={{ marginTop: '8px' }}>
          CFD Wind Load Analysis & Safety Validation Report
        </Text>
        <Text variant="body-default-l" style={{ marginTop: '16px' }}>
          At Accent Productions, I conducted a detailed wind load analysis on a stage cover using Autodesk CFD and SolidWorks. The study assessed whether critical force thresholds were exceeded, ensuring safety and compliance.
        </Text>

        {/* Image below the text */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <img
            src="/images/cfdimagetop.png"  // update with your image source
            alt="Accent Productions CFD Analysis"
            style={{
              width: '250%',
              maxWidth: '800px',
              borderRadius: '12px',
              transform: 'translateY(-30px) rotate(-2deg)',
              objectFit: 'cover',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
            }}
          />
        </div>

        {/* Download report button */}
        <Button 
          href="/reports/accent-productions-report.pdf"
          variant="secondary"
          size="m"
          arrowIcon
          style={{ marginTop: '24px' }}
        >
          <Text variant="heading-strong-l">
            Download Full Report
          </Text>
        </Button>
      </Column>

      {/* Details Section */}
      <Column style={{ width: '100%', maxWidth: '1000px', textAlign: 'left', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            onClick={() => setOpen(!open)}
            variant="secondary"
            size="m"
            arrowIcon
          >
            {open ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        
        {open && (
          <Column gap="xl" style={{ marginTop: '16px' }}>
            <Heading variant="display-strong-s">Key Achievements</Heading>
            <Text variant="body-default-l">
              <ul style={{ listStyleType: 'disc', margin: '0 0 0 20px', padding: 0 }}>
                <li>
                  Performed comprehensive wind load analysis on a stage cover using Autodesk CFD and SolidWorks to determine if critical force thresholds were exceeded.
                </li>
                <li>
                  Delivered detailed CFD analysis materials—including graphs, visualizations, and a risk matrix—that highlighted a 19% difference in key safety margins, underscoring the need for design improvements.
                </li>
                <li>
                  Managed the entire analysis process solo—from geometry development and meshing to simulation setup, convergence studies, post-processing, and report drafting—resulting in actionable design recommendations.
                </li>
              </ul>
            </Text>
          </Column>
        )}
      </Column>
    </Column>
  );
}
