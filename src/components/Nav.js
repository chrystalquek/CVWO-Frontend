import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.css'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin")

     };
  }
  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem("token"),
      isAdmin: localStorage.getItem("isAdmin")

    })
    
  }
    

    render() {    
  
     
      return (
        <nav >
          <div className="navbar">
            

            <ul>
                <span className="goleft">
             
                <li >
                  <Link to="/">Home</Link>
                </li>

                </span>
                
                
          
          { 
        
            (!localStorage.getItem("token")) ? 
                <span className="goright">
                        <li className="goleft">
                        <Link  to="/login">Login</Link>
                        </li>
                        <li className="goright">
                        <Link  to="/signup">Signup</Link>
                        </li>
                </span>
                :
                <span className="goright">
                        <li className="goleft">
                        <Link  to="/todos">Todos</Link>
                        </li>
                        <li className="goleft">
                        <Link  to="/profile">My Profile</Link>
                        </li>
                        {
                          (localStorage.getItem("isAdmin"))
                          ?
                          <li className="goleft">
                          <Link  to="/users">Users</Link>
                          </li>
                          : null
                        }
                        <li className="goright">
                        <Link  to="/logout" onClick={this.props.handleLogout} >Logout</Link>
                        </li>
                 </span>
          }
                <span className="right">
             
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