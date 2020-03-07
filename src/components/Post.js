import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { useState } from 'react'
import firebase from '../configs/index'
import { Auth } from '../context/authContext'
import { useContext , useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'

function Post() {
    return (
        <div className="container">
            <h1>hello post</h1>
        </div>
    )
}

export default Post
