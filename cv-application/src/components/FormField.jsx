import React from "react";

export default function FormField({
  label,
  name,
  value,
  type = "text",
  placeholder = "",
  onChange,
  textarea = false,
  options = null, // array of { value, label }
  required = false,
  hasError = false,
  id,
}) {
  const inputId = id || name;

  return (
    <div className="form-row">
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          className={`form-control form-select ${hasError ? "invalid" : ""}`}
        >
          <option value="">Select…</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={hasError}
          className={`form-control form-textarea ${hasError ? "invalid" : ""}`}
          rows={4}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={hasError}
          className={`form-control ${hasError ? "invalid" : ""}`}
        />
      )}
    </div>
  );
}
