import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      // default is user
      admin: "false",
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
          // update state with errors if creating a new user fails

          this.setState({ errors: response.data.errors });
        } else {
          // close popup and return back to table of users if creating a new user was successful

          this.props.closePopup();
          // add the newly created user to the user table
          this.props.refresh(user);
        }
      });
  };

  // toggle between admin and user
  handleAdminChange(event) {
    this.setState({ admin: event.target.value });
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return (
              <span key={error}>
                {error}
                <br></br>
              </span>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { username, email, password, password_confirmation } = this.state;
    console.log("newuser")
    return (
      <div className="popup">
        {/* a new user must have a username, email and password */}
        <div className="popup_inner">
          <h1>New User</h1>
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
            <label>
              <select
                value={this.state.admin}
                onChange={this.handleAdminChange}
              >
                <option value="true">Admin</option>
                <option value="false">User</option>
              </select>
            </label>

            <button placeholder="submit" type="submit">
              Let's Sign Up!
            </button>

            <button type="submit" onClick={this.props.closePopup()}>
              Close
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
export default withRouter(NewUser);
