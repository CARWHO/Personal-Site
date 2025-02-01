// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ForceGraph3D from "react-force-graph-3d";
import { Column } from "@/once-ui/components";
import * as THREE from "three";

// Graph node and link types.
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string;
  color: number;
  // Positions set by the simulation.
  x?: number;
  y?: number;
  z?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// Utility to lighten a color.
const lightenColor = (color: number, percent: number): number => {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
  const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
  const newB = Math.min(255, Math.floor(b + (255 - b) * percent));
  return (newR << 16) + (newG << 8) + newB;
};

// Project data (with tags).
const majorProjects = [
  { 
    id: "Halo Vision", 
    color: 0xffffff,
    tags: ["Embedded system design"],
    skills: [
      "PCB Design", "Embedded C++", "Mobile App Dev", "3D Modeling", "CFD Analysis", 
      "Bluetooth LE", "Battery Management", "UI/UX Design", "Arduino", "Safety Systems"
    ]
  },
  { 
    id: "KORA", 
    color: 0xffffff,
    tags: ["AI"],
    skills: [
      "React Native", "Python", "OpenAI API", "AWS", "Database Design", 
      "User Authentication", "API Development", "ML/AI", "Node.js", "Redux"
    ]
  },
  { 
    id: "Dawn Aerospace", 
    color: 0xffffff,
    tags: ["Aerospace", "Software", "Hardware"],
    skills: [
      "Satellite Comms", "Python Testing", "Hardware Integration", "Git", "CI/CD", 
      "Embedded Linux", "RF Systems", "Technical Documentation", "C++", "System Architecture"
    ]
  },
  { 
    id: "Wellington City Council", 
    color: 0xffffff,
    tags: ["Engineering", "Analysis", "Safety"],
    skills: [
      "ANSYS Fluent", "Technical Writing", "CAD", "Data Analysis", "Risk Assessment", 
      "Project Management", "MATLAB", "Safety Standards", "Statistical Analysis", "AutoCAD"
    ]
  }
];

// Build the graph: add project nodes and skill nodes, plus links.
const generateGraphData = () => {
  const graphNodes: GraphNode[] = [];
  const graphLinks: GraphLink[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const skillNodesPerProject = 10;

  // Add major project nodes.
  majorProjects.forEach(project => {
    graphNodes.push({
      id: project.id,
      type: "major",
      color: project.color,
    });
  });

  // Add skill nodes.
  majorProjects.forEach((project, projectIndex) => {
    project.skills.forEach((skill, skillIndex) => {
      // These positions are temporary; the force simulation will override them.
      const skillNode: GraphNode = {
        id: skill,
        type: "skill",
        project: project.id,
        color: 0xcccccc,
      };
      graphNodes.push(skillNode);
      graphLinks.push({
        source: project.id,
        target: skill,
      });
    });
  });

  // Link major projects together.
  majorProjects.forEach((project1, i) => {
    majorProjects.slice(i + 1).forEach(project2 => {
      graphLinks.push({
        source: project1.id,
        target: project2.id,
      });
    });
  });

  // Create some cross-links between skill nodes.
  const skillNodes = graphNodes.filter(node => node.type === "skill");
  for (let i = 0; i < skillNodes.length; i += 5) {
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

// Helper: Create a text sprite.
function makeTextSprite(message: string, parameters: any) {
  parameters = parameters || {};
  const fontface = parameters.fontface || "Arial";
  const fontsize = parameters.fontsize || 18;
  const textColor = parameters.textColor || "rgba(255, 255, 255, 1.0)";
  const borderThickness = parameters.borderThickness || 2;
  const borderColor = parameters.borderColor || { r: 0, g: 0, b: 0, a: 1.0 };
  const backgroundColor =
    parameters.backgroundColor || { r: 0, g: 0, b: 0, a: 0.0 };

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = `${fontsize}px ${fontface}`;
  const metrics = context.measureText(message);
  const textWidth = metrics.width;
  canvas.width = textWidth + borderThickness * 2;
  canvas.height = fontsize * 1.4 + borderThickness * 2;
  context.font = `${fontsize}px ${fontface}`;
  context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
  context.lineWidth = borderThickness;
  context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(message, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMaterial);
  const scaleFactor = parameters.scaleFactor || 0.25;
  sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);
  return sprite;
}

const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const graphData = useMemo(() => generateGraphData(), []);

  const [shouldFocus, setShouldFocus] = useState(false);

  // Search handler: update query and determine matching node.
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setSearchQuery(lowerQuery);
    setShouldFocus(false);
    if (!lowerQuery) {
      setHighlightedNodeId(null);
      return;
    }
    const matchingNodes = graphData.nodes.filter(node => {
      const project = majorProjects.find(p => p.id === node.id);
      return (
        project?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        node.id.toLowerCase().includes(lowerQuery)
      );
    });
    if (matchingNodes.length > 0) {
      setHighlightedNodeId(matchingNodes[0].id);
    }
  };

  // Handle search submission (Enter pressed)
  const handleSearchSubmit = () => {
    setShouldFocus(true);
  };

  // Handle camera movement when a node is highlighted and focus is requested
  useEffect(() => {
    if (highlightedNodeId && shouldFocus && graphRef.current) {
      const node = graphData.nodes.find(n => n.id === highlightedNodeId);
      if (node && node.x !== undefined && node.y !== undefined && node.z !== undefined) {
        const camera = graphRef.current.camera();
        const nodePos = new THREE.Vector3(node.x, node.y, node.z);
        
        // Calculate new camera position
        const distance = 200;
        const angle = Math.PI / 4; // 45 degrees
        const heightOffset = distance * 0.5;
        
        const newCamPos = new THREE.Vector3(
          nodePos.x + distance * Math.cos(angle),
          nodePos.y + heightOffset,
          nodePos.z + distance * Math.sin(angle)
        );

        // Disable controls during transition
        const controls = graphRef.current.controls();
        if (controls) controls.enabled = false;

        // Smooth camera transition
        graphRef.current.cameraPosition(
          newCamPos,
          nodePos,
          3000 // Longer duration for smoother movement
        );

        // Re-enable controls after animation
        setTimeout(() => {
          if (controls) {
            controls.enabled = true;
            controls.target.copy(nodePos);
          }
        }, 3100);
      }
    }
  }, [highlightedNodeId, graphData.nodes]);

  // Smoothly handle camera transitions based on search state
  useEffect(() => {
    if (graphRef.current) {
      const controls = graphRef.current.controls();
      if (controls) controls.enabled = false;

      // Only move camera if we're not already animating
      if (!highlightedNodeId && !searchQuery) {
        // Return to default view
        const defaultCamPos = new THREE.Vector3(1000, 600, 1000);
        const target = new THREE.Vector3(0, 0, 0);
        graphRef.current.cameraPosition(defaultCamPos, target, 3000);
      }

      // Re-enable controls after animation
      setTimeout(() => {
        if (controls) controls.enabled = true;
      }, 3100);
    }
  }, [searchQuery, highlightedNodeId, graphRef]);

  // Initial camera and controls setup.
  useEffect(() => {
    const initGraph = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        // Here you might set an initial position; note the effect above will move it if nothing is searched.
        camera.position.set(1000, 600, 1000);
        camera.lookAt(0, 0, 0);
        const controls = graphRef.current.controls();
        if (controls) {
          controls.enableZoom = false;
          controls.minDistance = 500;
          controls.maxDistance = 500;
          controls.minPolarAngle = Math.PI / 4;
          controls.maxPolarAngle = Math.PI * 3 / 4;
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
    initGraph();
    setTimeout(initGraph, 100);
  }, []);

  // Render each node; if a search is active, non-highlighted nodes appear muted.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();
    const effectiveColor = highlightedNodeId
      ? (node.id === highlightedNodeId ? 0xffffff : 0x444444)
      : node.color;
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: effectiveColor });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);
    
    const effectiveTextColor = highlightedNodeId
      ? (node.id === highlightedNodeId ? "rgba(255,255,255,1)" : "rgba(150,150,150,1)")
      : (node.type === "major" ? "rgba(255,255,255,1)" : "rgba(200,200,200,1)");
    
    let sprite: THREE.Sprite;
    if (node.type === "major") {
      sprite = makeTextSprite(
        `${node.id} (Project)`,
        {
          fontsize: 24,
          fontface: "Arial",
          textColor: effectiveTextColor,
          borderThickness: 2,
          borderColor: { r: 50, g: 50, b: 50, a: 1 },
          backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
          scaleFactor: 0.5,
        }
      );
      sprite.position.set(0, sphereRadius + 15, 0);
    } else {
      sprite = makeTextSprite(
        `${node.id} (Skill)`,
        {
          fontsize: 12,
          fontface: "Arial",
          textColor: effectiveTextColor,
          borderThickness: 1,
          borderColor: { r: 50, g: 50, b: 50, a: 1 },
          backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
          scaleFactor: 0.3,
        }
      );
      sprite.position.set(0, sphereRadius + 8, 0);
    }
    group.add(sprite);
    return group;
  };

  return (
    <Column
      className="portfolio-graph"
      style={{ height: "800px", width: "800px", display: "flex", flexDirection: "column" }}
    >
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearch}
        onSubmit={handleSearchSubmit}
      />
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={() => ""}
        nodeThreeObject={nodeThreeObject}
        linkWidth={2}
        linkColor={() => "#666666"}
        linkOpacity={0.5}
        backgroundColor="rgba(0,0,0,0)"
        controlType="orbit"
        enableNodeDrag={true}
        enableNavigationControls={true}
      />
    </Column>
  );
};

export default PortfolioGraph;
