import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Main from './components/Main'
import Create from './components/create'
import Register from './components/register'
import Login from './components/login'
import PostIndevisual from './components/postIndevisual'

const Routes =()=> {

    return (
        <Switch>
            <Route exact path='/' component={Main}></Route>
            <Route path='/create' component={Create}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/post/:id' component={PostIndevisual}></Route>
        </Switch>
    )
}

export default Routes
