import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../styles/general.css";

export default function GeneralInfo({ data = {}, onSubmit }) {
  // editing: true => show inputs. false => show values.
  const [editing, setEditing] = useState(!data || !data.name);

  // local form state for controlled inputs
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // If parent data changes (e.g., reloaded or updated), sync local state
  useEffect(() => {
    setForm({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
    });
    if (data && data.name) setEditing(false);
  }, [data]);

  // controlled input handler
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // submit handler: pass data up and toggle display mode
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    onSubmit?.(form);
  };

  // restore edit mode
  const handleEdit = () => setEditing(true);

  return (
    <div className="general-section">
      <div className="section-title">
        <h3>General Information</h3>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <FormField
            label="Full name"
            name="name"
            value={form.name}
            placeholder="Jane Doe"
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="jane@example.com"
            onChange={handleChange}
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            placeholder="+1 555 555 555"
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div className="display-block">
          <h4 style={{ marginBottom: 4 }}>{form.name || "Full name"}</h4>
          <p style={{ margin: "4px 0" }}>{form.email}</p>
          <p style={{ margin: "4px 0" }}>{form.phone}</p>
          <div style={{ marginTop: 8 }}>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}
