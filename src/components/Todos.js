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
        filtered: {},
        query: '',
        showEditPopup: false,
        showNewPopup: false
       };
       this.handleSearch = this.handleSearch.bind(this);
    }


    // componentDidMount() {
    //     // option to refresh page (make an extra API call) for every new/update/delete) or directly work with array
    //     this.refreshPage()
    // }

    componentDidMount() {
      // this.setState({
      //   todos: this.props.todos,
      //   filtered: this.props.todos
      // });
      this.refreshPage();
    }
    
    // componentDidUpdate(nextProps) {
    //   this.setState({
    //     filtered: nextProps.todos
    //   });
    // }


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
                    
                const index = this.state.filtered.findIndex(todo => todo.id === todoid);
                this.state.filtered.splice(index, 1);
                const index1 = this.state.todos.findIndex(todo => todo.id === todoid);
                this.state.todos.splice(index1, 1);
                this.setState({ filtered: this.state.filtered, todos: this.state.todos });
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
            this.setState({ todos: response.todos, filtered: response.todos });
        })
    }

    handleAdd = (todo) => {
      let list = this.state.todos;
      list.push(todo);
      let list2 = this.state.filtered;
      // Then we use that to set the state for list
      if ( todo.tag.toLowerCase().includes(this.state.query) ) {
        list2.push(todo);
      }
      this.setState({
        todos: list,
        filtered: list2
      });
      // Finally, we need to reset the form
      
    }


    handleEdit = (todo) => {
      
      
      // Then we use that to set the state for list
      // Finally, we need to reset the form

      const index = this.state.todos.findIndex(ToDo => ToDo.id === todo.id);
      let list = this.state.todos;
      list[index] = todo;
      


      // still show in filtered list even if tag does not suit
      let list2 = this.state.filtered;
      // Then we use that to set the state for list
      
      const index2 = this.state.filtered.findIndex(ToDo => ToDo.id === todo.id);
      list2[index2] = todo;
      
      this.setState({
        todos: list,
        filtered: list2
      });
      
    }






    handleSearch(e) {
      // Variable to hold the original version of the list
      let currentList = [];
          // Variable to hold the filtered list before putting into state
      let newList = [];

      

          // If the search bar isn't empty
      if (e.target.value !== "") {
              // Assign the original list to currentList
        currentList = this.state.todos;

              // Use .filter() to determine which items should be displayed
              // based on the search terms
        newList = currentList.filter(item => {
                  // change current item to lowercase
          const lc = item.tag.toLowerCase();
                  // change search term to lowercase
          const filter = e.target.value.toLowerCase();
                  // check to see if the current list item includes the search term
                  // If it does, it will be added to newList. Using lowercase eliminates
                  // issues with capitalization in search terms and search content
          return lc.includes(filter);
        });
      } else {
              // If the search bar is empty, set newList to original task list
        newList = this.state.todos;
      }
          // Set the filtered state based on what our rules added to newList
      this.setState({
        filtered: newList,
        query: e.target.value.toLowerCase()
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

    let todos = Array.from(this.state.filtered)

    var id = jsonQuery('[*][id]', { data: this.state.filtered }).value
    var title = jsonQuery('[*][title]', { data: this.state.filtered }).value
    var description = jsonQuery('[*][description]', { data: this.state.filtered }).value
    var tag = jsonQuery('[*][tag]', { data: this.state.filtered }).value
    var category = jsonQuery('[*][category]', { data: this.state.filtered }).value
    var duedate = jsonQuery('[*][duedate]', { data: this.state.filtered }).value
    

    return todos.map((TODO, i) => {
       
       return (
          <tr key={id[i]}>
              {/* <td>{i + 1}</td> */}
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
         <input type="text" className="input" onChange={this.handleSearch} placeholder="Search tag..." />
           
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