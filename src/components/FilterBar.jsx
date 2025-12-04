import React, { useCallback } from "react";
import { useTasks } from "../context/TaskContext";

export default function FilterBar() {
  const { filter, setFilter } = useTasks();

  const handleClick = useCallback(
    (value) => () => setFilter(value),
    [setFilter]
  );

  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={handleClick("all")}
      >
        All
      </button>

      <button
        className={filter === "completed" ? "active" : ""}
        onClick={handleClick("completed")}
      >
        Completed
      </button>

      <button
        className={filter === "pending" ? "active" : ""}
        onClick={handleClick("pending")}
      >
        Pending
      </button>
    </div>
  );
}
