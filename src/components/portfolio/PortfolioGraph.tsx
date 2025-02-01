// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ForceGraph3D from "react-force-graph-3d";
import { Column } from "@/once-ui/components";
import * as THREE from "three";

// Define our graph node/link types.
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string;
  color: number;
  // These will be set by the simulation.
  x?: number;
  y?: number;
  z?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// Utility: lighten a hex color.
const lightenColor = (color: number, percent: number): number => {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
  const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
  const newB = Math.min(255, Math.floor(b + (255 - b) * percent));
  return (newR << 16) + (newG << 8) + newB;
};

// Define our project data with tags.
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

// Build graph data (nodes and links).
const generateGraphData = () => {
  const graphNodes: GraphNode[] = [];
  const graphLinks: GraphLink[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const skillNodesPerProject = 10; // Each project gets 10 skill nodes

  // Add project nodes.
  majorProjects.forEach((project) => {
    graphNodes.push({
      id: project.id,
      type: "major",
      color: project.color,
    });
  });

  // Add skill nodes.
  majorProjects.forEach((project, projectIndex) => {
    project.skills.forEach((skill, skillIndex) => {
      // Temporary positions (simulation will override these).
      const y = 1 - (skillIndex / (skillNodesPerProject - 1)) * 2;
      const theta = goldenAngle * (projectIndex * skillNodesPerProject + skillIndex);
      // (We don’t use these values directly; they simply seed positions.)
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

  // Interlink projects.
  majorProjects.forEach((project1, i) => {
    majorProjects.slice(i + 1).forEach(project2 => {
      graphLinks.push({
        source: project1.id,
        target: project2.id,
      });
    });
  });

  // Create some random cross-links among skill nodes.
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

  // When the user types a query, find a matching node.
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setSearchQuery(lowerQuery);
    if (!lowerQuery) {
      setHighlightedNodeId(null);
      return;
    }
    // Check against project tags or node id.
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

  // Whenever the highlighted node is set, move the camera toward it.
  useEffect(() => {
    if (highlightedNodeId && graphRef.current) {
      const node = graphData.nodes.find(n => n.id === highlightedNodeId);
      if (node && node.x !== undefined && node.y !== undefined && node.z !== undefined) {
        const camera = graphRef.current.camera();
        const currentCamPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        const nodePos = new THREE.Vector3(node.x, node.y, node.z);
        // Compute direction from node to current camera.
        const direction = currentCamPos.clone().sub(nodePos);
        if (direction.length() === 0) direction.set(0, 0, 1);
        direction.normalize();
        // Place the camera at a fixed distance from the node.
        const desiredDistance = 150;
        const newCamPos = nodePos.clone().add(direction.multiplyScalar(desiredDistance));
        // Temporarily disable controls so they don't fight the animation.
        const controls = graphRef.current.controls();
        if (controls) controls.enabled = false;
        // Animate the camera move.
        graphRef.current.cameraPosition(newCamPos, nodePos, 2000);
        // Re-enable controls after animation.
        setTimeout(() => {
          if (controls) controls.enabled = true;
        }, 2100);
      }
    }
  }, [highlightedNodeId, graphData.nodes]);

  useEffect(() => {
    const initGraph = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        camera.position.set(500, 250, 500);
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

  // Create a custom object for each node.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();
    // If a search is active, render non-highlighted nodes in muted grey.
    const effectiveColor = highlightedNodeId
      ? (node.id === highlightedNodeId ? 0xffffff : 0x444444)
      : node.color;
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: effectiveColor });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);
    // Set text color accordingly.
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
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
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
