import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";

class DeleteTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // api call to delete ToDo
  handleSubmit = event => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    axios
      .delete(
        process.env.REACT_APP_API_ENDPOINT +
          `/users/${userid}/todos/${this.props.todoid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        // when delete is completed, close delete popup by passing in a todo id that does no exist
        this.props.closePopup(0)();
        // in this.state.todos of ToDo.js, remove only the todo by its id
        this.props.refresh(this.props.todoid);
      });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_delete">
          {/* reprompt to confirm deletion*/}
          <h1>Are you sure you want to Delete this ToDo?</h1>
          <form onSubmit={this.handleSubmit}>
            <button placeholder="submit" type="submit">
              Yes
            </button>
          </form>
          <div>
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
export default withRouter(DeleteTodo);
