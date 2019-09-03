const defaultState = {
    hasNewMessage: false,
    needsAutoLogin: true,
}

const message = (state = defaultState, action) => {
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                hasNewMessage: true
            }
        case 'READ_MESSAGE':
            return { 
                ...state,
                hasNewMessage: false
            }
        case 'AUTO_LOGIN':
            return {
                ...state,
                needsAutoLogin: false
            }
        default:
            return state;
    }
}

export default message;