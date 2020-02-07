import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Popup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tag: "Urgent",
      category: "",
      // create a new date object based on current date and time
      duedate: new Date(),
      errors: []
    };

    // ensures updated tags and dates are rerendered when changed
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  // get Todo fields in database before rendering popup
  componentDidMount() {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    axios
      .get(
        process.env.REACT_APP_API_ENDPOINT +
          `/users/${userid}/todos/${this.props.todoid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        const todo = response.data.todo;

        let date = new Date(todo.duedate.substr(0, 19));

        this.setState({
          title: todo.title,
          description: todo.description,
          tag: todo.tag,
          category: todo.category,
          duedate: date
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // by changing state, popup is rerendered with updated tag & date
  handleTagChange(event) {
    this.setState({ tag: event.target.value });
  }

  handleDateChange(date) {
    this.setState({ duedate: date });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, tag, category, duedate } = this.state;

    // due to timezone offsets, necessary to change datetime to local time
    const month =
      duedate.getMonth() >= 9
        ? (duedate.getMonth() + 1).toString()
        : "0" + (duedate.getMonth() + 1).toString();
    const day =
      duedate.getDate() > 9
        ? duedate.getDate().toString()
        : "0" + duedate.getDate().toString();
    const hour =
      duedate.getHours() > 9
        ? duedate.getHours().toString()
        : "0" + duedate.getHours().toString();
    const min =
      duedate.getMinutes() > 9
        ? duedate.getMinutes().toString()
        : "0" + duedate.getMinutes().toString();

    const date =
      duedate.getUTCFullYear().toString() +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      min +
      ":00.000Z";

    let todo = {
      id: this.props.todoid,
      title: title,
      description: description,
      tag: tag,
      category: category,
      duedate: date
    };

    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    // api call to update Todo
    axios
      .put(
        process.env.REACT_APP_API_ENDPOINT +
          `/users/${userid}/todos/${this.props.todoid}`,
        { todo },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        // updates state with errors. these errors indicate that some updated field are not valid, eg Title is missing
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else {
          this.props.closePopup(0)();
          // passes the updated Todo so that Todo table is rerendered
          this.props.refresh(todo);
        }
      });
  };

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
        {/* form contains five different fields - title, description, tag, category, duedate */}
        <div className="popup_inner">
          <h1>Edit ToDo</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <input
              placeholder="description"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label>
              {/* dropdown menu with set tag values */}
              <select value={this.state.tag} onChange={this.handleTagChange}>
                <option value="Urgent">Urgent</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <input
              placeholder="category"
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            {/* react datepicker allows for easy selection of dates and times. time intervals can be easily changed */}
            <DatePicker
              selected={this.state.duedate}
              onChange={this.handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <button placeholder="submit" type="submit">
              Submit Changes
            </button>

            {/* if user decides not to edit the Todo, he can close the popup */}
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
export default withRouter(EditTodo);
