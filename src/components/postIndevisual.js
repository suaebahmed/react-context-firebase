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

function PostIndevisual(props) {
    const {state,dispatch} = useContext(postsContext);
    var id = props.match.params.id;
    // console.log(props)
    var item = state.posts ?(state.posts.filter(post=>(post.id === id))) : ''
    var post = item?(item.map(doc=>{
        return(
        <Card key={doc.id}>
            <CardImg top width="100%" src={doc.data.cover} width="300px" height="180px" alt="Card image cap" />
            <CardBody>
              <CardTitle>{doc.data.title}</CardTitle>
              <CardText>{doc.data.content }</CardText>
              <Button>delete</Button>
            </CardBody>
          </Card>
        )
    })):(<p>loading...</p>)
//  get the post from server..
    var xx;
    firebase.getPost(id).then(doc=>{
    xx = (
     <Card key={doc.id}>
     <CardImg top width="100%" src={doc.cover} width="300px" height="180px" alt="Card image cap" />
     <CardBody>
       <CardTitle>{doc.title}</CardTitle>
       <CardText>{doc.content }</CardText>
       <Button>delete</Button>
     </CardBody>
   </Card>)

    }).catch(err=>{
        console.log(err)
    })
        console.log(xx)
    return (
        <div>
            {post}
            {xx}
        </div>
    )
}

export default PostIndevisual
