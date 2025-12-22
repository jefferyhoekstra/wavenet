import Cookies from "js-cookie";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://wavenet-backend.vercel.app"
).replace(/\/$/, "");

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
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      Cookies.set("jwt-authorization", response.data.token);
      navigate("/contacts");

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
