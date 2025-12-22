import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// ------- CSS ------- \\\
import "./App.css";

/// ---- COMPONENTS
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import ContactsApp from "./components/ContactsApp";
import RegisterPage from "./components/RegisterPage";
import NotFoundPage from "./components/NotFoundPage";
import MainLogo from "./components/MainLogo";

function App() {
  return (
    <>
      <div className="bg">
        <NavBar />
        <Router>
          <Routes>
            <Route path="/react-vite-deploy" element={<LoginPage />} />
            <Route
              path="/react-vite-deploy/register"
              element={<RegisterPage />}
            />
            <Route
              path="/react-vite-deploy/contacts"
              element={<ContactsApp />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
