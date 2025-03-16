import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IniciSessio from "./views/IniciSessio";
import Registre from "./views/Registre";
import Panell from "./views/Panell";
import Comentaris from "./views/Comentaris";
import Tiquet from "./views/tiquet";
import AdminDashboard from "./views/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IniciSessio />} />
        <Route path="/Registre" element={<Registre />} />
        <Route path="/panel" element={<Panell />} />
        <Route path="/comentaris/:id" element={<Comentaris />} />
        <Route path="/tiquet" element={<Tiquet />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
