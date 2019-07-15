import { combineReducers, createStore } from 'redux'
import user from "../reducers/user"
import hean from "../reducers/hean"
import common from "../reducers/common"

const reducer = combineReducers({
    common,
    user,
    hean
});

const store = createStore(reducer);

export default store;