"use client";

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { about } from '@/app/resources/content';
import { Column, Input, Button, Flex } from '@/once-ui/components';

interface Node {
  id: string;
  name: string;
  description: string;
  category: string;
  size: number;
  technologies: string[];
}

interface Link {
  source: string;
  target: string;
  type: string;
}

const generateGraphData = () => {
  const nodes: Node[] = about.work.experiences.map(exp => ({
    id: exp.company,
    name: exp.company,
    description: exp.role,
    category: 'Professional',
    size: 1.5,
    technologies: exp.achievements
      .map(ach => ach.toString())
      .join(' ')
      .match(/\b(React|Python|AI|Software|Hardware)\b/g) || []
  }));

  const links: Link[] = [];
  
  // Create links between projects with shared technologies
  nodes.forEach((node1) => {
    nodes.forEach((node2) => {
      if (node1.id !== node2.id) {
        const sharedTech = node1.technologies.filter(tech => 
          node2.technologies.includes(tech)
        );
        if (sharedTech.length > 0) {
          links.push({
            source: node1.id,
            target: node2.id,
            type: sharedTech.join(', ')
          });
        }
      }
    });
  });

  return { nodes, links };
};

const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const graphData = generateGraphData();
  
  const handleNodeClick = (node: Node) => {
    // Highlight node and its neighbors
    const elem = graphRef.current;
    if (elem) {
      elem.centerAt(node.x, node.y, node.z, 1000);
      elem.zoom(1.5, 1000);
    }
  };

  const filteredData = {
    nodes: graphData.nodes.filter(node => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          node.technologies.some(tech => 
                            tech.toLowerCase().includes(searchQuery.toLowerCase())
                          );
      const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
    links: graphData.links.filter(link => {
      const sourceNode = graphData.nodes.find(n => n.id === link.source);
      const targetNode = graphData.nodes.find(n => n.id === link.target);
      return sourceNode && targetNode;
    })
  };

  return (
    <Column className="portfolio-graph" style={{ height: '400px', width: '100%' }}>
      <Flex gap="m" marginBottom="m">
        <Input
          id="search-projects"
          label="Search projects or technologies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="secondary"
          label={selectedCategory}
          onClick={() => setSelectedCategory(selectedCategory === 'All' ? 'Professional' : 'All')}
        />
      </Flex>
      <ForceGraph3D
        ref={graphRef}
        graphData={filteredData}
        nodeLabel="name"
        nodeColor={node => node.category === 'Professional' ? '#00ff00' : '#0000ff'}
        nodeVal={node => node.size}
        linkWidth={2}
        linkColor={() => '#ffffff'}
        onNodeClick={handleNodeClick}
        backgroundColor="rgba(0,0,0,0)"
      />
    </Column>
  );
};

export default PortfolioGraph;
