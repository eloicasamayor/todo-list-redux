import logo from "./logo.svg";
import "./App.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addTodo,
  deleteTodo,
  deleteAllTodos,
  toggleTodo,
} from "./redux/actions/todoActions";
import { useRef, useState, useEffect } from "react";

function App() {
  const todolist = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(!(searchQuery === ""));
  }, [searchQuery]);

  return (
    <div className="App">
      <div className="centered">
        <h1>Todo list</h1>
        {todolist.length > 0 && (
          <button onClick={() => dispatch(deleteAllTodos())}>Delete all</button>
        )}
      </div>
      {todolist.length > 0 && (
        <div className={"centered search" + (searching && " searching")}>
          <input
            type="text"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
            placeHolder="Search a task"
          />
          {searching && (
            <button
              className="btn-clear-search"
              value="clear search"
              onClick={() => setSearchQuery("")}
            >
              <span>×</span>
            </button>
          )}
        </div>
      )}
      {!searching && (
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
            Add
          </button>
        </div>
      )}
      {todolist.length > 0 ? (
        <ul className="task-list">
          {todolist.map(
            (t, i) =>
              (!searching || t.text.includes(searchQuery)) && (
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
              )
          )}
        </ul>
      ) : (
        <div className="centered">No tasks yet!</div>
      )}

      {/*searching && (
        <ul>
          {todolist.map(
            (t, i) =>
              t.text.includes(searchQuery) && (
                <li>{t.text + " " + searchQuery}</li>
              )
          )}
        </ul>
              )*/}
    </div>
  );
}

export default App;
