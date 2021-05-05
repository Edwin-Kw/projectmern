import React, { Component, useEffect} from 'react'
import {Link }  from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


const Logout = () => {
    /* const handleSubmit = (e) =>{
        e.preventDefault();
        const bookuser = {
            username: e.target.username.value,
            password: e.target.password.value,
        }
        axios.post('http://localhost:5000/login',bookuser, {withCredentials:true}).then(res => {
        
            console.log(res.data.login)
            if(res.data.login){
                console.log("logined")
                console.log(res.cookies)
                window.alert(res.data.reply)
                window.location.href= '/'
            }else{
                window.alert(res.data.reply)
                e.target.password.value = ''

            }}).catch(err=>{console.log(err)})
        

    } */
    useEffect(async () => {
        axios.delete('http://localhost:5000/carts')
            .then(response => { console.log(response.data)});
        axios.delete('http://localhost:5000/logout')
          .then(res => {
            console.log("logout")
            setTimeout(function(){ window.location.href= '/' }, 3000);
          })
          .catch(err => {
            console.log(err)
          })
      }, [])

    return (
        <div className = "create-container">
            <h3>Logging Out</h3>
        </div>
    )
}


export default Logout