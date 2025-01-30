'use client';
import { Column, Heading, Text, SmartImage, Input } from "@/once-ui/components";
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
            const response = fetch("/api/authenticate", {
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
    <Column maxWidth="m" gap="xl">
      <Column gap="m">
        <Heading variant="display-strong-l">Dawn Aerospace</Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Spacecraft Propulsion Development Intern
        </Text>
      </Column>
      
      <Column gap="l">
        <Text variant="body-default-l">
          At Dawn Aerospace, I work on developing next-generation propulsion systems for CubeSats. 
          This role involves both hardware and software development, focusing on system integration 
          and performance optimization.
        </Text>

        <Column gap="m">
          <Heading variant="display-strong-s">Key Responsibilities</Heading>
          <Column as="ul" gap="s">
            <Text as="li">Design and development of propulsion system components</Text>
            <Text as="li">Integration of control systems and telemetry</Text>
            <Text as="li">Performance testing and optimization</Text>
            <Text as="li">Documentation and technical reporting</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
