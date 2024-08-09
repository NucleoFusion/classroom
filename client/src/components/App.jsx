import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import PrincipalHome from "./PrincipalHome/PrincipalHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Principal" element={<PrincipalHome />} />
      </Routes>
    </Router>
  );
}

export default App;
