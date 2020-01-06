import React, { Component } from 'react';
import axios from 'axios'
// import {Link} from 'react-router-dom'
import EditPopup from "./EditTodo"
import NewPopup from "./NewTodo"
var jsonQuery = require('json-query')



class Todos extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        todos: {},
        showEditPopup: false,
        showNewPopup: false
       };
    }


    componentDidMount() {
        // option to refresh page (make an extra API call) for every new/update/delete) or directly work with array
        this.refreshPage()
    }


  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }

    handleDelete = (todoid) =>  {
        
        const token = localStorage.getItem("token")
        const userid = localStorage.getItem("userid")
        axios.delete(`http://localhost:3001/api/users/${userid}/todos/${todoid}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
                    
                const index = this.state.todos.findIndex(todo => todo.id === todoid);
                console.log(index);
                this.state.todos.splice(index, 1);
                this.setState({ todos: this.state.todos });
            //this.refreshPage();
            })
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
        const userid = localStorage.getItem("userid")
        

        fetch(`http://localhost:3001/api/users/${userid}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then(resp => resp.json())
        .then(response => {
            this.setState({ todos: response.todos });
        })
    }

    handleAdd = (todo) => {
      let list = this.state.todos;
      list.push(todo);
      // Then we use that to set the state for list
      this.setState({
        todos: list
      });
      // Finally, we need to reset the form
      
    }


    handleEdit = (todo) => {
      
      
      // Then we use that to set the state for list
      // Finally, we need to reset the form

      const index = this.state.todos.findIndex(ToDo => ToDo.id === todo.id);
      console.log(index);
      //this.state.todos.splice(index, 1);
      let list = this.state.todos
      list[index] = todo;
      this.setState({
        todos: list
      });
      
    }


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
             {/* <td><button onClick={this.handleDelete(id[i])}>Delete</button>  */}

             <td><button onClick={() => { if (window.confirm('Are you sure you wish to delete this Todo?')) this.handleDelete(id[i]) }}>Delete</button> 
             


             {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */}

             <button onClick={this.toggleEditPopup(id[i])}> Update </button>  

                    {this.state.showEditPopup === id[i]?  
                    <EditPopup  
                            todoid={id[i]}
                            closePopup={this.toggleEditPopup.bind(this)} 
                            refresh={this.handleEdit.bind(this)}
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
                    refresh={this.handleAdd.bind(this)}
                    />    
                    : null  
                    } 
            
        
            {/* <Link to='/logout' onClick={this.props.handleLogout}>Log Out</Link> <br></br> */}
        </div>
     );
     }
    }

export default Todos