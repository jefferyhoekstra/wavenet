// CSS
import "./AppLayout.css";

// IMPORT

// COMPONENTS
import PrivateRoute from "./utilities/PrivateRoute";
import Hero from "./components/Hero/Hero";

// FUNCTION
export default function AppLayout() {
  return (
    <>
      <section className="app">
        <section className="app_header"></section>
        <Hero />
        <section className="app_main">
          <PrivateRoute />
        </section>
        <section className="app_footer"></section>
      </section>
    </>
  );
}
