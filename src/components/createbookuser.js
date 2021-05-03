import React, { Component } from 'react'
import axios from 'axios'


const createbookuser = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
        const bookuser = {
            username: e.target.username.value,
            password: e.target.password.value,
        }
        axios.post('http://localhost:5000/createbookuser',bookuser).then(res => {
        console.log(res.data.login)
        if(res.data.login === 'True'){
            window.location.href ='/'
            console.log(res.data.reply)
        } else {
            
            console.log(res.data.reply)
            window.location.href ='/'
        }
        }).catch(err=>{console.log(err)})
        

    }
    
    return (
        <div className = "create-container">
            <form className="createsform" onSubmit={handleSubmit}>
                <p>Create User </p>
                <p>Username: </p>
                <input type="text" name="username" required/>
                <p>Password: </p>
                <input type="text" name="password" required/>
                <button type="submit" >Create</button>
            </form>

        </div>
    )
}


export default createbookuser