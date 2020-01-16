
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './LoginSignup.css'
import Logo from './image2.jpg';
import DeletePopup from './DeleteMyself'
import { faEdit, faTrashAlt, faSort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class edituser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      showDeletePopup: false,
      errors: ''
     };

    
     
  }


  componentDidMount() {
    const userid = localStorage.getItem("userid")
    const token = localStorage.getItem("token")
    
    axios.get(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`,  { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

              const user = response.data.user;
              

              this.setState({
                username: user.username,
                email: user.email
              })


                
            })

      
  }

  toggleDeletePopup =   () =>
    {
    this.setState({  
         showDeletePopup: !this.state.showDeletePopup
    })}


handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

 
  
handleSubmit = (event) => {
  
    event.preventDefault()
    const {username, email} = this.state

    const userid = localStorage.getItem("userid")

    let user = {
        id: userid,
        username: username,
        email: email
    }

    

    const token = localStorage.getItem("token")
    
    axios.put(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`, {user}, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

              if (response.data.errors) {
                console.log(response.data.errors)
            
                this.setState({errors: response.data.errors});
      
              } else {


                this.setState({username: username,
                    email: email});
                
                
              }
                
            })
       
        
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
    const {username, email} = this.state
return (
      <div> <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
      <div class="form-style-6">
        <h1>Edit User</h1>
        <form onSubmit={this.handleSubmit} >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

        
          <button placeholder="submit" type="submit">
            Submit Changes
          </button>

          <button onClick={this.toggleDeletePopup}>
          <FontAwesomeIcon icon={faTrashAlt} /> {' '}Alternatively, Delete User Account.
          </button>

          {this.state.showDeletePopup ?  
            <DeletePopup  
                    closePopup={this.toggleDeletePopup.bind(this)} 
            />  
            
            : null  
            }
 
          
            <div className = "errors" >
          {this.state.errors ? this.handleDelete : null}
          </div>

        </form> 



       
        </div>

        {/* <div class="form-style-6">
        <h1>Delete User</h1>
        <form onSubmit={this.handleDelete} >

        
          <button placeholder="submit" type="submit">
            Delete
          </button>
    
        </form> 
       
        </div> */}


      </div>
    );
  }
}
export default withRouter(edituser);

//this.props.closePopup