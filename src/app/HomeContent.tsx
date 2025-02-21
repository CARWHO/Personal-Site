"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Heading,
  Flex,
  Text,
  RevealFx,
  Column,
} from "@/once-ui/components";
import SearchBar from "@/components/searchbar";
import { baseURL } from "@/app/resources";
import { home, person } from "@/app/resources/content";
import dynamic from "next/dynamic";
import PortfolioGraph, { PortfolioGraphRef } from "@/components/portfolio/PortfolioGraph";

// HomeContent maintains the search query state and holds a ref to PortfolioGraph
// so that when the user presses enter (submitting the search) we can call the graph’s redirect method.
export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const portfolioGraphRef = useRef<PortfolioGraphRef>(null);

  // Track whether we're on a small (mobile) screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("HomeContent: Received search submit for query:", query);
    setSearchQuery(query);

    // Ask the PortfolioGraph (via its exposed method) to redirect if a node is highlighted.
    if (portfolioGraphRef.current) {
      portfolioGraphRef.current.redirectIfHighlighted();
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

      {/* 
        FLEX container:
        - "row" on desktop (side by side),
        - "column" on mobile (text above graph).
        gap="none" so we can control spacing with marginBottom on the text column.
      */}
      <Flex
        fillWidth
        paddingY="l"
        gap="none"
        style={{
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* --- TEXT COLUMN --- */}
        <Column
          maxWidth="s"
          style={{
            // Add extra space under the text only on mobile
            marginBottom: isMobile ? "-170px" : 0,
          }}
        >
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
                style={{ fontSize: "14px", opacity: 0.6 }}
                onBackground="neutral-weak"
              >
                Try searching: Satellite • Embedded • API • AI
              </Text>
            </Column>
          </RevealFx>
        </Column>

        {/* --- GRAPH COLUMN --- */}
        <Column
          style={{
            // Keep negative margins for desktop, remove on mobile
            marginTop: isMobile ? "0" : "-150px",
            marginLeft: isMobile ? "0" : "-40%",
            zIndex: 0,
          }}
        >
          <PortfolioGraph
            ref={portfolioGraphRef}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </Column>
      </Flex>
    </Column>
  );
}
