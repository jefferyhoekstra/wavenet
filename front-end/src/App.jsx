// IMPORT
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// LIBRARIES

// CSS
import "./App.css";

// COMPONENTS
import Hero from "./components/Hero/Hero";
import AppLayout from "./AppLayout";

// FUNCTIONS
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Hero />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
