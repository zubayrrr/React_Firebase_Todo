import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "./firebase_config";

export default function TodoListItem({ todo, isComplete, id }) {
  const toggleProgress = () => {
    db.collection("todosServer").doc(id).update({
      isCompleteFirebase: !isComplete,
    });
  };
  const deleteTodo = () => {
    db.collection("todosServer").doc(id).delete();
  };

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={isComplete ? "Completed" : "In Progress"}
        />
      </ListItem>

      <Button onClick={toggleProgress}>{isComplete ? "Undone" : "Done"}</Button>
      <Button onClick={deleteTodo}>❌</Button>
    </div>
  );
}
