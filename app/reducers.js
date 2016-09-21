import { combineReducers } from 'redux'
import todos from './reducer/todos'
import visibilityFilter from './reducer/visibilityFilter'

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp;