// src/components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-bar" style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Search projects or skills..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default SearchBar;
