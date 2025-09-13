import React, { useState } from "react";
import GeneralInfo from "./components/GeneralInfo";
import "./styles/app.css";

export default function App() {
  // store general info at top-level so preview and other components can use it
  const [general, setGeneral] = useState({ name: "", email: "", phone: "" });

  const handleGeneralSubmit = (data) => setGeneral(data);

  return (
    <div className="app-container">
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>CV Builder (Vite)</h2>

        {/* Mount GeneralInfo and pass current state + submit handler */}
        <GeneralInfo data={general} onSubmit={handleGeneralSubmit} />

        {/* Next steps: Education, Experience components will be added below */}
      </div>
    </div>
  );
}
