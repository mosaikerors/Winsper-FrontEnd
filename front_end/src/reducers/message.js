const defaultState = {
    type: 0,
    senderUsername: null,
    hId: null,
    text: null
}

const message = (state = defaultState, action) => {
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                type: action.payload.type,
                senderUsername: action.payload.senderUsername,
                hId: action.payload.hId,
                text: action.payload.text
            }
        default:
            return state;
    }
}

export default message;