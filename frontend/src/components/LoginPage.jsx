import Cookies from "js-cookie";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const initalFormData = { username: "", password: "" };
  // states
  const [formData, setFormData] = useState(initalFormData);
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  // handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      Cookies.set("jwt-authorization", response.data.token);
      navigate("/react-vite-deploy/contacts");

      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnLogin();
    setFormData(initalFormData);
  };
  return (
    <div>
      <FormComponent
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        responseMessage={responseMessage}
        currentPage={"login"}
      />
    </div>
  );
}
