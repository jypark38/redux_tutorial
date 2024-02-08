import { client } from '../../api/client'
import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = {
  status: 'idle',
  entities: {},
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // 액션 타입에 따라 뭔가를 한다
    // {type: 'todos/todoAdded', payload: todoText}
    case 'todos/todoAdded': {
      const todo = action.payload
      return {
        ...state,
        entities: { ...state.entities, [todo.id]: todo },
      }
    }
    // {type: 'todos/todoToggled', payload: todoId}
    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }
    // {type: 'todos/colorSelected', payload: {todoId, color}}
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      }
    }
    // {type: 'todos/todoDeleted', payload: todoId}
    case 'todos/todoDeleted': {
      const todoId = action.payload
      const newEntities = { ...state.entities }
      delete newEntities[todoId]
      return {
        ...state,
        entities: newEntities,
      }
    }
    // {type: 'todos/allCompleted'}
    case 'todos/allCompleted': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach((todo) => {
        newEntities[todo.id] = {
          ...todo,
          completed: true,
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    // {type: 'todos/completedCleared'}
    case 'todos/completedCleared': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach((todo) => {
        if (todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities,
      }
    }
    default:
      return state
  }
}
// action creator
export const todoAdded = (todo) => ({
  type: 'todos/todoAdded',
  payload: todo,
})
export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId,
})
export const colorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: {
    todoId,
    color,
  },
})
export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId,
})
export const allCompleted = () => ({
  type: 'todos/allCompleted',
})
export const completedCleared = () => ({
  type: 'todos/completedCleared',
})
export const todosLoading = () => ({ type: 'todos/todosLoading' })

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

// Thunk function
export const fetchTodos = () => async (dispatch) => {
  dispatch(todosLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

// selectors

const selectTodoEntities = (state) => state.todos.entities

export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
)

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId]
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
