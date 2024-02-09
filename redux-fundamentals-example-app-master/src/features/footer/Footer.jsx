import React from 'react'

import { useDispatch } from 'react-redux'
import { allTodosCompleted, completedCleared } from '../todos/todosSlice'
import RemainingTodos from './components/RemainingTodos'
import StatusFilter from './components/StatusFilter'
import ColorFilters from './components/ColorFilters'

const Footer = () => {
  const dispatch = useDispatch()
  const onMarkCompletedClicked = () => dispatch(allTodosCompleted())
  const onClearCompletedClicked = () => dispatch(completedCleared())

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos />
      <StatusFilter />
      <ColorFilters />
    </footer>
  )
}

export default Footer
