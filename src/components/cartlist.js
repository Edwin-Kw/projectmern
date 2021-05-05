import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = props => (
    <ul>
        
        {/* <li>{props.srclink}</li> */}
        <li>BookName: {props.carts.bookname}</li>
        <li>Quantity: {props.carts.quantity}</li>
        <a href="" onClick={() => { props.deleteCart(props.carts._id) }}>delete</a>
        {/* <Link to={"/book/"+props.books._id}>add to cart</Link> */}
    </ul>
    /* 
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
     */
  
)

export default class cartlist extends Component {
  constructor(props) {
    super(props);

    this.srcvalue = ""
    this.arrival = ""
    this.name = ""
    this.total = 0
    this.state = {carts: [],book:[], name: "", tprice: 0};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/carts/')
      .then(response => {
        this.setState({ carts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  getBookName(bookid){
    console.log(bookid)
    let bkname = ""
    axios.get('http://localhost:5000/book/'+ bookid, {withCredentials:true})
    .then(res => {
        console.log(res.data.BookName + "asdasdasd")
        /* this.setState({name: res.data.BookName}) */
        bkname =  res.data.BookName
    })
    .catch((error) => {
      console.log(error);
    })
    return bkname
  }
  
  deleteCart(id) {
    axios.delete('http://localhost:5000/cart/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      carts: this.state.carts.filter(el => el._id !== id)
    })
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
        <h3>Logged Carts</h3>
        
            { this.cartList() }

            <p>Total Price: {this.total}</p>
            
            <a href="/" >back</a>
        
      </div>
    )
  }
}