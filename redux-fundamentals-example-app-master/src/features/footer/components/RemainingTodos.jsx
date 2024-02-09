import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodos } from '../../todos/todosSlice'

const RemainingTodos = () => {
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    )
    return uncompletedTodos.length
  })

  const suffix = todosRemaining === 1 ? '' : 's'
  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{todosRemaining}</strong> item{suffix} left
    </div>
  )
}

export default RemainingTodos
