import "./App.css";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./Todo";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    db.collection("todosServer").onSnapshot((snapshot) => {
      setAllTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todoFirebase,
          isComplete: doc.data().isCompleteFirebase,
        }))
      );
    });
  }, []); // blank to run only on first launch

  function addTodo(e) {
    e.preventDefault();

    if (todoInput) {
      db.collection("todosServer").add({
        isCompleteFirebase: false,
        timestampFirebase: firebase.firestore.FieldValue.serverTimestamp(),
        todoFirebase: todoInput,
      });
    } else {
      return;
    }
    setTodoInput("");
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Firebase Todo App 🚀</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="✅ Write a Todo"
          value={todoInput}
          color="secondary"
          variant="outlined"
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button
          disabled={!todoInput}
          type="submit"
          variant="outlined"
          onClick={addTodo}
          color="secondary"
          style={{ margin: "30px" }}
        >
          Add
        </Button>
      </form>

      <div>
        {allTodos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            isComplete={todo.isComplete}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
