import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './api/server'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

console.log('Initial state', store.getState())
// {todos: [], filters:{status, colors}}

// 상태가 바뀔때마다 로그 찍기
// 로그 찍는 리스너를 구독 시킨다.
// subscribe 함수는 항상 리스너를 해제하는 함수를 반환한다
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)

// {type: 'todos/todoAdded', payload: todoText}
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

// {type: 'todos/todoToggled', payload: todoId}
store.dispatch({ type: 'todos/todoToggled', payload: 0 })
store.dispatch({ type: 'todos/todoToggled', payload: 1 })

store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })

store.dispatch({
  type: 'filters/colorFilterChanged',
  payload: { color: 'red', changeType: 'added' },
})

// 상태 업데이트 리스너 해제하기
// unsubscribe()

// 추가 액션 디스패치 해보기
store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })
