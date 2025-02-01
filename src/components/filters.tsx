// src/components/Filters.tsx
import React from "react";

interface FiltersProps {
  filters: {
    category?: string;
    tech?: string;
    timeline?: string;
  };
  projects: Array<{
    techStack: string[];
  }>;
  onFilterChange: (newFilters: FiltersProps["filters"]) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, projects, onFilterChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, tech: e.target.value });
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, timeline: e.target.value });
  };

  return (
    <div className="filters" style={{ marginBottom: "10px" }}>
      <label style={{ marginRight: "10px" }}>
        Category:
        <select value={filters.category || ""} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Academic">Academic</option>
          <option value="Professional">Professional</option>
          <option value="Personal">Personal</option>
        </select>
      </label>
      <label style={{ marginRight: "10px" }}>
        Technology:
        <select value={filters.tech || ""} onChange={handleTechChange}>
          <option value="">All</option>
          {Array.from(new Set(projects.flatMap(p => p.techStack))).map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </label>
      <label>
        Timeline:
        <select
          value={filters.timeline || ""}
          onChange={handleTimelineChange}
        >
          <option value="">All</option>
          <option value="2020-2021">2020-2021</option>
          <option value="2022">2022</option>
          {/* Add more options as needed */}
        </select>
      </label>
    </div>
  );
};

export default Filters;
