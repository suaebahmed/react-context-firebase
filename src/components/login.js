import React, { Component, useState } from 'react'
import firebase from '../configs/index'
import { Auth } from '../context/authContext'
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

const Login =()=> {

    const [user, setUser] = useState({email:'',password: ''})
    const [routeRedirect, setRouteRedirect] = useState(false)
    const {state,dispatch} = useContext(Auth)

    const submitHandle = async (e)=>{
        e.preventDefault();
        let res  = await firebase.login(user.email, user.password);
        if(res.hasOwnProperty('message')){
            console.log(res.message)
        }else{
            setUser({email:'',password: ''});
            setRouteRedirect(true)
            return dispatch({
                type: 'SIGNIN',
                payload: res.user
            });
        }
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/'/>
    }

    return (
        <React.Fragment>
            <h1>i am login page</h1>
            <form action="/" onSubmit={submitHandle}>
                <input onChange={(e)=>{setUser({...user,email: e.target.value})}} type="text" placeholder="Enter user email: "/>
                <input onChange={(e)=>{setUser({...user,password: e.target.value})}} type="text" placeholder="Enter user password: "/>
                <input type="submit" value="login"/>
            </form>
        </React.Fragment>
    )
}

export default Login
