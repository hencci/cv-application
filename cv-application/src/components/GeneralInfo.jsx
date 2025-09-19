import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../styles/general.css";

const PHONE_REGEX = /^(070|080|090|081|071|091)\d{8}$/; // matches prefixes + 8 digits => total 11
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function GeneralInfo({ data = {}, onSubmit }) {
  // editing: true => show inputs. false => show values.
  const [editing, setEditing] = useState(!data || !data.name);

  // local form state for controlled inputs
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // errors object (always declared before render usage)
  const [errors, setErrors] = useState({});

  // If parent data changes (e.g., reloaded or updated), sync local state
  useEffect(() => {
    setForm({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
    });
    if (data && data.name) setEditing(false);
  }, [data]);

  const validate = (values) => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(values.email.trim()))
      e.email = "Enter a valid email.";
    if (!values.phone.trim()) e.phone = "Phone number is required.";
    else if (values.phone.length !== 11)
      e.phone = "Phone must be exactly 11 characters.";
    else if (!PHONE_REGEX.test(values.phone))
      e.phone = "Phone must start with 080,070,090,081,071 or 091.";
    return e;
  };

  // controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error for this field while typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    // if no errors, pass up and toggle display
    if (Object.keys(found).length === 0) {
      setEditing(false);
      onSubmit?.(form);
    }
  };

  // restore edit mode
  const handleEdit = () => {
    setEditing(true);
    setErrors({}); // clear previous errors when editing
  };

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
            required
            hasError={!!errors.name}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="jane@example.com"
            onChange={handleChange}
            required
            hasError={!!errors.email}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            placeholder="08012345678"
            onChange={handleChange}
            required
            hasError={!!errors.phone}
          />
          {errors.phone && <div className="field-error">{errors.phone}</div>}

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
