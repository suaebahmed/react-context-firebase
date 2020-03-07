import React, { Component, useState } from 'react'
import firebase from '../configs/index'
import { Auth } from '../context/authContext'
import { useContext } from 'react'

const Register=()=>{

    const [user, setUser] = useState({email:'',password: ''})
    const {state,dispatch} = useContext(Auth)

    const submitHandle = async (e)=>{
        e.preventDefault();
        const res  = await firebase.CreateUser(user.email,user.password);
        if(res.hasOwnProperty('message')){
            console.log(res.message)
        }else{
            return dispatch({
                type: 'SIGNIN',
                payload: res
            });
        }
    }
    return (
        <React.Fragment>
            <h1>i am register page</h1>
            <form action="/">
                <input onChange={(e)=>{setUser({...user,email: e.target.value})}} type="text" placeholder="Enter user email: "/>
                <input onChange={(e)=>{setUser({...user,password: e.target.value})}} type="text" placeholder="Enter user password: "/>
                <input type="submit" value="register" onClick={submitHandle}/>
            </form>
        </React.Fragment>
    )
}

export default Register;