"use client";

import { useState } from "react";
import type { CreateTaskPayload } from "@/types/task";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import TaskFieldsGroup from "@/components/Tasks/TaskFieldsGroup/TaskFieldsGroup";

type Props = {
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
};

const DEFAULT_CATEGORY = "Todo";

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [priority, setPriority] = useState(5);
  const [dueDate, setDueDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (title.trim().length < 5) {
      setError("Title must be at least 5 characters long");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({
        title: title.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
        category,
        priority,
        isPrivate,
        ...(dueDate ? { dueDate } : {}),
      });

      setTitle("");
      setDescription("");
      setCategory(DEFAULT_CATEGORY);
      setPriority(5);
      setDueDate("");
      setIsPrivate(false);
    } catch {
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
      <Input
        id="task-title"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        id="task-description"
        placeholder="Description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full resize-none rounded border border-slate-800 bg-slate-950 px-3 py-2 text-[clamp(0.8rem,2.2vw,0.9rem)] text-slate-200 focus:border-blue-500 focus:outline-none sm:px-3.5 sm:py-2.5"
      />

      <TaskFieldsGroup
        idPrefix="task-create"
        category={category}
        onCategoryChange={setCategory}
        dueDate={dueDate}
        onDueDateChange={setDueDate}
        priority={priority}
        onPriorityChange={setPriority}
        isPrivate={isPrivate}
        onIsPrivateChange={setIsPrivate}
      />

      {error && (
        <p className="rounded border border-rose-500/20 bg-rose-500/10 p-2 text-[clamp(0.8rem,2.2vw,0.875rem)] text-rose-400">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Adding..." : "+ Add Task"}
      </Button>
    </form>
  );
}
