import client from '../src/api/client'

const delayedActionMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      // 액션에 1초 딜레이 넣기
      next(action)
    }, 1000)
    return
  }

  return next(action)
}

const fetchTodosMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'todos/fetchTodos') {
    // 서버로부터 todos를 요청하는 API 호출을 만듬
    client.get('todos').then((todos) => {
      // 받은 todos랑 action을 dispatch
      storeAPI.dispatch({ type: 'todos/todosLoaded', payload: todos })
    })
  }

  return next(action)
}
