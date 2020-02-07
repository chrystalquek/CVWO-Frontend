import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      admin: "false"
    };

    this.handleTagChange = this.handleTagChange.bind(this);
  }

  // retrieve username, email and admin status and render updated fields in popup
  componentDidMount() {
    const token = localStorage.getItem("token");

    axios
      .get(process.env.REACT_APP_API_ENDPOINT + `/users/${this.props.userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const user = response.data.user;
        this.setState({
          username: user.username,
          email: user.email,
          admin: user.admin
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleTagChange(event) {
    this.setState({ tag: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, admin } = this.state;

    let user = {
      id: this.props.userid,
      username: username,
      email: email,
      admin: admin
    };

    const token = localStorage.getItem("token");

    axios
      .put(
        process.env.REACT_APP_API_ENDPOINT + `/users/${this.props.userid}`,
        { user },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        // if updated username / email is invalid, update state with error
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else {
          // if update is successful, close update popup
          this.props.closePopup(0)();
          // update usertable with updated user
          this.props.refresh(user);
        }
      });
  };

  handleTagChange(event) {
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
    const { title, description, tag, category, duedate } = this.state;
    return (
      <div className="popup">
        <div className="popup_inner" height = "10%">
          <h1>Edit User</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              placeholder="email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label>
              {/* dropdown menu with user / admin options */}
              <select value={this.state.admin} onChange={this.handleTagChange}>
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </label>

            <button placeholder="submit" type="submit">
              Submit Changes
            </button>

            {/* if admin decides not to edit user details, he can close the popup */}
            <button type="submit" onClick={this.props.closePopup(0)}>
              Close
            </button>

            <div className="errors">
              {this.state.errors ? this.handleErrors() : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(EditUser);
