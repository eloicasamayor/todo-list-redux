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
  const starFull = (
    <svg
      className="star full-star"
      viewBox="0 0 55.867 55.867"
      style={{ enableBackground: "0 0 55.867 55.867;" }}
    >
      <g>
        <path
          d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"
        />
      </g>
    </svg>
  );
  const starEmpty = (
    <svg
      version="1.1"
      viewBox="0 0 488.022 488.022"
      className="star empty-star"
    >
      <g>
        <path
          d="M471.563,173.778l-145.5-20.8l-64.4-132c-8-15.4-30-12.2-35.3,0l-64.4,132l-145.6,20.8c-16.4,1-21.6,20.9-10.4,33.2
		l105,102.9l-25,144.5c-2.9,17.8,16.7,27.8,28.1,20.8l129.9-68.6l129.9,67.6c13.6,7,29.8-2.8,28.1-19.7l-25-144.6l105-102.9
		C494.663,193.478,485.563,175.478,471.563,173.778z M342.663,288.078c-4.2,5.2-6.2,11.4-5.2,17.7l19.7,116.4l-103.9-55.1
		c-6.7-2.8-13-2.8-18.7,0l-103.9,55.1l19.7-116.4c1-7.3-1-13.5-5.2-17.7l-84.1-82.1l116.4-16.6c6.2-1,11.4-4.2,14.6-10.4l52-105
		l52,105c3.1,5.2,8.3,9.4,14.6,10.4l116.2,16.6L342.663,288.078z"
        />
      </g>
    </svg>
  );

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
