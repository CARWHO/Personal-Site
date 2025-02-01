// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { Column, Input, Button, Flex } from '@/once-ui/components';
import * as THREE from 'three';
import { about } from '@/app/resources/content';

// Define a color palette – one color per project (cycle if more projects than colors)
const PROJECT_COLORS = [
  0x00ff00, // green
  0x0000ff, // blue
  0xffa500, // orange
  0xff1493  // deep pink
];

/**
 * Since all work is merged into one sphere, we create a singular graph
 * with one node (id: "allWork"). The custom 3D object for this node will
 * be a big sphere built from sub-nodes.
 */
const generateGraphData = () => {
  return { nodes: [{ id: 'allWork' }], links: [] };
};

/**
 * Creates one singular sphere representing ALL your work.
 *
 * The sphere is composed of a number of small sub-nodes arranged on its surface.
 * Each sub-node is “assigned” (by color) to one of your work projects.
 * All sub-nodes are interconnected by lines to create a full web.
 */
const createAllWorkSphere = (): THREE.Group => {
  const group = new THREE.Group();

  const totalSubNodes = 100; // total sub-nodes making up the sphere
  const sphereRadius = 50;   // radius of the singular (big) sphere

  // Get your projects (work experiences) from content
  const projects = about.work.experiences;
  const numProjects = projects.length;
  // How many sub-nodes to assign per project (roughly)
  const subNodesPerProject = Math.floor(totalSubNodes / numProjects);

  // We will store sub-node positions for later creating the web of lines.
  const subNodePositions: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // for even distribution

  for (let i = 0; i < totalSubNodes; i++) {
    // Fibonacci sphere distribution for a uniform spread on the surface
    const y = 1 - (i + 0.5) * (2 / totalSubNodes);
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const pos = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
    subNodePositions.push(pos);

    // Determine which project this sub-node is associated with:
    const projectIndex = Math.floor(i / subNodesPerProject);
    const color = PROJECT_COLORS[projectIndex % PROJECT_COLORS.length];

    // Create a small sphere (sub-node) for this point.
    const subSphereGeom = new THREE.SphereGeometry(0.8, 8, 8);
    const subSphereMat = new THREE.MeshBasicMaterial({ color });
    const subSphere = new THREE.Mesh(subSphereGeom, subSphereMat);
    subSphere.position.copy(pos);
    group.add(subSphere);
  }

  // Build the web: connect every sub-node with every other sub-node.
  // (This will create many lines – adjust opacity or connection logic if needed.)
  const linePositions: number[] = [];
  for (let i = 0; i < subNodePositions.length; i++) {
    for (let j = i + 1; j < subNodePositions.length; j++) {
      linePositions.push(
        subNodePositions[i].x, subNodePositions[i].y, subNodePositions[i].z,
        subNodePositions[j].x, subNodePositions[j].y, subNodePositions[j].z
      );
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  return group;
};

const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  // Although we include search and category inputs, they are disabled
  // because the entire work is merged into one sphere.
  const [searchQuery] = useState('');
  const [selectedCategory] = useState('All');
  const graphData = generateGraphData();

  // Adjust the camera so the entire sphere is visible and shifted upward.
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.cameraPosition(
        { x: 0, y: -150, z: 150 },
        { x: 0, y: 0, z: 0 },
        2000
      );
    }
  }, []);

  return (
    <Column className="portfolio-graph" style={{ height: '600px', width: '100%' }}>
      <Flex gap="m" marginBottom="m">
        <Input
          id="search-projects"
          label="Search projects or technologies"
          value={searchQuery}
          onChange={() => {}}
          disabled
        />
        <Button
          variant="secondary"
          label="All Projects"
          onClick={() => {}}
          disabled
        />
      </Flex>
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="id"
        // Render our singular sphere for the one node ("allWork")
        nodeThreeObject={node => {
          if (node.id === 'allWork') {
            return createAllWorkSphere();
          }
          return null;
        }}
        nodeVal={10}
        linkWidth={2}
        linkColor={() => '#ffffff'}
        onNodeClick={() => {
          // Optional: add interaction if desired
        }}
        backgroundColor="rgba(0,0,0,0)"
      />
    </Column>
  );
};

export default PortfolioGraph;
