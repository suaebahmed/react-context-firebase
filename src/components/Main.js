import React, { useContext } from 'react'
import firebase from '../configs/index'
import { Route, Redirect } from 'react-router-dom'
import { postsContext } from '../context/postContext'
import { Auth } from '../context/authContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

function Main(props) {

    const {state,dispatch} = useContext(postsContext);
    const getPosts = () =>{
        const postsArr = firebase.getPosts()
        .then(arr=>{
            dispatch({
                type: 'FETCH_DATA',
                payload: arr
            })
        })
        .catch(err=>{
          console.log(err);
          return err;  
        })
    }

    useEffect(()=>{
        getPosts()
    },[])
    console.log(state)


    if(state.posts){
        if(state.posts.length <= 0){
            return (
                <p>
                    posts are empty...
                </p>
            )
        }
    }

    var postsAr = state.posts?(state.posts.map(doc=>{
        return(
        <Card key={doc.id}>
            <CardImg top width="100%" src={doc.data.cover} width="300px" height="180px" alt="Card image cap" />
            <CardBody>
              <CardTitle>{doc.data.title}</CardTitle>
              <Button>
                  <Link to={'/post/'+doc.id}>view</Link>
              </Button>
            </CardBody>
          </Card>
        )
    })):(<p>loading...</p>)

    return (
        <div>
            {/* {props.children} */}
            {postsAr}
        </div>
    )
}

export default Main;
