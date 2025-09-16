import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../styles/experience.css";

export default function Experience({ list = [], onAdd, onUpdate, onRemove }) {
  const empty = {
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    to: "",
  };

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!showAdd && editingId === null) setForm(empty);
  }, [showAdd, editingId]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAdd = (e) => {
    e.preventDefault();
    // simple guard: avoid adding empty entries
    if (!form.company.trim() && !form.position.trim()) return;
    onAdd?.(form);
    setForm(empty);
    setShowAdd(false);
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
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!editingId) return;
    onUpdate?.(editingId, form);
    setEditingId(null);
    setForm(empty);
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
            placeholder="ACME Corp"
          />
          <FormField
            label="Position"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Frontend Developer"
          />
          <FormField
            label="Responsibilities"
            name="responsibilities"
            value={form.responsibilities}
            onChange={handleChange}
            textarea
            placeholder="Main responsibilities..."
          />
          <div style={{ display: "flex", gap: 8 }}>
            <FormField
              label="From"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="2019"
            />
            <FormField
              label="To"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="2021 or Present"
            />
          </div>
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
                />
                <FormField
                  label="Position"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                />
                <FormField
                  label="Responsibilities"
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  textarea
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <FormField
                    label="From"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                  />
                  <FormField
                    label="To"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                  />
                </div>
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
