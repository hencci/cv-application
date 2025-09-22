import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../styles/education.css";
import { generateYears } from "../utils/dateUtils";

export default function Education({ list = [], onAdd, onUpdate, onRemove }) {
  // empty template for new entries
  const empty = { school: "", title: "", date: "" };
  const years = generateYears({ start: 1980 });

  // showAdd toggles the top-level add form
  const [showAdd, setShowAdd] = useState(false);
  // form holds the controlled input values for add/edit
  const [form, setForm] = useState(empty);

  // editingId: when set, indicates which entry is currently being edited
  const [editingId, setEditingId] = useState(null);

  const [errors, setErrors] = useState({});

  // Sync: when the add form is closed, reset form values
  useEffect(() => {
    if (!showAdd && editingId === null) setForm(empty);
  }, [showAdd, editingId]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = (vals) => {
    const e = {};
    if (!vals.school.trim()) e.school = "School is required.";
    if (!vals.title.trim()) e.title = "Title of study is required.";
    if (!vals.date.trim()) e.date = "Please select a year.";
    return e;
  };

  // Add a new education entry
  const handleAdd = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onAdd?.(form);
      setForm(empty);
      setShowAdd(false);
    }
  };

  // Start editing an existing item: fill form and set editingId
  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ school: item.school, title: item.title, date: item.date });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
  };

  // Submit edited item
  const submitEdit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onUpdate?.(editingId, form);
      setEditingId(null);
      setForm(empty);
    }
  };

  return (
    <div className="education-section">
      <div className="section-title">
        <h3>Education</h3>
        <div>
          <button
            onClick={() => {
              setShowAdd((s) => !s);
              setEditingId(null);
            }}
          >
            {showAdd ? "Cancel" : "Add"}
          </button>
        </div>
      </div>

      {/* Add form (top) */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mini-form">
          <FormField
            label="School"
            name="school"
            value={form.school}
            onChange={handleChange}
            required
            hasError={!!errors.school}
          />
          {errors.school && <div className="field-error">{errors.school}</div>}

          <FormField
            label="Title of study"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            hasError={!!errors.title}
          />
          {errors.title && <div className="field-error">{errors.title}</div>}

          <FormField
            label="Year of graduation"
            name="date"
            value={form.date}
            onChange={handleChange}
            options={years.map((y) => ({ value: y, label: y }))}
            required
            hasError={!!errors.date}
          />
          {errors.date && <div className="field-error">{errors.date}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      {/* List of existing education entries */}
      <div className="edu-list">
        {list.length === 0 && <p className="muted">No education added yet.</p>}

        {list.map((item) => (
          <div className="edu-item" key={item.id}>
            {editingId === item.id ? (
              // Edit form for this item
              <form onSubmit={submitEdit} className="mini-form">
                <FormField
                  label="School"
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  required
                  hasError={!!errors.school}
                />
                {errors.school && (
                  <div className="field-error">{errors.school}</div>
                )}

                <FormField
                  label="Title of study"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  hasError={!!errors.title}
                />
                {errors.title && (
                  <div className="field-error">{errors.title}</div>
                )}

                <FormField
                  label="Year of graduation"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  options={years.map((y) => ({ value: y, label: y }))}
                  required
                  hasError={!!errors.date}
                />
                {errors.date && (
                  <div className="field-error">{errors.date}</div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Display mode for this item
              <div className="edu-display">
                <strong>{item.title || "Title of study"}</strong>
                <div className="muted">{item.school}</div>
                <div className="muted small">{item.date}</div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button
                    onClick={() => onRemove?.(item.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
