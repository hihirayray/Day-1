export type Task = {
  id: string;
  title: string;
  course: string;
  createdAt: string;
};

export type TaskAction =
  | { type: "task/created"; task: Task }
  | { type: "task/deleted"; id: string };

export function normalizeTitle(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateTaskTitle(value: string): string | null {
  const title = normalizeTitle(value);
  if (!title) return "Give the task a name.";
  if (title.length > 80) return "Keep task names under 80 characters.";
  return null;
}

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "task/created":
      return [action.task, ...tasks];
    case "task/deleted":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}
