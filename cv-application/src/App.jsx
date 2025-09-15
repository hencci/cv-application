import React, { useState } from "react";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import "./styles/app.css";

export default function App() {
  const [general, setGeneral] = useState({ name: "", email: "", phone: "" });

  const [educationList, setEducationlist] = useState([]);

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

  return (
    <div className="app-container">
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>CV Builder (Vite)</h2>

        {/* Mount GeneralInfo and pass current state + submit handler */}
        <GeneralInfo data={general} onSubmit={handleGeneralSubmit} />

        <Education
          list={educationList}
          onAdd={addEducation}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />
      </div>
    </div>
  );
}
