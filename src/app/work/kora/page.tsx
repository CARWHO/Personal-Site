'use client';
import { useState } from "react";
import { Column, Heading, Text, Button } from "@/once-ui/components";

export default function Kora() {
  const [open, setOpen] = useState(false);

  // Updated lighter blue for links
  const linkStyle = {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#66B3FF'
  };

  return (
    <Column maxWidth="m" gap="xl" padding="xl">
      {/* Title + Logo Section */}
      <Column
        horizontal="space-between"
        style={{ flexDirection: 'row', alignItems: 'center' }}
        gap="m"
      >
        <Column gap="s">
          <Heading variant="display-strong-l">KORA</Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            Founder &amp; Developer
          </Text>
        </Column>
        <img
          src="/images/KoraSymbol23.png"
          alt="KORA Logo"
          style={{
            width: '120px',
            height: 'auto',
            borderRadius: '4px'
          }}
        />
      </Column>

      {/* Horizontal layout for Summary Text and Meet the Team */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left Column: Two main text sections */}
        <Column gap="l" style={{ flex: 1 }}>
          <Text variant="body-default-l">
            KORA is an AI-powered platform revolutionizing education with its smart LMS plugin. Powered by cutting-edge Retrieval-Augmented Generation (RAG), KORA delivers laser-precise, up-to-date content by tapping directly into university databases—keeping curriculum dynamic for over 200 daily active users.
          </Text>
          <Text variant="body-default-l">
            Explore more:&nbsp;
            <a
              href="https://kora.ac"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              kora.ac
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://blog.kora.ac"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              blog.kora.ac
            </a>
          </Text>
        </Column>

        {/* Right Column: Meet the Team (shifted 50px left and moved up) */}
        <Column gap="l" style={{ flex: 1, marginLeft: '50px', marginTop: '-120px' }}>
          <Heading variant="display-strong-m">Meet the Team</Heading>
          <Column gap="s">
            {/* Team Member 1 */}
            <Column
              horizontal="space-between"
              style={{ flexDirection: 'row', alignItems: 'center' }}
              gap="m"
            >
              <img
                src="/images/kahu.jpg"
                alt="Kahu Hutton (Me)"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%'
                }}
              />
              <div>
                <Heading variant="heading-default-m">Kahu Hutton (Me)</Heading>
                <Text variant="body-default-m">Founder &amp; Web-app Developer</Text>
              </div>
            </Column>
            {/* Team Member 2 */}
            <Column
              horizontal="space-between"
              style={{ flexDirection: 'row', alignItems: 'center' }}
              gap="m"
            >
              <img
                src="/images/joel.jpg"
                alt="Joel Bannister"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%'
                }}
              />
              <div>
                <Heading variant="heading-default-m">Joel Bannister</Heading>
                <Text variant="body-default-m">Co-founder, Backend &amp; Dev-ops Engineer</Text>
              </div>
            </Column>
            {/* Team Member 3 */}
            <Column
              horizontal="space-between"
              style={{ flexDirection: 'row', alignItems: 'center' }}
              gap="m"
            >
              <img
                src="/images/lev.jpg"
                alt="Lev Petersen"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%'
                }}
              />
              <div>
                <Heading variant="heading-default-m">Lev Petersen</Heading>
                <Text variant="body-default-m">Co-founder, LMS Plugin Lead Developer</Text>
              </div>
            </Column>
          </Column>
        </Column>
      </div>

      {/* Show/Hide Details Button - centered and shifted right */}
      <Column style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingLeft: '370px' }}>
        <Button 
          onClick={() => setOpen(!open)}
          variant="secondary"
          size="m"
          arrowIcon
        >
          {open ? "Hide Details" : "Show Details"}
        </Button>
      </Column>

      {/* Details Section */}
      {open && (
        <Column gap="l">
          <Heading variant="display-strong-s">My Contributions</Heading>
          <Text variant="body-default-l">
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                <strong>Developed full-stack web app:</strong> built the front-end with React and Next.js,
                engineered the back-end in Python, and utilized Docker, AWS, DigitalOcean, and Supabase for deployment
                and scalability.
              </li>
              <li>
                <strong>Led a team</strong> to design, deploy, and maintain a stand-alone LMS plugin and RAG
                status-tracking tool, serving 300+ daily users.
              </li>
              <li>
                <strong>Implemented containerization</strong> and cloud hosting (Docker, AWS, Digital Ocean, Azure)
                to ensure scalability and minimize downtime.
              </li>
              <li>
                <strong>Managed end-to-end project lifecycles:</strong> from initial concept and UI/UX design through
                deployment and user feedback, ensuring alignment with business objectives.
              </li>
              <li>
                <strong>Maintained ongoing client and stakeholder communication:</strong> gathering requirements,
                providing updates, and rapidly iterating on features based on user input.
              </li>
            </ul>
          </Text>
        </Column>
      )}
    </Column>
  );
}
