// frontend/src/components/CriterionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./CriterionCard.css";

export default function CriterionCard({ number, name, index }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card
        className={`criterion-card h-100 card-${(index % 2) + 1}`}
        onClick={() => navigate(`/criterion/${number}`)}
      >
        <Card.Body className="text-center d-flex flex-column justify-content-center">
          {/* Serial number circle */}
          <div className="card-number mb-3">{index + 1}</div>

          {/* Title */}
          <Card.Title className="card-title">
            Criterion {number}
          </Card.Title>

          {/* Display name below */}
          <Card.Text className="mt-2 fw-bold">{name}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
