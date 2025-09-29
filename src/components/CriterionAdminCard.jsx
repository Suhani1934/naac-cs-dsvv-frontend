import React from "react";
import { Button } from "react-bootstrap";

export default function CriterionAdminCard({ criterion, onAdd }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm text-center p-3 h-100">
        <h5 className="card-title">Criterion {criterion.criterionNumber}</h5>
        <p className="card-text mb-3">{criterion.title}</p>
        <p className="text-muted">{criterion.links.length} link(s)</p>
        <Button variant="primary" onClick={() => onAdd(criterion.criterionNumber)}>
          Add Link
        </Button>
      </div>
    </div>
  );
}
