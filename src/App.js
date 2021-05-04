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
import createcart from "./components/createcart";
function App() {
  /* window.addEventListener('DOMContentLoaded', function() {


  }) */
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component = {ExercisesList}/>
      <Route path="/edit/:id" component = {EditExercise}/>
      <Route path="/create" component = {CreateExercise}/>
      <Route path="/user" component = {CreateUser}/>
      <Route path="/createbookuser" component = {createbookuser}/>
      <Route path="/login" component = {loginbookuser}/>
      <Route path="/booklist" exact component = {bookList}/>
      <Route path="/book/:id" component = {createcart}/>
    </Router>
  );
}

export default App;
