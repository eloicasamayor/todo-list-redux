import logo from "./logo.svg";
import "./App.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addTodo,
  deleteTodo,
  deleteAllTodos,
  toggleTodo,
} from "./redux/actions/todoActions";
import { useRef } from "react";

function App() {
  const todolist = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <div className="App">
      <h1>Todo list</h1>
      <div className="centered">
        <input
          autoFocus
          type="text"
          ref={inputRef}
          placeHolder="My new task"
        ></input>
        <button
          onClick={() => {
            if (inputRef.current.value !== "") {
              dispatch(addTodo(inputRef.current.value));
              inputRef.current.value = "";
              inputRef.current.focus();
            }
          }}
        >
          Add todo
        </button>
        <button onClick={() => dispatch(deleteAllTodos())}>Delete all</button>
      </div>

      <ul className="task-list">
        {todolist.map((t, i) => (
          <li className="task-li" key={i}>
            <label className={t.done ? "done-task" : "todo-task"}>
              {t.text}{" "}
              <input
                type="checkbox"
                value={t.done}
                onChange={() => dispatch(toggleTodo(i))}
              ></input>
            </label>

            <button
              className="delete-task-btn"
              value="delete"
              onClick={() => dispatch(deleteTodo(i))}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
