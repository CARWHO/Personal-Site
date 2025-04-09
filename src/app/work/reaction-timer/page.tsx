"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button, Dialog } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function ReactionTimer() {
  const [open, setOpen] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

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
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <Heading variant="display-strong-l" style={{ marginBottom: "16px" }}>
          FPGA Reaction Timer
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak" style={{ alignSelf: "flex-start" }}>
          Project Lead, March 2025
        </Text>
        <Text variant="body-default-l" style={{ marginTop: "16px" }}>
          Designed a reaction timer in VHDL on a Nexys-4 DDR FPGA board. The system measures user reaction times with high precision using a finite state machine architecture, displays statistics on seven-segment displays, and includes configurable test parameters with random delay mechanisms to enhance interactivity.
        </Text>

        {/* Download report button */}
        <div style={{ width: "100%" }}>
          <Button
            onClick={() => setShowReportDialog(true)}
            variant="secondary"
            size="m"
            arrowIcon
            style={{ marginTop: "24px" }}
          >
            <Text variant="heading-strong-l">Download Full Report</Text>
          </Button>
        </div>
      </Column>

      {/* Image placed below the header section */}
      {isMobile ? (
        // MOBILE STYLES: ensure it doesn't get cut off
        <img
          src="/images/FPGA.jpeg"
          alt="FPGA Reaction Timer"
          style={{
            width: "72%", // Reduced by 20% from 90%
            borderRadius: "12px",
            objectFit: "cover",
            transform: "none",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      ) : (
        // DESKTOP STYLES: matched with HaloVision
        <img
          src="/images/FPGA.jpeg"
          alt="FPGA Reaction Timer"
          style={{
            width: "40%", // Reduced by 20% from 50%
            borderRadius: "12px",
            objectFit: "cover",
            transform: "translateY(-30px) rotate(-2deg)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}

      {/* Details Section */}
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "left",
          marginTop: "0px",
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
                  Implemented a VHDL-based finite state machine (FSM) on the Nexys-4 DDR FPGA to control the sequential reaction timer process with high precision.
                </li>
                <li>
                  Developed an integrated user interface using LEDs, seven-segment displays, and push buttons to measure and display reaction times, including error handling for premature inputs.
                </li>
                <li>
                  Engineered an Arithmetic Logic Unit (ALU) to compute reaction time statistics (average, best, and worst) and validated system performance with comprehensive Vivado simulations.
                </li>
                <li>
                  Incorporated configurable test parameters and random delay mechanisms to enhance interactivity and prevent anticipatory responses.
                </li>
              </ul>
            </Text>
          </Column>
        )}
      </Column>

      {/* Report Dialog */}
      <Dialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        title="Report in Progress"
        width="500px"
      >
        <Column gap="m" padding="m">
          <Text variant="body-default-l">
            I'm still working on this report. Feel free to email me at kahu.hutton@gmail.com to ask for any current updates or additional information about this project.
          </Text>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <Button variant="primary" onClick={() => setShowReportDialog(false)}>
              Close
            </Button>
          </div>
        </Column>
      </Dialog>
    </Column>
  );
}
