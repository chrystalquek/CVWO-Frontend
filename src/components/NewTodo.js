
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class newtodo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      description: '',
      tag: 'Urgent',
      category: '',
      duedate: new Date(),
      errors: [],
      
     };
     this.handleTagChange = this.handleTagChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
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

  
  const month = duedate.getMonth() >= 9 ? (duedate.getMonth()  + 1).toString() : "0" + (duedate.getMonth()  + 1).toString();
  const day = duedate.getDate() > 9 ? duedate.getDate().toString() : "0" + (duedate.getDate()).toString();
  const hour = duedate.getHours() > 9 ? duedate.getHours().toString() : "0" + (duedate.getHours()).toString();
  const min = duedate.getMinutes() > 9 ? duedate.getMinutes().toString() : "0" + (duedate.getMinutes()).toString();

  const date = duedate.getFullYear().toString() + "-" + month + "-" + day
      + "T" + hour + ":" + min + ":00.000Z";

  const token = localStorage.getItem("token")
  const userid = localStorage.getItem("userid")
  let todo = {
      title: title,
      description: description,
      tag: tag,
      category: category,
      duedate: date
  }

      axios.post(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}/todos`, {todo}, { headers: {"Authorization" : `Bearer ${token}`} })
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
            duedate: date
        }
            
            // console.log(todo);
              this.props.closePopup();     
              this.props.refresh(todo);

            // will fix error catching later
      }})
}



handleTagChange(event) {
  
  this.setState({tag: event.target.value});
}

handleDateChange(date) {
  
  this.setState({duedate: date});
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
          {/* <input 
            placeholder="tag"
            type="text"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          /> */}
          <label>
          
          <select value={this.state.tag} onChange={this.handleTagChange}>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

          <input
            placeholder="category"
            type="text"
            name="category"
            value={category}
            onChange={this.handleChange}
          />
          {/* <input
            placeholder="duedate"
            type="datetime"
            name="duedate"
            value={duedate}
            onChange={this.handleChange}
          /> */}
          <DatePicker
                  selected={this.state.duedate}
                  onChange={this.handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />

          
        
          <button placeholder="submit" type="submit">
            Create
          </button>

          

          <button type="submit" onClick={this.props.closePopup}>close me</button>  

          <div class = "errors" >
          {this.state.errors ? this.handleErrors() : null}
          </div>
          
      
        </form> 

        
        
        
             
                
            
            
       
        
        
        </div>
      </div>
    );
  }
}
export default withRouter(newtodo);

