import React from 'react';
//import axios from 'axios'
import {Link} from 'react-router-dom'
import Logo from './image.jpg';
import './Nav.css'


const Home = (props) => {
    const token = localStorage.getItem("token")
        const userid = localStorage.getItem("userid")
        

        fetch(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then(resp => resp.json())
        .then(response => {
            console.log(response);
        })
    return (<p>hello</p>)}
        
        
        
        
    
export default Home;