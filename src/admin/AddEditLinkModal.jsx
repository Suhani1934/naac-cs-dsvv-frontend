import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddEditLinkModal({ data, onSuccess }) {
  const isEdit = Boolean(data._id);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitle(data.title);
      setLink(data.link);
    } else {
      setTitle("");
      setLink("");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/criteria/${data._id}`,
          {
            title,
            link,
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/criteria`, {
          criterionNumber: data.criterionNumber,
          title,
          link,
        });
      }
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show onHide={onSuccess}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Link" : "Add New Link"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onSuccess}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
