import React from "react";
import "./AdminCriterionCard.css";

export default function AdminCriterionCard({ criterion, onClick }) {
  const shades = [
    "#73c2fb",
    "#68afe2",
    "#5c9bc9",
    "#5188b0",
    "#457497",
    "#3a617e",
    "#2e4e64",
    "#233a4b",
    "#172732",
    "#0b1319",
  ];

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div
        className="criterion-summary-card text-white p-4 rounded shadow"
        style={{ backgroundColor: shades[(criterion._id - 1) % 7] }}
        onClick={() => onClick(criterion._id)}
      >
        <h4>Criterion {criterion._id}</h4>
        <p>Total Links: {criterion.totalLinks}</p>
      </div>
    </div>
  );
}
