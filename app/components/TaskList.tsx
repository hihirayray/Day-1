"use client";

import type { Task } from "../lib/task-domain";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <strong>Your list is clear.</strong>
        Add a task above when something new comes in.
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className="task-row" key={task.id}>
          <span className="task-bullet" aria-hidden="true" />
          <div>
            <p className="task-title">{task.title}</p>
            <p className="task-course">{task.course}</p>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
