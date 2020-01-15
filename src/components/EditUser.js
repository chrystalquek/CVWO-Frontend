
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'



class edituser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      admin: "false"
     };

     this.handleTagChange = this.handleTagChange.bind(this);
     
  }


  componentDidMount() {
    const token = localStorage.getItem("token")
    
    axios.get(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}`,  { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

              const user = response.data.user;
              

              this.setState({
                username: user.username,
                email: user.email,
                admin: user.admin
              })


                
            })

      
  }


handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleTagChange(event) {
  
    this.setState({tag: event.target.value});
  }

  
handleSubmit = (event) => {
  
    event.preventDefault()
    const {username, email, admin} = this.state

    let user = {
        id: this.props.userid,
        username: username,
        email: email,
        admin: admin
    }

    

    const token = localStorage.getItem("token")
    
    axios.put(process.env.REACT_APP_API_ENDPOINT + `/users/${this.props.userid}`, {todo}, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

              if (response.data.errors) {
                console.log(response.data.errors)
            
                this.setState({errors: response.data.errors});
      
              } else {


                this.props.closePopup(0)();


                this.props.refresh(user);
                
                
              }
                
            })
       
        
    }



    handleTagChange(event) {
  
        this.setState({admin: event.target.value});
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
    const {title, description, tag, category, duedate} = this.state
return (
      <div className='popup'>
          <div className='popup_inner'>
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
          <label>
          
          <select value={this.state.admin} onChange={this.handleTagChange}>
            <option value="false">User</option>
            <option value="true">Admin</option>
          </select>
        </label>
          

        
          <button placeholder="submit" type="submit">
            Submit Changes
          </button>

          
            <button type="submit" onClick={this.props.closePopup(0)}>close me</button>  
          
            <div className = "errors" >
          {this.state.errors ? this.handleErrors() : null}
          </div>

          
      
        </form> 
        
        {/* <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div> */}
        </div>
      </div>
    );
  }
}
export default withRouter(edituser);

//this.props.closePopup