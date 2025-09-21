import React, { useMemo } from "react";
import "../styles/preview.css";

export default function CVPreview({
  general = {},
  education = [],
  experience = [],
}) {
  // compute initials for avatar (fallback to 'CV')
  const initials = useMemo(() => {
    const name = (general.name || "").trim();
    if (!name) return "CV";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [general.name]);

  // small helper to show a placeholder message when a section is empty
  const Empty = ({ label }) => <div className="muted small">{label}</div>;

  return (
    <div className="cv-preview fade-in">
      <header className="cv-header">
        <div className="cv-top">
          <div className="cv-avatar" aria-hidden>
            {initials}
          </div>

          <div className="cv-title">
            <h1 className="cv-name">{general.name || "Full Name"}</h1>
            <div className="cv-contact">
              {general.email && <span>{general.email}</span>}
              {general.email && general.phone ? (
                <span className="sep">•</span>
              ) : null}
              {general.phone && <span>{general.phone}</span>}
            </div>
          </div>
        </div>

        <p className="cv-tagline muted small">
          {general.name
            ? `Professional profile for ${general.name}`
            : "Your profile will appear here as you fill the form."}
        </p>
      </header>

      <main className="cv-body">
        <section className="cv-section">
          <h4 className="cv-section-title">Education</h4>
          {education.length === 0 ? (
            <Empty label="No education added" />
          ) : (
            <ul className="cv-edu-list">
              {education.map((e) => (
                <li key={e.id} className="cv-edu-item">
                  <div className="cv-edu-left">
                    <div className="cv-edu-title">{e.title}</div>
                    <div className="muted">{e.school}</div>
                  </div>
                  <div className="cv-edu-right muted small">{e.date}</div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="cv-section">
          <h4 className="cv-section-title">Experience</h4>
          {experience.length === 0 ? (
            <Empty label="No experience added" />
          ) : (
            <ul className="cv-exp-list">
              {experience.map((ex) => (
                <li key={ex.id} className="cv-exp-item">
                  <div className="cv-exp-left">
                    <div className="cv-exp-title">{ex.position}</div>
                    <div className="muted">{ex.company}</div>
                    {ex.responsibilities && (
                      <div className="cv-exp-resp">{ex.responsibilities}</div>
                    )}
                  </div>
                  <div className="cv-exp-right muted small">
                    {ex.from} — {ex.to}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
