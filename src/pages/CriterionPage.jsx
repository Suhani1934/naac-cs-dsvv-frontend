// frontend/src/pages/CriterionPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CriterionPage() {
  const { number } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/criteria/${number}/details`) // updated route
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, [number]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Criterion {number} Details</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>Serial Number</th>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {details.length > 0 ? (
            details.map((item) => (
              <tr key={item._id}>
                <td>{item.serialNumber}</td>
                <td>{item.title}</td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No details available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
