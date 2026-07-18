import type { Task, UpdateTaskPayload } from "@/types/task";
import TaskItem from "../TaskItem/TaskItem";

type Props = {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onUpdate: (taskId: string, payload: UpdateTaskPayload) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

const TasksList = ({ tasks, onToggleComplete, onUpdate, onDelete }: Props) => {
  if (tasks.length === 0) {
    return (
      <p className="text-slate-500 text-center py-10">
        No tasks found. Add the first one above 👆
      </p>
    );
  }

  return (
    <ul className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:items-stretch">
      {tasks.map((task) => (
        <li key={task._id} className="lg:h-full">
          <TaskItem
            task={task}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
