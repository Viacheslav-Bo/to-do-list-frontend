"use client";

import { useState } from "react";
import type { Task, UpdateTaskPayload } from "@/types/task";
import { usePrivacyStore } from "@/lib/store/privacyStore";
import PriorityBadge from "@/components/Tasks/PriorityList/PriorityList";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";

type Props = {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onUpdate: (taskId: string, payload: UpdateTaskPayload) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

function getDueDateStatus(
  dueDateStr: string | undefined,
  isCompleted: boolean,
) {
  if (isCompleted) {
    return {
      label: "Виконано",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    };
  }

  if (!dueDateStr) {
    return {
      label: "Без дедлайну",
      color: "text-slate-400 bg-slate-800/50 border-slate-700/30",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) {
    return {
      label: "Протерміновано",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    };
  }
  if (diffDays === 0) {
    return {
      label: "🔥 Сьогодні!",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    };
  }
  return {
    label: `${diffDays} дн.`,
    color: "text-slate-400 bg-slate-800/50 border-slate-700/30",
  };
}

export default function TaskItem({
  task,
  onToggleComplete,
  onUpdate,
  onDelete,
}: Props) {
  const isPrivacyModeOn = usePrivacyStore((state) => state.isPrivacyModeOn);

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate?.slice(0, 10) ?? "",
  );

  const shouldBlur = task.isPrivate && isPrivacyModeOn;
  const dueStatus = getDueDateStatus(task.dueDate, task.isCompleted);

  const handleSave = async () => {
    await onUpdate(task._id, {
      title: editTitle,
      description: editDescription,
      category: editCategory,
      ...(editDueDate ? { dueDate: editDueDate } : {}),
    });
    setIsEditing(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-col p-5 bg-slate-900/40 backdrop-blur-md border rounded-xl transition-all duration-300 ${
        task.isCompleted ? "opacity-50" : ""
      } ${shouldBlur ? "border-amber-500/10" : "border-slate-800"}`}
    >
      {isEditing ?
        <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-700/50">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 bg-black border border-slate-700 rounded text-sm text-slate-100"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Опис (необов'язково)..."
            rows={2}
            className="w-full p-2 bg-black border border-slate-700 rounded text-sm text-slate-100 resize-none"
          />
          <div className="flex gap-2">
            <input
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="flex-1 p-2 bg-black border border-slate-700 rounded text-sm text-slate-100"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="p-2 bg-black border border-slate-700 rounded text-sm text-slate-100"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="text-sm">
              Зберегти
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
              className="text-sm"
            >
              Скасувати
            </Button>
          </div>
        </div>
      : <>
          <div className="flex items-center justify-between gap-4">
            <div
              className={`flex items-center gap-3 flex-1 min-w-0 ${shouldBlur ? "blur-sm hover:blur-none transition-all" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggleComplete(task)}
                className="w-5 h-5 cursor-pointer accent-blue-500"
              />
              <span
                className={`text-sm font-medium truncate ${
                  task.isCompleted ?
                    "line-through text-slate-500"
                  : "text-slate-100"
                }`}
              >
                {task.title}
              </span>
              <PriorityBadge priority={task.priority} />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-[10px] px-2 py-0.5 rounded border ${dueStatus.color}`}
              >
                {dueStatus.label}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-400 hover:underline cursor-pointer"
              >
                Ред.
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-blue-400 hover:underline cursor-pointer"
              >
                {isExpanded ? "Сховати" : "Деталі"}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-slate-500 hover:text-rose-500 cursor-pointer"
                aria-label="Видалити таску"
              >
                🗑️
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-800/60 text-sm text-slate-300 flex flex-wrap gap-2">
              {task.description && <p className="w-full">{task.description}</p>}
              <span className="text-xs text-slate-500">#{task.category}</span>
            </div>
          )}
        </>
      }

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Видалити таску?"
      >
        <p className="text-sm text-slate-400 mb-4">
          Таску «{task.title}» буде видалено назавжди. Цю дію не можна
          скасувати.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Скасувати
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Видаляємо..." : "Видалити"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
