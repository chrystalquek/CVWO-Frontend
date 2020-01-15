import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.css'

  export default class Nav extends React.Component {


    render() {    
      console.log(this.props.isAdmin)
      
     
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
        
            (!this.props.loggedIn) ? 
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
                        {
                          (this.props.isAdmin === true)
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


              


            </ul>
            
            
          </div>
        </nav>
      );
    }
  }