import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import EditPopup from "./EditTodo"
import NewPopup from "./NewTodo"
var jsonQuery = require('json-query')



class Todos extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          // todos can be retrieved using refreshPage instead of props
        todos: this.props.todos,
        showEditPopup: false,
        showNewPopup: false
       };
    }


    componentDidMount() {
        this.refreshPage()
    }


  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }

    handleDelete = (todoid) => () => {
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
                    this.props.history.push(`/todos`);
                } else {
                    axios.delete(`http://localhost:3001/api/users/${response.id}/todos/${todoid}`, {withCredentials: true})
                    .then(resp => {
                        //console.log(resp.todos)
                        // this.props.history.push(`/users/${this.props.id}/todos`)
                        // const index = this.state.todos.findIndex(todo => todo.id === todoid);
                        // console.log(index);
                        // this.state.todos.splice(index, 1);
                    this.refreshPage();
                    }).catch(error => console.log(error))
                }
            })
        }
    }
            
    toggleEditPopup = (todoid) =>  () =>
    {
    this.setState({  
         showEditPopup: todoid 
    })}

    toggleNewPopup =   () =>
    {
    this.setState({  
         showNewPopup: !this.state.showNewPopup 
    })}

    refreshPage = () => {
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
                fetch(`http://localhost:3001/api/users/${response.id}/todos`)
                    .then(respon => respon.json())
                    .then(respons => {
                    
                    this.setState({ todos: respons.todos });
                    // will fix error catching later
                    }).catch(error => console.log(error))
            }
                
            })
            .catch(error => console.log('api errors:', error))
            }}
        

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }

  renderTableData() {

    let todos = Array.from(this.state.todos)

    var id = jsonQuery('[*][id]', { data: this.state.todos }).value
    var title = jsonQuery('[*][title]', { data: this.state.todos }).value
    var description = jsonQuery('[*][description]', { data: this.state.todos }).value
    var tag = jsonQuery('[*][tag]', { data: this.state.todos }).value
    var category = jsonQuery('[*][category]', { data: this.state.todos }).value
    var duedate = jsonQuery('[*][duedate]', { data: this.state.todos }).value
    

    return todos.map((TODO, i) => {
       
       return (
          <tr key={id[i]}>
             <td>{id[i]}</td>
             <td>{title[i]}</td>
             <td>{description[i]}</td>
             <td>{tag[i]}</td>
             <td>{category[i]}</td>
             <td>{duedate[i]}</td>
             <td><button onClick={this.handleDelete(id[i])}>Delete</button> 
             <button onClick={this.toggleEditPopup(id[i])}> Update </button>  

                    {this.state.showEditPopup === id[i]?  
                    <EditPopup  
                            todoid={id[i]}
                            closePopup={this.toggleEditPopup.bind(this)} 
                            refresh={this.refreshPage.bind(this)}
                    />  
                    : null  
                    }  </td>
          </tr>
       )
    })
 }

 renderTableHeader() {
    let header = ["id", "title", "description", "tag", "category", "duedate", "options"]
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }




render() {
    
     return (
       <div class = "todo">
           
           <table >
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>

            <button onClick={this.toggleNewPopup}> New </button>  

                    {this.state.showNewPopup ?  
                    <NewPopup  
                    closePopup={this.toggleNewPopup.bind(this)} 
                    refresh={this.refreshPage.bind(this)}
            />    
                    : null  
                    } 
            
        
            <Link to='/logout' onClick={this.props.handleLogout}>Log Out</Link> <br></br>
        </div>
     );
     }
    }

export default Todos