
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'


class newtodo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      description: '',
      tag: '',
      category: '',
      duedate: '',
      errors: []
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
  
  event.preventDefault()
  const {title, description, tag, category, duedate} = this.state
  const token = localStorage.getItem("token")
  const userid = localStorage.getItem("userid")
  let todo = {
      title: title,
      description: description,
      tag: tag,
      category: category,
      duedate: duedate
  }


      axios.post(`http://localhost:3001/api/users/${userid}/todos`, {todo}, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        
        if (response.data.errors) {
            
          this.setState({errors: response.data.errors});

        } else {
          let todo = {
            id : response.data.todoid,
            title: title,
            description: description,
            tag: tag,
            category: category,
            duedate: duedate
        }
            
            console.log(todo);
              this.props.closePopup();     
              this.props.refresh(todo);

            // will fix error catching later
      }})
}






handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }


render() {
    const {title, description, tag, category, duedate} = this.state
return (
      <div className='popup'>
          <div className='popup_inner'>
        <h1>New ToDo</h1>
        <form onSubmit={this.handleSubmit} >
          <input
            placeholder="title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <input 
            placeholder="tag"
            type="text"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          />
          <input
            placeholder="category"
            type="text"
            name="category"
            value={category}
            onChange={this.handleChange}
          />
          <input
            placeholder="duedate"
            type="datetime"
            name="duedate"
            value={duedate}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
            Create
          </button>

          <button type="submit" onClick={this.props.closePopup}>close me</button>  

          
      
        </form> 
        
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
export default withRouter(newtodo);

