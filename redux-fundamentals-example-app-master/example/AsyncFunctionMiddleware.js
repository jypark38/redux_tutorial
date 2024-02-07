import { createStore, applyMiddleware } from 'redux'
import { client } from '../src/api/client'
import rootReducer from '../src/reducers'

const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  return next(action)
}

// use middleware

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

// dispatch와 getState 인자를 받는 함수 작성
const fetchSomeData = (dispatch, getState) => {
  client.get('todos').then((todos) => {
    // 받은 todos랑 action 디스패치
    dispatch({ type: 'todos/todos/Loaded', payload: todos })
    // 디스패치 이후 업데이트된 스토어 상태 확인
    const allTodos = getState().todos
    console.log('Number of todos after loading: ', allTodos.length)
  })
}

// dispatch에 함수 넘기기
store.dispatch(fetchSomeData)
