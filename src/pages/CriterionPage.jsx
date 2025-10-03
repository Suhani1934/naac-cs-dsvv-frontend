// frontend/src/pages/CriterionPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            details.map((detail) => (
              <>
                {/* Main heading row */}
                <tr
                  key={`main-${detail._id}`}
                  className="table-secondary fw-bold"
                >
                  <td>{detail.mainSerialNumber}</td>
                  <td>{detail.mainTitle}</td>
                  <td className="text-muted">—</td>
                </tr>

                {/* Subheading rows */}
                {detail.subHeadings?.length > 0 &&
                  detail.subHeadings.map((sub) => (
                    <tr
                      key={sub._id || `${detail._id}-${sub.serialNumber}`}
                    >
                      <td>{sub.serialNumber}</td>
                      <td>{sub.title}</td>
                      <td>
                        <a
                          href={sub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
              </>
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
