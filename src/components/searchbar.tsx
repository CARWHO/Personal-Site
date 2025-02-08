// src/components/SearchBar.tsx
import React, { KeyboardEvent } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, onSubmit }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      onSubmit(searchQuery);
    }
  };

  return (
    <div
      className="search-bar"
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "8px",
        marginTop: "16px",
        marginLeft: "-8px",
        backgroundColor: "transparent",
        borderRadius: "8px",
        zIndex: 1001,
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="Search projects or skills..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          boxSizing: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
