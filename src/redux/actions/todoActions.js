export function addTodo(todo) {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
}
export function deleteTodo(index) {
  return {
    type: "DELETE_TODO",
    payload: index,
  };
}
export function deleteAllTodos(index) {
  return {
    type: "DELETE_ALL_TODOS",
  };
}
