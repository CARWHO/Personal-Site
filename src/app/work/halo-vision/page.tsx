'use client';
import { Column, Heading, Text } from "@/once-ui/components";

export default function HaloVision() {
  return (
    <Column maxWidth="m" gap="xl">
      <Column gap="m">
        <Heading variant="display-strong-l">Halo Vision</Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Founder
        </Text>
      </Column>
      
      <Column gap="l">
        <Text variant="body-default-l">
          Halo Vision is an innovative motorcycle navigation system that combines hardware 
          and software solutions to enhance rider safety and navigation experience.
        </Text>

        <Column gap="m">
          <Heading variant="display-strong-s">Development Areas</Heading>
          <Column as="ul" gap="s">
            <Text as="li">Custom PCB design and manufacturing</Text>
            <Text as="li">Embedded systems development</Text>
            <Text as="li">Mobile app development and integration</Text>
            <Text as="li">User interface design and testing</Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
