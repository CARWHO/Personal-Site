import { useState } from "react";
import { Column, Heading, Text } from "@/once-ui/components";

export default function Project1() {
  const [open, setOpen] = useState(false);

  return (
    <Column gap="xl">
      {/* Always visible header */}
      <Column
        horizontal="space-between"
        gap="l"
        style={{ flexDirection: 'row', alignItems: 'flex-start' }}
      >
        <Column style={{ width: '55%' }}>
          <Heading variant="display-strong-l" style={{ marginBottom: '32px' }}>
            Project #1 Feedline Characterization
          </Heading>
          <Text variant="body-default-l">
            At Dawn Aerospace, I led the Feedline Characterization project, which aimed to
            develop a deeper understanding of the feedline’s thermal and electrical performance.
          </Text>
        </Column>
        <img
          src="/images/sp1.png"
          alt="Feedline System"
          style={{ 
            width: '50%',
            borderRadius: '12px',
            objectFit: 'cover',
            transform: 'translateY(30px) rotate(-15deg)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}
        />
      </Column>

      {/* Show/Hide Details Button */}
      <Column style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={() => setOpen(!open)}
          variant="secondary"
          size="m"
          arrowIcon
        >
          {open ? "Hide Details" : "Show Details"}
        </Button>
      </Column>

      {/* Accordion content - only rendered when open */}
      {open && (
        <Column gap="xl">
          {/* Row #2: The primary goals were: section */}
          <Column style={{ width: '100%' }}>
            <Text variant="display-strong-s" style={{ marginBottom: '16px' }}>
              The primary goals were:
            </Text>
            <Text variant="body-default-l">
              <ul style={{ listStyleType: 'disc', margin: '0 auto', paddingLeft: '20px' }}>
                <li>
                  <strong>Data Acquisition and Control:</strong><br />
                  Establish a connection from the feedline to a custom GUI for reading and controlling the system.
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

          {/* New Row: "To achieve these objectives..." */}
          <Column style={{ width: '100%', marginBottom: '-30px' }}>
            <Heading variant="display-strong-s">
              To achieve these objectives, I undertook the following tasks:
            </Heading>
          </Column>

          {/* Row #3: Text (left) + Images (right) */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <Column style={{ width: '55%' }}>
              <Text variant="body-default-l">
                <ul style={{ paddingLeft: '1em' }}>
                  <li style={{ transform: 'translateY(-20px)' }}>
                    <strong>Test Jig Development:</strong><br />
                    Designed and built a custom test jig baseplate, incorporating 3D-printed components. All parts were certified for operation within a vacuum chamber, ensuring compatibility with our experimental environment.
                  </li>
                  <li style={{ transform: 'translateY(120px)' }}>
                    <strong>Safe Integration in Vacuum Environment:</strong><br />
                    Engineered and produced specialized cables designed to safely interface within the vacuum chamber, maintaining system integrity and performance.
                  </li>
                  <li style={{ transform: 'translateY(250px)' }}>
                    <strong>Software Development &amp; Systems Integration:</strong><br />
                    Developed a bespoke GUI to interface with feedline peripherals (thruster, tank electronics) and the main controller node, and set up a local YAMCS server. Together, these efforts streamlined data collection and control while ensuring seamless system integration.
                  </li>
                </ul>
              </Text>
            </Column>
            <Column style={{ width: '40%', gap: '70px' }}>
              <img
                src="/images/feedlinetestjig.jpeg"
                alt="Implementation Diagram"
                style={{ 
                  width: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  transform: 'translateY(-20px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              />
              <img
                src="/images/cable.png"
                alt="Implementation Diagram"
                style={{ 
                  width: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  transform: 'translateY(-30px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              />
              <img
                src="/images/feedlinetestjig.jpeg"
                alt="Implementation Diagram"
                style={{ 
                  width: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              />
            </Column>
          </Column>

          {/* Row #4: Title & partial text (left) + Images (right) */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <Column style={{ width: '55%' }}>
              <Heading variant="display-strong-m" style={{ marginBottom: '24px' }}>
                Results and analysis from testing
              </Heading>
              <Text variant="body-default-l" style={{ marginBottom: '24px' }}>
                <ul>
                  <li>
                    <strong>Fluid Temperature Increase with Heater Activation</strong><br />
                    <em>Graph: “Fluid Temperature Increase with Heater Activation”</em><br />
                    The graph plots fluid temperature against time, showing a clear increase once the heater is activated.<br />
                    <strong>Key Insight:</strong> The temperature curve confirms successful correlation between heater activation and fluid temperature rise, validating our heat transfer analysis goals.
                  </li>
                  <li style={{ marginTop: '24px', marginBottom: '24px' }}>
                    <strong>Temperature Losses Along the Feedline</strong><br />
                    <em>Graph: “Temperature Losses Along the Feedline”</em><br />
                    This plot compares input and output temperatures at multiple points along the straight section.<br />
                    <strong>Key Insight:</strong> A progressive drop in temperature indicates where thermal losses are most significant, helping refine insulation and design strategies for improved heat retention.
                  </li>
                </ul>
              </Text>
            </Column>
            <Column style={{ width: '40%', gap: '30px' }}>
              <img
                src="/images/1.png"
                alt="Results Graph 2"
                style={{ 
                  width: '120%',
                  borderRadius: '12px',
                  transform: 'translateY(200px)',
                  objectFit: 'cover'
                }}
              />
              <img
                src="/images/4.png"
                alt="Results Graph 3"
                style={{ 
                  width: '120%',
                  borderRadius: '12px',
                  transform: 'translateY(240px)',
                  objectFit: 'cover'
                }}
              />
            </Column>
          </Column>

          {/* Row #5: Image (left) + partial text (right) */}
          <Column
            horizontal="space-between"
            gap="l"
            style={{ flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <Column style={{ width: '40%', gap: '10px' }}>
              <img
                src="/images/3.png"
                alt="Results Graph 2"
                style={{ 
                  width: '90%',
                  borderRadius: '12px',
                  transform: 'translateY(0px)',
                  objectFit: 'cover'
                }}
              />
              <img
                src="/images/2.png"
                alt="Results Graph 3"
                style={{ 
                  width: '120%',
                  transform: 'translateY(40px) translateX(-103px)',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
            </Column>
            <Column style={{ width: '55%' }}>
              <Text variant="body-default-l">
                <ul>
                  <li>
                    <strong>Thermocouple vs. RTD Comparison</strong><br />
                    <em>Graph: “Thermocouple vs. RTD Comparison”</em><br />
                    Scatter points show readings from thermocouples versus RTDs, with an ideal 1:1 reference line.<br />
                    <strong>Key Insight:</strong> The close clustering around the diagonal suggests that both sensor types provide consistent measurements. Minor deviations highlight potential calibration offsets or response time differences, guiding future sensor selection and calibration practices.
                  </li>
                  <li style={{ marginTop: '30px' }}>
                    <strong>Heater Power Consumption</strong><br />
                    <em>Graph: “Heater Power Consumption”</em><br />
                    Voltage, current, and power are plotted over time. Noticeable jumps in current and power align with heater activation.<br />
                    <strong>Key Insight:</strong> By tracking real-time power usage, we can evaluate the efficiency of the heating system and ensure safe operating parameters. This data is also valuable for refining power budgets in flight systems.
                  </li>
                </ul>
              </Text>
            </Column>
          </Column>

          {/* Row #6: Full-width Conclusions */}
          <Column style={{ width: '100%' }}>
            <Text variant="display-strong-s" style={{ marginBottom: '16px' }}>
              Conclusion:
            </Text>
            <ul>
              <li>
                <strong>Data Acquisition &amp; Control:</strong> The custom GUI and vacuum-safe hardware setup enabled seamless data logging and system control, meeting the first project objective.
              </li>
              <li>
                <strong>Thermal Performance:</strong> The fluid temperature profiles and feedline loss measurements confirm that the heater effectively raises fluid temperature, while also pinpointing areas of significant thermal loss.
              </li>
              <li>
                <strong>Sensor Validation:</strong> Simultaneous readings from thermocouples and RTDs validate that both sensor types offer reliable data, with minor variations that can be addressed through calibration.
              </li>
              <li>
                <strong>Power Monitoring:</strong> The integrated monitoring of voltage, current, and power consumption completes a holistic view of the heater’s operational profile, helping refine system-level power management.
              </li>
              <li>
                <strong>Project Integration:</strong> All software and hardware contributions were incorporated into the Dawn Aerospace ISP release, making these capabilities available to internal teams and external customers.
              </li>
            </ul>
          </Column>
        </Column>
      )}
    </Column>
  );
}
