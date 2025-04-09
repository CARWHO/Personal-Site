"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button, Flex } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function FpgaProjects() {
  const [openReactionTimer, setOpenReactionTimer] = useState(false);
  const [openRiscvCpu, setOpenRiscvCpu] = useState(false);

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
      {/* Compact header section */}
      <Column
        style={{
          width: "100%",
          maxWidth: "1000px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Heading variant="display-strong-xl" style={{ marginBottom: "8px" }}>
          FPGA Projects
        </Heading>
        <Text
          variant="heading-default-l"
          style={{
            color: "rgba(255,255,255,0.8)",
            marginBottom: "24px",
          }}
        >
          Digital design and hardware implementation expertise
        </Text>
        <Text variant="body-default-l" style={{ lineHeight: "1.6", textAlign: "left" }}>
          My FPGA projects showcase my expertise in digital design, hardware description languages, and embedded systems.
          I've developed a range of applications from precise timing systems to complex processor implementations,
          demonstrating my ability to bridge theoretical computer architecture concepts with practical hardware solutions.
        </Text>
      </Column>

      {/* Projects Grid */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "32px",
          alignItems: "flex-start" // This is key - don't align items stretch
        }}
      >
        {/* Project 1: Reaction Timer */}
        <Column
          style={{
            textAlign: "left",
            padding: "30px",
            borderRadius: "16px",
            backgroundColor: "rgba(20, 20, 30, 0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            border: "1px solid rgba(100, 100, 255, 0.1)",
            height: "auto", // Allow natural height
          }}
          className="project-card"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "220px",
              overflow: "hidden",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <img
              src="/images/FPGA.jpeg"
              alt="FPGA Reaction Timer"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              className="project-image"
            />
          </div>

          <Heading variant="display-strong-m" style={{ marginBottom: "8px" }}>
            Reaction Timer
          </Heading>
          
          <Text variant="heading-default-s" onBackground="neutral-weak" style={{ marginBottom: "16px" }}>
            Project Lead, March 2025
          </Text>
          
          <Text variant="body-default-m" style={{ marginBottom: "24px", lineHeight: "1.6" }}>
            Designed a reaction timer in VHDL on a Nexys-4 DDR FPGA board. The system measures user reaction times with high precision using a finite state machine architecture.
          </Text>
          
          <Flex gap="m" style={{ marginTop: "auto" }}>
            <Button
              onClick={() => setOpenReactionTimer(!openReactionTimer)}
              variant="secondary"
              size="s"
              arrowIcon
              style={{
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              }}
            >
              {openReactionTimer ? "Hide Details" : "Show Details"}
            </Button>
            
            <Button
              variant="secondary"
              size="s"
              arrowIcon
              style={{
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
              disabled
            >
              Download Report
            </Button>
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
                    lineHeight: "1.6",
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
            textAlign: "left",
            padding: "30px",
            borderRadius: "16px",
            backgroundColor: "rgba(20, 20, 30, 0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            border: "1px solid rgba(100, 100, 255, 0.1)",
            height: "auto", // Allow natural height
          }}
          className="project-card"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "220px",
              overflow: "hidden",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <img
              src="/images/CPUfpgaKahu.png"
              alt="FPGA RISC-V CPU"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              className="project-image"
            />
          </div>

          <Heading variant="display-strong-m" style={{ marginBottom: "8px" }}>
            RISC-V CPU
          </Heading>
          
          <Text variant="heading-default-s" onBackground="neutral-weak" style={{ marginBottom: "16px" }}>
            Project Lead, March 2025 - Present
          </Text>
          
          <Text variant="body-default-m" style={{ marginBottom: "24px", lineHeight: "1.6" }}>
            Researching efficient RISC-V (picorv32) CPU implementations on FPGAs with Dr. Romain Arnal, tuned for high speed data transfer.
          </Text>
          
          <Flex gap="m" style={{ marginTop: "auto" }}>
            <Button
              onClick={() => setOpenRiscvCpu(!openRiscvCpu)}
              variant="secondary"
              size="s"
              arrowIcon
              style={{
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              }}
            >
              {openRiscvCpu ? "Hide Details" : "Show Details"}
            </Button>
            
            <Button
              variant="secondary"
              size="s"
              arrowIcon
              style={{
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
              disabled
            >
              Download Report
            </Button>
          </Flex>

          {openRiscvCpu && (
            <Column gap="m" style={{ marginTop: "24px" }}>
              <Heading variant="display-strong-s">Key Objectives</Heading>
              <Text variant="body-default-l">
                <ul
                  style={{
                    listStyleType: "disc",
                    margin: "0 0 0 20px",
                    padding: 0,
                    lineHeight: "1.6",
                  }}
                >
                  <li>
                    <strong>Develop a Custom RISCV SoC on FPGA:</strong> Engineer a complete system on an Avnet Zuboard 1CG by integrating the PicoRV32 core with custom memory, UART, and peripheral interfaces.
                  </li>
                  <li>
                    <strong>Firmware Compilation & Memory Initialization:</strong> Compiled test firmware using the SiFive RISCV toolchain and configured on-chip block RAM to automatically load the firmware via a memory initialization file.
                  </li>
                  <li>
                    <strong>System Verification & Debugging:</strong> Demonstrate working UART output on real hardware, establish a robust platform for further RISCV system development and testing.
                  </li>
                  <li> <strong>Optimized High-Speed Data Transfer Architecture:</strong> Designed and integrated a custom DMA controller with a high-throughput data bus, drastically reducing latency and enabling rapid communication between the PicoRV32 core and peripheral interfaces for real-time processing. 
                  </li>
                </ul>
              </Text>
            </Column>
          )}
        </Column>
      </div>

      {/* CSS for hover effects */}
      <style jsx global>{`
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
      `}</style>
    </Column>
  );
}
