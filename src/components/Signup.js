import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './LoginSignup.css'
import Logo from './image2.jpg';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
  
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    axios.post('http://localhost:3001/api/users', {user}, {withCredentials: true})
        .then(response => {
          if (response.data.errors) {
            
            this.setState({errors: response.data.errors});

          } else {
        
            // relogin after creating user
            this.props.history.push('/login');
          }
        })
        // to reimplement error catching
        .catch(error => console.log('api errors:', error))
  }

handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <span key={error}>{error}<br></br></span>
        })}</ul> 
      </div>
    )
  }
render() {
    const {username, email, password, password_confirmation} = this.state
return (
    <div >
      <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
      <div class="form-style-6">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
            Let's Sign Up!
          </button>

          <div class = "errors" >
          {this.state.errors ? this.handleErrors() : null}
          </div>

          
      
        </form>
        
          
        
      </div>
      
      </div>
    );
  }
}
export default withRouter(Signup);