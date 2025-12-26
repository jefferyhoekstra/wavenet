/// LIBRARIES

/// CSS
import "./App.css";

/// COMPONENTS
import Hero from "./components/Hero/Hero";

/// FUNCTIONS
export default function App() {
  return (
    <>
      <div className="app">
        <header className="app_header">
          <Hero />
        </header>
        <main className="app_main"></main>
        <footer className="app_footer"></footer>
      </div>
    </>
  );
}
