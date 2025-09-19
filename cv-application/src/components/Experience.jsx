import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../styles/experience.css";
import { generateYears } from "../utils/dateUtils";

export default function Experience({ list = [], onAdd, onUpdate, onRemove }) {
  const empty = {
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    to: "",
  };
  const years = ["Present", ...generateYears({ start: 1980 })]; // allow Present as option

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!showAdd && editingId === null) setForm(empty);
  }, [showAdd, editingId]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = (vals) => {
    const e = {};
    if (!vals.company.trim()) e.company = "Company is required.";
    if (!vals.position.trim()) e.position = "Position is required.";
    if (!vals.responsibilities.trim())
      e.responsibilities = "Responsibilities are required.";
    if (!vals.from) e.from = "Select start year.";
    if (!vals.to) e.to = "Select end year or Present.";

    // if both years are numeric, ensure from <= to
    if (
      vals.from &&
      vals.to &&
      vals.from !== "Present" &&
      vals.to !== "Present"
    ) {
      const fromY = parseInt(vals.from, 10);
      const toY = parseInt(vals.to, 10);
      if (!isNaN(fromY) && !isNaN(toY) && fromY > toY)
        e.to = "End year must be the same or after start year.";
    }
    return e;
  };

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

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      company: item.company,
      position: item.position,
      responsibilities: item.responsibilities,
      from: item.from,
      to: item.to,
    });
    setErrors({});
  };
  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
    setErrors({});
  };

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
    <div className="experience-section">
      <div className="section-title">
        <h3>Practical Experience</h3>
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

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mini-form">
          <FormField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            hasError={!!errors.company}
          />
          {errors.company && (
            <div className="field-error">{errors.company}</div>
          )}

          <FormField
            label="Position"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            hasError={!!errors.position}
          />
          {errors.position && (
            <div className="field-error">{errors.position}</div>
          )}

          <FormField
            label="Responsibilities"
            name="responsibilities"
            value={form.responsibilities}
            onChange={handleChange}
            textarea
            required
            hasError={!!errors.responsibilities}
          />
          {errors.responsibilities && (
            <div className="field-error">{errors.responsibilities}</div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <FormField
              label="From"
              name="from"
              value={form.from}
              onChange={handleChange}
              options={years.map((y) => ({ value: y, label: y }))}
              required
              hasError={!!errors.from}
            />
            <FormField
              label="To"
              name="to"
              value={form.to}
              onChange={handleChange}
              options={years.map((y) => ({ value: y, label: y }))}
              required
              hasError={!!errors.to}
            />
          </div>
          {errors.from && <div className="field-error">{errors.from}</div>}
          {errors.to && <div className="field-error">{errors.to}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      {/* List of existing experience entries */}
      <div className="exp-list">
        {list.length === 0 && <p className="muted">No experience added yet.</p>}
        {list.map((item) => (
          <div className="exp-item" key={item.id}>
            {editingId === item.id ? (
              <form onSubmit={submitEdit} className="mini-form">
                <FormField
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  hasError={!!errors.company}
                />
                {errors.company && (
                  <div className="field-error">{errors.company}</div>
                )}

                <FormField
                  label="Position"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  required
                  hasError={!!errors.position}
                />
                {errors.position && (
                  <div className="field-error">{errors.position}</div>
                )}

                <FormField
                  label="Responsibilities"
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  textarea
                  required
                  hasError={!!errors.responsibilities}
                />
                {errors.responsibilities && (
                  <div className="field-error">{errors.responsibilities}</div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <FormField
                    label="From"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    options={years.map((y) => ({ value: y, label: y }))}
                    required
                    hasError={!!errors.from}
                  />
                  <FormField
                    label="To"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    options={years.map((y) => ({ value: y, label: y }))}
                    required
                    hasError={!!errors.to}
                  />
                </div>
                {errors.from && (
                  <div className="field-error">{errors.from}</div>
                )}
                {errors.to && <div className="field-error">{errors.to}</div>}

                <div style={{ display: "flex", gap: 8 }}>
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="exp-display">
                <strong>{item.position || "Position"}</strong>
                <div className="muted">{item.company}</div>
                <div className="muted small">
                  {item.from} — {item.to}
                </div>
                <p style={{ marginTop: 6 }}>{item.responsibilities}</p>
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
