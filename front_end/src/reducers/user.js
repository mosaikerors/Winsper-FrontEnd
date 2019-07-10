const defaultState = {
    token: '',
    uId: 0,
    username: '',
    status: 0,  //1 means user, 2 means super-user, 100 means admin, corresponding negative number means being banned
}

const user = (state = defaultState, action) => {
    //if (!action.hasOwnProperty("type"))
      //  return state;
    switch (action.type) {
        case 'SIGN_IN':
            console.log(action.payload.uId)
            return {
                ...state,
                token: action.payload.token,
                uId: action.payload.uId,
                username: action.payload.username,
                status: action.payload.status,
            }
        default:
            return state;
    }
}

export default user;