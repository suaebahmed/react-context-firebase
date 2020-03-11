import React from 'react'
import firebase from './configs/index'
import { Route, Redirect } from 'react-router-dom'


function ProtectedRoute({ children, ...rest }) {
    return (
        <Route
        {...rest}
        render={({ location }) =>

        firebase.getUserState(function(user){
            if(user){
                children;
            }
            else{
                <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
                />
            }
        })


        }
        />
    );
}


export default ProtectedRoute
