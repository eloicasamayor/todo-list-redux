import { act } from "react-dom/test-utils";

const todoReducer = (state = [], action) => {
  let copy = [...state];
  switch (action.type) {
    case "ADD_TODO":
      copy.push({ text: action.payload, done: false, fav: false });
      return copy;
    case "DELETE_TODO":
      copy.splice(action.payload, 1);
      return copy;
    case "TOGGLE_TODO":
      copy[action.payload].done = !copy[action.payload].done;
      return copy;
    case "FAV_TODO":
      copy[action.payload].fav = !copy[action.payload].fav;
      return copy;
    case "DELETE_ALL_TODOS":
      return [];
    default:
      return state;
  }
};

export default todoReducer;
