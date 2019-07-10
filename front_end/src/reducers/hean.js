const defaultState = {
    heans:[]
}

const hean = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_ALL_HEANS':
            //console.log(action.payload.heanArray)
            //console.log(action.payload.heanArray)
            console.log(action.payload)
            return {
                ...state,
                heans: action.payload
            }
        default:
            return state;
    }
}

export default hean;