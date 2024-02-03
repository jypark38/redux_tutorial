const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'All',
    colors: [],
  },
}

// ?? 왜 이렇게 하지
function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // 리듀서는 기본적으로 뭐가 일어났는지 알려주는 액션 타입을 본다
  switch (action.type) {
    // 액션 타입에 따라 뭔가를 한다
    // {type: 'todos/todoAdded', payload: todoText}
    case 'todos/todoAdded': {
      return {
        ...state,
        todos: [
          ...state.todos,
          // 스프레드 문법으로 이전 todo를 복사하고, 아래 새로운 todo를 추가한다.
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false,
          },
        ],
      }
    }
    // {type: 'todos/todoToggled', payload: todoId}
    case 'todos/todoToggled': {
      return {
        // 전체 상태 복사하기
        ...state,
        // 이전 투두 배열의 복사본을 만들기
        todos: state.todos.map((todo) => {
          // 만약 관심있는 항목이 아니면, 그대로 보낸다
          if (todo.id !== action.payload) {
            return todo
          }
          // 바꿔야하는 항목이면 복사본을 반환한다.
          return {
            ...todo,
            completed: !todo.completed,
          }
        }),
      }
    }
    //{type: 'filters/statusFilterChanged', payload: filterValue}
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        filters: {
          // 다른 필터 필드는 복사하고 status만 새 값으로 교체
          ...state.filters,
          status: action.payload,
        },
      }
    }
    default:
      // 만약 이 리듀서가 액션 타입을 인지하지 못하거나 구체적인 액션에 대해 다루지 않는다면 원래 상태를 변화없이 반환한다
      return state
  }
}
