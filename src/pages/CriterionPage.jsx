// frontend/src/pages/CriterionPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CriterionPage() {
  const { number } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/criteria/${number}`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, [number]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Criterion {number} Details</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.title}</td>
              <td>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
