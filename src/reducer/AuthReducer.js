
export const authReducer = (state , { type, payload }) => {
    switch (type) {
    case 'SIGNIN':
        return{
            ...state,
            user: payload
        }
    case 'LOGOUT':
        return{
            ...state,
            user: payload
        }
    case 'LOGIN':
        return {
            ...state,
            user: payload
        }
    default:
        return state
    }
}