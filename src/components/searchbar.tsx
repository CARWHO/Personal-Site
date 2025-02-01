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
        width: "300px",
        padding: "8px",
        marginBottom: "20px",
        backgroundColor: "transparent",
        borderRadius: "8px",
        position: "absolute",
        right: "0",
        top: "20%",
        zIndex: 1000,
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
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          outline: "none",
          borderRadius: "8px",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </div>
  );
};

export default SearchBar;
