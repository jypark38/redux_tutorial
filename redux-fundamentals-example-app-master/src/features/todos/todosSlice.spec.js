import todosReducer from './todosSlice'

test('Toggles a todo based on id', () => {
  const initialState = [{ id: 0, text: 'Test text', completed: false }]

  const action = { type: 'todos/todoToggled', payload: 0 }
  const result = todosReducer(initialState, action)
  expect(result[0].completed).toBe(true)
})

test('Toggles a todo based on id', () => {
  const initialState = [{ id: 0, text: 'Test text', completed: false }]

  const action = { type: 'todos/todoAdded', payload: 'add test' }
  const result = todosReducer(initialState, action)
  expect(result).toEqual([
    { id: 0, text: 'Test text', completed: false },
    { id: 1, text: 'add test', completed: false },
  ])
})

// yarn test로 실행
