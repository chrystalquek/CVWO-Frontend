import React, { Component } from "react";
import "./LoginSignup.css";
import Logo from "./image2.jpg";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// page to introduce ToDo App and provide contact details
// this page is accessible regardless of login status
const AboutUs = props => {
  return (
    <div>
      <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
      <div class="form-style-6">
        <h1>
          About Us <FontAwesomeIcon icon={faStickyNote} />
        </h1>

        <h2>
          {" "}
          The ToDo App is a hassle-free way of keeping track of tasks. We
          provide both user and admin roles for companies and their customers.
        </h2>
        <h2> To find out more, contact chrystalquek@gmail.com </h2>
      </div>
    </div>
  );
};

export default AboutUs;