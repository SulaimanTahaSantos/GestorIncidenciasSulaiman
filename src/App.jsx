import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IniciSessio from './views/IniciSessio';
import Registre from './views/Registre';
import Panell from './views/Panell';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<IniciSessio />} />
          <Route path="/Registre" element={<Registre />} />
          <Route path="/panel" element={<Panell />} />
        
        </Routes>
      </Router>
  );
}

export default App;