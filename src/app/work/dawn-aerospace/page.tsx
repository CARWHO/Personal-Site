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
      {/* Title Section */}
      <Column gap="m" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          width: '600px', // Wider to show full plane
          height: '150px', // Taller to show full plane
          top: '20%', // Center vertically
          left: '83%', // Move more to the left
          transform: 'translate(-50%, -50%) rotate(-5deg)', // Centers the image and adds slight rotation
          opacity: 1.0,
          zIndex: 0,
          backgroundImage: 'url("/images/Dawn+Mk-II+Aurora+Flight.png")',
          backgroundSize: 'cover', // Changed to cover to fill the specified dimensions
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0px',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Heading variant="display-strong-l">
            Dawn Aerospace Internship: 400 Hours in In-Space Propulsion
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
          and aerospace applications. My role as a Software Engineer Intern allowed me to
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

      {/* Company Overview */}
      <Column gap="l">
        <Heading variant="display-strong-s">Company Overview</Heading>
        <Text variant="body-default-l">
          Dawn Aerospace operates internationally with facilities in New Zealand, the
          Netherlands, and the United States. The company specializes in developing
          sustainable, high-performance propulsion systems and satellite communication software.
          Their products range from green propellant thrusters to suborbital spaceplanes.
        </Text>
      </Column>

      {/* Role & Responsibilities */}
      <Column gap="l">
        <Heading variant="display-strong-s">My Role & Responsibilities</Heading>
        <Text variant="body-default-l">
          As part of the ISP (in-space propulsion) software team, I worked on testing and
          developing components critical to satellite propulsion. My key responsibilities
          included:
        </Text>
        <Column as="ul" gap="s">
          <Text as="li" variant="body-default-l">
            Working on satellite communication software and hardware to validate propulsion components.
          </Text>
          <Text as="li" variant="body-default-l">
            Participating in code maintenance, software builds, and integration testing.
          </Text>
          <Text as="li" variant="body-default-l">
            Reworking the DawnLink codebase to enable Windows compatibility (previously Linux-only).
          </Text>
          <Text as="li" variant="body-default-l">
            Creating comprehensive documentation—user guides and installation manuals—for internal tools.
          </Text>
          <Text as="li" variant="body-default-l">
            Assisting in the setup and monitoring of thruster test rigs, ensuring precise sensor data capture.
          </Text>
        </Column>
      </Column>

      {/* Tools, Workflow & Collaboration */}
      <Column gap="l">
        <Heading variant="display-strong-s">Tools, Workflow & Collaboration</Heading>
        <Text variant="body-default-l">
          My day-to-day work was highly collaborative. I coordinated with senior software and electrical engineers,
          data scientists, and project managers through agile stand-ups and daily check-ins. We used tools such as Wrike for
          project management, Slack for quick communications, and a suite of engineering tools (VS Code, SolidWorks, KiCad,
          and 3D printers) to prototype and test our systems.
        </Text>
      </Column>

      {/* Test Jigs & Equipment */}
      <Column gap="l">
        <Heading variant="display-strong-s">Test Jigs & Equipment</Heading>
        <Text variant="body-default-l">
          Integral to our quality assurance were custom-built test jigs used for rigorous propulsion component evaluation.
          These setups allowed us to simulate in-space conditions and continuously iterate on design improvements.
        </Text>
        <img
          src="/images/spaceplane2.png"
          alt="Dawn Aerospace workshop and spaceplane"
          style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
        />
      </Column>

      {/* CubeDrive Satellite Testing */}
      <Column gap="l">
        <Heading variant="display-strong-s">CubeDrive Satellite Testing</Heading>
        <Text variant="body-default-l">
          One of the most engaging parts of my internship was testing the CubeDrive satellite system. I assisted
          in the evaluation of propulsion and communication systems under simulated in-space conditions, ensuring that
          every component performed reliably.
        </Text>
        <img
          src="/images/spaceplane2.png"
          alt="Dawn Aerospace workshop and spaceplane"
          style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
        />
      </Column>

      {/* Reflections & Key Learnings */}
      <Column gap="l">
        <Heading variant="display-strong-s">Reflections & Key Learnings</Heading>
        <Text variant="body-default-l">
          This hands-on experience allowed me to bridge the gap between academic theory and practical engineering.
          I gained valuable insights into hardware-software integration, agile problem-solving, and the importance
          of detailed documentation and cross-functional collaboration in a fast-paced aerospace environment.
        </Text>
        <Text variant="body-default-l">
          Overall, my time at Dawn Aerospace not only solidified my passion for engineering and innovation but also
          prepared me for future challenges in the aerospace sector.
        </Text>
      </Column>
    </Column>
  );
}
