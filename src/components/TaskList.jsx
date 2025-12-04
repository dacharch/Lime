import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";


export default function TaskList() {
  const { tasks, filter, reorderTasks } = useTasks();

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.status === "completed";
      if (filter === "pending") return task.status === "pending";
      return true;
    });
  }, [tasks, filter]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  if (!visibleTasks.length) return <p>No tasks yet.</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {visibleTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(drag) => (
                  <TaskItem
                    task={task}
                    innerRef={drag.innerRef}
                    draggableProps={drag.draggableProps}
                    dragHandleProps={drag.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
