import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './LoginSignup.css'
import Logo from './image2.jpg';



class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        // email: '',
        password: '',
        errors: ''
       };
    }
    componentDidMount() {
      
    }
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };

    handleLogin = () => {
        //direct to todos index using users.id
        this.props.resetloggedIn();
        this.props.history.push(`/todos`);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = this.state
    let user = {
          username: username,
          //email: email,
          password: password
        }
        // console.log(user);

        
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/login', {user})
        .then(data => {
          if (data.data.failure){
            this.setState({errors: ["Username / Password Invalid"]})

          } else {
            localStorage.setItem("token", data.data.jwt);
            localStorage.setItem("userid", data.data.userid);
           
            localStorage.setItem("isAdmin", data.data.admin);
        
            this.handleLogin()
          }
        })
        .catch(error => console.log('api errors:', error))
      };
      

handleErrors = () => {
  
    return (
      <div >
        <ul >
        {this.state.errors.map(error => {
        return <div key={error}>{error}<br></br></div>
          })
        }
        </ul>
      </div>
    )
  }






render() {
    const {username, password} = this.state
return (
  <div className = "container">
        <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
        <div className="form-style-6">

        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
          </form>
          <div className = "errors">
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
     </div>
    );
  }
}
export default Login;