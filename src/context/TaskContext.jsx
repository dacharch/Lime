import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilterState] = useLocalStorage("filter", "all");

  const addTask = useCallback((text) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        status: "pending",
        createdAt: Date.now(),
      },
    ]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const setFilter = useCallback((value) => {
    setFilterState(value);
  }, [setFilterState]);

  const reorderTasks = useCallback(
    (startIndex, endIndex) => {
      setTasks((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(startIndex, 1);
        updated.splice(endIndex, 0, moved);
        return updated;
      });
    },
    [setTasks]
  );

  const value = useMemo(
    () => ({
      tasks,
      filter,
      addTask,
      toggleTask,
      deleteTask,
      setFilter,
      reorderTasks,
    }),
    [tasks, filter, addTask, toggleTask, deleteTask, setFilter, reorderTasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
