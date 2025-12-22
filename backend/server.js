//Intializing Server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose"); //import mongoose
require("dotenv").config(); //import dotenv
const { DB_URI, SECRET_KEY } = process.env; //to grab the same variable from the dotenv file
const cors = require("cors"); //For disabling default browser security
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Contact = require("./models/contact"); //importing the model schema
const User = require("./models/user");

//Middleware
server.use(express.json()); //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })); //to ensure data is encoded and decoded while transmission
server.use(cors());

//Database connection and server listening
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
      console.log(new Date(Date.now()));
    });
  })
  .catch((error) => console.log(error.message));

//Routes
//Root route
server.get("/", (request, response) => {
  response.send("Server is Live!");
});

server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  // const username = request.body.username;
  // const password = request.body.
  // console.log(request.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    response.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "User NOT created" });
  }
});

server.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(400).send({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response.status(400).send({ message: "Invalid credentials" });
    }
    const jwtToken = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY
    );
    response.status(200).send({ message: "Login success", token: jwtToken });
  } catch (error) {
    response.status(500).send({ message: "Login error" });
  }
});

//To GET all the data from contacts collection
server.get("/contacts", async (request, response) => {
  try {
    const contacts = await Contact.find();
    response.send(contacts);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//To POST a new contact to DB
server.post("/contacts", async (request, response) => {
  const { name, email, address, phone, image } = request.body;
  const newContact = new Contact({
    name,
    contact: {
      email,
      address,
      phone,
    },
    image,
  });
  try {
    await newContact.save();
    response.status(200).send({
      message: `Contact is added successfully!`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To DELETE a contact from DB by it's id
server.delete("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Contact.findByIdAndDelete(id);
    response.send({
      message: `Contact is deleted`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To GET one contact by id
server.get("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const contactToEdit = await Contact.findById(id);
    response.send(contactToEdit);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//To PATCH a contact by id
server.patch("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  const { name, phone, address, email, image } = request.body;
  try {
    await Contact.findByIdAndUpdate(id, {
      name,
      contact: { email, address, phone },
      image,
    });
    response.send({
      message: `Contact has been updated`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
