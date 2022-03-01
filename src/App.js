import logo from "./logo.svg";
import "./App.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addTodo,
  deleteTodo,
  deleteAllTodos,
} from "./redux/actions/todoActions";
import { useRef } from "react";

function App() {
  const todolist = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <div className="App">
      <h1>Todo list</h1>
      <input type="text" ref={inputRef}></input>
      <button
        autoFocus
        onClick={() => {
          dispatch(addTodo(inputRef.current.value));
          inputRef.current.value = "";
          inputRef.current.focus();
        }}
      >
        Add todo
      </button>
      <button onClick={() => dispatch(deleteAllTodos())}>
        Delete all todos
      </button>
      {todolist.map((t, i) => (
        <div key={i}>
          {t} <button onClick={() => dispatch(deleteTodo(i))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
