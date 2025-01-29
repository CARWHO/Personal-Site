'use client';
import { Column, Heading, Text } from "@/once-ui/components";

export default function Kora() {
  return (
    <Column maxWidth="m" gap="xl">
      <Column gap="m">
        <Heading variant="display-strong-l">KORA</Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Founder & Developer
        </Text>
      </Column>
      
      <Column gap="l">
        <Text variant="body-default-l">
          KORA is an AI-powered education platform designed to enhance learning experiences 
          through personalized content generation and adaptive learning pathways.
        </Text>

        <Column gap="m">
          <Heading variant="display-strong-s">Project Overview</Heading>
          <Column as="ul" gap="s">
            <Text as="li">Development of AI-driven content generation system</Text>
            <Text as="li">Implementation of adaptive learning algorithms</Text>
            <Text as="li">Creation of intuitive user interfaces for students and educators</Text>
            <Text as="li">Integration of analytics and progress tracking features</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
