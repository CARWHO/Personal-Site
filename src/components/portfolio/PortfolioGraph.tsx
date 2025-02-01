// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef, useMemo } from "react";
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
  { id: "Halo Vision", color: 0xff69b4 }, // pastel pink
  { id: "KORA", color: 0x3cb371 }, // medium sea green
  { id: "Dawn Aerospace", color: 0x4169e1 }, // royal blue
  { id: "Wellington City Council", color: 0xffa07a }, // light salmon
];

// Build the graph data with major nodes and skill nodes.
const generateGraphData = () => {
  const graphNodes: GraphNode[] = [];
  const graphLinks: GraphLink[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // For even spherical distribution.
  const totalSkillNodes = 100; // Total number of skill nodes.

  // Add major project nodes.
  majorProjects.forEach((project) => {
    graphNodes.push({
      id: project.id,
      type: "major",
      color: project.color,
    });
  });

  // Distribute skill nodes around the sphere.
  for (let i = 0; i < totalSkillNodes; i++) {
    const y = 1 - (i / (totalSkillNodes - 1)) * 2; // y goes from 1 to -1.
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    // Assign a random project to this skill node for clustering purposes.
    const assignedProject =
      majorProjects[Math.floor(Math.random() * majorProjects.length)];

    const skillNode: GraphNode = {
      id: `Skill ${i}`,
      type: "skill",
      project: assignedProject.id,
      color: lightenColor(assignedProject.color, 0.5), // Lighter version of the project's color.
    };
    graphNodes.push(skillNode);

    // Link the skill node to its assigned major project.
    graphLinks.push({
      source: assignedProject.id,
      target: skillNode.id,
    });
  }

  // Optionally, create links between major projects.
  for (let i = 0; i < majorProjects.length; i++) {
    for (let j = i + 1; j < majorProjects.length; j++) {
      graphLinks.push({
        source: majorProjects[i].id,
        target: majorProjects[j].id,
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
  const graphData = useMemo(() => generateGraphData(), []);

  // Set initial camera position.
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.cameraPosition(
        { x: 0, y: 0, z: 300 }, // Camera position.
        { x: 0, y: 0, z: 0 },   // Look-at position.
        2000                   // Animation duration (ms).
      );
    }
  }, []);

  // Disable zoom by waiting until OrbitControls is available.
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (graphRef.current && typeof graphRef.current.controls === "function") {
        const controls = graphRef.current.controls();
        if (controls) {
          controls.enableZoom = false;
          // Optionally, also disable zoom via the mouse wheel:
          controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE
          };
          clearInterval(intervalId);
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // Create a custom 3D object for each node that includes a sphere and a text annotation.
  const nodeThreeObject = (node: GraphNode) => {
    const group = new THREE.Group();

    // Create the node sphere.
    const sphereRadius = node.type === "major" ? 6 : 2;
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
      sprite.position.set(0, sphereRadius + 8, 0);
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
      sprite.position.set(0, sphereRadius + 4, 0);
    }
    group.add(sprite);

    return group;
  };

  return (
    <Column className="portfolio-graph" style={{ height: "600px", width: "100%" }}>
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={() => ""} // Disable default hover labels.
        nodeThreeObject={nodeThreeObject}
        linkWidth={1}
        linkColor={() => "#ffffff"}
        backgroundColor="rgba(0,0,0,0)"
      />
    </Column>
  );
};

export default PortfolioGraph;
