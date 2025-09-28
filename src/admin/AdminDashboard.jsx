import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCriterionCard from "./AdminCriterionCard";
import AddEditLinkModal from "./AddEditLinkModal"; 
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [summary, setSummary] = useState([]);
  const [selectedCriterion, setSelectedCriterion] = useState(null);
  const [links, setLinks] = useState([]);
  const [modalData, setModalData] = useState(null); // for add/edit modal

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/criteria/summary`);
    setSummary(res.data);
  };

  const handleCardClick = async (criterionNumber) => {
    setSelectedCriterion(criterionNumber);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/criteria/${criterionNumber}/links`
    );
    setLinks(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/criteria/${id}`);
      fetchSummary();
      handleCardClick(selectedCriterion);
    }
  };

  const openAddModal = () => {
    setModalData({ criterionNumber: selectedCriterion }); // empty data for creation
  };

  const openEditModal = (link) => {
    setModalData(link);
  };

  const handleModalSuccess = () => {
    setModalData(null);
    fetchSummary();
    handleCardClick(selectedCriterion);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard - Criteria Summary</h2>

      {/* Criteria Cards */}
      <div className="row">
        {summary.map((criterion) => (
          <AdminCriterionCard
            key={criterion._id}
            criterion={criterion}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* Selected Criterion Links Table */}
      {selectedCriterion && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Links for Criterion {selectedCriterion}</h4>
            <button className="btn btn-success" onClick={openAddModal}>
              + Add New Link
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => (
                  <tr key={link._id}>
                    <td>{index + 1}</td>
                    <td>{link.title}</td>
                    <td>
                      <a href={link.link} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => openEditModal(link)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(link._id)}
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
      )}

      {/* Add/Edit Modal */}
      {modalData && (
        <AddEditLinkModal data={modalData} onSuccess={handleModalSuccess} />
      )}
    </div>
  );
}
