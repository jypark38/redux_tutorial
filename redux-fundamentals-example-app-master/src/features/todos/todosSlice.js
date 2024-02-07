import { client } from '../../api/client'
import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // 액션 타입에 따라 뭔가를 한다
    // {type: 'todos/todoAdded', payload: todoText}
    case 'todos/todoAdded': {
      return [...state, action.payload]
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
    case 'todos/todosLoaded': {
      return action.payload
    }

    default:
      return state
  }
}

// Thunk function

export const todoLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

export const fetchTodos = () => async (dispatch) => {
  const response = await client.get('/fakeApi/todos')
  dispatch(todoLoaded(response.todos))
}

export const todoAdded = (todo) => ({
  type: 'todos/todoAdded',
  payload: todo,
})

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

// selectors

export const selectTodos = (state) => state.todos

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}

export const selectTodoIds = createSelector(
  // 첫 인자로 하나 이상의 Input selector 함수 전달
  selectTodos,
  // 그리고 모든 입력 결과를 인자로 받아 최종 결과를 반환하는 output selector
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: current status filter
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }
    const completedStatus = status === StatusFilters.Completed
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)
