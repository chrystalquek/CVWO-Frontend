import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'


// only allowed for admin
class deleteuser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }

handleSubmit = (event) => {
  
    event.preventDefault()

    const token = localStorage.getItem("token")
    
    axios.delete(process.env.REACT_APP_API_ENDPOINT + `/users/${this.props.userid}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
          this.props.closePopup(0)();
          this.props.refresh(this.props.userid);
      })
}


render() {
    
return (
      <div className='popup'>
          <div className='popup_delete'>
        <h1>Are you sure you want to Delete this User?</h1>
        <form onSubmit={this.handleSubmit} >
        
          <button placeholder="submit" type="submit">
            Yes
          </button>

        </form> 
        <div>
          {/* close popup upon deletion. closepopup is passed as props from usertable */}
            <button type="submit" onClick={this.props.closePopup(0)}>Close</button>  
        </div>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
        </div>
      </div>
    );
  }
}
export default withRouter(deleteuser);

//this.props.closePopup