"use client";

import { useState } from "react";
import type { Task, UpdateTaskPayload } from "@/types/task";
import { usePrivacyStore } from "@/lib/store/privacyStore";
import PriorityBadge from "@/components/Tasks/PriorityBadge/PriorityBadge";
import CategorySelect from "@/components/Tasks/CategorySelect/CategorySelect";
import Modal from "@/components/ui/Modal/Modal";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import PrioritySelect from "@/components/Tasks/PrioritySelect/PrioritySelect";

type Props = {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onUpdate: (taskId: string, payload: UpdateTaskPayload) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

const DESCRIPTION_PREVIEW_LIMIT = 90;

function getDueDateStatus(
  dueDateStr: string | undefined,
  isCompleted: boolean,
) {
  if (isCompleted) {
    return {
      label: "Completed",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    };
  }

  if (!dueDateStr) {
    return {
      label: "No deadline",
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
      label: "Overdue",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    };
  }
  if (diffDays === 0) {
    return {
      label: "🔥 Today!",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    };
  }
  return {
    label: `${diffDays} d`,
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

  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate?.slice(0, 10) ?? "",
  );
  const [editIsPrivate, setEditIsPrivate] = useState(task.isPrivate);
  const [editPriority, setEditPriority] = useState(task.priority);

  const shouldBlur = task.isPrivate && isPrivacyModeOn;
  const dueStatus = getDueDateStatus(task.dueDate, task.isCompleted);

  const description = task.description ?? "";
  const isDescriptionTruncated = description.length > DESCRIPTION_PREVIEW_LIMIT;

  const resetEditFields = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCategory(task.category);
    setEditDueDate(task.dueDate?.slice(0, 10) ?? "");
    setEditIsPrivate(task.isPrivate);
    setEditPriority(task.priority);
  };

  const openView = () => setModalMode("view");

  const openEdit = () => {
    resetEditFields();
    setModalMode("edit");
  };

  const closeModal = () => setModalMode(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(task._id, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        priority: editPriority,
        isPrivate: editIsPrivate,
        ...(editDueDate ? { dueDate: editDueDate } : {}),
      });
      closeModal();
    } finally {
      setIsSaving(false);
    }
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
      className={`relative h-full flex flex-col gap-3 p-4 bg-slate-700/40 backdrop-blur-md border rounded-xl transition-all duration-300 ${
        task.isCompleted ? "opacity-50" : ""
      } ${shouldBlur ? "border-amber-500/10" : "border-slate-800"}`}
    >
      <div
        className={`flex items-start gap-3 ${
          shouldBlur ? "blur-sm transition-all" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task)}
          className="mt-0.5 w-5 h-5 cursor-pointer accent-blue-500 shrink-0"
        />

        <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
          <span
            className={`min-w-0 flex-1 break-all text-sm font-medium ${
              task.isCompleted ?
                "line-through text-slate-500"
              : "text-slate-100"
            }`}
          >
            {task.title}
          </span>

          <div className="flex items-center gap-2 shrink-0 self-start">
            <PriorityBadge priority={task.priority} />

            <span
              className={`text-[10px] px-2 py-0.5 rounded border ${dueStatus.color}`}
            >
              {dueStatus.label}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded border border-slate-700 text-slate-400 bg-slate-800/50">
              #{task.category}
            </span>
            <button
              onClick={openEdit}
              className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Edit task"
              title="Edit task"
            >
              ⋮
            </button>
          </div>
        </div>
      </div>

      {description && (
        <div
          className={`pl-8 text-xs text-slate-400 ${
            shouldBlur ? "blur-sm" : ""
          }`}
        >
          <p className="line-clamp-2 break-words">{description}</p>

          {isDescriptionTruncated && (
            <button
              onClick={openView}
              className="mt-1 text-blue-400 hover:underline"
            >
              Details
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={modalMode === "view"}
        onClose={closeModal}
        title={task.title}
      >
        <p className="text-sm text-slate-300 whitespace-pre-wrap break-words mb-4">
          {task.description}
        </p>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={openEdit}>
            Edit
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={modalMode === "edit"}
        onClose={closeModal}
        title="Edit task"
      >
        <div className="flex flex-col gap-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)..."
            rows={3}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <CategorySelect value={editCategory} onChange={setEditCategory} />
            <Input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />

            <PrioritySelect value={editPriority} onChange={setEditPriority} />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={editIsPrivate}
              onChange={(e) => setEditIsPrivate(e.target.checked)}
            />
            Private
          </label>

          <div className="flex items-center justify-between">
            <Button
              variant="danger"
              onClick={() => {
                closeModal();
                setIsDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete task?"
      >
        <p className="text-sm text-slate-400 mb-4">
          Task «{task.title}» will be permanently deleted. This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
