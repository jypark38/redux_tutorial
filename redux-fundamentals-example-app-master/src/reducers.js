import { combineReducers } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

// export default function rootReducer(state = {}, action) {
//   // 루트 상태에 대해 항상 새로운 객체 반환
//   return {
//     // state.todos의 값은 todos reducer가 반환
//     todos: todosReducer(state.todos, action),
//     // 두 리듀서 모두 자신의 상태 슬라이스만 전달
//     filters: filtersReducer(state.filters, action),
//   }
// }

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
