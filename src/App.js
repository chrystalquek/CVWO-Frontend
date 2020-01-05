import React, { Component } from 'react';
//import axios from 'axios'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Todos from './components/Todos'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       
     };
     
  }
componentDidMount() {
  }
    //
    
  

  handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
    
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


render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} handleLogout={this.handleLogout}  
              //todos = {this.state.todos}
              />
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props}   />
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
              <Todos {...props} handleLogout={this.handleLogout} />
              )}
            />
            

            <Redirect from='*' to='/' />


          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
