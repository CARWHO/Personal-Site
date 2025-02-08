// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import SearchBar from "@/components/searchbar";
import ForceGraph3D from "react-force-graph-3d";
import { Column } from "@/once-ui/components";
import * as THREE from "three";

// ----- Graph Types -----
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string;
  color: number;
  link?: string;
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

const majorProjects = [
  { 
    id: "Halo Vision", 
    color: 0xffffff,
    tags: ["Embedded system design"],
    skills: [
      "Printed Circuit Board (PCB) Design",
      "Embedded Systems Programming (C/C++)",
      "Mobile Application Development",
      "3D Modeling & CAD",
      "CFD Analysis",
      "Bluetooth Low Energy (BLE) Communication",
      "Battery Management Systems (BMS)",
    ]
  },
  { 
    id: "KORA (AI)", 
    color: 0xffffff,
    tags: ["AI", "Machine Learning"],
    skills: [
      "Database Architecture & Design",
      "User Authentication & Security",
      "API Development",
      "Machine Learning & Artificial Intelligence",
      "Node.js Development",
    ]
  },
  { 
    id: "Satellites", 
    color: 0xffffff,
    tags: ["Aerospace", "Software", "Hardware"],
    skills: [
      "Satellite Communications",
      "Hardware Integration & Testing",
      "Continuous Integration/Continuous Deployment (CI/CD)",
      "System Architecture & Design"
    ]
  },
  { 
    id: "Fluid Simulations", 
    color: 0xffffff,
    tags: ["Engineering", "Analysis", "Safety"],
    skills: [
      "Fluid Simulation",
      "Professional Report Writing",
      "CAD",
      "Data Analysis & Interpretation",
      "Risk Assessment & Management",
      "Safety Standards & Compliance",
      "Data Analysis",
      "AutoCAD"
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
      link: `/work/${project.id.toLowerCase().replace(/\s+/g, '-')}`,
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
interface PortfolioGraphProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const PortfolioGraph: React.FC<PortfolioGraphProps> = ({ searchQuery, onSearch }) => {
  const graphRef = useRef<any>();
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const graphData = useMemo(() => generateGraphData(), []);

  // Helper function that returns the associated major project id
  // for a given search query. If a skill is matched, its parent project is used.
  const getHighlightedProjectId = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();
    console.log('PortfolioGraph: Searching for query:', lowerQuery);
    if (!lowerQuery) return null;
    
    const matchingNodes = graphData.nodes.filter(node => {
      const project = majorProjects.find(p => p.id === node.id);
      const matches = project?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                     node.id.toLowerCase().includes(lowerQuery);
      if (matches) {
        console.log('PortfolioGraph: Found matching node:', node.id, 'of type:', node.type);
      }
      return matches;
    });
    
    if (matchingNodes.length > 0) {
      const firstMatch = matchingNodes[0];
      const resultId = firstMatch.type === "skill" && firstMatch.project ? firstMatch.project : firstMatch.id;
      console.log('PortfolioGraph: Selected project ID:', resultId);
      return resultId;
    }
    console.log('PortfolioGraph: No matching nodes found');
    return null;
  };

  // --- Search Highlighting Effect ---
  useEffect(() => {
    const projectId = getHighlightedProjectId(searchQuery);
    setHighlightedNodeId(projectId);
  }, [searchQuery, graphData.nodes]);

  // --- Handle Search Submission for Redirection ---
  const handleSearchSubmit = (query: string) => {
    console.log('PortfolioGraph: Search submitted with query:', query);
    
    if (highlightedNodeId) {
      // Find the major project node that's highlighted
      const projectNode = graphData.nodes.find(node => 
        node.id === highlightedNodeId && node.type === "major"
      );

      if (projectNode && projectNode.link) {
        console.log('PortfolioGraph: Navigating to highlighted project:', projectNode.link);
        window.location.href = projectNode.link;
      }
    }
  };

  // --- Track User Interaction ---
  const userInteractingRef = useRef(false);

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

          // --- Listen for interaction events ---
          controls.addEventListener("start", () => {
            userInteractingRef.current = true;
          });
          controls.addEventListener("end", () => {
            userInteractingRef.current = false;
          });

          controls.update();
        }
      }
    };
    initGraph();
    setTimeout(initGraph, 100);
  }, []);

  // --- Enforce Constant Camera Distance, Center on the Graph, and Auto-Rotate ---
  useEffect(() => {
    let animationFrameId: number;
    const desiredDistance = 500; // fixed camera distance
    const rotationSpeed = 0.001; // radians per frame

    const updateCameraDistance = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        const controls = graphRef.current.controls();

        // Compute center of all nodes with defined positions.
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
          target.copy(controls.target);
        }

        // Compute the vector from the target to the camera.
        const offset = new THREE.Vector3().subVectors(camera.position, target);
        if (offset.length() < 0.001) {
          offset.set(desiredDistance, 0, 0);
        } else {
          offset.normalize().multiplyScalar(desiredDistance);
        }

        // --- Apply slow auto-rotation when the user is not interacting ---
        if (!userInteractingRef.current) {
          // Rotate the offset around the Y axis.
          offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed);
        }

        // Update the camera position and the controls’ target.
        camera.position.copy(target).add(offset);
        controls.target.copy(target);
        controls.update();
      }
      animationFrameId = requestAnimationFrame(updateCameraDistance);
    };

    updateCameraDistance();
    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData.nodes]);

  // --- Animate Node Color Transitions for a Smooth Highlight ---
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (graphRef.current) {
        const scene = graphRef.current.scene();
        scene.traverse((object: any) => {
          if (object.userData && object.userData.nodeId && object.userData.sphereMaterial) {
            const nodeId = object.userData.nodeId;
            // Find corresponding node data.
            const nodeData = graphData.nodes.find(n => n.id === nodeId);
            if (nodeData) {
              let targetColorInt: number;
              if (highlightedNodeId) {
                targetColorInt = nodeId === highlightedNodeId ? 0xffffff : 0x444444;
              } else {
                targetColorInt = nodeData.color;
              }
              const targetColor = new THREE.Color(targetColorInt);
              // Smoothly interpolate from the current color to the target color.
              object.userData.sphereMaterial.color.lerp(targetColor, 0.1);
            }
          }
        });
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [graphData.nodes, highlightedNodeId]);

  // --- Node Rendering ---
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();
    group.userData.nodeId = node.id;

    // Determine the initial color based on whether this node is highlighted.
    let initialColor: number;
    if (highlightedNodeId) {
      initialColor = node.id === highlightedNodeId ? 0xffffff : 0x444444;
    } else {
      initialColor = node.color;
    }
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(initialColor) });
    const sphere = new THREE.Mesh(geometry, material);
    group.userData.sphereMaterial = material;
    group.add(sphere);

    // Create text sprite.
    let sprite: THREE.Sprite;
    if (node.type === "major") {
      sprite = makeTextSprite(node.id, {
        fontsize: 24,
        fontface: "Arial",
        textColor: highlightedNodeId
          ? node.id === highlightedNodeId
            ? "rgba(255,255,255,1)"
            : "rgba(150,150,150,1)"
          : "rgba(255,255,255,1)",
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
        textColor: highlightedNodeId
          ? node.id === highlightedNodeId
            ? "rgba(255,255,255,1)"
            : "rgba(150,150,150,1)"
          : "rgba(200,200,200,1)",
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

  return (
    <Column
      className="portfolio-graph"
      style={{ height: "800px", width: "800px", display: "flex", flexDirection: "column" }}
    >
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearch}
        onSubmit={(query) => {
          console.log('PortfolioGraph: Received search submit for query:', query);
          handleSearchSubmit(query);
        }}
      />
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={(node: GraphNode) => node.type === "major" ? `Click to view ${node.id}` : node.id}
        nodeThreeObject={nodeThreeObject}
        linkWidth={2}
        linkColor={() => "#666666"}
        linkOpacity={0.5}
        backgroundColor="rgba(0,0,0,0)"
        controlType="orbit"
        enableNodeDrag={true}
        enableNavigationControls={true}
        onNodeClick={(node: GraphNode) => {
          // Prevent event propagation
          const event = window.event;
          if (event) {
            event.stopPropagation();
          }
          
          // Navigate to project page if it's a major node
          if (node.type === "major" && node.link) {
            window.location.href = node.link;
          }
        }}
      />
    </Column>
  );
};

export default PortfolioGraph;
