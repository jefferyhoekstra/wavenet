import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

/// ---- COMPONENTS
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Router>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
