"use client";

import { useState } from "react";
import type { Task, UpdateTaskPayload } from "@/types/task";
import { usePrivacyStore } from "@/lib/store/privacyStore";
import Modal from "@/components/ui/Modal/Modal";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import TaskFieldsGroup from "@/components/Tasks/TaskFieldsGroup/TaskFieldsGroup";

import PriorityBadge from "@/components/ui/Badges/PriorityBadge";
import StatusBadge from "@/components/ui/Badges/StatusBadge";
import CategoryBadge from "@/components/ui/Badges/CategoryBadge";
import Textarea from "@/components/ui/Textarea/Textarea";

import { Shield, MoreVertical } from "lucide-react";

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
      label: "No date",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
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
    color:
      "text-[var(--color-text-secondary)] bg-[var(--color-surface)] border-[var(--color-border-strong)]",
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

  const isLocked = task.isPrivate && isPrivacyModeOn;
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
      className={`shadow-sm
hover:shadow-md
transition-all relative flex h-full flex-col gap-2.5 rounded-xl border bg-[var(--color-surface)] p-3 backdrop-blur-md transition-all duration-300 sm:gap-3 sm:p-4 ${
        task.isCompleted ? "opacity-50" : ""
      } ${isLocked ? "border-amber-500/20" : "border-[var(--color-border)]"}`}
    >
      <div
        className={isLocked ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
            <PriorityBadge priority={task.priority} />

            <StatusBadge label={dueStatus.label} color={dueStatus.color} />

            <CategoryBadge category={task.category} />
          </div>

          <button
            onClick={openEdit}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-solid)] hover:text-[var(--color-text-primary)] sm:h-7 sm:w-7"
            aria-label="Edit task"
            title="Edit task"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-blue-500"
          />

          <h3
            className={`flex-1 break-words text-[clamp(0.875rem,2.2vw,0.95rem)] font-medium ${
              task.isCompleted ?
                "line-through text-[var(--color-text-muted)]"
              : "text-[var(--color-text-primary)]"
            }`}
          >
            {task.title}
          </h3>
        </div>

        {description && (
          <div className="mt-3 ml-0 pr-8 text-[clamp(0.75rem,2vw,0.8rem)] text-[var(--color-text-secondary)] sm:ml-8">
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
      </div>

      {task.isPrivate && (
        <div
          title="Private task"
          className="absolute bottom-3 right-3 sm:right-4 flex h-8 w-8 items-center justify-center text-amber-400/60 sm:h-7 sm:w-7"
        >
          <Shield size={16} strokeWidth={1.5} />
        </div>
      )}

      <Modal
        isOpen={modalMode === "view"}
        onClose={closeModal}
        title={task.title}
      >
        <p className="mb-4 whitespace-pre-wrap break-words text-[clamp(0.8rem,2.4vw,0.875rem)] text-[var(--color-text-secondary)]">
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

          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)..."
            rows={5}
          />

          <TaskFieldsGroup
            idPrefix="task-edit"
            category={editCategory}
            onCategoryChange={setEditCategory}
            dueDate={editDueDate}
            onDueDateChange={setEditDueDate}
            priority={editPriority}
            onPriorityChange={setEditPriority}
            isPrivate={editIsPrivate}
            onIsPrivateChange={setEditIsPrivate}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="danger"
              onClick={() => {
                closeModal();
                setIsDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>

            <div className="flex flex-wrap gap-2">
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
        <p className="mb-4 text-[clamp(0.8rem,2.4vw,0.875rem)] text-[var(--color-text-secondary)]">
          Task «{task.title}» will be permanently deleted. This action cannot be
          undone.
        </p>

        <div className="flex flex-wrap justify-end gap-2">
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
