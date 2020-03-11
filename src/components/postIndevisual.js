import React, { useContext ,useState } from 'react'
import firebase from '../configs/index'
import { Route, Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import { postsContext } from '../context/postContext'
import { Auth } from '../context/authContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, InputGroup, Input,
    Spinner
  } from 'reactstrap';
import { Fragment } from 'react'

function PostIndevisual(props) {
    // const {state,dispatch} = useContext(postsContext);
    const [stateFromServer, setStateFromServer] = useState('');
    const [isClick, setIsClick] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newFormData, setNewFormData] = useState({title: '',cover: '',content: ''})
    const [uid, setUid] = useState('')

    // var id = props.match.params.id;
    let { id } = useParams();

    useEffect(()=>{

        firebase.getPost(id).then(doc=>{
              setStateFromServer(doc)
        }).catch(err=>{
            console.log(err)
        });

       const uns = firebase.getUserState().then(user=>{
            setUid(user.uid)
            setIsAuthenticated(true);
        }).catch(err=>{
            setIsAuthenticated(false);
            console.log(err)
        })
    },[])
    

    const editHandle=()=>{
        setIsClick(!isClick)
    }
    const deleteHandle=()=>{
        firebase.deletePost(id,stateFromServer.fileRef).then(res=>{
            props.history.replace('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const saveHandle=()=>{
        firebase.UpdatePost(newFormData,id,stateFromServer.fileRef).then(res=>{
            console.log('success update')
            props.history.replace('/')
        }).catch(err=>{
            console.log(err);
        })
    }

    // ---------------        edit form   -----------
    let createForm;
    let btn;
    // if true ; user can delete the post..
    // isAuthenticated && stateFromServer.uid == uid
    if(isAuthenticated && stateFromServer.uid == uid){
        btn = (
            <Fragment>
                <Button color="primary" className="mr-3" onClick={editHandle}>edit</Button>
                <Button color="danger" onClick={deleteHandle}>delete</Button>
            </Fragment>
        )
    }
    const post =stateFromServer ? (
      <Card>
            <CardImg src={stateFromServer.cover} height="280px" width="300px"></CardImg>
        <CardBody>
            <CardTitle>{stateFromServer.title}</CardTitle>
            <CardText>{stateFromServer.content}</CardText>
            {btn}
        </CardBody>
      </Card>
    ):(<Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />)


    if(isClick){
        createForm = (
            <Form>
                <InputGroup>
                    <Input type="text" 
                    onChange={(e)=>{setNewFormData({...newFormData,title: e.target.value})}}
                      defaultValue={newFormData.title} className="my-2">
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input type="textarea" 
                    onChange={(e)=>{setNewFormData({...newFormData,content: e.target.value})}}
                    defaultValue={newFormData.content} className="my-3">
                    </Input>             
                </InputGroup>

                <InputGroup>
                    <Input type="file"
                    onChange={(e)=>{setNewFormData({...newFormData,cover: e.target.files[0]})}}>
                    </Input>
                </InputGroup>
                    <Button color="primary" onClick={saveHandle} className="my-3 mr-3">Save only auth</Button>
                    <Button color="warning" onClick={editHandle} className="my-3">cancel</Button>
            </Form>
        )
    }

    return (
        <div className="card mx-auto" style={{ width:"440px",height:"280px"}}>
            {post}
            {createForm}
        </div>
    )
}

export default PostIndevisual;
