import React, { Component } from 'react'
import axios from 'axios'
import {Link }  from 'react-router-dom'

const createbookuser = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
        const bookuser = {
            username: e.target.username.value,
            password: e.target.password.value,
        }
        axios.post('http://localhost:5000/createbookuser',bookuser , {withCredentials:true}).then(res => {
        console.log(res.data.login)
        if(res.data.login ==true){
            window.location.href ='/'
            console.log(res.data.reply)
            window.alert(res.data.reply)
        } else {
            window.alert(res.data.reply)
            console.log(res.data.reply)
            /* window.location.href ='/' */
        }
        }).catch(err=>{console.log(err)})
        

    }
    
    return (
        <div className = "create-container">
            <form className="createsform" onSubmit={handleSubmit}>
                <p>Create User </p>
                <p>Username: </p>
                <input type="text" placeholder="Desired Username" name="username" required/>
                <p>Password: </p>
                <input type="text" placeholder="Desired Password" name="password" required/>
                <button type="submit" >Create</button>
                <Link to ='/'>
                <button className="btn" >Back</button>
                </Link>
            </form>
            
        </div>
    )
}


export default createbookuser