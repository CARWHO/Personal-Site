// src/components/portfolio/PortfolioGraph.tsx
"use client";

import React, { useEffect, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { Column } from "@/once-ui/components";
import * as THREE from "three";

// -------------------------------------------------------------------------
// Data Structures
// -------------------------------------------------------------------------
interface GraphNode {
  id: string;
  type: "major" | "skill";
  project?: string; // defined for skill nodes
  color: number;
  // Fixed positions on the sphere:
  fx: number;
  fy: number;
  fz: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// -------------------------------------------------------------------------
// Configuration
// -------------------------------------------------------------------------
const SPHERE_RADIUS = 150;

// Instead of placing the four major nodes at extreme, separate positions,
// we assign each one spherical coordinates in the same band (for example,
// all with φ = 60°) but with different azimuthal angles (θ) so that they lie
// on one continuous region of the sphere.
const majorProjects = [
  {
    id: "halo vision",
    color: 0xff1493, // deep pink
    phi: Math.PI / 3,       // 60° from the positive z‑axis
    theta: Math.PI / 4,     // 45° azimuth
  },
  {
    id: "kora",
    color: 0x00ff00, // green
    phi: Math.PI / 3,       
    theta: (3 * Math.PI) / 4,  // 135°
  },
  {
    id: "dawn aerospace",
    color: 0x0000ff, // blue
    phi: Math.PI / 3,       
    theta: (5 * Math.PI) / 4,  // 225°
  },
  {
    id: "wellington city council",
    color: 0xffa500, // orange
    phi: Math.PI / 3,       
    theta: (7 * Math.PI) / 4,  // 315°
  },
];

// For each major project, we will generate a set of nearby “skill” nodes.
// (They are placed by offsetting the major node’s spherical position slightly.)
const SKILL_COUNT_PER_PROJECT = 10;
// Maximum angular offset (in radians) for a child node relative to its major node.
const MAX_ANGLE_OFFSET = 0.1; // roughly 6°


// -------------------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------------------
/**
 * Convert spherical coordinates (φ, θ) with a given radius to Cartesian coordinates.
 */
function sphericalToCartesian(phi: number, theta: number, radius: number): THREE.Vector3 {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * Given a vector on the sphere (the position of a major node),
 * return two orthonormal tangent vectors spanning the tangent plane at that point.
 */
function getTangentBasis(v: THREE.Vector3): { u: THREE.Vector3; v: THREE.Vector3 } {
  // Choose an arbitrary vector not parallel to v.
  const arbitrary = Math.abs(v.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const u = new THREE.Vector3().crossVectors(v, arbitrary).normalize();
  const w = new THREE.Vector3().crossVectors(v, u).normalize();
  return { u, v: w };
}

/**
 * Given a major node’s position on the sphere, return a new position for a
 * child (skill) node. The new position is computed by applying a small random
 * displacement (in the tangent plane) and then re‑projecting the result onto the sphere.
 */
function getChildPosition(majorPos: THREE.Vector3): THREE.Vector3 {
  const { u, v } = getTangentBasis(majorPos);
  const angleOffset = Math.random() * MAX_ANGLE_OFFSET;
  const theta = Math.random() * 2 * Math.PI;
  // For small angles, the displacement (arc length) ≈ radius * angle.
  const displacement = new THREE.Vector3()
    .addScaledVector(u, Math.cos(theta) * angleOffset * SPHERE_RADIUS)
    .addScaledVector(v, Math.sin(theta) * angleOffset * SPHERE_RADIUS);
  // Add the displacement and then project back onto the sphere.
  return new THREE.Vector3().addVectors(majorPos, displacement).normalize().multiplyScalar(SPHERE_RADIUS);
}

/**
 * Generate the graph data:
 * - Four major nodes (the projects) are placed on the same spherical band.
 * - For each major node, several nearby skill nodes are generated (also on the sphere).
 * - Each skill node is linked to its major node.
 */
const generateGraphData = () => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Create major nodes.
  majorProjects.forEach((proj) => {
    const pos = sphericalToCartesian(proj.phi, proj.theta, SPHERE_RADIUS);
    nodes.push({
      id: proj.id,
      type: "major",
      color: proj.color,
      fx: pos.x,
      fy: pos.y,
      fz: pos.z,
    });

    // Generate skill (child) nodes near this major node.
    for (let i = 0; i < SKILL_COUNT_PER_PROJECT; i++) {
      const childPos = getChildPosition(pos);
      const childId = `${proj.id}-skill-${i}`;
      nodes.push({
        id: childId,
        type: "skill",
        project: proj.id,
        color: proj.color,
        fx: childPos.x,
        fy: childPos.y,
        fz: childPos.z,
      });
      // Link the skill node to its parent (major) node.
      links.push({
        source: proj.id,
        target: childId,
      });
    }
  });

  // Optionally, you can also link the major nodes together.
  for (let i = 0; i < majorProjects.length; i++) {
    for (let j = i + 1; j < majorProjects.length; j++) {
      links.push({
        source: majorProjects[i].id,
        target: majorProjects[j].id,
      });
    }
  }

  return { nodes, links };
};

// -------------------------------------------------------------------------
// React Component
// -------------------------------------------------------------------------
const PortfolioGraph: React.FC = () => {
  const graphRef = useRef<any>();
  const graphData = generateGraphData();

  // Position the camera so that the entire sphere is in view.
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.cameraPosition(
        { x: 0, y: 0, z: SPHERE_RADIUS * 2 },
        { x: 0, y: 0, z: 0 },
        2000
      );
    }
  }, []);

  // Render nodes as spheres: larger for major nodes and smaller for skills.
  const nodeThreeObject = (node: GraphNode) => {
    const radius = node.type === "major" ? 4 : 1.5;
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: node.color });
    return new THREE.Mesh(geometry, material);
  };

  return (
    <Column className="portfolio-graph" style={{ height: "600px", width: "100%" }}>
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={(node: GraphNode) => node.id}
        nodeThreeObject={nodeThreeObject}
        linkWidth={1}
        linkColor={() => "#ffffff"}
        backgroundColor="rgba(0,0,0,0)"
      />
    </Column>
  );
};

export default PortfolioGraph;
