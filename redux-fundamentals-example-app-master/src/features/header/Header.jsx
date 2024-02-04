import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => setText(event.target.value)

  const handleKeyUp = (event) => {
    const trimmedText = event.target.value.trim()

    if (event.key === 'Enter' && trimmedText) {
      console.log(event.key)
      console.log(trimmedText)
      const action = {
        type: 'todos/todoAdded',
        payload: trimmedText,
      }
      dispatch(action)
      setText('')
    }
  }

  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  )
}

export default Header
