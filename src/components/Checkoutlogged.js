import React, { Component , useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Checkoutlogged = () => {

    const [carts, setCarts] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(async () => {
        axios.get('http://localhost:5000/carts')
          .then(res => {

            setCarts(res.data)
            console.log("cartscarts")
            console.log(carts)
          })
          .catch(err => {
            console.log(err)
          })
        axios.get('http://localhost:5000/total')
          .then(res => {
            setTotal(res.data.totalprice)
            console.log(res.data.totalprice)
          })
          .catch(err => {
            console.log(err)
          })
    
      }, [])
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const checkout = {
            fullname: e.target.fullname.value,
            cName: e.target.cname.value,
            Address1: e.target.al1.value,
            Address2: e.target.al2.value,
            city: e.target.city.value,
            RSD: e.target.rsd.value,
            country: e.target.country.value,
            zipcode: e.target.zipcode.value,
            carts: carts,
            totalprice: 100,
        }
        axios.post('http://localhost:5000/checkout',checkout , {withCredentials:true}).then(res => {
        if(res.data.login === 'True'){
            window.location.href ='/invoice' 
            console.log(res.data)
        } else {
            
            console.log(res.data)
            window.location.href ='/invoice' 
        }
        }).catch(err=>{console.log(err)})
        

    }

    
    
    return (
        <div className = "create-container">
            <form className="createsform" onSubmit={handleSubmit}>
                <p>Logged User </p>
                <h2>Delivery Address:</h2>
                <p>Full Name: </p>
                <input type="text" name="fullname" required/>
                <p>Company Name: </p>
                <input type="text" name="cname" />
                <p>Address Line 1: </p>
                <input type="text" name="al1" required/>
                <p>Address Line 2: </p>
                <input type="text" name="al2" />
                <p>City: </p>
                <input type="text" name="city" required/>
                <p>Region/State/District: </p>
                <input type="text" name="rsd" />
                <p>Country: </p>
                <input type="text" name="country" required/>
                <p>Postcode Zip Code: </p>
                <input type="text" name="zipcode" required/>
                <p> Your order: </p> 
                <Link to={"/cartlist"}>change</Link>
                <h3> Free Standing Shipping</h3>
                {carts.map((cart)=>(
                    <div>
                        <p>{cart.quantity} x {cart.bookname} HK${cart.Price}</p>
                        {/* <p>Total Price: HK${parseInt(cart.Price) *parseInt( cart.quantity)}</p> */}
                    </div>
                ))} 

                <p>Total Price: HK${total}</p> 
                





                <button type="submit" >Confirm</button>
            </form>

        </div>
    )
}


export default Checkoutlogged