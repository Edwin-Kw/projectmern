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
    this.quantity = ""
    this.state = {carts: [],book:[], name: "", tprice: 0, number: 0, quantity:""};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangequantity = this.onChangequantity.bind(this);
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

  onChangequantity(e) {
    this.setState({quantity :e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    
    window.location.href= '/booklistsearch/'+this.state.quantity

    /* axios.get('http://localhost:5000/books', {withCredentials:true})
      .then(res => {
        console.log(res.data)
        window.location.href= '/'
      }).catch((error) => {
        console.log(error);
        console.log("bookyy");
      }) */
    
    
  }
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Main Page</Link>
        <form className="createsform" onSubmit={this.onSubmit}>
            <label></label>
                <input  type="text"
                    required
                    placeholder="Keyword(s)"
                    onChange={this.onChangequantity}
                />
                <input type="submit" value="Search" />
        </form>
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
          <Link to="/cartlist" className="nav-link">cart: {this.state.number}</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>
          
          </ul>
          <ul>
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home Page</Link>
          </li>
          </ul>
          <h2>Category</h2>
          <ul>
          {/* <li className="navbar-item">
          <Link to="/checkoutlogged" className="nav-link">checkoutlogged</Link>
          </li>
          <li className="navbar-item">
          <Link to="/invoice" className="nav-link">invoice</Link>
          </li>
          <li className="navbar-item">
          <Link to="/Checkoutcreate" className="nav-link">Checkoutcreate</Link>
          </li> */}

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
          
          
        </ul>
        </div>
        <br></br>
      </nav>
    );
  }
}