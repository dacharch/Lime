import React, { useState, useCallback } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmed = text.trim();

      if (!trimmed) {
        setError("Task cannot be empty");
        return;
      }

      addTask(trimmed);
      setText("");
      setError("");
    },
    [text, addTask]
  );

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError(""); // always clear error when typing
        }}
        placeholder="Add a new task..."
      />

      <button type="submit">Add</button>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
