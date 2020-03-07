import React, { useReducer } from 'react'
import { createContext } from 'react'
import { reducerPost } from '../reducer/postReducer'

export const postsContext = createContext();


const initialState = {
    posts: null
}

function PostContextProvider(props) {
    const [state, dispatch] = useReducer(reducerPost, initialState);

    return (
        <postsContext.Provider value={{state,dispatch}}>
            {props.children}
        </postsContext.Provider>
    )
}

export default PostContextProvider;