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
      <p className="py-10 text-center text-[clamp(0.875rem,2.2vw,0.95rem)] text-slate-500">
        No tasks found. Add the first one above 👆
      </p>
    );
  }

  return (
    <ul className="space-y-3 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 md:items-stretch 3xl:grid-cols-3">
      {tasks.map((task) => (
        <li key={task._id} className="md:h-full">
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
