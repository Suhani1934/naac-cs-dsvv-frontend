import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash, FaPlus, FaLink } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [criteria, setCriteria] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ criterionNumber: "", name: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/signin");
      return;
    }
    fetchCriteria();
  }, [navigate, token]);

  const fetchCriteria = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/criteria`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure unique by criterionNumber
      const unique = Array.from(
        new Map(res.data.map((c) => [c.criterionNumber, c])).values()
      );

      setCriteria(unique);
    } catch (err) {
      console.log("Fetch criteria error:", err);
    }
  };

  const handleShow = (crit = null) => {
    setEditing(crit);
    if (crit) {
      setFormData({ criterionNumber: crit.criterionNumber, name: crit.name });
    } else {
      setFormData({ criterionNumber: "", name: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({ criterionNumber: "", name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.criterionNumber || !formData.name) {
      alert("Both Criterion Number and Name are required.");
      return;
    }

    try {
      if (editing) {
        // Update existing criterion
        await axios.put(
          `${import.meta.env.VITE_API_URL}/criteria/${editing._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add new criterion
        await axios.post(
          `${import.meta.env.VITE_API_URL}/criteria`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchCriteria();
      handleClose();
    } catch (err) {
      console.log("Save error:", err);
      if (err.response && err.response.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Something went wrong while saving criterion.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this criterion?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/criteria/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCriteria();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete criterion.");
    }
  };

  const navigateToDetails = (criterionNumber) => {
    navigate(`/admin/criterion/${criterionNumber}/details`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center dashboard-heading">Admin Dashboard</h2>

      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-1" /> Add Criterion
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Criterion Number</th>
            <th>Name</th>
            <th>Total Links</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((crit) => (
            <tr key={`${crit.criterionNumber}-${crit._id}`}>
              <td>{crit.criterionNumber}</td>
              <td>{crit.name}</td>
              <td>{crit.linkCount || 0}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(crit)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(crit._id)}
                >
                  <FaTrash />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => navigateToDetails(crit.criterionNumber)}
                >
                  <FaLink className="me-1" /> View/Add Links
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Criterion Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Criterion" : "Add Criterion"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Criterion Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.criterionNumber}
                onChange={(e) =>
                  setFormData({ ...formData, criterionNumber: e.target.value })
                }
                placeholder="e.g., 1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Criterion Name"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editing ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
