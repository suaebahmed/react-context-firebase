import React from 'react'
import { authReducer } from '../reducer/AuthReducer'

export const Auth = React.createContext()
const initialState = {
    user: {}
}

const AuthProvider = (props) =>{
    const [state,dispatch] = React.useReducer(authReducer,initialState)
    const value = {state,dispatch}

    return(
    <Auth.Provider value={value}>
        {props.children}
    </Auth.Provider> 
    )
}
export default AuthProvider;