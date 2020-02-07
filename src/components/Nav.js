import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin")
    };
  }
  componentDidMount() {
    // before rendering, check if user is logged in and whether user is admin. This will change navbar options accordingly.
    this.setState({
      loggedIn: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin")
    });
  }

  render() {
    return (
      <nav>
        <div className="navbar">
          <ul>
            <span className="goleft">
              {/* Link to Home exists regardless of login status */}
              <li>
                <Link to="/">Home</Link>
              </li>
            </span>

            {// based on login status, display [Login & Signup] or [Todos & My Profile]
            // based on admin status, display Users tab or not

            !localStorage.getItem("token") ? (
              <span className="goright">
                <li className="goleft">
                  <Link to="/login">Login</Link>
                </li>
                <li className="goright">
                  <Link to="/signup">Signup</Link>
                </li>
              </span>
            ) : (
              <span className="goright">
                <li className="goleft">
                  <Link to="/todos">Todos</Link>
                </li>
                <li className="goleft">
                  <Link to="/profile">My Profile</Link>
                </li>
                {localStorage.getItem("isAdmin") ? (
                  <li className="goleft">
                    <Link to="/users">Users</Link>
                  </li>
                ) : null}
                <li className="goright">
                  <Link to="/logout" onClick={this.props.handleLogout}>
                    Logout
                  </Link>
                </li>
              </span>
            )}
            <span className="goleft">
              {/* Link to About Us exists regardless of login status */}
              <li className="goleft">
                <Link to="/aboutus">About Us</Link>
              </li>
            </span>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
