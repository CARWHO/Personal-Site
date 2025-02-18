import { useState } from "react";
import { Column, Heading, Text } from "@/once-ui/components";

export default function Project2() {
  const [open, setOpen] = useState(false);

  return (
    <Column gap="xl">
      {/* Header Section */}
      <Column
        horizontal="space-between"
        gap="l"
        style={{ flexDirection: "row", alignItems: "flex-start" }}
      >
        <Column style={{ width: "60%" }}>
          <Heading
            variant="display-strong-l"
            style={{ marginBottom: "32px" }}
          >
            Project #2: Life-Cycle Testing for Satellite Electronics
          </Heading>
          <Text variant="body-default-l">
            This project evaluated the long-term performance of satellite
            electronics under extreme conditions. We studied the effects of
            month-long usage in varying heat and vacuum, as well as shake-testing,
            while implementing cost-effective communication methods.
          </Text>
        </Column>
        <img
          src="/images/life-cycle2.png"
          alt="Satellite Electronics Testing"
          style={{
            width: "35%",
            borderRadius: "12px",
            objectFit: "cover",
            transform: "translateY(30px) rotate(10deg)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Column>

      {/* Toggle Details Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 16px",
          fontSize: "16px",
          borderRadius: "4px",
          cursor: "pointer",
          alignSelf: "center",
        }}
      >
        {open ? "Hide Details" : "Show Details"}
      </button>

      {/* Accordion Content */}
      {open && (
        <Column gap="xl">
          {/* Section: Project Goals */}
          <Column style={{ width: "100%" }}>
            <Heading
              variant="display-strong-s"
              style={{ marginBottom: "16px" }}
            >
              Project Goals:
            </Heading>
            <Text variant="body-default-l">
              <ul
                style={{
                  listStyleType: "disc",
                  margin: "0 auto",
                  paddingLeft: "20px",
                }}
              >
                <li>
                  Evaluate electronics performance over month-long operation in
                  varying heat and vacuum conditions.
                </li>
                <li>
                  Assess the impact of shake-testing on electronic behavior.
                </li>
                <li>
                  Investigate specific component performance within larger
                  systems.
                </li>
                <li>
                  Achieve cost-effective testing using CAN and RS422 communications.
                </li>
              </ul>
            </Text>
          </Column>

          {/* Section: Implementation Approach */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Column style={{ width: "55%" }}>
              <Heading
                variant="display-strong-s"
                style={{ marginBottom: "16px" }}
              >
                Implementation Approach:
              </Heading>
              <Text variant="body-default-l">
                <ul
                  style={{
                    listStyleType: "disc",
                    margin: "0 auto",
                    paddingLeft: "20px",
                  }}
                >
                  <li>
                    <strong>Custom Data Packaging:</strong> Developed software for an
                    igniter text box that packages data into fixed-size packets
                    (header, payload, etc.) with precise timing control.
                  </li>
                  <li>
                    <strong>Sideloading &amp; Test Suite:</strong> Created a sideloading
                    script and a GUI for test suite creation to directly load commands
                    into a YAMCS server, enabling real-time telemetry via RS422 and CAN.
                  </li>
                  <li>
                    <strong>Cost-Efficient Communication:</strong> Optimized testing by
                    daisy-chaining 10 controller nodes with a single CAN cable and using
                    RS422 cables (non-daisy chained) to switch communication busses.
                  </li>
                </ul>
              </Text>
            </Column>
            <Column style={{ width: "40%" }}>
              <img
                src="/images/lifecycle.jpeg"
                alt="Test Setup Diagram"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Column>
          </Column>

          {/* Section: Data Visualization & Integration */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Column style={{ width: "55%" }}>
              <Heading
                variant="display-strong-s"
                style={{ marginBottom: "16px" }}
              >
                Data Visualization &amp; Integration:
              </Heading>
              <Text variant="body-default-l">
                <ul
                  style={{
                    listStyleType: "disc",
                    margin: "0 auto",
                    paddingLeft: "20px",
                  }}
                >
                  <li>
                    Set up a local Grafana dashboard using YAMCS as a data source for
                    real-time monitoring.
                  </li>
                  <li>
                    Configured TCP settings in Docker to ensure 100% successful packet
                    delivery.
                  </li>
                  <li>
                    Integrated hardware and software components to enable seamless
                    command injection and telemetry gathering.
                  </li>
                </ul>
              </Text>
            </Column>
            <Column style={{ width: "40%", gap: "20px" }}>
            </Column>
          </Column>

          {/* Section: Results & Conclusions */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Column style={{ width: "55%" }}>
              <Heading
                variant="display-strong-m"
                style={{ marginBottom: "24px" }}
              >
                Results &amp; Conclusions
              </Heading>
              <Text variant="body-default-l">
                <ul>
                  <li>
                    <strong>Reliable Data Transmission:</strong>
                    <br />
                    Achieved consistent, low-latency communication, validating our
                    real-time data handling strategy.
                  </li>
                  <li style={{ marginTop: "24px" }}>
                    <strong>Robust Integration:</strong>
                    <br />
                    The seamless blend of custom software, efficient hardware setups,
                    and real-time visualization ensured system reliability under
                    extreme conditions.
                  </li>
                  <li style={{ marginTop: "24px" }}>
                    <strong>Scalable &amp; Cost-Effective:</strong>
                    <br />
                    Utilizing CAN and RS422 in a daisy-chained configuration proved
                    effective for scaling tests while minimizing expenses.
                  </li>
                </ul>
              </Text>
            </Column>
            <Column style={{ width: "40%", gap: "30px" }}>
              <img
                src="/images/1.png"
                alt="Results Graph 1"
                style={{
                  width: "120%",
                  borderRadius: "12px",
                  transform: "translateY(150px)",
                  objectFit: "cover",
                }}
              />
              <img
                src="/images/4.png"
                alt="Results Graph 2"
                style={{
                  width: "120%",
                  borderRadius: "12px",
                  transform: "translateY(180px)",
                  objectFit: "cover",
                }}
              />
            </Column>
          </Column>

          {/* Final Thoughts */}
          <Column style={{ width: "100%" }}>
            <Heading variant="display-strong-s" style={{ marginBottom: "16px" }}>
              Final Thoughts:
            </Heading>
            <Text variant="body-default-l">
              This project successfully demonstrated a reliable framework for
              long-term life-cycle testing of satellite electronics. By merging
              real-time data handling with robust communication protocols and a
              cost-effective hardware approach, we created a system that informs
              future FPGA-based designs and high-performance applications.
            </Text>
          </Column>
        </Column>
      )}
    </Column>
  );
}
