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
// NOTE: Font changed to "Inter, sans-serif" to match layout.tsx
function makeTextSprite(message: string, parameters: any) {
  parameters = parameters || {};
  const fontface = parameters.fontface || "Inter, sans-serif";
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
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.1 });
  const sprite = new THREE.Sprite(spriteMaterial);
  const scaleFactor = parameters.scaleFactor || 0.25;
  sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);
  return sprite;
}

// ----- Main Component -----
const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const graphData = useMemo(() => generateGraphData(), []);

  // Compute matching node IDs based on the search query.
  const matchingNodeIds = useMemo(() => {
    if (!searchQuery) return new Set<string>();
    const lowerQuery = searchQuery.toLowerCase();
    const matches = new Set<string>();
    graphData.nodes.forEach(node => {
      if (node.id.toLowerCase().includes(lowerQuery)) {
        matches.add(node.id);
      } else if (node.type === "major") {
        const project = majorProjects.find(p => p.id === node.id);
        if (project && project.tags && project.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          matches.add(node.id);
        }
      }
    });
    return matches;
  }, [searchQuery, graphData.nodes]);

  // --- Search Handler ---
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // --- Search Submit (No camera focusing on individual nodes) ---
  const handleSearchSubmit = () => {
    // No camera focusing on individual nodes.
  };

  // --- Initial Camera Setup & Disable Built-in Auto-Rotate ---
  // (We’ll rotate the camera manually below.)
  const rotationAngleRef = useRef(0);
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
          // Disable autoRotate because we handle rotation manually.
          controls.autoRotate = false;
          controls.update();
        }
      }
    };
    initGraph();
    setTimeout(initGraph, 100);
  }, []);

  // --- Camera Auto-Rotation with Interaction Pause ---
  useEffect(() => {
    let animationFrameId: number;
    const desiredDistance = 500;
    const interactionCooldown = 3000; // 3 seconds pause after interaction

    const updateCamera = () => {
      if (graphRef.current) {
        const camera = graphRef.current.camera();
        const controls = graphRef.current.controls();

        // Calculate center of graph
        const validNodes = graphData.nodes.filter(n => 
          n.x !== undefined && n.y !== undefined && n.z !== undefined
        );
        const target = validNodes.reduce((acc, n) => {
          acc.x += n.x!;
          acc.y += n.y!;
          acc.z += n.z!;
          return acc;
        }, new THREE.Vector3()).divideScalar(validNodes.length || 1);

        const timeSinceLastInteraction = Date.now() - lastInteractionTime;

        // Only auto-rotate if not interacting and cooldown has passed
        if (!isInteracting && timeSinceLastInteraction > interactionCooldown) {
          // Get current position relative to target
          const offset = new THREE.Vector3()
            .copy(camera.position)
            .sub(target);
          
          // Convert to spherical coordinates for rotation
          const spherical = new THREE.Spherical().setFromVector3(offset);
          spherical.theta += 0.001; // Rotation speed
          
          // Convert back to cartesian coordinates
          const newOffset = new THREE.Vector3().setFromSpherical(spherical);
          camera.position.copy(target.clone().add(newOffset));
          
          controls.target.copy(target);
          controls.update();
        }
      }
      animationFrameId = requestAnimationFrame(updateCamera);
    };

    updateCamera();
    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData.nodes, isInteracting, lastInteractionTime]);

  // --- Animate Node Colors and Text Opacities ---
  // This effect runs every frame and uses linear interpolation (lerp)
  // to smoothly update the sphere color and the text sprite opacity.
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (graphRef.current) {
        const scene = graphRef.current.scene();
        scene.traverse((object: any) => {
          if (object.userData && object.userData.nodeId) {
            const nodeId = object.userData.nodeId;
            const originalColor = new THREE.Color(object.userData.originalColor);
            let targetSphereColor: THREE.Color;
            if (searchQuery) {
              targetSphereColor = matchingNodeIds.has(nodeId)
                ? new THREE.Color(0xffffff)
                : new THREE.Color(0x444444);
            } else {
              targetSphereColor = originalColor;
            }
            if (object.userData.sphereMaterial) {
              object.userData.sphereMaterial.color.lerp(targetSphereColor, 0.1);
            }
            if (object.userData.textSprite) {
              let targetTextOpacity = 0.1; // default low opacity
              // If the user is hovering over a main node, or the search matches, increase opacity.
              if (hoveredNodeId === nodeId && object.userData.nodeType === "major") {
                targetTextOpacity = 1;
              } else if (searchQuery && matchingNodeIds.has(nodeId)) {
                targetTextOpacity = 1;
              }
              const currentOpacity = object.userData.textSprite.material.opacity;
              object.userData.textSprite.material.opacity = THREE.MathUtils.lerp(currentOpacity, targetTextOpacity, 0.1);
            }
          }
        });
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [searchQuery, matchingNodeIds, hoveredNodeId]);

  // --- Node Rendering ---
  // Each node is rendered as a group containing a sphere and a text sprite.
  // We store the original color and the sprite reference for later animations.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();
    group.userData.nodeId = node.id;
    group.userData.nodeType = node.type;
    group.userData.originalColor = node.color;

    // Set the sphere’s initial color based on whether a search is active.
    let initialColor: number;
    if (searchQuery) {
      initialColor = matchingNodeIds.has(node.id) ? 0xffffff : 0x444444;
    } else {
      initialColor = node.color;
    }
    const sphereRadius = node.type === "major" ? 15 : 5;
    const geometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(initialColor) });
    const sphere = new THREE.Mesh(geometry, material);
    group.userData.sphereMaterial = material;
    group.add(sphere);

    // Create text sprite (using the Inter font) with an initially low opacity.
    let sprite: THREE.Sprite;
    if (node.type === "major") {
      sprite = makeTextSprite(`${node.id} (Project)`, {
        fontsize: 24,
        fontface: "Inter, sans-serif",
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
        fontface: "Inter, sans-serif",
        textColor: "rgba(255,255,255,1)",
        borderThickness: 1,
        borderColor: { r: 50, g: 50, b: 50, a: 1 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.0 },
        scaleFactor: 0.3,
      });
      sprite.position.set(0, sphereRadius + 8, 0);
    }
    group.userData.textSprite = sprite;
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
        onNodeHover={node => setHoveredNodeId(node ? node.id : null)}
      />
    </Column>
  );
};

export default PortfolioGraph;
