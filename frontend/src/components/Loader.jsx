import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <h3>Analyzing Floor Plan</h3>
        <p> It's may Take time </p>
        <p>Please wait...</p>
      </div>
    </div>
  );
}