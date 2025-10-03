// frontend/src/pages/CriterionPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";

export default function CriterionPage() {
  const { number } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/criteria/${number}/details`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, [number]);

  return (
    <div className="container mt-5">
  <h2 className="mb-4">Criterion {number} Details</h2>

  {details.length > 0 ? (
    details.map((detail) => (
      <div key={detail._id} className="mb-3 border rounded shadow-sm p-3">
        {/* Main heading */}
        <h5 className="fw-bold">
          {detail.mainSerialNumber}. {detail.mainTitle}
        </h5>

        {/* Sub-headings */}
        {detail.subHeadings?.length > 0 ? (
          <ul className="list-group list-group-flush mt-2">
            {detail.subHeadings.map((sub) => (
              <li key={sub._id || `${detail._id}-${sub.serialNumber}`} className="list-group-item">
                <strong>{sub.serialNumber}</strong>: {sub.title} -{" "}
                <a href={sub.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mt-2">No sub-headings available.</p>
        )}
      </div>
    ))
  ) : (
    <p className="text-center text-muted">No details available.</p>
  )}
</div>

  );
}
