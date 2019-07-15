const defaultState = {
    token: '',
    uId: 0,
    username: '',
    status: 0,  //1 means user, 2 means super-user, 100 means admin, corresponding negative number means being banned
    feather: 0,
    mutualFollow: 0,
    following: 0,
    followers: 0,
    hasChecked: false,
    avatar: '',
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
                feather: action.payload.feather,
                following: action.payload.following,
                followers: action.payload.followers,
                hasChecked: action.payload.hasChecked,
                avatar: action.payload.avatar
            }
        case 'CHECK':
            return {
                ...state,
                hasChecked: false,
                feather: action.payload.newFeather
            }
        case 'UPDATE_INFO':
            return {
                ...state,
                username: action.payload.newUsername,
            }
        default:
            return state;
    }
}

export default user;