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
export function toggleTodo(index) {
  return {
    type: "TOGGLE_TODO",
    payload: index,
  };
}
export function favTodo(index) {
  return {
    type: "FAV_TODO",
    payload: index,
  };
}
export function deleteAllTodos(index) {
  return {
    type: "DELETE_ALL_TODOS",
  };
}
