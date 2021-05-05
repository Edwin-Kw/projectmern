import React, { Component } from 'react'
import {Link }  from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


const loginbookuser = () => {
    const handleSubmit = (e) =>{
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
        

    }
    
    return (
        <div className = "create-container">
            <form className="createsform" onSubmit={handleSubmit}>
                <p>Login in </p>
                <p>Username: </p>
                <input type="text" name="username" required/>
                <p>Password: </p>
                <input type="text" name="password" required/>
                <button type="submit" >Submit</button>
                <Link to ='/createbookuser'>
                    <button className="btn" >Create</button>
                </Link>
            </form>

        </div>
    )
}


export default loginbookuser