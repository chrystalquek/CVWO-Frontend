import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";

// deletion of users from users table is only allowed for admin
class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // works similar to deletion of Todos from Todos table
  handleSubmit = event => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .delete(
        process.env.REACT_APP_API_ENDPOINT + `/users/${this.props.userid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        // close deletion popup after deleting succesfully
        this.props.closePopup(0)();
        // in state.users in Users.js, remove the user who has corresponding userid
        this.props.refresh(this.props.userid);
      });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_delete">
          {/* reprompt to confirm deletion of user */}
          <h1>Are you sure you want to Delete this User?</h1>
          <form onSubmit={this.handleSubmit}>
            <button placeholder="submit" type="submit">
              Yes
            </button>
          </form>
          <div>
            {/* close popup upon deletion. closepopup is passed as props from User.js */}
            <button type="submit" onClick={this.props.closePopup(0)}>
              Close
            </button>
          </div>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(DeleteUser);
