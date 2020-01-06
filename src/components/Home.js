// plans to convert Home to Nav Bar
import React from 'react';
//import axios from 'axios'
import {Link} from 'react-router-dom'


const Home = (props) => {
    return (
      
        
   
        
            <div >

            
          
          { 
        
            (localStorage.getItem("token")) ? 
            <div class ="inner">
                
    
            
            <Link to='/logout' onClick={props.handleLogout}>Log Out</Link> <br></br>
            
            </div>
            :
            <div class ="inner">
            
            <Link to='/login'>Log In</Link>
            <br></br>
            <Link to='/signup'>Sign Up</Link>

            </div>
    
          }
    
    
        </div>
        
        
        
        
      );
    };
export default Home;

