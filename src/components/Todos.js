import React, { Component } from 'react';
// import axios from 'axios'
// import {Link} from 'react-router-dom'
import EditPopup from "./EditTodo"
import NewPopup from "./NewTodo"
import DeletePopup from "./DeleteTodo"
import "./ToDosStyle.css"
import Logo from './image.jpg';
import { faEdit, faTrashAlt, faSort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
   


  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
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

    toggleDeletePopup =   (todoid) =>  () =>
    {
    this.setState({  
         showDeletePopup: todoid 
    })}

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

    handleAdd = (todo) => {

      let list = this.state.todos;
      // console.log(list);
      
      
      list.push(todo);
      // console.log(list);
      // let list2 = this.state.filtered;
      // // Then we use that to set the state for list
      // // console.log(this.state.filtered);
      // if ( todo.tag.toLowerCase().includes(this.state.query) ) {
      //   list2.push(todo);
      //   // console.log(this.state.filtered);
      // }
      this.setState({
        todos: list
      });

      this.handleSearch(this.state.query);
      
      
      // Finally, we need to reset the form
      
    }


    handleEdit = (todo) => {
      
      
      // Then we use that to set the state for list
      // Finally, we need to reset the form

      const index = this.state.todos.findIndex(ToDo => ToDo.id === todo.id);
      let list = this.state.todos;
      list[index] = todo;
      


      // still show in filtered list even if tag does not suit
      // let list2 = this.state.filtered;
      // Then we use that to set the state for list
      
      // const index2 = this.state.filtered.findIndex(ToDo => ToDo.id === todo.id);
      // list2[index2] = todo;
      
      this.setState({
        todos: list
      });

      this.handleSearch(this.state.query);
      
    }

    handleDelete = (todoid) => {

      const index1 = this.state.todos.findIndex(ToDo => ToDo.id === todoid);

     
      this.state.todos.splice(index1, 1);

      
      // const index = this.state.filtered.findIndex(ToDo => ToDo.id === todoid);
      // // console.log("in filtered")
      // console.log(index);
      // this.state.filtered.splice(index, 1);
      
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

sortby = (factor) => () => {
  
  
  let newList = this.state.filtered;
  if (factor == "duedate") {
        //string.substr(start, length)

        //2019-03-22 23:59:59

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
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            let c = new Date(b.duedate);
            let d = new Date(a.duedate);
           
            
  
            if (c > d) {
              return 1;
              }
            if (d > c) {
              return -1;
            }
            return 0;

        })}
        

  

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
            <td>{i+1}</td>
             <td>{id[i]}</td>
             <td>{title[i]}</td>
             <td>{description[i]}</td>
             <td>{tag[i]}</td>
             <td>{category[i]}</td>
             <td>{duedate[i].substr(0,10) + "  " + duedate[i].substr(11,8)}</td>
            <td>

             <button onClick={this.toggleDeletePopup(id[i])}> <FontAwesomeIcon icon={faTrashAlt} /> {' '}Delete </button>  
             
            

            {this.state.showDeletePopup === id[i]?  
            <DeletePopup  
                    todoid={id[i]}
                    closePopup={this.toggleDeletePopup.bind(this)} 
                    refresh={this.handleDelete.bind(this)}
            />  
            
            : null  
            }




             {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */}

             <button onClick={this.toggleEditPopup(id[i])}> <FontAwesomeIcon icon={faEdit} /> {' '}Edit </button>  
             

         

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
    let header = ["fakeid", "id", "title", "description", "tag", "category", "duedate", "options"]
    return header.map((key, index) => {

      if (key !== "id" && key !== "options" && key !== "fakeid") {
        return <th key={index}>{key.toUpperCase()} <button onClick={this.sortby(key)}> <FontAwesomeIcon icon={faSort} /> </button>  </th>

      } else {
       return <th key={index}>{key.toUpperCase()}  </th>
      }
    })
 }
 renderTableOptions() {
 return [<th key="search" colSpan="7"><input type="text" className="input" onChange={this.handleSearch} placeholder="Search tag..." /></th>,
 <th key="new">
   
   <button onClick={this.toggleNewPopup}>
   <FontAwesomeIcon icon={faPlus} /> {' '}Add New ToDo </button> 

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
         {/* <input type="text" className="input" onChange={this.handleSearch} placeholder="Search tag..." /> */}
           
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