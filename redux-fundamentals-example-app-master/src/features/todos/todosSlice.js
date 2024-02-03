const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // 액션 타입에 따라 뭔가를 한다
    // {type: 'todos/todoAdded', payload: todoText}
    case 'todos/todoAdded': {
      return [
        ...state,
        // 스프레드 문법으로 이전 todo를 복사하고, 아래 새로운 todo를 추가한다.
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ]
    }
    // {type: 'todos/todoToggled', payload: todoId}
    case 'todos/todoToggled': {
      return state.map((todo) => {
        // 만약 관심있는 항목이 아니면, 그대로 보낸다
        if (todo.id !== action.payload) {
          return todo
        }
        // 바꿔야하는 항목이면 복사본을 반환한다.
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    // {type: 'todos/colorSelected', payload: {todoId, color}}
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }
        return {
          ...todo,
          color,
        }
      })
    }
    // {type: 'todos/todoDeleted', payload: todoId}
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    // {type: 'todos/allCompleted'}
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    // {type: 'todos/completedCleared'}
    case 'todos/completedCleared': {
      // return state.filter((todo) => todo.completed === false)
      return state.filter((todo) => !todo.completed)
    }
    default:
      return state
  }
}
