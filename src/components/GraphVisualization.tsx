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
  projects: ProjectNode[];
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
    () => {
      // Filter nodes based on search and filters
      const filteredNodes = projects.filter(project => {
        const matchesSearch = !searchQuery || 
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = !filters.category || project.category === filters.category;
        const matchesTech = !filters.tech || project.techStack.includes(filters.tech);
        
        return matchesSearch && matchesCategory && matchesTech;
      });

      // Create links between projects that share technologies
      const links = [];
      for (let i = 0; i < filteredNodes.length; i++) {
        for (let j = i + 1; j < filteredNodes.length; j++) {
          const sharedTechs = filteredNodes[i].techStack.filter(tech => 
            filteredNodes[j].techStack.includes(tech)
          );
          if (sharedTechs.length > 0) {
            links.push({
              source: filteredNodes[i].id,
              target: filteredNodes[j].id,
              sharedTech: sharedTechs.join(", ")
            });
          }
        }
      }

      return {
        nodes: filteredNodes,
        links: links
      };
    },
    [searchQuery, filters, projects]
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
