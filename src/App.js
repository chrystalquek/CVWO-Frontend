import React, { Component } from 'react';
//import axios from 'axios'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import Nav from './components/Nav';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Todos from './components/Todos'
import Users from './components/Users'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn : localStorage.getItem("token"),
      admin: localStorage.getItem("isAdmin")
       
     };
     
  }
componentDidMount() {
    // this.refreshPage();
  }
    
//   refreshPage = () => {
//     const token = localStorage.getItem("token")
//     const userid = localStorage.getItem("userid")
    
//     if(token){
//     fetch(`http://localhost:3001/api/users/${userid}/todos`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
        
//     }).then(resp => resp.json())
//     .then(response => {
//         this.setState({ todos: response.todos});
//     })
//   }
// }

  handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
    localStorage.removeItem("isAdmin")
    this.setState({loggedIn: false})
    
  }

  reset = () => {
    this.setState({loggedIn: true})
  }

// to check login status
// useEffect(() => {
//   const token = localStorage.getItem("token")
//   if(token){
//     fetch('http://localhost:3001/auto_login', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       setUser(data)
//       console.log(data)
//     })
//   }
// }, [])

// Home, Login, Signup
// Home, Signout, Todos


render() {
    return (


<div>


      <div>
        <BrowserRouter>
        <div>
          <Nav      loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} isAdmin = {this.state.isAdmin}/>
        
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} handleLogout={this.handleLogout}  resetloggedIn={this.reset}
              //todos = {this.state.todos}
              />
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} resetloggedIn={this.reset}  />
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props}  />
              )}
            />
            <Route exact path="/todos" 
              render={props => (
              <Todos {...props}  />
              )}
            />
            <Route exact path="/users" 
              render={props => (
              <Users {...props}  />
              )}
            />
            

            <Redirect from='*' to='/' />


          </Switch>
          </div>
        </BrowserRouter>
      </div>
      </div>
    );
  }
}
export default App;
