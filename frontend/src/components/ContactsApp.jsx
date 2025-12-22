import { useState, useEffect } from "react";
import axios from "axios";
import ContactsCardsContainer from "./ContactsCardsContainer";
import ContactForm from "./ContactForm";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://wavenet-backend.vercel.app"
).replace(/\/$/, "");

export default function ContactsApp() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      navigate("/");
      return;
    }
    try {
      const decodedToken = jwtDecode(jwtToken);
      console.log(decodedToken);
      setCurrentUser(decodedToken.username);
    } catch (e) {
      Cookies.remove("jwt-authorization");
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    navigate("/");
  };
  /////////////////////////////////////////////////////////////////////////////
  //States
  const [contactsData, setContactsData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //useEffect
  useEffect(() => {
    handleContactsDB();
  }, [postResponse]);

  //Handlers
  //GET Data from DB handler
  const handleContactsDB = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      // console.log(response);
      setContactsData(() => response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle to reset the form
  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      image: "",
    });
  };

  //Handle the submission of data
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        await axios
          .post(`${API_BASE_URL}/contacts`, formData)
          .then((response) => {
            setPostResponse(response.data);
            console.log(response);
          })
          .then(() => handleResetForm());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the onChange event for the form
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Handle to delete on contact by id
  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/contacts/${id}`);
      setPostResponse(response.data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the edition of one contact by its id
  const handleOnEdit = async (id) => {
    try {
      const contactToEdit = await axios.get(`${API_BASE_URL}/contacts/${id}`);
      console.log(contactToEdit);
      setFormData({
        name: contactToEdit.data.name,
        phone: contactToEdit.data.contact.phone,
        email: contactToEdit.data.contact.email,
        address: contactToEdit.data.contact.address,
        image: contactToEdit.data.image,
        _id: contactToEdit.data._id,
      });
      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle updating the api patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `${API_BASE_URL}/contacts/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date });
    } catch (error) {
      console.log(error);
    }
  };

  //Render
  return (
    <main className="contacts-app">
      <header className="contacts-header">
        <h1 className="contacts-title">Hello {currentUser}</h1>
        <button className="contacts-logout" onClick={handleLogout}>
          Log out
        </button>
      </header>
      <ContactForm
        name={formData.name}
        email={formData.email}
        address={formData.address}
        phone={formData.phone}
        image={formData.image}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        isEditing={isEditing}
      />
      <p className="contacts-status" role="status">
        {postResponse?.message}
      </p>
      <ContactsCardsContainer
        contacts={contactsData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    </main>
  );
}
