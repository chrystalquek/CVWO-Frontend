
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


class edittodo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      description: '',
      tag: 'Urgent',
      category: '',
      duedate: new Date(),
      errors: []
     };
     this.handleTagChange = this.handleTagChange.bind(this);
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
    const {title, description, tag, category, duedate} = this.state

    const month = duedate.getUTCMonth() >= 9 ? (duedate.getUTCMonth()  + 1).toString() : "0" + (duedate.getUTCMonth()  + 1).toString();
  const day = duedate.getUTCDate() > 9 ? duedate.getUTCDate().toString() : "0" + (duedate.getUTCDate()).toString();
  const hour = duedate.getUTCHours() > 9 ? duedate.getUTCHours().toString() : "0" + (duedate.getUTCHours()).toString();
  const min = duedate.getUTCMinutes() > 9 ? duedate.getUTCMinutes().toString() : "0" + (duedate.getUTCMinutes()).toString();

  const date = duedate.getUTCFullYear().toString() + "-" + month + "-" + day
      + "T" + hour + ":" + min + ":00.000Z"

    let todo = {
        id: this.props.todoid,
        title: title,
        description: description,
        tag: tag,
        category: category,
        duedate: date
    }


    

    const token = localStorage.getItem("token")
    const userid = localStorage.getItem("userid")
    axios.put(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}/todos/${this.props.todoid}`, {todo}, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {

              if (response.data.errors) {
                console.log(response.data.errors)
            
                this.setState({errors: response.data.errors});
      
              } else {


                this.props.closePopup(0)();


                this.props.refresh(todo);
                
                
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
    const {title, description, tag, category, duedate} = this.state
return (
      <div className='popup'>
          <div className='popup_inner'>
        <h1>Edit ToDo</h1>
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
          <DatePicker
                  selected={this.state.duedate}
                  onChange={this.onChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />

        
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
export default withRouter(edittodo);

//this.props.closePopup