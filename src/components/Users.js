// import edit, new and delete popups
// import icons
import React, { Component } from "react";
import EditPopup from "./EditUser";
import NewPopup from "./NewUser";
import DeletePopup from "./DeleteUser";
import "./ToDosStyle.css";
import Logo from "./image2.jpg";
import {
  faEdit,
  faTrashAlt,
  faSort,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// jsonQuery to access fields of Users
var jsonQuery = require("json-query");

// users contains all userss, filtered contains users based on search
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      filtered: {},
      query: "",
      showEditPopup: false,
      showNewPopup: false,
      showDeletePopup: false,
      sortorder: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
  }

  // before rendering Users table, retrieve all Users from database
  componentDidMount() {
    this.refreshPage();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // 3 different toggling popup methods - edit, delete, add

  toggleEditPopup = userid => () => {
    this.setState({
      showEditPopup: userid
    });
  };

  toggleNewPopup = () => {
    this.setState({
      showNewPopup: !this.state.showNewPopup
    });
  };

  toggleDeletePopup = userid => () => {
    this.setState({
      showDeletePopup: userid
    });
  };

  // general way to refresh page to obtain updated users
  // this method can be used each time a User is created, updated or deleted
  // but to minimise API calls, array manipulations are done instead (below)

  refreshPage = () => {
    if (localStorage.getItem("isAdmin")) {
      const token = localStorage.getItem("token");

      fetch(process.env.REACT_APP_API_ENDPOINT + `/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(response => {
          this.setState({ users: response.users, filtered: response.users });
        });
    } else {
      console.log("unauthorized");
    }
  };

  // add new/edited users to this.state.users instead of making new api call
  // rerendering from state

  handleAdd = user => {
    let list = this.state.users;
    list.push(user);

    this.setState({
      users: list
    });

    this.handleSearch(this.state.query);
  };

  handleEdit = user => {
    const index = this.state.users.findIndex(anyuser => anyuser.id === user.id);
    let list = this.state.users;
    list[index] = user;

    this.setState({
      users: list
    });

    this.handleSearch(this.state.query);
  };

  handleDelete = userid => {
    const index1 = this.state.users.findIndex(user => user.id === userid);

    this.state.users.splice(index1, 1);

    this.setState({ users: this.state.users });

    this.handleSearch(this.state.query);
  };

  handleAdminChange(event) {
    this.setState({ admin: event.target.value });
  }

  handleSearch(e) {
    // Variable to hold the original version of the list

    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    let query =
      typeof e === "string" || e instanceof String ? e : e.target.value;

    // If the search bar isn't empty
    if (query !== "") {
      // Assign the original list to currentList
      currentList = this.state.users;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.username.toLowerCase();

        // change search term to lowercase
        const filter = query.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.users;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
      query: query.toLowerCase()
    });
  }

  // generic sortby method, accepts any header title
  sortby = factor => () => {
    let newList = this.state.filtered;

    if (this.state.sortorder) {
      newList = newList.sort(function(a, b) {
        if (a[factor] > b[factor]) {
          return -1;
        }
        if (b[factor] > a[factor]) {
          return 1;
        }
        return 0;
      });
    } else {
      newList = newList.sort(function(a, b) {
        if (a[factor] > b[factor]) {
          return 1;
        }
        if (b[factor] > a[factor]) {
          return -1;
        }
        return 0;
      });
    }

    this.setState({
      filtered: newList,
      sortorder: !this.state.sortorder
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

  renderTableData() {
    // create array from filtered Users
    let users = Array.from(this.state.filtered);

    // use jsonQuery to retrieve fields of each User
    var id = jsonQuery("[*][id]", { data: this.state.filtered }).value;
    var username = jsonQuery("[*][username]", { data: this.state.filtered })
      .value;
    var email = jsonQuery("[*][email]", { data: this.state.filtered }).value;
    var admin = jsonQuery("[*][admin]", { data: this.state.filtered }).value;

    return users.map((USER, i) => {
      return (
        <tr key={id[i]}>
          <td>{username[i]}</td>
          <td>{email[i]}</td>
          <td>{admin[i].toString()}</td>

          <td>
            {id[i] == localStorage.getItem("userid") ? null : (
              <span>
                {/* display delete popup, pass id of todo, toggling function, and refreshing to DeletePopup component */}
                <button className ="delete" onClick={this.toggleDeletePopup(id[i])}>
                  {" "}
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete{" "}
                </button>

                {this.state.showDeletePopup === id[i] ? (
                  <DeletePopup
                    userid={id[i]}
                    closePopup={this.toggleDeletePopup.bind(this)}
                    refresh={this.handleDelete.bind(this)}
                  />
                ) : null}
              </span>
            )}
            <button className = "edit" onClick={this.toggleEditPopup(id[i])}>
              {" "}
              <FontAwesomeIcon icon={faEdit} /> Edit{" "}
            </button>
            {/* ensure that user that is logged in cannot delete his own account */}
            {this.state.showEditPopup === id[i] ? (
              <EditPopup
                userid={id[i]}
                closePopup={this.toggleEditPopup.bind(this)}
                refresh={this.handleEdit.bind(this)}
              />
            ) : null}{" "}
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    // displayed headers are capitalised, stored headers are lowercase
    let header = [
      ["Username", "username"],
      ["Email", "email"],
      ["Admin", "admin"],
      "Options"
    ];
    return header.map((key, index) => {
      // only Options cannot be sorted
      if (key !== "Options") {
        return (
          <th key={index}>
            {key[0]}{" "}
            <button onClick={this.sortby(key[1])}>
              {" "}
              <FontAwesomeIcon icon={faSort} />{" "}
            </button>{" "}
          </th>
        );
      } else {
        return <th key={index}>{key} </th>;
      }
    });
  }

  // search bar and add new button are the first row of the ToDos table
  renderTableOptions() {
    return [
      <th key="search" colSpan="3">
        <input
          type="text"
          className="input"
          onChange={this.handleSearch}
          placeholder="Search username..."
        />
      </th>,
      <th key="new">
        {/* Add a new User */}
        <button className = "new" onClick={this.toggleNewPopup}>
          <FontAwesomeIcon icon={faPlus} /> Add New{" "}
        </button>


        {this.state.showNewPopup ? (
          
          <NewPopup
            closePopup={this.toggleNewPopup.bind(this)}
            refresh={this.handleAdd.bind(this)}
          />
        ) : null}
      </th>
    ];
  }


  // {this.state.showDeletePopup === id[i] ? (
  //   <DeletePopup
  //     userid={id[i]}
  //     closePopup={this.toggleDeletePopup.bind(this)}
  //     refresh={this.handleDelete.bind(this)}
  //   />
  // ) : null}


  render() {
    return (
      <div>
        <img src={Logo} width="100%" height="100%" overflow="hidden"></img>

        <table>
          <tbody>
            <tr>{this.renderTableOptions()}</tr>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
