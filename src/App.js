import logo from "./logo.svg";
import "./App.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addTodo,
  deleteTodo,
  deleteAllTodos,
  toggleTodo,
  favTodo,
} from "./redux/actions/todoActions";
import { useState, useEffect } from "react";

function App() {
  const todolist = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [newTodoString, setNewTodoString] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(!(searchQuery === ""));
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodoString !== "") {
      dispatch(addTodo(newTodoString));
      setNewTodoString("");
    }
  };

  return (
    <div className="App">
      <div className="centered">
        <h1>Todo list</h1>
        {todolist.length > 0 && (
          <button
            className="btn-delete-all"
            onClick={() => dispatch(deleteAllTodos())}
          >
            Delete all
          </button>
        )}
      </div>
      {todolist.length > 0 && (
        <div className={"centered search " + (searching && "searching")}>
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
          <form className="new-todo-form" onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              onChange={(event) => setNewTodoString(event.target.value)}
              value={newTodoString}
              placeholder="My new task"
            ></input>
            {newTodoString !== "" && (
              <input
                type="submit"
                className="btn-add-todo"
                value="Add"
                onSubmit={() => handleSubmit()}
              ></input>
            )}
          </form>
        </div>
      )}
      {todolist.length > 0 ? (
        <ul className="task-list">
          {todolist.map(
            (t, i) =>
              (!searching || t.text.includes(searchQuery)) && (
                <li className="task-li" key={i}>
                  <input
                    className="fav-todo-checkbox"
                    type="checkbox"
                    title="mark as priority task"
                    value={t.fav}
                    onChange={() => dispatch(favTodo(i))}
                  ></input>
                  <label className={t.done ? "done-task" : "todo-task"}>
                    {t.text}
                  </label>
                  <input
                    className="toggle-todo-checkbox"
                    type="checkbox"
                    value={t.done}
                    onChange={() => dispatch(toggleTodo(i))}
                  ></input>

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
    </div>
  );
}

export default App;
