// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import SearchBar from "@/components/searchbar";
import ForceGraph3D from "react-force-graph-3d";
import { Column } from "@/once-ui/components";
import * as THREE from "three";

// Define the structure for our graph nodes and links.
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string; // For a skill node, indicates its parent project.
  color: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// Helper function to lighten a hex color by a percentage (0 to 1)
const lightenColor = (color: number, percent: number): number => {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
  const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
  const newB = Math.min(255, Math.floor(b + (255 - b) * percent));
  return (newR << 16) + (newG << 8) + newB;
};

// Define nicer pastel colours for major projects.
const majorProjects = [
  { 
    id: "Halo Vision", 
    color: 0xffffff,
    tags: ["Embedded Systems", "Hardware", "Safety"],
    skills: ["PCB Design", "Embedded C++", "Mobile App Dev", "3D Modeling", "CFD Analysis", 
             "Bluetooth LE", "Battery Management", "UI/UX Design", "Arduino", "Safety Systems"]
  },
  { 
    id: "KORA", 
    color: 0xffffff,
    tags: ["AI", "Education", "Software"],
    skills: ["React Native", "Python", "OpenAI API", "AWS", "Database Design", 
             "User Authentication", "API Development", "ML/AI", "Node.js", "Redux"]
  },
  { 
    id: "Dawn Aerospace", 
    color: 0xffffff,
    tags: ["Aerospace", "Software", "Hardware"],
    skills: ["Satellite Comms", "Python Testing", "Hardware Integration", "Git", "CI/CD", 
             "Embedded Linux", "RF Systems", "Technical Documentation", "C++", "System Architecture"]
  },
  { 
    id: "Wellington City Council", 
    color: 0xffffff,
    tags: ["Engineering", "Analysis", "Safety"],
    skills: ["ANSYS Fluent", "Technical Writing", "CAD", "Data Analysis", "Risk Assessment", 
             "Project Management", "MATLAB", "Safety Standards", "Statistical Analysis", "AutoCAD"]
  }
];

// Build the graph data with major nodes and skill nodes.
const generateGraphData = () => {
  const graphNodes: GraphNode[] = [];
  const graphLinks: GraphLink[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // For even spherical distribution.
  const skillNodesPerProject = 10; // Number of skill nodes per project

  // Add major project nodes.
  majorProjects.forEach((project) => {
    graphNodes.push({
      id: project.id,
      type: "major",
      color: project.color,
    });
  });

  // Add skill nodes for each project
  majorProjects.forEach((project, projectIndex) => {
    project.skills.forEach((skill, skillIndex) => {
      const y = 1 - (skillIndex / (skillNodesPerProject - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * (projectIndex * skillNodesPerProject + skillIndex);

      const skillNode: GraphNode = {
        id: skill,
        type: "skill",
        project: project.id,
        color: 0xcccccc, // Light gray for all skill nodes
      };
      graphNodes.push(skillNode);

      // Link the skill node to its assigned major project.
      graphLinks.push({
        source: project.id,
        target: skillNode.id,
      });
    });
  });

  // Create a more connected web by linking major projects
  majorProjects.forEach((project1, i) => {
    majorProjects.slice(i + 1).forEach(project2 => {
      graphLinks.push({
        source: project1.id,
        target: project2.id,
      });
    });
  });

  // Add some cross-links between skills of different projects
  const skillNodes = graphNodes.filter(node => node.type === "skill");
  for (let i = 0; i < skillNodes.length; i += 5) { // Link every 5th skill node
    const randomSkillIndex = Math.floor(Math.random() * skillNodes.length);
    if (i !== randomSkillIndex) {
      graphLinks.push({
        source: skillNodes[i].id,
        target: skillNodes[randomSkillIndex].id,
      });
    }
  }

  return { nodes: graphNodes, links: graphLinks };
};

// Helper function to create a text sprite as an annotation.
function makeTextSprite(message: string, parameters: any) {
  parameters = parameters || {};
  const fontface = parameters.fontface || "Arial";
  const fontsize = parameters.fontsize || 18;
  const textColor = parameters.textColor || "rgba(255, 255, 255, 1.0)";
  const borderThickness = parameters.borderThickness || 2;
  const borderColor = parameters.borderColor || { r: 0, g: 0, b: 0, a: 1.0 };
  const backgroundColor =
    parameters.backgroundColor || { r: 0, g: 0, b: 0, a: 0.0 };

  // Create a canvas and get context.
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = `${fontsize}px ${fontface}`;

  // Measure text size.
  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  // Set canvas size accounting for border.
  canvas.width = textWidth + borderThickness * 2;
  canvas.height = fontsize * 1.4 + borderThickness * 2;

  // Reset font after resizing.
  context.font = `${fontsize}px ${fontface}`;

  // Draw background.
  context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw border.
  context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
  context.lineWidth = borderThickness;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw text (centered).
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(message, canvas.width / 2, canvas.height / 2);

  // Create texture from canvas.
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMaterial);

  // Scale sprite based on canvas dimensions.
  const scaleFactor = parameters.scaleFactor || 0.25;
  sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);
  return sprite;
}

const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const graphData = useMemo(() => generateGraphData(), []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    
    if (graphRef.current) {
      const matchingNodes = graphData.nodes.filter(node => {
        const project = majorProjects.find(p => p.id === node.id);
        return project?.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
               node.id.toLowerCase().includes(query.toLowerCase());
      });

      if (matchingNodes.length > 0 && query) {
        const node = matchingNodes[0];
        graphRef.current.centerAt(0, 0, 1000);
        graphRef.current.zoomToFit(400, 250, (n: any) => 
          matchingNodes.some(match => match.id === n.id)
        );
      }
    }
  };

  useEffect(() => {
    const initGraph = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        // Set a much larger initial distance
        camera.position.set(500, 250, 500);
        camera.lookAt(0, 0, 0);
        
        const controls = graphRef.current.controls();
        if (controls) {
          controls.enableZoom = false;
          controls.minDistance = 500;
          controls.maxDistance = 500;
          controls.minPolarAngle = Math.PI / 4;
          controls.maxPolarAngle = Math.PI * 3/4;
          controls.enablePan = true;
          controls.rotateSpeed = 0.5;
          controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.PAN
          };
          controls.update();
        }
      }
    };

    // Initial setup
    initGraph();
    
    // Also run after a short delay to ensure it takes effect
    setTimeout(initGraph, 100);
  }, []);

  // Create a custom 3D object for each node that includes a sphere and a text annotation.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();

    // Create the node sphere.
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: node.color });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Create the text annotation.
    let sprite: THREE.Sprite;
    if (node.type === "major") {
      sprite = makeTextSprite(
        `${node.id} (Project)`,
        {
          fontsize: 24,
          fontface: "Arial",
          textColor: "rgba(255,255,255,1)",
          borderThickness: 2,
          borderColor: { r: 50, g: 50, b: 50, a: 1 },
          backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
          scaleFactor: 0.5,
        }
      );
      // Position the label above the major node.
      sprite.position.set(0, sphereRadius + 15, 0);
    } else {
      sprite = makeTextSprite(
        `${node.id} (Skill)`,
        {
          fontsize: 12,
          fontface: "Arial",
          textColor: "rgba(200,200,200,1)",
          borderThickness: 1,
          borderColor: { r: 50, g: 50, b: 50, a: 1 },
          backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
          scaleFactor: 0.3,
        }
      );
      // Position the label slightly above the skill node.
      sprite.position.set(0, sphereRadius + 8, 0);
    }
    group.add(sprite);

    return group;
  };

  return (
    <Column className="portfolio-graph" style={{ height: "800px", width: "800px" }}>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={() => ""} // Disable default hover labels.
        nodeThreeObject={nodeThreeObject}
        linkWidth={2}
        linkColor={() => "#666666"}
        linkOpacity={0.5}
        backgroundColor="rgba(0,0,0,0)"
        controlType="orbit"
        enableNodeDrag={true}
        enableNavigationControls={true} // Enable built-in navigation controls
      />
    </Column>
  );
};

export default PortfolioGraph;
