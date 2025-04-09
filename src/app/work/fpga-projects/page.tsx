"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button, Dialog, Flex } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function FpgaProjects() {
  const [openReactionTimer, setOpenReactionTimer] = useState(false);
  const [openRiscvCpu, setOpenRiscvCpu] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState("");

  // Detect if screen is mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReportClick = (project) => {
    setCurrentProject(project);
    setShowReportDialog(true);
  };

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
          FPGA Projects
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak" style={{ alignSelf: "flex-start" }}>
          2025 - Present
        </Text>
        <Text variant="body-default-l" style={{ marginTop: "16px" }}>
          My FPGA projects showcase my expertise in digital design, hardware description languages, and embedded systems. 
          These projects demonstrate my ability to implement complex digital systems on programmable hardware platforms.
        </Text>
      </Column>

      {/* Project 1: Reaction Timer */}
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "left",
          marginTop: "40px",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: "rgba(30, 30, 30, 0.5)",
        }}
      >
        <Flex gap="l" direction={isMobile ? "column" : "row"} style={{ alignItems: isMobile ? "center" : "flex-start" }}>
          <img
            src="/images/FPGA.jpeg"
            alt="FPGA Reaction Timer"
            style={{
              width: isMobile ? "90%" : "40%",
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Column gap="m">
            <Heading variant="display-strong-m">Reaction Timer</Heading>
            <Text variant="heading-default-s" onBackground="neutral-weak">
              Project Lead, March 2025
            </Text>
            <Text variant="body-default-m">
              Designed a reaction timer in VHDL on a Nexys-4 DDR FPGA board. The system measures user reaction times with high precision using a finite state machine architecture.
            </Text>
            <Flex gap="m" style={{ marginTop: "16px" }}>
              <Button onClick={() => setOpenReactionTimer(!openReactionTimer)} variant="secondary" size="s" arrowIcon>
                {openReactionTimer ? "Hide Details" : "Show Details"}
              </Button>
              <Button onClick={() => handleReportClick("Reaction Timer")} variant="secondary" size="s" arrowIcon>
                Download Report
              </Button>
            </Flex>
          </Column>
        </Flex>

        {openReactionTimer && (
          <Column gap="m" style={{ marginTop: "24px" }}>
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

      {/* Project 2: RISC-V CPU */}
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "left",
          marginTop: "40px",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: "rgba(30, 30, 30, 0.5)",
        }}
      >
        <Flex gap="l" direction={isMobile ? "column" : "row"} style={{ alignItems: isMobile ? "center" : "flex-start" }}>
          <img
            src="/images/CPUfpgaKahu.png"
            alt="FPGA RISC-V CPU"
            style={{
              width: isMobile ? "90%" : "40%",
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Column gap="m">
            <Heading variant="display-strong-m">RISC-V CPU</Heading>
            <Text variant="heading-default-s" onBackground="neutral-weak">
              Project Lead, March 2025 - Present
            </Text>
            <Text variant="body-default-m">
              Researching efficient RISC-V (picorv32) CPU implementations on FPGAs with Dr. Romain Arnal, optimizing both performance and energy efficiency.
            </Text>
            <Flex gap="m" style={{ marginTop: "16px" }}>
              <Button onClick={() => setOpenRiscvCpu(!openRiscvCpu)} variant="secondary" size="s" arrowIcon>
                {openRiscvCpu ? "Hide Details" : "Show Details"}
              </Button>
              <Button onClick={() => handleReportClick("RISC-V CPU")} variant="secondary" size="s" arrowIcon>
                Download Report
              </Button>
            </Flex>
          </Column>
        </Flex>

        {openRiscvCpu && (
          <Column gap="m" style={{ marginTop: "24px" }}>
            <Heading variant="display-strong-s">Key Achievements (so far)</Heading>
            <Text variant="body-default-l">
              <ul
                style={{
                  listStyleType: "disc",
                  margin: "0 0 0 20px",
                  padding: 0,
                }}
              >
                <li>
                  <strong>Developed a Custom RISCV SoC on FPGA:</strong> Engineered a complete system on an Avnet Zuboard 1CG by integrating the PicoRV32 core with custom memory, UART, and peripheral interfaces.
                </li>
                <li>
                  <strong>Firmware Compilation & Memory Initialization:</strong> Compiled test firmware using the SiFive RISCV toolchain and configured on-chip block RAM to automatically load the firmware via a memory initialization file.
                </li>
                <li>
                  <strong>End-to-End Design Flow:</strong> Created and adapted FPGA constraints and top-level Verilog modules, successfully synthesized, implemented, and generated a bitstream for hardware programming.
                </li>
                <li>
                  <strong>System Verification & Debugging:</strong> Demonstrated working UART output on real hardware, establishing a robust platform for further RISCV system development and testing.
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
        title={`${currentProject} Report in Progress`}
        style={{ width: 600 }}
      >
        <Column gap="m" padding="m">
          <Text variant="body-default-l">
            I'm still working on this report. Feel free to email me at{" "}
            <a href="mailto:kahuhutton.business@gmail.com">kahuhutton.business@gmail.com</a> to ask for any current updates or additional information about this project.
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
