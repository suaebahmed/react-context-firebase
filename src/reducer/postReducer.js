
export const reducerPost = (state , { type, payload }) => {
    switch (type) {
    case 'FETCH_DATA':
        return {
            ...state,
            posts: payload
        }
    case 'ADD':
        return{
            ...state,
            user: payload
        }
    case 'REMOVE':
        return{
            ...state,
            user: payload
        }
    default:
        return state
    }
}