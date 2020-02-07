import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./LoginSignup.css";
import Logo from "./image2.jpg";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      // default of new user is admin
      admin: "true",
      password: "",
      password_confirmation: "",
      errors: []
    };
    this.handleAdminChange = this.handleAdminChange.bind(this);
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    // update login state in App.js
    this.props.resetloggedIn();
    // direct to Todos table
    this.props.history.push(`/todos`);
  };

  // upon clicking sign up
  handleSubmit = event => {
    event.preventDefault();
    const {
      username,
      email,
      password,
      password_confirmation,
      admin
    } = this.state;
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      admin: admin
    };

    axios
      .post(process.env.REACT_APP_API_ENDPOINT + "/users", { user })
      .then(response => {
        if (response.data.errors) {
          // update state with sign up errors

          this.setState({ errors: response.data.errors });
        } else {
          // store JWT token, user id and admins status in localStorage
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("userid", response.data.userid);
          if (response.data.admin) {
            localStorage.setItem("isAdmin", response.data.admin);
          }
          this.handleLogin();
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  handleAdminChange(event) {
    this.setState({ admin: event.target.value });
  }

  handleErrors = () => {
    return (
      <div>
        {/* only one kind of error is possible */}
        {this.state.errors[0]}
      </div>
    );
  };
  render() {
    const { username, email, password, password_confirmation } = this.state;
    return (
      <div>
        <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
        <div class="form-style-6">
          {/* a new user must have a username, email and password */}
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              placeholder="password confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />

            {/* drop down menu to select admin and user role */}

            <select value={this.state.admin} onChange={this.handleAdminChange}>
              <option value="true">Admin</option>
              <option value="false">User</option>
            </select>

            <button placeholder="submit" type="submit">
              Create user
            </button>

            <div class="errors">
              {this.state.errors ? this.handleErrors() : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Signup);
