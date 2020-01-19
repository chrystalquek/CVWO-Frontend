// plans to convert Home to Nav Bar
import React, {Component} from 'react';
//import axios from 'axios'
import {Link} from 'react-router-dom'
import Logo from './image.jpg';
import './Nav.css'


const Home = (props) => {


  
    return (
      
        
   
            <div className ="home">
              <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
            
          
          { 
        
            (localStorage.getItem("token")) ? 
            <div >
                
    
            
            <Link className="link" to='/logout' onClick={props.handleLogout}>Log Out</Link> <br></br>
            <br></br>
            <Link className="link" to='/todos'>Back to ToDos</Link>
            
            </div>
            :
            <div >
            
            <Link className="link" to='/login'>Log In</Link><br></br>
            <br></br>
            <Link className="link" to='/signup'>Sign Up</Link>

            </div>
    
          }
    
    
        </div>
        
        
        
        
      );
    };
export default Home;

