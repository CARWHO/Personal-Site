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
  ssr: false,
});

interface SearchState {
  query: string;
  onSearch: (query: string) => void;
}

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    console.log('HomeContent: Received search submit for query:', query);
    setSearchQuery(query);
    
    if (query.trim()) {
      const projectUrls: { [key: string]: string } = {
        'Dawn Aerospace': '/work/dawn-aerospace',
        'Wellington City Council': '/work/wellington-city-council',
        'KORA': '/work/kora',
        'Halo Vision': '/work/halo-vision'
      };

      // First try exact project name match
      const exactMatch = Object.keys(projectUrls).find(key => 
        key.toLowerCase() === query.toLowerCase()
      );
      
      // Then try partial project name match
      const partialMatch = Object.keys(projectUrls).find(key => 
        key.toLowerCase().includes(query.toLowerCase())
      );
      
      // Then try tag match (using the same tags as in PortfolioGraph)
      const tagMatch = Object.entries({
        'Dawn Aerospace': ['aerospace', 'software', 'hardware'],
        'Halo Vision': ['embedded system design'],
        'KORA': ['ai', 'machine learning'],
        'Wellington City Council': ['engineering', 'analysis', 'safety']
      }).find(([_, tags]) => 
        tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      const matchedProject = exactMatch || partialMatch || (tagMatch && tagMatch[0]);
      
      if (matchedProject) {
        console.log('HomeContent: Navigating to:', projectUrls[matchedProject]);
        window.location.href = projectUrls[matchedProject];
      }
    }
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
          <RevealFx translateY="12" delay={0.4} fillWidth horizontal="start">
            <Column gap="xs">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearch}
                onSubmit={handleSearchSubmit}
              />
              <Text 
                style={{ 
                  fontSize: "14px",
                  opacity: 0.6 
                }} 
                onBackground="neutral-weak"
              >
                Try searching: embedded • satellite • PCB design • AI
              </Text>
            </Column>
          </RevealFx>
        </Column>
        <Column style={{ marginTop: "-150px", marginLeft: "-40%", zIndex: 0 }}>
          <PortfolioGraph searchQuery={searchQuery} onSearch={handleSearch} />
        </Column>
      </Flex>
    </Column>
  );
}
