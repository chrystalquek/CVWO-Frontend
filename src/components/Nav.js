import React from 'react';
import { Link } from 'react-router-dom'

  export default class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //       loggedIn : false
    //      };
    //   }


    // componentDidMount() {
    //     this.setState({
    //         loggedIn : localStorage.getItem("token")
    //       })
      
    // }


    render() {    
      return (
        <nav className="Nav">
          <div className="Nav__container">
            <Link to="/" className="Nav__brand">
              
            </Link>

            <div className="Nav__right">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item">
                  <Link className="Nav__link" to="/">Home</Link>
                </li>
                
                
                

            
          
          { 
        
            (!this.props.loggedIn) ? 
                <div>
                        <li className="Nav__item">
                        <Link className="Nav__link" to="/login">Login</Link>
                        </li>
                        <li className="Nav__item">
                        <Link className="Nav__link" to="/signup">Signup</Link>
                        </li>
                </div>
                :
                <div>
                        <li className="Nav__item">
                        <Link className="Nav__link" to="/todos">Todos</Link>
                        </li>
                        <li className="Nav__item">
                        <Link className="Nav__link" to="/logout" onClick={this.props.handleLogout} >Logout</Link>
                        </li>
                 </div>
          }


              </ul>
            
          </div>
          </div>
        </nav>
      );
    }
  }