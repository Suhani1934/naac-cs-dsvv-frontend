import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCriterionForm({ editing, onSuccess }) {
  const [criterionNumber, setCriterionNumber] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (editing) {
      setCriterionNumber(editing.criterionNumber);
      setTitle(editing.title);
      setLink(editing.link);
    } else {
      setCriterionNumber("");
      setTitle("");
      setLink("");
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/criteria/${editing._id}`,
          { criterionNumber, title, link }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/criteria`, {
          criterionNumber,
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
    <form onSubmit={handleSubmit} className="mb-4 row g-3 align-items-end">
      <div className="col-md-2">
        <label>Criterion Number</label>
        <input
          type="number"
          className="form-control"
          value={criterionNumber}
          onChange={(e) => setCriterionNumber(e.target.value)}
          required
        />
      </div>
      <div className="col-md-5">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="col-md-3">
        <label>Link</label>
        <input
          type="url"
          className="form-control"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-primary w-100">
          {editing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
