import { useEffect, useState } from "react";
import "./todo.css";
const API_BASE = "http://localhost:8080";

function App() {
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState("");
  //==========================
  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };
  //===============================================

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };
  //=============================================================
  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    setTodos([...todos, data]);

    //setPopupActive(false);
    setNewTodo("");
  };
  //=================================
  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  // ===================================

  // ========================================
  // ================================
  const monthNum = new Date().getMonth() + 1;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = [months[monthNum]];

  //=================
  return (
    <div className="App">
      <p id="header">Monthly grocery planning app</p>

      <p id="intro">Plan for the month of {monthName}</p>
      <div className="container">
        <div className="todos">
          <input
            id="input"
            type="text"
            placeholder="Add Shopping Item"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addTodo();
              }
            }}
          />
        </div>
        {todos.map((todo) => (
          <div
            className={"todo" + (todo.complete ? " is-complete" : "")}
            key={todo._id}
            //onClick={() => completeTodo(todo._id)}
          >
            <div className="todo">
              <div className="text">{todo.text}</div>
              <button
                className="checkbox"
                onClick={() => completeTodo(todo._id)}
              >
                purchase
              </button>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
