import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./LoginSignup.css";
import Logo from "./image2.jpg";
import DeletePopup from "./DeleteMyself";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      showDeletePopup: false,
      errors: ""
    };
  }

  // before rendering profile details, retrieve username and email fields from database through GET request
  componentDidMount() {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    axios
      .get(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const user = response.data.user;

        this.setState({
          username: user.username,
          email: user.email
        });
      });
  }

  // update state based on whether delete popup should be shown
  toggleDeletePopup = () => {
    this.setState({
      showDeletePopup: !this.state.showDeletePopup
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // upon submitting form, update user's email and username but ensure that new email &/ username are unique. otherwise display error
  handleSubmit = event => {
    event.preventDefault();
    const { username, email } = this.state;

    const userid = localStorage.getItem("userid");

    let user = {
      id: userid,
      username: username,
      email: email
    };

    const token = localStorage.getItem("token");

    axios
      .put(
        process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`,
        { user },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        if (response.data.status === 500) {
          // if new username / email cannot be saved, update state with errors
          this.setState({ errors: response.data.errors });
        } else {
          this.setState({
            username: username,
            email: email,
            errors: "User Saved"
          });
        }
      });
  };

  handleErrors = () => {
    return <div>{this.state.errors}</div>;
  };

  render() {
    const { username, email } = this.state;
    return (
      <div>
        {" "}
        <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
        <div class="form-style-6">
          {/* Users are allowed to edit their username and emails if their updated usernames and emails are still unique */}
          <h1>Edit Profile</h1>
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

            <button placeholder="submit" type="submit">
              Submit Changes
            </button>

            {/* display errors if username &/or email is not unique */}
            <div className="update">
              {this.state.errors ? this.handleErrors() : null}
            </div>

            {/* clicking on this button will display a popup to reconfirm deletion of account */}

            
          </form>
            <button type="submit" onClick={this.toggleDeletePopup}>
                <FontAwesomeIcon icon={faTrashAlt} /> Alternatively, Delete
                Account.
            </button>

        </div>
        {/* if button has been clicked on, display popup */}
        {this.state.showDeletePopup ? (
          <DeletePopup
            closePopup={this.toggleDeletePopup.bind(this)}
            handleLogout={this.props.handleLogout.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
export default withRouter(EditUser);
