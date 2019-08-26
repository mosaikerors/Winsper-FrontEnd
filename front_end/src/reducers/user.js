const defaultState = {
    token: '',
    uId: 0,
}

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                token: action.payload.token,
                uId: action.payload.uId,
            }
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.payload.token,
            }
        default:
            return state;
    }
}

export default user;