"use client";

import { useState } from "react";
import type { CreateTaskPayload } from "@/types/task";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import CategorySelect from "@/components/Tasks/CategorySelect/CategorySelect";

type Props = {
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
};

const DEFAULT_CATEGORY = "Todo";

const PRIORITY_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="task-category"
            className="text-sm font-medium text-slate-400"
          >
            Category
          </label>
          <CategorySelect
            id="task-category"
            value={category}
            onChange={setCategory}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="task-priority"
            className="text-sm font-medium text-slate-400"
          >
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-end gap-3">
        <Input
          id="task-due-date"
          type="date"
          label="Deadline"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-1"
        />

        <label className="flex items-center gap-2 text-sm text-slate-400 pb-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Private
        </label>
      </div>

      {error && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Adding..." : "+ Add Task"}
      </Button>
    </form>
  );
}
