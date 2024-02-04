import { createStore, compose } from 'redux'
import {
  sayHiOnDispatch,
  includeMeaningOfLife,
} from './exampleAddons/enhancers'
import rootReducer from './reducers'

const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)

const store = createStore(rootReducer, undefined, composedEnhancer)

export default store
