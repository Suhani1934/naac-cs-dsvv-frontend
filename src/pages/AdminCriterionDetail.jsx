// frontend/src/pages/AdminCriterionDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminCriterionDetail() {
  const { number } = useParams(); // criterion number
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    serialNumber: "",
    title: "",
    link: "",
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/signin");
      return;
    }
    fetchDetails();
  }, [navigate, token]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/criteria/${number}/details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetails(res.data);
    } catch (err) {
      console.log("Fetch details error:", err);
    }
  };

  const handleShow = (detail = null) => {
    setEditing(detail);
    if (detail) {
      setFormData({
        serialNumber: detail.serialNumber,
        title: detail.title,
        link: detail.link,
      });
    } else {
      setFormData({ serialNumber: "", title: "", link: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({ serialNumber: "", title: "", link: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/criteria/detail/${editing._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/criteria/detail`,
          { ...formData, criterionNumber: number },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchDetails();
      handleClose();
    } catch (err) {
      console.log("Save detail error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this detail?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/criteria/detail/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDetails();
    } catch (err) {
      console.log("Delete detail error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Criterion {number} Details</h2>

      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => handleShow()}>
          + Add Detail
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Title</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.serialNumber}</td>
              <td>{detail.title}</td>
              <td>
                <a href={detail.link} target="_blank" rel="noopener noreferrer">
                  {detail.link}
                </a>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(detail)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(detail._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Detail" : "Add Detail"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData({ ...formData, serialNumber: e.target.value })
                }
                placeholder="e.g., 1.1 or 1.1.1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
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
