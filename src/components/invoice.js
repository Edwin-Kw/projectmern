import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = props => (
    <div>
        
        {/* <li>{props.srclink}</li> */}
        <p>{props.carts.quantity} x {props.carts.bookname}</p>
        
        {/* <Link to={"/book/"+props.books._id}>add to cart</Link> */}
    </div>
    /* 
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
     */
  
)

export default class invoice extends Component {
  constructor(props) {
    super(props);

    this.srcvalue = ""
    this.arrival = ""
    this.name = ""
    this.total = 0
    this.state = {carts: [],book:[], name: "", tprice: 0,checkout: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/checkout/')
      .then(response => {
        this.setState({ checkout: response.data })
        this.setState({ carts: response.data.carts })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  deleteCarts() {
    axios.delete('http://localhost:5000/carts')
      .then(response => { console.log(response.data)});
  }

  cartList() {

    return this.state.carts.map(currentcarts => {
        let name = ""
        /* this.srcvalue = "upload_image/book_"+parseInt(currentbooks.BookId)+".jpeg" */
        /* this.srcvalue = "book_"+parseInt(currentbooks.BookId).toString()+".jpeg"
        console.log(this.srcvalue) */
        this.total = this.total + currentcarts.Price * currentcarts.quantity
        /* this.setState({tprice: this.state.tprice+parseInt(currentcarts.Price)})  */
        return <Cart carts={currentcarts}  key={currentcarts._id} deleteCart={this.deleteCart}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Invoice Page</h3>
        <p>Full Name: {this.state.checkout.fullname}</p>
        <p>Company: {this.state.checkout.cName}</p>
        <p>Address Line 1: {this.state.checkout.Address1}</p>
        <p>Address Line 2: {this.state.checkout.Address2}</p>
        <p>City: {this.state.checkout.city}</p>
        <p>Region/State/District: {this.state.checkout.RSD}</p>
        <p>Country: {this.state.checkout.country}</p>
        <p>Postcode: {this.state.checkout.zipcode}</p>
        { this.cartList() }
        <p>Total Price: {this.state.checkout.totalprice}</p>
        
            {/* <a href="/" >ok</a> */}
            <br></br>
            <p>Thanks for ordering. Your books will be delivered within 7 working days.</p>
            <a href="/" onClick={() =>{this.deleteCarts()}}>ok</a>
        
      </div>
    )
  }
}