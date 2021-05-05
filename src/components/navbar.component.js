import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.srcvalue = ""
    this.arrival = ""
    this.name = ""
    this.total = 0
    this.state = {carts: [],book:[], name: "", tprice: 0, number: 0};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        this.setState({ carts: response.data })
        this.setState({ number: response.data.length })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Main Page</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {/* <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li> */}
          <li className="navbar-item">
          <Link to="/createbookuser" className="nav-link">Register</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Sign in</Link>
          </li>
          <li className="navbar-item">
          <Link to="/" className="nav-link">booklist</Link>
          </li>
          <li className="navbar-item">
          <Link to="/cartlist" className="nav-link">cart: {this.state.number}</Link>
      
          </li>
          <li className="navbar-item">
          <Link to="/bookliststorybook" className="nav-link">bookliststorybook</Link>
          </li>
          <li className="navbar-item">
          <Link to="/booklistcfiction" className="nav-link">booklistcfiction</Link>
          </li>
          <li className="navbar-item">
          <Link to="/booklisthistory" className="nav-link">booklisthistory</Link>
          </li>
          <li className="navbar-item">
          <Link to="/booklistpbook" className="nav-link">booklistpbook</Link>
          </li>
          <li className="navbar-item">
          <Link to="/checkoutlogged" className="nav-link">checkoutlogged</Link>
          </li>
          <li className="navbar-item">
          <Link to="/invoice" className="nav-link">invoice</Link>
          </li>
          <li className="navbar-item">
          <Link to="/Checkoutcreate" className="nav-link">Checkoutcreate</Link>
          </li>
          
          
        </ul>
        </div>
      </nav>
    );
  }
}