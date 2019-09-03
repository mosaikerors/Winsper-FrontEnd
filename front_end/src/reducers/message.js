const defaultState = {
    hasNewMessage: false,
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
        default:
            return state;
    }
}

export default message;