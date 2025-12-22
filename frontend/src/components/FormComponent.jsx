import { Link } from "react-router-dom";
// ------- CSS ------- \\

// ------- CODE ------- \\
export default function FormComponent({
  formData,
  handleOnChange,
  handleOnSubmit,
  responseMessage,
  currentPage,
}) {
  return (
    <div>
      <h1>{currentPage === "login" ? "" : ""}</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleOnChange}
          value={formData.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
          value={formData.password}
        />
        <button>{currentPage === "login" ? "Login" : "Register"}</button>
      </form>
      <p>{responseMessage}</p>
      {/* {currentPage === "login" ? (
        <Link to={"/react-vite-deploy/register"}>Register now</Link>
      ) : (
        <Link to={"/react-vite-deploy"}>Login now</Link>
      )} */}
    </div>
  );
}
