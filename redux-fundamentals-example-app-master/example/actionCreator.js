const todoAdded = (text) => {
  return {
    type: 'todos/todoAdded',
    payload: text,
  }
}

store.dispatch(todoAdded('Buy milk'))

console.log(store.getState().todos)
// [ {id: 0, text: 'Buy milk', completed: false}]
