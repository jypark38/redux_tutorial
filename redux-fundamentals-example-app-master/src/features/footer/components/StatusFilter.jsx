import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusFilterChanged, StatusFilters } from '../../filters/filtersSlice'

const StatusFilter = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.filters)

  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => dispatch(statusFilterChanged(value))
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

export default StatusFilter
