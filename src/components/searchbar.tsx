// src/components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div
      className="search-bar"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#222", // Dark background
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
      }}
    >
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
          backgroundColor: "#333", // Slightly lighter than container
          color: "#fff",
          border: "none",
          outline: "none",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default SearchBar;
