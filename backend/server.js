const bookdata = require('./book.json')

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bookuser = require('./models/bookuser');
var cookieParser = require('cookie-parser')
const session = require('express-session')
const store = new session.MemoryStore()
const path = require('path')
const book = require('./models/book');
const assert = require('assert');
const cart = require('./models/cart');
const checkout = require('./models/checkout');
let loginedid = " "
let loggedin = false

let coid = "NA"
let fullname = "NA"
let cName =  "NA"
let Address1 ="NA"
let Address2 ="NA"
let city = "NA"
let RSD = "NA"
let country = "NA"
let zipcode ="NA"
let carts = []
let totalprice = 0




/* const port = process.env.PORT || 5000; */

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
/* app.use(cors({ origin: true, credentials: true })) */
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    store
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'backend', 'public')));

/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
}) */

const db = 'mongodb://localhost:27017/project'

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("database is connected"))
    .catch(err => console.log(err))

const port = 5000;

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const { nextTick } = require('process');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

function fetchRequestCurrent(){
  console.log("books ready")
  book.collection.remove()
  book.collection.insertMany(bookdata, function(err,r) {
    assert.equal(null, err);
    assert.equal(bookdata.length, r.insertedCount);
    
  })

}
app.listen(port, () => {console.log(`Server is running on port: ${port}`);
  fetchRequestCurrent()
});




//create user
app.post('/createbookuser', async (req,res) =>{
  const idNum = await bookuser.countDocuments()
  const newbookuser = new bookuser({
    userid: `${idNum+1}`,
    username: req.body.username,
    password: req.body.password,
  })
  const bookusertemp = await bookuser.findOne({ username: req.body.username })
  
  console.log("test")
  console.log(bookusertemp)
  if (bookusertemp){
    res.json({login: "False", reply: "overlap"})
  } else {
    console.log("test2")
    newbookuser.save().then(data =>{res.json({login: "True", reply: "login success"})}).catch(err =>{res.json({reply: err})})
  }

})
//login
app.post('/login', async (req,res) =>{
  
  const newbookuser = new bookuser({
    username: req.body.username,
    password: req.body.password,
  })
  const bookusertemp = await bookuser.findOne({ username: req.body.username })
  try{
    console.log("check0")
    if (newbookuser.username && newbookuser.password) {
      if (req.session.authenticated) {
        res.json(req.session)
      }
      else{
        if (bookusertemp) {
          
          console.log(req.body.password + "  asdasd  " +bookusertemp.password)
          if (req.body.password === bookusertemp.password) {
              req.session.authenticated = true
              req.session.newbookuser = newbookuser
              res.cookie('sessionID', req.session.id)
              console.log(req.session)
              res.json(req.session)
              loginedid = bookusertemp._id
              loggedin = true
              console.log("check1")
          } else {
              res.json({ reply: "Wrong Password" })
              console.log("check2")
          }
      } else {
          res.json({ reply: "no user" })
          console.log("check3")
      }
      }
    }
  }catch (err){
    console.log("check4")
    console.log(err)
  }
})
//createbook
app.post('/createbook', async (req,res) =>{
  const idNum = await book.countDocuments()
  const newbook = new book({
    bookid: `${idNum+1}`,
    bookname: req.body.bookname,
    Publisher: req.body.Publisher,
    Category: req.body.Category,
    Lang: req.body.Lang,
    Author: req.body.Author,
    Description: req.body.Description,
    Price: req.body.Price,
    Published: req.body.Published,
    NewArrival: req.body.NewArrival,
  })
  const booktemp = await book.findOne({ username: req.body.username })
  
  console.log("test")
  console.log(booktemp)
  if (booktemp){
    res.json({login: "False", reply: "overlap"})
  } else {
    console.log("test2")
    newbook.save().then(data =>{res.json({login: "True", reply: "login success"})}).catch(err =>{res.json({reply: err})})
  }

})



app.get("/books", async (req, res) => {
  const bookdata = await book.find()
  /* console.log(bookdata) */
  res.json(bookdata)
})

app.get("/book/:id", async (req, res) => {
  const bookdata = await book.findById(req.params.id)
  console.log('bookdata')
  console.log(bookdata)
  res.json(bookdata)
})

app.post('/createcart', async (req, res) => {
  const quantity = req.body.quantity;
  const idNum = await cart.countDocuments()
  const booklink = await book.findById(req.body.bookid)
  
  const bookuserlink = await bookuser.findById(loginedid)
  console.log(booklink)
  console.log(bookuserlink)
  /* console.log(bookuserlink) */
  console.log("carting")
  const { cookies } = req;
  console.log(cookies.sessionID)
  const newcart = new cart({
    cartid: `${idNum+1}`,
    bookid: req.body.bookid,
    bookname:booklink.BookName,
    Price: booklink.Price,
    userid: loginedid,
    username: bookuserlink.username,
    quantity: req.body.quantity,
  });
  console.log(newcart)
  newcart.save()
  .then(() => res.json('cart added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

app.get("/carts", async (req, res) => {
  const cartdata = await cart.find()
  /* console.log(bookdata) */
  res.json(cartdata)
})

app.delete("/cart/:id", async (req, res) => {
  cart.findByIdAndDelete(req.params.id)
    .then(() => res.json('cart deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete("/carts", async (req, res) => {
  cart.deleteMany()
    .then(() => res.json('carts deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

function validateCookie(req, res, next) {
  const { cookies } = req;
  console.log(req.sessionID)
  console.log(cookies)
  console.log("validateCookie")
  
  if ('sessionID' in cookies) {
      next()
      if (cookies.sessionID === req.sessionID) {
          console.log("validateCookie2                          ")
          next()
      }
  }
}


app.get('/signin', async (req, res) => {
  const { cookies } = req;
  /* console.log(req.session.authenticated) */
  /* const bookuser2 = await bookuser.findOne({ username: req.session.newbookuser.username })
  console.log(bookuser2) */
  res.json({ loggedIn: loggedin, bookuser1: loginedid })
})

app.delete('/logout', (req, res) => {
  req.session.destroy()
  loginedid = " "
  loggedin = false
  res.json({ message: "logout" })
})

app.post('/total', async (req,res) =>{
  totalprice = req.body.total
  console.log(req.body.total)
})

app.get('/total', async (req,res) =>{
  console.log(totalprice)
  res.json({ totalprice: totalprice })
})

app.get('/checkout', async (req,res) =>{
  res.json({ fullname: fullname, cName: cName, Address1: Address1, Address2: Address2, city: city,RSD: RSD, country: country, zipcode: zipcode, carts: carts, totalprice: totalprice})
})
app.post('/checkout', async (req,res) =>{
  /* const idNum = await checkout.countDocuments() */
  /* const newcheckout = new checkout({
    coid: `${idNum+1}`,
    fullname: req.body.fullname,
    cName: req.body.cName,
    Address1: req.body.Address1,
    Address2: req.body.Address2,
    city: req.body.city,
    RSD: req.body.RSD,
    country: req.body.country,
    zipcode: req.body.zipcode,
    carts: req.body.carts,
    totalprice: req.body.totalprice,
  }) */
  /* newcheckout.save().then(data =>{res.json({login: "True", reply: "login success"})}).catch(err =>{res.json({reply: err})}) */
  if (req.body.fullname){
    fullname = req.body.fullname
  }
  if (req.body.cName){
    cName =  req.body.cName
  }
  if (req.body.Address1){
    Address1 = req.body.Address1
  }
  if(req.body.Address2){
    Address2 =req.body.Address2
  }
  if (req.body.city){
    city = req.body.city
  }
  if(req.body.RSD){
    RSD = req.body.RSD
  }
  if (req.body.country){
    country = req.body.country
  }
  if (req.body.zipcode){
    zipcode =req.body.zipcode
  }
  if (req.body.carts){
    carts =req.body.carts
  }
  res.json({login: carts, reply: carts})
  

})
/* app.post('/login', async (req,res) =>{
  const bookuser = new bookuser({
    name: req.body.name,
    password: req.body.password,
  })
  const bookusertemp = await bookuser.findOne({name: req.body.name})
  console.log(bookusertemp)
  if (bookusertemp){
    res.json({login: "False", reply: "overlap"})
  } else {
    bookuser.save()
    .then(data =>{res.json({login: "True", reply: "login success"})})
    .catch(err =>{res.json({login: "False", reply: "catch err"})})
  }

}) */