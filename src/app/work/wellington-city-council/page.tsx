'use client';
import { Column, Heading, Text } from "@/once-ui/components";

export default function WellingtonCityCouncil() {
  return (
    <Column maxWidth="m" gap="xl">
      <Column gap="m">
        <Heading variant="display-strong-l">Wellington City Council</Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          CFD Engineer (Wind Loading)
        </Text>
      </Column>
      
      <Column gap="l">
        <Text variant="body-default-l">
          Working with Wellington City Council, I conducted comprehensive wind loading analysis 
          using Computational Fluid Dynamics (CFD) to ensure public safety during events and 
          assess structural integrity.
        </Text>

        <Column gap="m">
          <Heading variant="display-strong-s">Project Highlights</Heading>
          <Column as="ul" gap="s">
            <Text as="li">Development of detailed CFD models</Text>
            <Text as="li">Analysis of wind patterns and their effects on structures</Text>
            <Text as="li">Safety assessments for public events</Text>
            <Text as="li">Technical documentation and recommendations</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
