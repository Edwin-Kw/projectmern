import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import createbookuser from "./components/createbookuser"
import loginbookuser from "./components/loginbookuser"
import bookList from "./components/booklist";
import bookListstorybook from "./components/bookliststorybook";
import bookListcfiction from "./components/booklistcfiction";
import bookListhistory from "./components/booklisthistory";
import booklistpbook from "./components/booklistpbook";
import createcart from "./components/createcart";
import cartList from "./components/cartlist";
import Checkoutlogged from "./components/Checkoutlogged";
import invoice from "./components/invoice";
import Checkoutcreate from "./components/Checkoutcreate";

function App() {
  /* window.addEventListener('DOMContentLoaded', function() {


  }) */
  return (
    <Router>
      <Navbar/>
      <Route path="/ExercisesList" exact component = {ExercisesList}/>
      <Route path="/edit/:id" component = {EditExercise}/>
      <Route path="/create" component = {CreateExercise}/>
      <Route path="/user" component = {CreateUser}/>
      <Route path="/createbookuser" component = {createbookuser}/>
      <Route path="/login" component = {loginbookuser}/>
      <Route path="/" exact component = {bookList}/>
      <Route path="/bookliststorybook" exact component = {bookListstorybook}/>
      <Route path="/booklistcfiction" exact component = {bookListcfiction}/>
      <Route path="/booklisthistory" exact component = {bookListhistory}/>
      <Route path="/booklistpbook" exact component = {booklistpbook}/>
      <Route path="/book/:id" component = {createcart}/>
      <Route path="/cartlist" exact component = {cartList}/>
      <Route path="/checkoutlogged" exact component = {Checkoutlogged}/>
      <Route path="/invoice" exact component = {invoice}/>
      <Route path="/Checkoutcreate" exact component = {Checkoutcreate}/>
      
    </Router>
  );
}

export default App;
