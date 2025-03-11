import { useState, useEffect } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";

export default function Project2() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if screen is under 768px (mobile)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Column gap="xl">
      {/* Header Section */}
      {isMobile ? (
        // MOBILE: Single column, no transforms
        <Column>
          <Heading variant="display-strong-l" style={{ marginBottom: "32px" }}>
            Project #2: Life-Cycle Testing for Satellite Electronics
          </Heading>
          <Text variant="body-default-l">
            My task was to improve and automate the life-cycle testing for satellite
            electronics. This project evaluated the long-term performance of satellite
            electronics under extreme conditions, studying the effects of month-long
            operation in varying heat and vacuum, as well as shake-testing, while
            implementing cost-effective communication methods.
          </Text>
        </Column>
      ) : (
        // DESKTOP: Original dual-column layout
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: "row", alignItems: "flex-start" }}
        >
          <Column style={{ width: "60%" }}>
            <Heading variant="display-strong-l" style={{ marginBottom: "32px" }}>
              Project #2: Life-Cycle Testing for Satellite Electronics
            </Heading>
            <Text variant="body-default-l">
              My task was to improve and automate the life-cycle testing for satellite
              electronics. This project evaluated the long-term performance of satellite
              electronics under extreme conditions, studying the effects of month-long
              operation in varying heat and vacuum, as well as shake-testing, while
              implementing cost-effective communication methods.
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
      )}

      {/* Show/Hide Details Button */}
      <Column style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setOpen(!open)} variant="secondary" size="m" arrowIcon>
          {open ? "Hide Details" : "Show Details"}
        </Button>
      </Column>

      {/* Accordion Content */}
      {open && (
        <Column gap="xl">
          {/* Section: Project Goals */}
          <Column style={{ width: "100%" }}>
            <Heading variant="display-strong-s" style={{ marginBottom: "16px" }}>
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
                  <strong>Automate Life-Cycle Testing:</strong> Improve and automate the
                  life-cycle testing process for satellite electronics to ensure efficient
                  and repeatable performance evaluation.
                </li>
                <li>
                  <strong>Evaluate Extended Operation:</strong> Assess electronics
                  performance over month-long operation under varying heat and vacuum
                  conditions to simulate the space environment.
                </li>
                <li>
                  <strong>Assess Mechanical Stress:</strong> Investigate the impact of
                  shake-testing on electronic behavior, identifying potential failure
                  points under mechanical stress.
                </li>
                <li>
                  <strong>Component-Level Analysis:</strong> Analyze specific component
                  performance within larger systems to pinpoint design optimizations.
                </li>
                <li>
                  <strong>Cost-Effective Testing:</strong> Implement innovative
                  communication strategies using CAN and RS422 to scale testing while
                  minimizing expenses.
                </li>
              </ul>
            </Text>
          </Column>

          {/* Section: Implementation Approach */}
          {isMobile ? (
            // MOBILE: single column, no large transforms, no negative margins
            <Column>
              <Heading variant="display-strong-s" style={{ marginBottom: "16px" }}>
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
                    <strong>Hardware Development:</strong> Designed and built an igniter
                    test box for testing each thruster igniter. The box utilized two LDR
                    sensors to verify spark generation and two gas discharge tubes to
                    emulate a spark gap, providing a controlled environment.
                  </li>
                  <li>
                    <strong>Software Integration:</strong> Developed custom software to
                    interface with the test box, packaging sensor readings and test data
                    into fixed-size packets with precise timing control.
                  </li>
                  <li>
                    <strong>Sideloading &amp; Test Suite:</strong> Created a sideloading
                    script and a GUI for test suite creation to directly load commands
                    into a YAMCS server, enabling real-time telemetry via RS422 and CAN.
                  </li>
                  <li>
                    <strong>Cost-Efficient Communication:</strong> Optimized testing by
                    daisy-chaining 10 controller nodes with a single CAN cable and using
                    RS422 cables to switch communication busses.
                  </li>
                </ul>
              </Text>
            </Column>
          ) : (
            // DESKTOP: original dual-column layout + transforms
            <Column
              horizontal="space-between"
              gap="l"
              style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
              <Column style={{ width: "55%" }}>
                <Heading variant="display-strong-s" style={{ marginBottom: "50px" }}>
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
                      <strong>Hardware Development:</strong> Designed and built an igniter
                      test box for testing each thruster igniter. The box utilized two LDR
                      sensors to verify spark generation and two gas discharge tubes to
                      emulate a spark gap, providing a controlled environment for
                      performance evaluation.
                    </li>
                    <li>
                      <strong>Software Integration:</strong> Developed custom software to
                      interface with the test box, packaging sensor readings and test data
                      into fixed-size packets (including headers and payloads) with
                      precise timing control.
                    </li>
                    <li style={{ marginTop: "200px" }}>
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
                  src="/images/igniter2.png"
                  alt="Igniter Setup"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    transform: "translateY(50px) translatex(70px) rotate(0deg)",
                    objectFit: "cover",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                    marginBottom: "-130px",
                  }}
                />
                <img
                  src="/images/GUI.png"
                  alt="Test Setup Diagram"
                  style={{
                    width: "200%",
                    borderRadius: "12px",
                    transform: "translate(0%, 74%) rotate(0deg)",
                    objectFit: "cover",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Column>
            </Column>
          )}

          {/* Section: Data Visualization & Integration */}
          {isMobile ? (
            // MOBILE: single column
            <Column style={{ marginTop: "24px" }}>
              <Heading variant="display-strong-s" style={{ marginBottom: "16px" }}>
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
                    <strong>Grafana Dashboard &amp; Alerting:</strong> Set up a local
                    Grafana dashboard using YAMCS as a data source for real-time
                    monitoring. Configured automated alerts to trigger for potential
                    failures (e.g. igniter LDR ADC voltage not changing).
                  </li>
                  <li>
                    <strong>Robust TCP Communication:</strong> Configured the Docker
                    environment for stable TCP channels between the test system and YAMCS.
                  </li>
                  <li>
                    <strong>Seamless Integration:</strong> Integrated hardware and
                    software for smooth command injection and telemetry gathering.
                  </li>
                </ul>
              </Text>
            </Column>
          ) : (
            // DESKTOP
            <Column
              horizontal="space-between"
              gap="l"
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: "70px",
              }}
            >
              <Column style={{ width: "55%", paddingRight: "40px" }}>
                <Heading variant="display-strong-s" style={{ marginBottom: "30px" }}>
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
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Grafana Dashboard &amp; Alerting:</strong> Set up a local
                      Grafana dashboard using YAMCS as a data source for real-time
                      monitoring. Configured automated alerts to trigger when critical
                      conditions were met (e.g., igniter LDR ADC voltage not changing).
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Robust TCP Communication:</strong> Configured the Docker
                      environment to support stable TCP channels for reliable data
                      transfer between the test system and the YAMCS server.
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Seamless Integration:</strong> Integrated hardware and
                      software components to enable smooth command injection and effective
                      telemetry gathering.
                    </li>
                  </ul>
                </Text>
              </Column>
              <Column style={{ width: "40%", gap: "20px" }}>
                <img
                  src="/images/GRAFANA2.png"
                  alt="Grafana Dashboard"
                  style={{
                    width: "200%",
                    borderRadius: "12px",
                    objectFit: "cover",
                    transform: "translate(-8%, 40%)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}   
                />
              </Column>
            </Column>
          )}

          {/* Section: Results & Conclusions */}
          {isMobile ? (
            // MOBILE: single column
            <Column style={{ marginTop: "24px" }}>
              <Heading variant="display-strong-m" style={{ marginBottom: "24px" }}>
                Results &amp; Conclusions
              </Heading>
              <Text variant="body-default-l">
                <ul>
                  <li style={{ marginBottom: "24px" }}>
                    <strong>Reliable Data Transmission:</strong>
                    <br />
                    Achieved consistent, low-latency communication through precise data
                    packaging. Continuous Grafana monitoring (with automated alerts) ensured
                    immediate detection of anomalies.
                  </li>
                  <li style={{ marginBottom: "24px" }}>
                    <strong>Robust Integration &amp; Monitoring:</strong>
                    <br />
                    The seamless blend of software, hardware, and real-time visualization
                    provided by Grafana ensured reliability under extreme conditions.
                  </li>
                  <li style={{ marginBottom: "24px" }}>
                    <strong>Scalable &amp; Cost-Effective Testing:</strong>
                    <br />
                    CAN + RS422 in a daisy-chained configuration enabled efficient, low-cost
                    expansion.
                  </li>
                </ul>
              </Text>
            </Column>
          ) : (
            // DESKTOP
            <Column
              horizontal="space-between"
              gap="l"
              style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
              <Column style={{ width: "55%" }}>
                <Heading variant="display-strong-m" style={{ marginBottom: "24px" }}>
                  Results &amp; Conclusions
                </Heading>
                <Text variant="body-default-l" style={{ marginTop: "40px" }}>
                  <ul>
                    <li style={{ marginBottom: "100px" }}>
                      <strong>Reliable Data Transmission:</strong>
                      <br />
                      Achieved consistent, low-latency communication through precise data
                      packaging and robust networking. Continuous monitoring via Grafana,
                      with automated alerts when sensor values remain static, ensured
                      immediate detection of anomalies.
                    </li>
                    <li style={{ marginBottom: "100px", marginTop: "24px" }}>
                      <strong>Robust Integration &amp; Monitoring:</strong>
                      <br />
                      The seamless blend of custom software, specialized hardware, and
                      real-time visualization provided reliability under extreme conditions.
                      Alerts in Grafana further enhanced our ability to address potential
                      failures promptly.
                    </li>
                    <li style={{ marginBottom: "12px", marginTop: "24px" }}>
                      <strong>Scalable &amp; Cost-Effective Testing:</strong>
                      <br />
                      Innovative use of CAN and RS422 in a daisy-chained configuration
                      enabled us to scale testing efficiently while keeping costs minimal.
                    </li>
                  </ul>
                </Text>
              </Column>
              <Column style={{ width: "40%", gap: "30px" }}>
                <img
                  src="/images/grafanaTHR.png"
                  alt="Results Graph 1"
                  style={{
                    width: "150%",
                    borderRadius: "12px",
                    transform: "translateY(140px)",
                    objectFit: "cover",
                  }}
                />
                <img
                  src="/images/grafanaTKFL.png"
                  alt="Results Graph 2"
                  style={{
                    width: "150%",
                    borderRadius: "12px",
                    transform: "translateY(140px)",
                    objectFit: "cover",
                  }}
                />
                <img
                  src="/images/grafanaADCIN.png"
                  alt="ADC Input Readings"
                  style={{
                    width: "150%",
                    borderRadius: "12px",
                    transform: "translateY(140px)",
                    objectFit: "cover",
                  }}
                />
              </Column>
            </Column>
          )}

          {/* Final Thoughts */}
          <Column style={{ width: "100%" }}>
            <Heading variant="display-strong-s" style={{ marginBottom: "16px" }}>
              Final Thoughts:
            </Heading>
            <Text variant="body-default-l">
              This project successfully demonstrated a reliable framework for long-term
              life-cycle testing of satellite electronics. By improving and automating the
              testing process, I provided critical insights into the performance of the
              new REV-D components under extreme conditions. The integrated monitoring
              via Grafana—with multiple automated alerts for sensor anomalies—ensured that
              any deviations were detected promptly. Overall, this work had a significant
              impact on the company by validating component reliability and informing
              further design improvements for high-performance applications.
            </Text>
          </Column>
        </Column>
      )}
    </Column>
  );
}
