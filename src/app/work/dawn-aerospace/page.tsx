'use client';
import { Column, Heading, Text, SmartImage, Input } from "@/once-ui/components";
import ImageControl from "@/components/ImageControl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DawnAerospace() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/check-auth");
      if (response.ok) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <Column maxWidth="xs" gap="xl" horizontal="center" paddingY="xl">
        <Column gap="m">
          <Heading variant="display-strong-l">Protected Content</Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            Please enter the password to view this content
          </Text>
        </Column>
        <Input
          id="password"
          type="password"
          label="Password"
          onChange={(e) => {
            fetch("/api/authenticate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password: e.target.value }),
            });
          }}
        />
      </Column>
    );
  }

  return (
    <Column maxWidth="m" gap="xl" padding="xl">
      {/* --- Existing content above remains UNCHANGED --- */}
      {/* Title Section */}
      <Column gap="m" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '150px',
          top: '20%',
          left: '83%',
          transform: 'translate(-50%, -50%) rotate(-5deg)',
          opacity: 1.0,
          zIndex: 0,
          backgroundImage: 'url("/images/Dawn+Mk-II+Aurora+Flight.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0px',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Heading variant="display-strong-l">
            Dawn Aerospace Electrical Engineering
          </Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            Spacecraft Propulsion Development Intern
          </Text>
        </div>
      </Column>

      {/* Introduction */}
      <Column gap="l">
        <Text variant="body-default-l">
          Over a three-month period, I completed a 400-hour internship at Dawn Aerospace,
          a company dedicated to advancing in-space propulsion technology for satellites
          and aerospace applications. My role as a Electrical Engineering Intern allowed me to
          dive into both software and hardware aspects—bridging theory with real-world
          satellite operations.
        </Text>
        <ImageControl
          images={[
            {
              src: "/images/spaceplane2.png",
              alt: "Dawn Aerospace workshop and spaceplane",
              position: { x: 130, y: 130 },
              dimensions: { width: 70, height: 400 },
              opacity: 1,
              zIndex: 4,
              rotation: 0
            },
            {
              src: "/images/igniter.jpeg",
              alt: "Igniter setup",
              position: { x: 450, y: 100 },
              dimensions: { width: 50, height: 200 },
              opacity: 0.7,
              zIndex: 3,
              rotation: 10
            },
            {
              src: "/images/safetygear.png",
              alt: "Wearing safety gear in the workshop",
              position: { x: -100, y: 170 },
              dimensions: { width: 60, height: 350 },
              opacity: 0.6,
              zIndex: 2,
              rotation: 10
            },
            {
              src: "/images/feedlinetestjig.jpeg",
              alt: "Feedline test jig setup",
              position: { x: 400, y: 390 },
              dimensions: { width: 50, height: 200 },
              opacity: 0.5,
              zIndex: 1,
              rotation: -5
            },
            {
              src: "/images/grafana.png",
              alt: "Grafana",
              position: { x: 150, y: 20 },
              dimensions: { width: 50, height: 200 },
              opacity: 1.0,
              zIndex: 3,
              rotation: -4
            },
          ]}
        />
      </Column>

      {/* --- NEW CONTENT BEGINS HERE --- */}
      <Column gap="xl">

        {/* Row #1: Title (left) + Image (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <Column style={{ width: '55%' }}>
            <Heading variant="display-strong-l">Project #1 Feedline Characterization</Heading>
            <Text variant="body-default-l">
              At Dawn Aerospace, I led the Feedline Characterization project, which aimed to
              develop a deeper understanding of the feedline’s thermal and electrical performance.
            </Text>
          </Column>
          <SmartImage
            src="/images/1.png"
            alt="Feedline Characterization Banner"
            style={{ width: '40%' }}
          />
        </Column>

        {/* Row #2: Image (left) + Text (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <SmartImage
            src="/images/2.png"
            alt="Primary Goals Diagram"
            style={{ width: '40%' }}
          />
          <Column style={{ width: '55%' }}>
            <Text variant="body-default-l">
              <strong>The primary goals were:</strong>
            </Text>
            <Text variant="body-default-l">
              <ul>
                <li>
                  <strong>Data Acquisition and Control:</strong><br />
                  Establish a connection from the feedline to a custom GUI to both read data and control the system.
                </li>
                <li>
                  <strong>Heat Transfer Analysis:</strong><br />
                  Log the fluid temperature increase from start to end; correlate heater activations with changes in fluid temperature.
                </li>
                <li>
                  <strong>Thermal Loss Assessment:</strong><br />
                  Measure temperature at multiple points along the feedline to compare input vs. output temperatures and assess thermal losses.
                </li>
                <li>
                  <strong>Sensor Comparison:</strong><br />
                  Record simultaneous readings from thermocouples and RTDs, analyzing their accuracy and response times.
                </li>
                <li>
                  <strong>Heater Power Consumption:</strong><br />
                  Monitor voltage, current, and power draw to ensure efficient energy use.
                </li>
              </ul>
            </Text>
          </Column>
        </Column>

        {/* Row #3: Text (left) + Image (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <Column style={{ width: '55%' }}>
            <Text variant="body-default-l">
              <strong>To achieve these objectives, I undertook the following tasks:</strong>
            </Text>
            <Text variant="body-default-l">
              <ol style={{ paddingLeft: '1em' }}>
                <li>
                  <strong>Test Jig Development:</strong><br />
                  ○ Designed and built a custom test jig baseplate, incorporating 3D-printed components. 
                  All parts were certified for operation within a vacuum chamber, ensuring compatibility 
                  with our experimental environment.
                </li>
                <br />
                <li>
                  <strong>Safe Integration in Vacuum Environment:</strong><br />
                  ○ Engineered and produced specialized cables designed to safely interface within 
                  the vacuum chamber, maintaining system integrity and performance.
                </li>
                <br />
                <li>
                  <strong>Software Development &amp; Systems Integration:</strong><br />
                  Developed a bespoke GUI to interface with the feedline peripherals—including the thruster 
                  and tank electronics—and the main controller node. Simultaneously, set up a local YAMCS server 
                  on Windows, which required refactoring DawnLink from Linux to Windows. These combined efforts 
                  streamlined data collection and control operations while ensuring seamless integration with 
                  existing systems.
                </li>
              </ol>
            </Text>
          </Column>
          <SmartImage
            src="/images/3.png"
            alt="Implementation Diagram"
            style={{ width: '40%' }}
          />
        </Column>

        {/* Row #4: Title & partial text (left) + Image (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <Column style={{ width: '55%' }}>
            <Heading variant="display-strong-m">Results and analysis from testing</Heading>
            <Text variant="body-default-l">
              1. <strong>Fluid Temperature Increase with Heater Activation</strong><br />
              <em>Graph: “Fluid Temperature Increase with Heater Activation”</em><br />
              ○ The graph plots fluid temperature against time, showing a clear increase once the heater is activated.<br />
              ○ <strong>Key Insight:</strong> The temperature curve confirms successful correlation between heater 
              activation and fluid temperature rise, validating our heat transfer analysis goals.
            </Text>
            <Text variant="body-default-l">
              2. <strong>Temperature Losses Along the Feedline</strong><br />
              <em>Graph: “Temperature Losses Along the Feedline”</em><br />
              ○ This plot compares input and output temperatures at multiple points along the straight section.<br />
              ○ <strong>Key Insight:</strong> A progressive drop in temperature indicates where thermal losses are 
              most significant, helping refine insulation and design strategies for improved heat retention.
            </Text>
          </Column>
          <SmartImage
            src="/images/4.png"
            alt="Results Graph 1"
            style={{ width: '40%' }}
          />
        </Column>

        {/* Row #5: Image (left) + partial text (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <SmartImage
            src="/images/5.png"
            alt="Results Graph 2"
            style={{ width: '40%' }}
          />
          <Column style={{ width: '55%' }}>
            <Text variant="body-default-l">
              3. <strong>Thermocouple vs. RTD Comparison</strong><br />
              <em>Graph: “Thermocouple vs. RTD Comparison”</em><br />
              ○ Scatter points show readings from thermocouples versus RTDs, with an ideal 1:1 reference line.<br />
              ○ <strong>Key Insight:</strong> The close clustering around the diagonal suggests that both sensor 
              types provide consistent measurements. Minor deviations highlight potential calibration offsets 
              or response time differences, guiding future sensor selection and calibration practices.
            </Text>
            <Text variant="body-default-l">
              4. <strong>Heater Power Consumption</strong><br />
              <em>Graph: “Heater Power Consumption”</em><br />
              ○ Voltage, current, and power are plotted over time. Noticeable jumps in current and power 
              align with heater activation.<br />
              ○ <strong>Key Insight:</strong> By tracking real-time power usage, we can evaluate the efficiency 
              of the heating system and ensure safe operating parameters. This data is also valuable for 
              refining power budgets in flight systems.
            </Text>
          </Column>
        </Column>

        {/* Row #6: Text (left) + Image (right) */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <Column style={{ width: '55%' }}>
            <Heading variant="display-strong-m">Conclusions</Heading>
            <Text variant="body-default-l">
              • <strong>Data Acquisition &amp; Control:</strong> The custom GUI and vacuum-safe hardware setup enabled 
              seamless data logging and system control, meeting the first project objective.
            </Text>
            <Text variant="body-default-l">
              • <strong>Thermal Performance:</strong> The fluid temperature profiles and feedline loss measurements 
              confirm that the heater effectively raises fluid temperature, while also pinpointing areas of significant 
              thermal loss.
            </Text>
            <Text variant="body-default-l">
              • <strong>Sensor Validation:</strong> Simultaneous readings from thermocouples and RTDs validate that both 
              sensor types offer reliable data, with minor variations that can be addressed through calibration.
            </Text>
            <Text variant="body-default-l">
              • <strong>Power Monitoring:</strong> The integrated monitoring of voltage, current, and power consumption 
              completes a holistic view of the heater’s operational profile, helping refine system-level power management.
            </Text>
            <Text variant="body-default-l">
              • <strong>Project Integration:</strong> All software and hardware contributions were incorporated into the 
              Dawn Aerospace ISP release, making these capabilities available to internal teams and external customers.
            </Text>
            <Text variant="body-default-l">
              Through this project, we achieved a deeper understanding of the feedline’s behavior under operational 
              conditions. The collected data not only verifies the effectiveness of our thermal management strategies 
              but also informs future design optimizations for improved performance and reliability.
            </Text>
          </Column>
          <SmartImage
            src="/images/6.png"
            alt="Conclusions Diagram"
            style={{ width: '40%' }}
          />
        </Column>

        {/* If you still have images 7.png and 8.png left, add more rows in the same alternating style */}
        <Column
          horizontal="space-between"
          gap="l"
          style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <SmartImage
            src="/images/7.png"
            alt="Extra Graph or Diagram"
            style={{ width: '40%' }}
          />
          <SmartImage
            src="/images/8.png"
            alt="Another Extra Graph or Diagram"
            style={{ width: '40%' }}
          />
        </Column>
      </Column>
    </Column>
  );
}
