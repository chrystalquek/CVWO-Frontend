import React, { Component } from 'react';
import EditPopup from "./EditTodo"
import NewPopup from "./NewTodo"
import DeletePopup from "./DeleteTodo"
import "./ToDosStyle.css"
import Logo from './image.jpg';
import { faEdit, faTrashAlt, faSort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// jsonQuery to access fields like title, description...
var jsonQuery = require('json-query')

class Todos extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        todos: {},
        filtered: {},
        query: '',
        showEditPopup: false,
        showNewPopup: false,
        showDeletePopup: false,
        sortorder: true
       };
       this.handleSearch = this.handleSearch.bind(this);
    }


  componentDidMount() {
    this.refreshPage();
  }
   
  // render inputted fields
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
  }

  // 3 different toggling popup methods - edit, delete, add
  toggleEditPopup = (todoid) =>  () =>
    {
    this.setState({  
         showEditPopup: todoid 
    }
  )}

  toggleNewPopup = () =>
    {
    this.setState({  
         showNewPopup: !this.state.showNewPopup 
    }
  )}

  toggleDeletePopup = (todoid) => () =>
    {
    this.setState({  
         showDeletePopup: todoid 
    }
  )}

  // general way to refreshPage to obtain updated todos
    refreshPage = () => {
        const token = localStorage.getItem("token")
        const userid = localStorage.getItem("userid")
        
        fetch(process.env.REACT_APP_API_ENDPOINT + `/users/${userid}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then(resp => resp.json())
        .then(response => {
            this.setState({ todos: response.todos, filtered: response.todos });
        })
    }

    // add new/edited todos to this.state.todos instead of making new api call
    // rerendering from state

    handleAdd = (todo) => {

      let list = this.state.todos;

      list.push(todo);

      this.setState({
        todos: list
      });

      this.handleSearch(this.state.query);
      
    }


    handleEdit = (todo) => {
      const index = this.state.todos.findIndex(ToDo => ToDo.id === todo.id);
      let list = this.state.todos;
      list[index] = todo;
      
      this.setState({
        todos: list
      });

      this.handleSearch(this.state.query);
      
    }

    handleDelete = (todoid) => {

      const index1 = this.state.todos.findIndex(ToDo => ToDo.id === todoid);
      this.state.todos.splice(index1, 1);
      this.setState({ todos: this.state.todos });
      this.handleSearch(this.state.query);

    }

    handleSearch(e) {
      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];

      let query = ((typeof e === 'string' || e instanceof String) ) ? e : e.target.value;

      // If the search bar isn't empty
      if (query !== "") {
        // Assign the original list to currentList
        currentList = this.state.todos;

        // Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter(item => {
          // change current item to lowercase
          const lc = item.tag.toLowerCase();
          // change search term to lowercase
          const filter = query.toLowerCase();
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
          query: query.toLowerCase()
        });
}

// generic sortby method, accepts any header title
  sortby = (factor) => () => {
    
    let newList = this.state.filtered;
    if (factor == "duedate") {
        // check boolean which determines which ascending or descending
        if (this.state.sortorder) {

        newList = newList.sort(function (a, b) {
          
          let c = new Date(b.duedate);
          let d = new Date(a.duedate);

          if (c > d) {
            return -1;
            }
          if (d > c) {
            return 1;
          }
          return 0;
        });} else {
          newList = newList.sort(function (a, b) {

            let c = new Date(b.duedate);
            let d = new Date(a.duedate);

            if (c > d) {
              return 1;
              }
            if (d > c) {
              return -1;
            }
            return 0;

        })
  }

  } else {
      if (this.state.sortorder) {
      
        newList = newList.sort(function (a, b) {
          if (a[factor] > b[factor]) {
              return -1;
          }
          if (b[factor] > a[factor]) {
              return 1;
          }
          return 0;
        } );
        
      } else {
        newList = newList.sort(function (a, b) {
          if (a[factor] > b[factor]) {
              return 1;
          }
          if (b[factor] > a[factor]) {
              return -1;
          }
          return 0;
        }  );
      }
  }
  
  this.setState({
    filtered: newList,
    sortorder: !this.state.sortorder
    
  })
}

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <span key={error}>{error}<br></br></span>
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
            
             <td>{title[i]}</td>
             <td>{description[i]}</td>
             { 
               (tag[i] == "Urgent")
              ? <td className="urgent">{tag[i]}</td>
              : (tag[i] == "Normal")
                ? <td className="normal">{tag[i]}</td>
                : (tag[i] == "Low")
                  ? <td className="low">{tag[i]}</td>
                  : <td>{tag[i]}</td>
            }
             
             <td>{category[i]}</td>
             <td>{duedate[i].substr(0,10) + "  " + duedate[i].substr(11,8)}</td>
            <td>

             <button className ="delete" onClick={this.toggleDeletePopup(id[i])}> <FontAwesomeIcon icon={faTrashAlt} /> {' '}Delete </button>  
             
            

            {this.state.showDeletePopup === id[i]?  
            <DeletePopup  
                    todoid={id[i]}
                    closePopup={this.toggleDeletePopup.bind(this)} 
                    refresh={this.handleDelete.bind(this)}
            />  
            
            : null  
            }
             <button className = "edit" onClick={this.toggleEditPopup(id[i])}> <FontAwesomeIcon icon={faEdit} /> {' '}Edit </button>  
             
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
    let header = [["Title", "title"], ["Description", "description"], ["Tag", "tag"], ["Category", "category"], 
      ["Due Date", "duedate"], ["Options", "options"]]
    return header.map((key, index) => {

      if (key[0] !== "Options" ) {
        return <th key={index}>{key[0]} <button onClick={this.sortby(key[1])}> <FontAwesomeIcon icon={faSort} /> </button>  </th>

      } else {
       return <th key={index}>{key[0]} </th>
      }
    })
 }

 renderTableOptions() {
 return [<th key="search" colSpan="5"><input type="text" className="input" onChange={this.handleSearch} placeholder="Search tag..." /></th>,
 <th key="new">
   
   <button className = "new" onClick={this.toggleNewPopup}>
   <FontAwesomeIcon icon={faPlus} /> {' '}Add New </button> 

      {this.state.showNewPopup ?  
      <NewPopup  
      closePopup={this.toggleNewPopup.bind(this)} 
      refresh={this.handleAdd.bind(this)}
      />    
      : null  
      }
   
   </th>] 
  
}

render() {

     return (
       <div >
         <img src={Logo} width="100%" height="100%" overflow="hidden"></img>
           
           <table >
               <tbody>
                 <tr>{this.renderTableOptions()}</tr>
               <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>

            
        </div>
     );
     }
    }

export default Todos