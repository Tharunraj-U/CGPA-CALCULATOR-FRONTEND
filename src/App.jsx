import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import CGPACalculator from "./pages/CGPACalculator";
import GradeEntryPage from "./pages/GradeEntry";
import Profile from "./pages/Profile"; 
import About from "./pages/About"; 
import Error from "./pages/Error"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <SignIn onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/home" /> : <SignIn onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/cgpa-calculator"
          element={isAuthenticated ? <CGPACalculator onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/grade-entry"
          element={isAuthenticated ? <GradeEntryPage onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route path="/about" element={<About />} /> 
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default App;
