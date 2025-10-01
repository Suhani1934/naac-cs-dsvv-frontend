import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function AdminCriterionDetail() {
  const { number } = useParams(); // criterion number
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [showMainModal, setShowMainModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [editingMain, setEditingMain] = useState(null);
  const [editingSub, setEditingSub] = useState(null);

  const [mainForm, setMainForm] = useState({ mainSerialNumber: "", mainTitle: "" });
  const [subForm, setSubForm] = useState({ serialNumber: "", title: "", link: "" });

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

  // Main Heading 
  const handleShowMain = (detail = null) => {
    setEditingMain(detail);
    if (detail) setMainForm({ mainSerialNumber: detail.mainSerialNumber, mainTitle: detail.mainTitle });
    else setMainForm({ mainSerialNumber: "", mainTitle: "" });
    setShowMainModal(true);
  };

  const handleCloseMain = () => {
    setShowMainModal(false);
    setEditingMain(null);
    setMainForm({ mainSerialNumber: "", mainTitle: "" });
  };

  const handleMainSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMain) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/criteria/detail/${editingMain._id}`,
          mainForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/criteria/detail`,
          { ...mainForm, criterionNumber: number },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchDetails();
      handleCloseMain();
    } catch (err) {
      console.log("Main heading save error:", err);
    }
  };

  const handleDeleteMain = async (id) => {
    if (!window.confirm("Delete this main heading and all sub-headings?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/criteria/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDetails();
    } catch (err) {
      console.log("Delete main heading error:", err);
    }
  };

  //  Sub Heading 
  const handleShowSub = (main, sub = null) => {
    setEditingMain(main);
    setEditingSub(sub);
    if (sub) setSubForm({ serialNumber: sub.serialNumber, title: sub.title, link: sub.link });
    else setSubForm({ serialNumber: "", title: "", link: "" });
    setShowSubModal(true);
  };

  const handleCloseSub = () => {
    setShowSubModal(false);
    setEditingSub(null);
    setSubForm({ serialNumber: "", title: "", link: "" });
  };

  const handleSubSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSub) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/criteria/detail/${editingMain._id}/sub/${editingSub._id}`,
          subForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/criteria/detail/${editingMain._id}/sub`,
          subForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchDetails();
      handleCloseSub();
    } catch (err) {
      console.log("Sub-heading save error:", err);
    }
  };

  const handleDeleteSub = async (mainId, subId) => {
    if (!window.confirm("Delete this sub-heading?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/criteria/detail/${mainId}/sub/${subId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDetails();
    } catch (err) {
      console.log("Delete sub-heading error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Criterion {number} Details</h2>

      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => handleShowMain()}>
          <FaPlus className="me-1" /> Add Main Heading
        </Button>
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Main Serial</th>
            <th>Main Title</th>
            <th>Sub Serial</th>
            <th>Sub Title</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((main) => (
            main.subHeadings.length > 0 ? (
              main.subHeadings.map((sub) => (
                <tr key={sub._id}>
                  <td>{main.mainSerialNumber}</td>
                  <td>{main.mainTitle}</td>
                  <td>{sub.serialNumber}</td>
                  <td>{sub.title}</td>
                  <td>
                    <a href={sub.link} target="_blank" rel="noopener noreferrer">
                      {sub.link}
                    </a>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowSub(main, sub)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteSub(main._id, sub._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={main._id}>
                <td>{main.mainSerialNumber}</td>
                <td>{main.mainTitle}</td>
                <td colSpan={3} className="text-center">No sub-headings</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowSub(main)}
                  >
                    <FaPlus /> Add Sub
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDeleteMain(main._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </Table>

      {/* Main Heading Modal */}
      <Modal show={showMainModal} onHide={handleCloseMain}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMain ? "Edit Main Heading" : "Add Main Heading"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleMainSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Main Serial Number</Form.Label>
              <Form.Control
                type="text"
                value={mainForm.mainSerialNumber}
                onChange={(e) => setMainForm({ ...mainForm, mainSerialNumber: e.target.value })}
                placeholder="e.g., 1.1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Main Title</Form.Label>
              <Form.Control
                type="text"
                value={mainForm.mainTitle}
                onChange={(e) => setMainForm({ ...mainForm, mainTitle: e.target.value })}
                placeholder="Main heading title"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMain}>Cancel</Button>
            <Button variant="primary" type="submit">{editingMain ? "Update" : "Save"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Sub-Heading Modal */}
      <Modal show={showSubModal} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSub ? "Edit Sub-Heading" : "Add Sub-Heading"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Sub Serial Number</Form.Label>
              <Form.Control
                type="text"
                value={subForm.serialNumber}
                onChange={(e) => setSubForm({ ...subForm, serialNumber: e.target.value })}
                placeholder="e.g., 1.1.1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sub Title</Form.Label>
              <Form.Control
                type="text"
                value={subForm.title}
                onChange={(e) => setSubForm({ ...subForm, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                value={subForm.link}
                onChange={(e) => setSubForm({ ...subForm, link: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSub}>Cancel</Button>
            <Button variant="primary" type="submit">{editingSub ? "Update" : "Save"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
