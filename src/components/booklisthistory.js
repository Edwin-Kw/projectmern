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
const Book = props => (
    <ul>
        <img src={props.srclink}></img>
        {/* <li>{props.srclink}</li> */}
        <span>{props.spanArrive}</span>
        <li>BookName: {props.books.BookName}</li>
        <li>Author: {props.books.Author}</li>
        <li>Publisher: {props.books.Publisher}</li>
        <li>Price: ${props.books.Price}</li>
        <li>NewArrival: {props.books.["New Arrival"]}</li>
        <Link to={"/book/"+props.books._id}>add to cart</Link>
    </ul>
    /* 
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
     */
  
)

export default class booklisthistory extends Component {
  constructor(props) {
    super(props);

    this.srcvalue = ""
    this.arrival = ""
    this.state = {books: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ books: response.data.filter(catebook => catebook.Category === 'History') })

      })
      .catch((error) => {
        console.log(error);
      })
  }
  sortBook() {
    this.setState({
      books: this.state.books.sort(function(a,b){
          var priceA = parseInt( a.Price)
          var priceB = parseInt( b.Price)
          if (priceA < priceB) {
            return 1;
          }
          if (priceA > priceB) {
            return -1;
          }
          return 0;
      })
    })
  }
  

  bookList() {

    return this.state.books.map(currentbooks => {
        
        /* this.srcvalue = "upload_image/book_"+parseInt(currentbooks.BookId)+".jpeg" */
        /* this.srcvalue = "book_"+parseInt(currentbooks.BookId).toString()+".jpeg"
        console.log(this.srcvalue) */
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
        if (currentbooks.["New Arrival"] === 'Yes'){
            this.arrival = "NEW ARRIVAL!"
        } else{
            this.arrival = ""
        }

        return <Book books={currentbooks}  key={currentbooks._id} srclink={this.srcvalue} spanArrive = {this.arrival}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Books</h3>
        <a href="#" onClick={() => { this.sortBook() }}>Sort By Highest Price</a>
            { this.bookList() }
          
        
      </div>
    )
  }
}