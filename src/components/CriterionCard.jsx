// frontend/src/components/CriterionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CriterionCard.css";

export default function CriterionCard({ number, index }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div
        className="criterion-card text-center shadow-sm"
        onClick={() => navigate(`/criterion/${number}`)}
      >
        <div className="card-number">{index + 1}</div>
        <h5 className="card-title mt-3">Criterion {number}</h5>
      </div>
    </div>
  );
}
