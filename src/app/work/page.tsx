// src/app/page.tsx
import { baseURL } from "@/app/resources";
import { Column } from "@/once-ui/components";
import { person } from "@/app/resources/content";
import GraphVisualization from "@/components/GraphVisualization";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import { Metadata } from "next";
import React, { useState } from "react";
import styles from "@/styles/graph.module.scss";

export const metadata: Metadata = {
  title: "Home",
  description: "Portfolio Graph on Home",
  openGraph: {
    title: "Home",
    description: "Portfolio Graph on Home",
    url: `https://${baseURL}/`,
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    tech: "",
    timeline: "",
  });
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleNodeClick = (node: any) => {
    // When a node is clicked, you can show a modal or navigate to a dedicated project page.
    setSelectedNode(node);
  };

  return (
    <Column fill horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            headline: "Home",
            description: "Portfolio Graph on Home",
            url: `https://${baseURL}/`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      
      {/* Graph & Controls container positioned in the bottom-left */}
      <div className={styles.workContentContainer}>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Filters filters={filters} onFilterChange={setFilters} />
        <GraphVisualization
          searchQuery={searchQuery}
          filters={filters}
          onNodeClick={handleNodeClick}
        />
      </div>
      
      {/* Optional Modal for Node Details */}
      {selectedNode && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedNode.name}</h2>
            <p>{selectedNode.description}</p>
            <p>
              <strong>Technologies:</strong>{" "}
              {selectedNode.techStack && selectedNode.techStack.join(", ")}
            </p>
            <button onClick={() => setSelectedNode(null)}>Close</button>
          </div>
        </div>
      )}
    </Column>
  );
}
