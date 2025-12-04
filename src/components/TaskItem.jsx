import React, { memo } from "react";
import { useTasks } from "../context/TaskContext";

function TaskItem({ task, innerRef, draggableProps, dragHandleProps }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <li
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      <label>
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => toggleTask(task.id)}
        />
        <span>{task.text}</span>
      </label>

      <button onClick={() => deleteTask(task.id)} className="delete-btn">
        ✕
      </button>
    </li>
  );
}

export default memo(TaskItem);
