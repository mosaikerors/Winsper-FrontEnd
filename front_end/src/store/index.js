import { combineReducers } from 'redux'
import todos from '../reducers/todos'
import visibilityFilter from '../reducers/visibilityFilter'
import { createStore } from 'redux'

const rootReducer = combineReducers({
    todos,
    visibilityFilter
});

export default createStore(rootReducer);