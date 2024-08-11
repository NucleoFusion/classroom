import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import PrincipalHome from "./PrincipalHome/PrincipalHome";
import StudentHome from "./StudentHome/StudentHome";
import TeacherHome from "./TeacherHome/TeacherHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Principal" element={<PrincipalHome />} />
        <Route path="/Student" element={<StudentHome />} />
        <Route path="/Teacher" element={<TeacherHome />} />
      </Routes>
    </Router>
  );
}

export default App;
