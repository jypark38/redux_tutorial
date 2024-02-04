import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {
  loggerMiddleWare,
  print1,
  print2,
  print3,
} from './exampleAddons/middleware'

const middlewareEnhancer = applyMiddleware(
  print1,
  print2,
  print3,
  loggerMiddleWare
)

const store = createStore(rootReducer, middlewareEnhancer)

export default store
