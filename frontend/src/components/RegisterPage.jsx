import { useState } from "react";

import FormComponent from "./FormComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
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

  const handleOnRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      navigate("/");
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnRegister();
    setFormData(initalFormData);
  };
  return (
    <div>
      <FormComponent
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        responseMessage={responseMessage}
        currentPage={"register"}
      />
    </div>
  );
}
