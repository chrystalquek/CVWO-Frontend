// import all components except popups
import React, { Component } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todos from "./components/Todos";
import Users from "./components/Users";
import AboutUs from "./components/Aboutus";
import Profile from "./components/MyProfile";

class App extends Component {
  // state stores logged in status
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("token")
    };
  }
  componentDidMount() {}

  // remove all items stored in localStorage upon logging out
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("isAdmin");
    this.setState({ loggedIn: false });
  };

  // update to logged in
  reset = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div>
              <Nav
                loggedIn={this.state.loggedIn}
                handleLogout={this.handleLogout}
              />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      {...props}
                      handleLogout={this.handleLogout}
                      resetloggedIn={this.reset}
                    />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={props => (
                    <Login {...props} resetloggedIn={this.reset} />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={props => (
                    <Signup {...props} resetloggedIn={this.reset} />
                  )}
                />
                <Route
                  exact
                  path="/todos"
                  render={props => <Todos {...props} />}
                />
                <Route
                  exact
                  path="/users"
                  render={props => <Users {...props} />}
                />
                <Route
                  exact
                  path="/aboutus"
                  render={props => <AboutUs {...props} />}
                />
                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <Profile {...props} handleLogout={this.handleLogout} />
                  )}
                />

                {/* if unrecognised route, direct to home */}
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
export default App;
