"use client";
import { useState, useEffect } from "react";
import { Column, Heading, Text, Button, Dialog } from "@/once-ui/components";
import styles from "../work.module.scss";

export default function FpgaRiscvCpu() {
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
          FPGA RISC-V CPU
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak" style={{ alignSelf: "flex-start" }}>
          Project Lead, March 2025 - Present
        </Text>
        <Text variant="body-default-l" style={{ marginTop: "16px" }}>
          Researching efficient RISC-V (picorv32) CPU implementations on FPGAs with Dr. Romain Arnal, optimizing both performance and energy efficiency. We look forward to publishing our findings by the end of the year.
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
          src="/images/CPUfpgaKahu.png"
          alt="FPGA RISC-V CPU"
          style={{
            width: "72%",
            borderRadius: "12px",
            objectFit: "cover",
            transform: "none",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      ) : (
        // DESKTOP STYLES: matched with HaloVision
        <img
          src="/images/CPUfpgaKahu.png"
          alt="FPGA RISC-V CPU"
          style={{
            width: "60%",
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
        title="Report in Progress"
        width={75} // Reduced by 25% from 100
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
