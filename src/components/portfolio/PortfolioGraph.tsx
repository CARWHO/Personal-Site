// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import SearchBar from "@/components/searchbar";
import ForceGraph3D from "react-force-graph-3d";
import { Flex } from "@/once-ui/components";
import * as THREE from "three";

// ----- Graph Types -----
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string;
  color: number;
  // These are set by the simulation.
  x?: number;
  y?: number;
  z?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// ----- Utility Function -----
const lightenColor = (color: number, percent: number): number => {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
  const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
  const newB = Math.min(255, Math.floor(b + (255 - b) * percent));
  return (newR << 16) + (newG << 8) + newB;
};

// ----- Project Data -----
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
    tags: ["AI", "Machine Learning"],
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

// ----- Build Graph Data -----
const generateGraphData = () => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Add major project nodes.
  majorProjects.forEach(project => {
    nodes.push({
      id: project.id,
      type: "major",
      color: project.color,
    });
  });

  // Add skill nodes.
  majorProjects.forEach(project => {
    project.skills.forEach(skill => {
      const node: GraphNode = {
        id: skill,
        type: "skill",
        project: project.id,
        color: 0xcccccc,
      };
      nodes.push(node);
      links.push({ source: project.id, target: skill });
    });
  });

  // Link major projects together.
  majorProjects.forEach((project1, i) => {
    majorProjects.slice(i + 1).forEach(project2 => {
      links.push({ source: project1.id, target: project2.id });
    });
  });

  // Some cross-links between skill nodes.
  const skillNodes = nodes.filter(n => n.type === "skill");
  for (let i = 0; i < skillNodes.length; i += 5) {
    const randomSkillIndex = Math.floor(Math.random() * skillNodes.length);
    if (i !== randomSkillIndex) {
      links.push({ source: skillNodes[i].id, target: skillNodes[randomSkillIndex].id });
    }
  }
  return { nodes, links };
};

// ----- Text Sprite Helper -----
function makeTextSprite(message: string, parameters: any) {
  parameters = parameters || {};
  const fontface = parameters.fontface || "Arial";
  const fontsize = parameters.fontsize || 18;
  const textColor = parameters.textColor || "rgba(255,255,255,1)";
  const borderThickness = parameters.borderThickness || 2;
  const borderColor = parameters.borderColor || { r: 0, g: 0, b: 0, a: 1 };
  const backgroundColor = parameters.backgroundColor || { r: 0, g: 0, b: 0, a: 0.0 };

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

// ----- Main Component -----
const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const graphData = useMemo(() => generateGraphData(), []);

  // --- Search Handler ---
  // As the user types, update the highlighted node.
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setSearchQuery(lowerQuery);
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
    } else {
      setHighlightedNodeId(null);
    }
  };

  // --- (Optional) Search Submit Handler ---
  // We no longer change the camera on Enter so this can be a no-op.
  const handleSearchSubmit = () => {
    // Could trigger other behavior if desired.
  };

  // --- Initial Camera Setup ---
  useEffect(() => {
    const initGraph = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
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
            RIGHT: THREE.MOUSE.PAN,
          };
          controls.update();
        }
      }
    };
    initGraph();
    setTimeout(initGraph, 100);
  }, []);

  // --- Enforce Constant Camera Distance and Centering ---
  // Continuously compute the center of all nodes (ignoring any highlighted node)
  // and position the camera exactly 500 units away.
  useEffect(() => {
    let animationFrameId: number;
    const desiredDistance = 500; // fixed camera distance

    const updateCameraDistance = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        const controls = graphRef.current.controls();

        // Compute the center of all nodes that have defined positions.
        const validNodes = graphData.nodes.filter(n => 
          n.x !== undefined && n.y !== undefined && n.z !== undefined
        );
        const target = new THREE.Vector3();
        if (validNodes.length > 0) {
          validNodes.forEach(n => {
            target.add(new THREE.Vector3(n.x!, n.y!, n.z!));
          });
          target.divideScalar(validNodes.length);
        } else {
          target.set(0, 0, 0);
        }

        // Compute the vector from the target to the camera.
        const offset = new THREE.Vector3().subVectors(camera.position, target);
        if (offset.length() < 0.001) {
          offset.set(desiredDistance, 0, 0);
        } else {
          offset.normalize().multiplyScalar(desiredDistance);
        }
        // Update the camera position and controls' target.
        camera.position.copy(target).add(offset);
        controls.target.copy(target);
        controls.update();
      }
      animationFrameId = requestAnimationFrame(updateCameraDistance);
    };

    updateCameraDistance();
    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData.nodes]);

  // --- Node Rendering ---
  // Create the 3D object for each node.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    // Use the node’s base color.
    const material = new THREE.MeshBasicMaterial({ color: node.color });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Create a text sprite.
    let sprite: THREE.Sprite;
    if (node.type === "major") {
      sprite = makeTextSprite(`${node.id} (Project)`, {
        fontsize: 24,
        fontface: "Arial",
        textColor: "rgba(255,255,255,1)",
        borderThickness: 2,
        borderColor: { r: 50, g: 50, b: 50, a: 1 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
        scaleFactor: 0.5,
      });
      sprite.position.set(0, sphereRadius + 15, 0);
    } else {
      sprite = makeTextSprite(`${node.id} (Skill)`, {
        fontsize: 12,
        fontface: "Arial",
        textColor: "rgba(200,200,200,1)",
        borderThickness: 1,
        borderColor: { r: 50, g: 50, b: 50, a: 1 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
        scaleFactor: 0.3,
      });
      sprite.position.set(0, sphereRadius + 8, 0);
    }
    group.add(sprite);
    return group;
  };

  // --- Node Update for Smooth Transition ---
  // This callback is invoked on each animation frame for every node.
  // We use it to gradually update each node's sphere and sprite colors so that
  // when the highlighted node changes the color “fades” smoothly.
  const nodeThreeObjectUpdate = (object: THREE.Group, node: GraphNode) => {
    // The first child is the sphere.
    const sphere = object.children[0] as THREE.Mesh;
    // The second child is the text sprite.
    const sprite = object.children[1] as THREE.Sprite;

    // Define target colors.
    const baseColor = new THREE.Color(node.color);
    const highlightColor = new THREE.Color(0xffffff);
    let targetSphereColor = baseColor;
    let targetTextColor: THREE.Color;

    if (highlightedNodeId) {
      if (node.id === highlightedNodeId) {
        targetSphereColor = highlightColor;
        targetTextColor = new THREE.Color(0xffffff);
      } else {
        targetSphereColor = new THREE.Color(0x444444);
        targetTextColor = new THREE.Color(0x969696); // roughly rgba(150,150,150,1)
      }
    } else {
      targetSphereColor = baseColor;
      targetTextColor =
        node.type === "major"
          ? new THREE.Color(0xffffff)
          : new THREE.Color(0xc8c8c8); // roughly rgba(200,200,200,1)
    }

    // Smoothly transition the sphere's material color.
    (sphere.material as THREE.MeshBasicMaterial).color.lerp(targetSphereColor, 0.1);
    // Similarly, update the sprite's color.
    (sprite.material as THREE.SpriteMaterial).color.lerp(targetTextColor, 0.1);
  };

  return (
    <div
      className="portfolio-graph"
      style={{ 
        height: "800px", 
        width: "800px",
        display: "flex",
        flexDirection: "column"
      }}
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
        nodeThreeObjectUpdate={nodeThreeObjectUpdate}  {/* <-- New update callback */}
        linkWidth={2}
        linkColor={() => "#666666"}
        linkOpacity={0.5}
        backgroundColor="rgba(0,0,0,0)"
        controlType="orbit"
        enableNodeDrag={true}
        enableNavigationControls={true}
      />
    </div>
  );
};

export default PortfolioGraph;
