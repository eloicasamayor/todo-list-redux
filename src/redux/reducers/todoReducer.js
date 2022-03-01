const todoReducer = (state = [], action) => {
  let copy = [...state];
  switch (action.type) {
    case "ADD_TODO":
      copy.push(action.payload);
      return copy;
    case "DELETE_TODO":
      copy.splice(action.payload, 1);
      return copy;
    case "DELETE_ALL_TODOS":
      return [];
    default:
      return state;
  }
};

export default todoReducer;
