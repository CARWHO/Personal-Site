// src/app/HomeContent.tsx
"use client";

import React from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import dynamic from 'next/dynamic';

const PortfolioGraph = dynamic(() => import('@/components/portfolio/PortfolioGraph'), {
  ssr: false
});

export default function HomeContent() {

  return (
    <Column maxWidth="xl" horizontal="center">
      <Column 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '20px',
          borderRadius: '12px',
          maxWidth: '300px',
          zIndex: 1000,
        }}
      >
        <Text
          variant="heading-default-m"
          style={{ color: '#fff', marginBottom: '12px' }}
        >
          How to Explore
        </Text>
        <Text style={{ color: '#fff', marginBottom: '8px' }}>
          🔍 Search: Use the search bar to find specific projects or skills
        </Text>
        <Text style={{ color: '#fff', marginBottom: '8px' }}>
          🖱️ Navigate: Click and drag to rotate the graph
        </Text>
        <Text style={{ color: '#fff', marginBottom: '8px' }}>
          🔎 Discover: Hover over nodes to see connections
        </Text>
        <Text style={{ color: '#fff' }}>
          ⭐ Projects appear as large nodes, skills as smaller ones
        </Text>
      </Column>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Flex fillWidth paddingY="l" gap="xl">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
        </Column>
        <Column style={{ marginTop: "-100px", marginLeft: "-50%" }}>
          <PortfolioGraph />
        </Column>
      </Flex>
    </Column>
  );
}
