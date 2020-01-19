import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'



class deletemyself extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }

handleSubmit = (event) => {
  
    event.preventDefault()

    const token = localStorage.getItem("token")
    const userid = localStorage.getItem("userid");
    
    axios.delete(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

                this.props.handleLogout();


                // localStorage.removeItem("token")
                // localStorage.removeItem("userid")
                // localStorage.removeItem("isAdmin")

                 this.props.history.push(`/`);

                
            })
       
        
    }


render() {
    
return (
      <div className='popup'>
          <div className='popup_delete'>
        <h1>Are you sure you want to Delete Your Account? </h1>
        
        <form onSubmit={this.handleSubmit} >
        
          <button placeholder="submit" type="submit">
            Yes
          </button>

          
      
        </form> 
        <div>
            <button type="submit" onClick={this.props.closePopup}>Close</button>  
        </div>
        
        </div>
      </div>
    );
  }
}
export default withRouter(deletemyself);

//this.props.closePopup