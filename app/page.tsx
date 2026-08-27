import { TaskDashboard } from "./components/TaskDashboard";
import { starterTasks } from "./lib/starter-tasks";

export default function Home() {
  return <TaskDashboard initialTasks={starterTasks} />;
}
