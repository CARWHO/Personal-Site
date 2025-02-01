"use client";

import React, { useState } from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import styles from "@/styles/graph.module.scss";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import GraphVisualization from "@/components/GraphVisualization";

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    tech: "",
    timeline: "",
  });

  const handleNodeClick = (node: any) => {
    console.log("Node clicked:", node);
    // Add modal handling logic here
  };

  return (
    <Column maxWidth="m" horizontal="center">
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
      <Column fillWidth paddingY="l" gap="m">
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
        <div className={styles.graphSection}>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Filters 
            filters={filters} 
            projects={[
              {
                id: 1,
                name: "Portfolio Website",
                description: "Personal portfolio built with Next.js",
                category: "Personal",
                importance: 8,
                techStack: ["React", "TypeScript", "Next.js"]
              },
              {
                id: 2,
                name: "Dawn Aerospace",
                description: "Aerospace engineering projects",
                category: "Professional",
                importance: 10,
                techStack: ["Python", "CFD", "Aerospace"]
              },
              {
                id: 3,
                name: "Halo Vision",
                description: "Computer vision startup",
                category: "Professional",
                importance: 9,
                techStack: ["Python", "OpenCV", "AI"]
              },
              {
                id: 4,
                name: "KORA",
                description: "Robotics and automation",
                category: "Professional",
                importance: 9,
                techStack: ["Python", "ROS", "Robotics"]
              },
              {
                id: 5,
                name: "WCC Wind Analysis",
                description: "CFD analysis for Wellington City Council",
                category: "Professional",
                importance: 7,
                techStack: ["Python", "CFD", "Civil"]
              }
            ]} 
            onFilterChange={setFilters}
          />
          <GraphVisualization
            searchQuery={searchQuery}
            filters={filters}
            projects={[
              {
                id: 1,
                name: "Portfolio Website",
                description: "Personal portfolio built with Next.js",
                category: "Personal",
                importance: 8,
                techStack: ["React", "TypeScript", "Next.js"]
              },
              {
                id: 2,
                name: "Dawn Aerospace",
                description: "Aerospace engineering projects",
                category: "Professional",
                importance: 10,
                techStack: ["Python", "CFD", "Aerospace"]
              },
              {
                id: 3,
                name: "Halo Vision",
                description: "Computer vision startup",
                category: "Professional",
                importance: 9,
                techStack: ["Python", "OpenCV", "AI"]
              },
              {
                id: 4,
                name: "KORA",
                description: "Robotics and automation",
                category: "Professional",
                importance: 9,
                techStack: ["Python", "ROS", "Robotics"]
              },
              {
                id: 5,
                name: "WCC Wind Analysis",
                description: "CFD analysis for Wellington City Council",
                category: "Professional",
                importance: 7,
                techStack: ["Python", "CFD", "Civil"]
              }
            ]}
            onNodeClick={handleNodeClick}
          />
        </div>
      </Column>
    </Column>
  );
}
