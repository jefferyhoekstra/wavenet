// ------- LIBRARIES ------- \\
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// ------- CSS ------- \\
import "./App.css";

/// ---- COMPONENTS ------- \\
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
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contacts" element={<ContactsApp />} />

            {/* Backwards-compatible paths */}
            <Route
              path="/react-vite-deploy"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/react-vite-deploy/register"
              element={<Navigate to="/register" replace />}
            />
            <Route
              path="/react-vite-deploy/contacts"
              element={<Navigate to="/contacts" replace />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
