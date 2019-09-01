const defaultState = {
    token: '',
    uId: 0,
    privacy: [true, true, true, true, true, true, true],
    username: null
}

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                token: action.payload.token,
                uId: action.payload.uId,
                username: action.payload.username
            }
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.payload.token,
            }
        case 'UPDATE_PRIVACY':
            return { 
                ...state,
                privacy: action.payload.privacy,
            }
        default:
            return state;
    }
}

export default user;