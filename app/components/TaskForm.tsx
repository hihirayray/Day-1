"use client";

import { useState, type FormEvent } from "react";
import { validateTaskTitle } from "../lib/task-domain";

type TaskFormProps = { onCreate: (title: string) => void };

export function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateTaskTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    onCreate(title);
    setTitle("");
    setError(null);
  }

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="task-title">Task name</label>
        <input
          id="task-title"
          className="task-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add something you need to finish…"
          aria-describedby={error ? "task-error" : undefined}
        />
        <button className="add-button" type="submit">Add task</button>
      </form>
      {error ? <p className="error" id="task-error" role="alert">{error}</p> : null}
    </>
  );
}
