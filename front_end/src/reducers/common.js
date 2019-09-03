const defaultState = {
    needsAutoLogin: true,
}

const common = (state = defaultState, action) => {
    switch (action.type) {
        case 'AUTO_LOGIN':
            return {
                ...state,
                needsAutoLogin: false
            }
        default:
            return state;
    }
}

export default common;