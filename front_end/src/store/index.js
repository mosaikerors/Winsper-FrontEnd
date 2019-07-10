import { combineReducers, createStore } from 'redux'
import user from "../reducers/user"
import hean from "../reducers/hean"

const reducer = combineReducers({
    user,
    hean
});

const store = createStore(reducer);

export default store;