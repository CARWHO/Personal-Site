'use client';
import { useState } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function HaloVision() {
  const [open, setOpen] = useState(false);

  return (
    <Column gap="xl" style={{ alignItems: 'center' }}>
      {/* Always visible header */}
      <Column style={{ width: '100%', maxWidth: '1000px', textAlign: 'left' }}>
        <Heading variant="display-strong-l" style={{ marginBottom: '16px' }}>
          HaloVision: Enhancing Motorcycle Safety and Navigation
        </Heading>
        <Text variant="body-default-l">
          December 2023 - August 2024
        </Text>
        <Text variant="body-default-l" style={{ marginTop: '16px' }}>
          HaloVision is a heads-up display system designed to improve motorcycle safety by providing turn-by-turn navigation and indicator notifications on a helmet-mounted display. Inspired by personal experiences with motorcycle safety, HaloVision evolved from a simple indicator broadcaster into a full display system with custom-designed PCBs and a mobile app for real-time, hands-free updates.
        </Text>

        <Button 
          href="/images/halovision.pdf"
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

      {/* Image placed below the text */}
      <img
        src="/images/HV_top.jpg"
        alt="HaloVision Display"
        style={{
          width: '50%',
          borderRadius: '12px',
          objectFit: 'cover',
          transform: 'translateY(-30px) rotate(-2deg)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
        }}
      />

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: 'pointer',
          alignSelf: 'center'
        }}
      >
        {open ? "Hide Details" : "Show Details"}
      </button>

      {/* Accordion content - only rendered when open */}
      {open && (
        <Column gap="xl" style={{ width: '100%', maxWidth: '1000px' }}>
          {/* Key Highlights Section */}
          <Column style={{ width: '100%' }}>
            <Text variant="display-strong-s" style={{ marginBottom: '16px' }}>
              Key Highlights:
            </Text>
            <Text variant="body-default-l">
              <ul
                style={{
                  listStyleType: 'disc',
                  margin: '0 auto',
                  paddingLeft: '20px'
                }}
              >
                <li>
                  <strong>Custom PCBs:</strong> Designed custom PCBs for optimal power efficiency and compactness.
                </li>
                <li>
                  <strong>Mounts &amp; Enclosures:</strong> Developed helmet mounts for varied riding speeds, balancing aerodynamics and ease of use.
                </li>
                <li>
                  <strong>Safety Testing with CFD:</strong> Conducted simulations to analyze aerodynamic forces, refining the mount design for stability and user safety. Collaborated with Dr. Finn McIntyre, Ph.D. in fluid mechanics, to validate CFD results, utilizing the University of Canterbury’s wind tunnel for comparison.
                </li>
                <li>
                  <strong>Collaboration:</strong> Worked alongside app developers, engineers, and industry professionals to bring HaloVision from concept to prototype.
                </li>
              </ul>
            </Text>
          </Column>
        </Column>
      )}
    </Column>
  );
}
