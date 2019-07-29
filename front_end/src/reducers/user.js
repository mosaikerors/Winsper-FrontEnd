const defaultState = {
    token: '',
    uId: 0,
}

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
                console.log("P6")
            return {
                ...state,
                token: action.payload.token,
                uId: action.payload.uId,
            }
        default:
            return state;
    }
}

export default user;