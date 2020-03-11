import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { useState } from 'react'
import firebase from '../configs/index'
import { Auth } from '../context/authContext'
import { useContext , useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'

function Create(props) {
    const [isBusy, setIsBusy] = useState(false);
    const [post,setPost] = useState({title: '',content: '',cover: '', uid: ''}) // this uid

    useEffect(()=>{
        firebase.isAuthenticated().then(user=>{
            if(!user){
                props.history.push('/login');
            }
        }).catch(err=>{
            console.log(err)
        })
    })


    const submitPost=(e)=>{
        e.preventDefault();
        setIsBusy(true);
        // console.log(post)
        // setPost({...post,uid: uid}) // not assign value before firebase.Create function call..
        // console.log(uid)
        firebase.CreatePost(post).then(res=>{
            console.log('successfull')
            setIsBusy(false);
        }).catch(err=>{
            console.log(err)
            setIsBusy(false);
        })
    }

    let createForm;
    if(isBusy){
        createForm =(
            <React.Fragment>
                <h2>Request is being processed</h2>
                <p>Loading...</p>
            </React.Fragment>
        )
    }else{
        createForm =(
            <React.Fragment>
            <form action="/" onSubmit={submitPost}>
                <label htmlFor="title">Post Title: </label>
                <input type="text" id="title" onChange={(e)=>{setPost({...post,title: e.target.value})}}
                 placeholder="Enter post title: " />

                <label htmlFor="content">Post Content: </label>
                <input type="text" id="content" onChange={(e)=>{setPost({...post,content: e.target.value})}}
                 placeholder="Enter post Content: " />

                <label htmlFor="file">Post File: </label>
                <input type="file" id="file" onChange={(e)=>{setPost({...post,cover: e.target.files[0]})}}
                 placeholder="Enter post title: " />

                <input type="submit" value="Create post"/>
            </form>
            </React.Fragment>
        )
    }


    return (
        <div>
            {createForm}
        </div>
    )
}

export default Create
