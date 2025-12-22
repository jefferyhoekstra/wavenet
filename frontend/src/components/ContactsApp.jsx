import { useState, useEffect } from "react";
import axios from "axios";
import ContactsCardsContainer from "./ContactsCardsContainer";
import ContactForm from "./ContactForm";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ContactsApp() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    const decodedToken = jwtDecode(jwtToken);
    console.log(decodedToken);
    setCurrentUser(decodedToken.username);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    navigate("/react-vite-deploy");
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
      const response = await axios.get("http://localhost:3000/contacts");
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
          .post("https://wavenet-backend.vercel.app/contacts", formData)
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
      const response = await axios.delete(
        `https://wavenet-backend.vercel.app/contacts/${id}`
      );
      setPostResponse(response.data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the edition of one contact by its id
  const handleOnEdit = async (id) => {
    try {
      const contactToEdit = await axios.get(
        `https://wavenet-backend.vercel.app/contacts/${id}`
      );
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
        `https://wavenet-backend.vercel.app/contacts/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date });
    } catch (error) {
      console.log(error);
    }
  };

  //Render
  return (
    <div>
      <h1>Hello {currentUser}</h1>
      <button onClick={handleLogout}>Log out</button>
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
      <p style={{ color: "green" }}>{postResponse?.message}</p>
      <ContactsCardsContainer
        contacts={contactsData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
}
