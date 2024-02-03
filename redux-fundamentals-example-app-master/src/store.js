import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store

/* storeStatePersistenceExample
import { createStore } from 'redux'
import rootReducer from './reducer'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString)
  }
}

const store = createStore(rootReducer, preloadedState)
*/
