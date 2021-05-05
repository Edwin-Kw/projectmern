import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Image1 from './upload_image/book_1.jpeg';
import Image2 from './upload_image/book_2.jpeg';
import Image3 from './upload_image/book_3.jpeg';
import Image4 from './upload_image/book_4.jpg';
import Image5 from './upload_image/book_5.jpeg';
import Image6 from './upload_image/book_6.jpg';
import Image7 from './upload_image/book_7.jpeg';
import Image8 from './upload_image/book_8.jpeg';
import Image9 from './upload_image/book_9.jpeg';
import Image10 from './upload_image/book_10.jpeg';
import Image11 from './upload_image/book_11.jpeg';
import Image12 from './upload_image/book_12.jpg'; 
/* const Book = props => (
    <ul>
        <img src={props.srclink}></img>
        
        <span>{props.spanArrive}</span>
        <li>BookName: {props.books.BookName}</li>
        <li>Author: {props.books.Author}</li>
        <li>Publisher: {props.books.Publisher}</li>
        <li>Price: ${props.books.Price}</li>
        <li>NewArrival: {props.books.["New Arrival"]}</li>
        
    </ul>
    
  
) */

export default class createcart extends Component {
    
  constructor(props) {
    super(props);

    this.srcvalue = "123"
    this.arrival = ""
    this.book = {book :[]}
    this.state = {book :[], currentUser: [], srcvalue : "", arrival:""};
    this.quantity = 0
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangequantity = this.onChangequantity.bind(this);
    
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get('http://localhost:5000/signin', {withCredentials:true})
            .then(res =>{
                /* this.setState({currentUser: res.data.bookuser1}) */
                console.log("bookuser test")
                console.log(res.data.bookuser1)
            }).catch(err=>{
              console.log(err)
            })
    axios.get('http://localhost:5000/book/'+this.props.match.params.id, {withCredentials:true})
      .then(res => {
        this.setState({ book: res.data })
        console.log("bookloaded");
        console.log(parseInt(this.state.book.BookId))

        console.log(this.state);
        if (parseInt(this.state.book.BookId) === 1){
          this.setState({srcvalue: Image1})
        }
        if (parseInt(this.state.book.BookId) === 2){
          this.setState({srcvalue: Image2})
        }
        if (parseInt(this.state.book.BookId) === 3){
          this.setState({srcvalue: Image3})
        }
        if (parseInt(this.state.book.BookId) === 4){
          this.setState({srcvalue: Image4})
        }
        if (parseInt(this.state.book.BookId) === 5){
          this.setState({srcvalue: Image5})
        }
        if (parseInt(this.state.book.BookId) === 6){
          this.setState({srcvalue: Image6})
        }
        if (parseInt(this.state.book.BookId) === 7){
          this.setState({srcvalue: Image7})
        }
        if (parseInt(this.state.book.BookId) === 8){
          this.setState({srcvalue: Image8})
        }
        if (parseInt(this.state.book.BookId) === 9){
          this.setState({srcvalue: Image9})
        }
        if (parseInt(this.state.book.BookId) === 10){
          this.setState({srcvalue: Image10})
        }
        if (parseInt(this.state.book.BookId) === 11){
          this.setState({srcvalue: Image11})
        }
        if (parseInt(this.state.book.BookId) === 12){
          this.setState({srcvalue: Image12})
        }
        if (this.state.book.["New Arrival"] === "Yes"){
            this.state.arrival = "NEW ARRIVAL!"
        } else{
            this.state.arrival = ""
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("bookyy");
      })
      
    
      
  }

  onChangequantity(e) {
    this.quantity = e.target.value
  }

  onSubmit(e) {
    e.preventDefault();

    const cart = {
    
      bookid: this.props.match.params.id,
      quantity:this.quantity
    }

    console.log(cart)

    axios.post('http://localhost:5000/createcart', cart, {withCredentials:true})
      .then(res => console.log(res.data)).catch((error) => {
        console.log(error);
        console.log("bookyy");
      })

    
  }

  

  /* bookList() {

    return this.state.book.map(currentbooks => {
        
        
        if (parseInt(currentbooks.BookId) === 1){
            this.srcvalue = Image1
        }
        if (parseInt(currentbooks.BookId) === 2){
            this.srcvalue = Image2
        }
        if (parseInt(currentbooks.BookId) === 3){
            this.srcvalue = Image3
        }
        if (parseInt(currentbooks.BookId) === 4){
            this.srcvalue = Image4
        }
        if (parseInt(currentbooks.BookId) === 5){
            this.srcvalue = Image5
        }
        if (parseInt(currentbooks.BookId) === 6){
            this.srcvalue = Image6
        }
        if (parseInt(currentbooks.BookId) === 7){
            this.srcvalue = Image7
        }
        if (parseInt(currentbooks.BookId) === 8){
            this.srcvalue = Image8
        }
        if (parseInt(currentbooks.BookId) === 9){
            this.srcvalue = Image9
        }
        if (parseInt(currentbooks.BookId) === 10){
            this.srcvalue = Image10
        }
        if (parseInt(currentbooks.BookId) === 11){
            this.srcvalue = Image11
        }
        if (parseInt(currentbooks.BookId) === 12){
            this.srcvalue = Image12
        }
        if (currentbooks.["New Arrival"] == 'Yes'){
            this.arrival = "NEW ARRIVAL!"
        } else{
            this.arrival = ""
        }

        return <Book books={currentbooks}  key={currentbooks._id} srclink={this.srcvalue} spanArrive = {this.arrival}/>;
    })
  } */

  render() {
    return (
      <div>
        <h3>{this.state.book.BookName}</h3> 
        <img src={this.state.srcvalue}></img>
        
        <span>{this.state.book.["New Arrival"] === 'Yes' ? "NEW ARRIVAL" : ""}</span>
        <li>Author: {this.state.book.Author}</li>
        <li>Published: {this.state.book.Published}</li>
        <li>Publisher: {this.state.book.Publisher}</li>
        <li>Category: {this.state.book.Category}</li>
        <li>Language: {this.state.book.Lang}</li>
        <li>Description: {this.state.book.Description}</li>
        <li>Price: ${this.state.book.Price}</li>
        {/* <li>NewArrival: {this.state.book.["New Arrival"]}</li> */}


        <form className="createsform" onSubmit={this.onSubmit}>
            <label>quantity: </label>
                <input  type="number"
                    required
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChangequantity}
                />
                <input type="submit" value="Createcart" />
        </form>
            {/* { this.bookList() } */}
          
        
      </div>
    )
  }
}