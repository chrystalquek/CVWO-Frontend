import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Logo from './image.jpg';
import './Nav.css'

// not a class, not necessary to have state
const Home = (props) => {
    return (     
      <div className ="home">
        <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
            
          { 
            // if token exists, means there is a user/admin, hence home page will only show Log Out and ToDos links
            (localStorage.getItem("token")) ? 
            <div>

              <Link className="link" to='/logout' onClick={props.handleLogout}>Log Out</Link> 
              <br></br>
              <br></br>
              <Link className="link" to='/todos'>Back to ToDos</Link>
            
            </div>
            :
            <div>
            
              <Link className="link" to='/login'>Log In</Link>
              <br></br>
              <br></br>
              <Link className="link" to='/signup'>Sign Up</Link>

            </div>    
          }   
        </div>
      
  );
};
export default Home;

