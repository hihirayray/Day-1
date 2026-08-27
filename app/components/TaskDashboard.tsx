"use client";

import { useTaskBoard } from "../hooks/useTaskBoard";
import type { Task } from "../lib/task-domain";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

type TaskDashboardProps = { initialTasks: Task[] };

export function TaskDashboard({ initialTasks }: TaskDashboardProps) {
  const { tasks, createTask, deleteTask } = useTaskBoard(initialTasks);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">T</span> Taskroom</div>
        <p className="sidebar-label eyebrow">Workspace</p>
        <nav aria-label="Main navigation">
          <div className="nav-item active"><span className="nav-icon">●</span> My tasks</div>
          <div className="nav-item"><span className="nav-icon">◫</span> Courses</div>
          <div className="nav-item"><span className="nav-icon">↗</span> Progress</div>
        </nav>
        <div className="sidebar-note">
          <strong>Lab starter</strong>
          <p>This app intentionally has no priority, deadline, filtering, or persistence yet.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="date">Thursday, August 27</p>
            <h1>What needs doing?</h1>
          </div>
          <div className="avatar" aria-label="Signed in as Alex Chen">AC</div>
        </header>

        <section className="summary" aria-label="Task summary">
          <div className="summary-card accent"><span className="summary-value">{tasks.length}</span><span className="summary-label">Open tasks</span></div>
          <div className="summary-card"><span className="summary-value">3</span><span className="summary-label">Active courses</span></div>
          <div className="summary-card"><span className="summary-value">0</span><span className="summary-label">Overdue</span></div>
        </section>

        <section className="board" aria-labelledby="task-heading">
          <div className="board-header">
            <h2 id="task-heading">All tasks</h2>
            <span className="task-count">{tasks.length} {tasks.length === 1 ? "item" : "items"}</span>
          </div>
          <TaskForm onCreate={createTask} />
          <TaskList tasks={tasks} onDelete={deleteTask} />
        </section>

        <p className="lab-hint"><span aria-hidden="true">↳</span><span>Your mission starts in <code>README.md</code>. Inspect first. Plan before changing code.</span></p>
      </main>
    </div>
  );
}
