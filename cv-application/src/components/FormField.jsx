import React from "react";

export default function FormField({
  label,
  name,
  value,
  type = "text",
  placeholder = "",
  onChange,
  textarea = false,
  options = null, // array of { value, label } for select
  required = false,
  hasError = false,
  id,
}) {
  const inputId = id || name;

  return (
    <div style={{ marginBottom: 8 }}>
      <label
        htmlFor={inputId}
        style={{
          display: "block",
          fontSize: 12,
          color: "#333",
          marginBottom: 4,
        }}
      >
        {label}
        {required ? " *" : ""}
      </label>

      {options ? (
        // Render a select dropdown when `options` is provided
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          style={{ width: "100%", padding: 8, borderRadius: 6 }}
        >
          <option value="">Select...</option>
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
          rows={4}
          aria-invalid={hasError}
          style={{ width: "100%", padding: 8, borderRadius: 6 }}
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
          style={{ width: "100%", padding: 8, borderRadius: 6 }}
        />
      )}
    </div>
  );
}
