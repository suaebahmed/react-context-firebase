import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { useState } from 'react'
import firebase from '../configs/index'
import { Auth } from '../context/authContext'
import { useContext , useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'


function Nav(props) {

    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("")
    const {state,dispatch} = useContext(Auth)

    useEffect(() => {
        firebase.getUserState().then(user=>{
            if(user){
                setUserState(user)
                setUserEmail(user.email)
            }
            console.log("hey")
        })
    })

    const logout =()=>{
        firebase.logout();
        setUserState(null);
        //----------- get router property  withRouter() --------
        
        props.history.replace('/login')
        return dispatch({
            type: "LOGOUT",
            payload: {}
        })
    }

    let buttons;
    if(userState != null || state.user.hasOwnProperty('user')){
        buttons = (<React.Fragment>
                     <li>{userEmail}</li> 
                     <li><button className="logout" onClick={logout}>LogOut</button></li>
                  </React.Fragment>)
    }else{
        buttons = (<React.Fragment>
                <li><Link to="/register">register</Link></li>
                <li><Link to="/login">login</Link></li>
         </React.Fragment>)
    }

    return (
        <nav>
            <ul>
                <li><Link to="/"> ReactContextHooksFirebase </Link></li>
            </ul>
            <ul>
                <li><Link to="/create">new post</Link></li>
                {buttons}
            </ul>
        </nav>    
    )
}


export default withRouter(Nav)
