"use client";

import { useReducer } from "react";
import {
  normalizeTitle,
  taskReducer,
  type Task,
} from "../lib/task-domain";

export function useTaskBoard(initialTasks: Task[]) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  function createTask(rawTitle: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title: normalizeTitle(rawTitle),
      course: "General",
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "task/created", task });
  }

  function deleteTask(id: string) {
    dispatch({ type: "task/deleted", id });
  }

  return { tasks, createTask, deleteTask };
}
