import { describe, expect, it } from "vitest";
import { normalizeTitle, taskReducer, validateTaskTitle, type Task } from "../app/lib/task-domain";

const tasks: Task[] = [
  { id: "a", title: "First", course: "General", createdAt: "2026-08-26T00:00:00Z" },
  { id: "b", title: "Second", course: "General", createdAt: "2026-08-26T00:00:00Z" },
];

describe("task domain", () => {
  it("normalizes user-entered whitespace", () => {
    expect(normalizeTitle("  write   report  ")).toBe("write report");
  });

  it("rejects blank and overlong titles", () => {
    expect(validateTaskTitle("   ")).toBeTruthy();
    expect(validateTaskTitle("x".repeat(81))).toBeTruthy();
    expect(validateTaskTitle("Review notes")).toBeNull();
  });

  it("adds a task without mutating existing state", () => {
    const next = taskReducer(tasks, {
      type: "task/created",
      task: { id: "c", title: "Third", course: "General", createdAt: "2026-08-26T00:00:00Z" },
    });
    expect(next.map((task) => task.id)).toEqual(["c", "a", "b"]);
    expect(tasks).toHaveLength(2);
  });

  it("deletes exactly the selected task", () => {
    expect(taskReducer(tasks, { type: "task/deleted", id: "a" })).toEqual([tasks[1]]);
  });
});
