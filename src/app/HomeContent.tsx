// src/app/HomeContent.tsx
"use client";

import React, { useState } from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import SearchBar from "@/components/searchbar";
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    // Handle search submit if needed
  };

  return (
    <Column maxWidth="xl" horizontal="center">
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
          <RevealFx translateY="12" delay={0.4}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onSubmit={handleSearchSubmit}
            />
          </RevealFx>
        </Column>
        <Column style={{ marginTop: "-100px", marginLeft: "-50%" }}>
          <PortfolioGraph />
        </Column>
      </Flex>
    </Column>
  );
}
