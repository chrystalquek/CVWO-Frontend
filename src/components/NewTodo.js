
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './EditTodo.css'


class edit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      description: '',
      tag: '',
      category: '',
      duedate: '',
      errors: ''
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
    let todo = {
        title: title,
        description: description,
        tag: tag,
        category: category,
        duedate: duedate
    }

const token = localStorage.getItem("token")
  if (token){    
    fetch('http://localhost:3001/auto_login', {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors){
        this.props.history.push(`/login`);
      } else {
        axios.post(`http://localhost:3001/api/users/${response.id}/todos/`, {todo})
            //.then(respon => respon.json())
            .then(respons => {
                this.props.closePopup();
                //console.log(this.props.refresh)
                
                this.props.refresh();
                
            
              //this.setState({ todos: respons.todos });
              // will fix error catching later
            }).catch(error => console.log(error))
       
        
    }})
    .catch(error => console.log('api errors:', error))
    }}






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
            type="string"
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
            type="string"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          />
          <input
            placeholder="category"
            type="string"
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
            Submit Changes
          </button>

          
      
        </form> 
        <div>
            <button onClick={this.props.closePopup}>close me</button>  
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
export default withRouter(edit);

