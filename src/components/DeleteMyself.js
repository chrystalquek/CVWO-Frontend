import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";

class DeleteMyself extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = event => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    // api call to delete account
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // change state of login status in App.js
        this.props.handleLogout();
        // direct back to home page
        this.props.history.push(`/`);
      });
  };

  render() {
    return (
      <div className="popup">
        {/* popup to alert before delete own account */}
        <div className="popup_delete">
          <h1>Are you sure you want to Delete Your Account? </h1>

          <form onSubmit={this.handleSubmit}>
            <button placeholder="submit" type="submit">
              Yes
            </button>
          </form>

          <div>
            <button type="submit" onClick={this.props.closePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(DeleteMyself);
