import React, { useState } from "react";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";
import "./styles/app.css";
import "./styles/preview.css";

export default function App() {
  const [general, setGeneral] = useState({ name: "", email: "", phone: "" });
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);

  const handleGeneralSubmit = (data) => setGeneral(data);

  // Education handlers
  const addEducation = (edu) => {
    setEducationList((prev) => [
      ...prev,
      { ...edu, id: Date.now().toString() },
    ]);
  };

  const updateEducation = (id, edu) => {
    setEducationList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...edu } : e))
    );
  };

  const removeEducation = (id) => {
    setEducationList((prev) => prev.filter((e) => e.id !== id));
  };

  // Experience handlers
  const addExperience = (exp) => {
    setExperienceList((prev) => [
      ...prev,
      { ...exp, id: Date.now().toString() },
    ]);
  };

  const updateExperience = (id, exp) => {
    setExperienceList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...exp } : e))
    );
  };

  const removeExperience = (id) => {
    setExperienceList((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="app-container two-column">
      <main className="panel">
        <h2 style={{ marginTop: 0 }}>CV Builder (Vite)</h2>

        <GeneralInfo data={general} onSubmit={handleGeneralSubmit} />

        <Education
          list={educationList}
          onAdd={addEducation}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />

        <Experience
          list={experienceList}
          onAdd={addExperience}
          onUpdate={updateExperience}
          onRemove={removeExperience}
        />
      </main>
      <aside className="panel preview-panel">
        <h3 style={{ marginTop: 0 }}>Live Preview</h3>
        <CVPreview
          general={general}
          education={educationList}
          experience={experienceList}
        />
      </aside>
    </div>
  );
}
