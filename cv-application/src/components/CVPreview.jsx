import React from "react";
import "../styles/preview.css";

export default function CVPreview({
  general = {},
  education = [],
  experience = [],
}) {
  return (
    <div className="cv-preview">
      <header className="cv-header">
        <h1 className="cv-name">{general.name || "Full Name"}</h1>
        <div className="cv-contact">
          {general.email && <span>{general.email}</span>}
          {general.email && general.phone ? (
            <span className="sep">•</span>
          ) : null}
          {general.phone && <span>{general.phone}</span>}
        </div>
      </header>

      <section className="cv-section">
        <h4>Education</h4>
        {education.length === 0 ? (
          <div className="muted small">No education added</div>
        ) : (
          <ul className="cv-edu-list">
            {education.map((e) => (
              <li key={e.id} className="cv-edu-item">
                <div className="cv-edu-title">{e.title}</div>
                <div className="muted">
                  {e.school} • {e.date}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="cv-section">
        <h4>Experience</h4>
        {experience.length === 0 ? (
          <div className="muted small">No experience added</div>
        ) : (
          <ul className="cv-exp-list">
            {experience.map((ex) => (
              <li key={ex.id} className="cv-exp-item">
                <div className="cv-exp-title">
                  {ex.position} <span className="muted">— {ex.company}</span>
                </div>
                <div className="muted small">
                  {ex.from} — {ex.to}
                </div>
                <p className="cv-exp-resp">{ex.responsibilities}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
