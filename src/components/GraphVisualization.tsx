// src/components/GraphVisualization.tsx
import React, { useRef, useMemo } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import styles from "../styles/graph.module.scss";

interface ProjectNode {
  id: number;
  name: string;
  description: string;
  category: "Academic" | "Professional" | "Personal" | string;
  importance: number;
  techStack: string[];
}

interface ProjectLink {
  source: number;
  target: number;
  sharedTech: string;
}

interface GraphData {
  nodes: ProjectNode[];
  links: ProjectLink[];
}

interface GraphVisualizationProps {
  searchQuery: string;
  filters: { [key: string]: any };
  onNodeClick?: (node: ProjectNode) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  searchQuery,
  filters,
  onNodeClick,
}) => {
  const fgRef = useRef<any>();

  // Sample project data. Replace this with dynamic data if needed.
  const graphData: GraphData = useMemo(
    () => ({
      nodes: [
        {
          id: 1,
          name: "Project A",
          description: "A cool academic project.",
          category: "Academic",
          importance: 10,
          techStack: ["React", "Python"],
        },
        {
          id: 2,
          name: "Project B",
          description: "A professional project.",
          category: "Professional",
          importance: 15,
          techStack: ["Next.js", "Node.js"],
        },
        {
          id: 3,
          name: "Project C",
          description: "A personal project.",
          category: "Personal",
          importance: 5,
          techStack: ["D3.js", "JavaScript"],
        },
        // …add more projects as needed
      ],
      links: [
        { source: 1, target: 2, sharedTech: "React" },
        { source: 2, target: 3, sharedTech: "JavaScript" },
        // …add more links as needed
      ],
    }),
    []
  );

  // Helper to check if a node should be highlighted based on the search query.
  const isNodeHighlighted = (node: ProjectNode) => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      node.name.toLowerCase().includes(query) ||
      (node.techStack &&
        node.techStack.some((tech) => tech.toLowerCase().includes(query)))
    );
  };

  return (
    <div className={styles.graphContainer}>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        // When hovering, show the project name and description.
        nodeLabel={(node: ProjectNode) => `${node.name}: ${node.description}`}
        // Show shared technology on the links.
        linkLabel={(link: ProjectLink) => `Shared Tech: ${link.sharedTech}`}
        // Create custom 3D objects for nodes: a sphere whose size depends on importance.
        nodeThreeObject={(node: ProjectNode) => {
          const sphereGeometry = new THREE.SphereGeometry(
            node.importance * 0.1,
            16,
            16
          );
          const isHighlighted = isNodeHighlighted(node);
          const materialColor = new THREE.Color(
            isHighlighted ? 0xffff00 : getCategoryColor(node.category)
          );
          const sphereMaterial = new THREE.MeshBasicMaterial({
            color: materialColor,
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          return sphere;
        }}
        // When clicking a node, trigger the provided callback (to open a modal or navigate).
        onNodeClick={(node: ProjectNode) => {
          onNodeClick && onNodeClick(node);
        }}
        // Adjust link width based on whether either connected node is highlighted.
        linkWidth={(link: ProjectLink) => {
          const sourceNode = graphData.nodes.find(
            (n) => n.id === link.source
          );
          const targetNode = graphData.nodes.find(
            (n) => n.id === link.target
          );
          return isNodeHighlighted(sourceNode!) || isNodeHighlighted(targetNode!)
            ? 4
            : 1;
        }}
        // Change link color if highlighted.
        linkColor={(link: ProjectLink) => {
          const sourceNode = graphData.nodes.find(
            (n) => n.id === link.source
          );
          const targetNode = graphData.nodes.find(
            (n) => n.id === link.target
          );
          return isNodeHighlighted(sourceNode!) || isNodeHighlighted(targetNode!)
            ? "#ff0000"
            : "#999999";
        }}
        // (Optional) Add other ForceGraph3D configuration here (e.g., camera settings).
      />
    </div>
  );
};

// Helper function to map project categories to colors.
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Academic: "#3498db",
    Professional: "#2ecc71",
    Personal: "#e74c3c",
  };
  return colors[category] || "#cccccc";
};

export default GraphVisualization;
