import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Popup.css'


// handleDelete = (todoid) =>  {
        
//     const token = localStorage.getItem("token")
//     const userid = localStorage.getItem("userid")
//     axios.delete(`http://localhost:3001/api/users/${userid}/todos/${todoid}`, { headers: {"Authorization" : `Bearer ${token}`} })
//   .then(response => {
                
//             const index = this.state.filtered.findIndex(todo => todo.id === todoid);
//             this.state.filtered.splice(index, 1);
//             const index1 = this.state.todos.findIndex(todo => todo.id === todoid);
//             this.state.todos.splice(index1, 1);
//             this.setState({ filtered: this.state.filtered, todos: this.state.todos });
//         //this.refreshPage();
//         })
//     }











class deletetodo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }

handleSubmit = (event) => {
  
    event.preventDefault()


    

    const token = localStorage.getItem("token")
    const userid = localStorage.getItem("userid")
    
    axios.delete(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}/todos/${this.props.todoid}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {


                this.props.closePopup(0)();


                this.props.refresh(this.props.todoid);
                
                
              
                
            })
       
        
    }





render() {
    
return (
      <div className='popup'>
          <div className='popup_delete'>
        <h1>Are you sure you want to Delete this ToDo?</h1>
        <form onSubmit={this.handleSubmit} >
        
          <button placeholder="submit" type="submit">
            Yes
          </button>

          
      
        </form> 
        <div>
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
export default withRouter(deletetodo);

//this.props.closePopup