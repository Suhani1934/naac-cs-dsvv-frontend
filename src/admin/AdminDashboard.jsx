import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCriterionForm from "./AdminCriterionForm";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [criteria, setCriteria] = useState([]);
  const [editing, setEditing] = useState(null); 

  const fetchCriteria = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/criteria`
      );
      setCriteria(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCriteria();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this criterion?")) {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/criteria/${id}`
      );
      fetchCriteria();
    }
  };

  const handleEdit = (criterion) => {
    setEditing(criterion);
  };

  const handleFormSuccess = () => {
    setEditing(null);
    fetchCriteria();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard - CS NAAC Criteria</h2>

      {/* Form */}
      <AdminCriterionForm editing={editing} onSuccess={handleFormSuccess} />

      {/* Table */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Criterion Number</th>
              <th>Title</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>{c.criterionNumber}</td>
                <td>{c.title}</td>
                <td>
                  <a href={c.link} target="_blank" rel="noopener noreferrer">
                    View Link
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
