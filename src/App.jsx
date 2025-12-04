import React, { useEffect, useState } from "react";
import { TaskProvider } from "./context/TaskContext";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

function AppContent() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);


  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <ThemeToggle
          theme={theme}
          toggleTheme={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
      </header>

      <TaskForm />
      <FilterBar />
      <TaskList />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}
