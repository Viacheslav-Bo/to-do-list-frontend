"use client";

import { useState } from "react";
import type { CreateTaskPayload } from "@/types/task";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

type Props = {
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
  existingCategories: string[];
};

const DEFAULT_CATEGORY = "Todo";
const FALLBACK_CATEGORIES = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const NEW_CATEGORY_VALUE = "__new__";

const PRIORITY_OPTIONS = [
  { value: 1, label: "1 — найнижчий" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4 — низький" },
  { value: 5, label: "5 — середній" },
  { value: 6, label: "6" },
  { value: 7, label: "7 — високий" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10 — найвищий" },
];

export default function TaskForm({ onCreate, existingCategories }: Props) {
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const categoryOptions = Array.from(
    new Set([
      ...FALLBACK_CATEGORIES,
      ...existingCategories,
      ...customCategories,
    ]),
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [priority, setPriority] = useState(5);
  const [dueDate, setDueDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCategorySelect = (value: string) => {
    if (value === NEW_CATEGORY_VALUE) {
      setIsAddingCategory(true);
      setNewCategoryInput("");
      return;
    }
    setCategory(value);
  };

  const confirmNewCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (trimmed) {
      setCustomCategories((prev) =>
        prev.includes(trimmed) ? prev : [...prev, trimmed],
      );
      setCategory(trimmed);
    }
    setIsAddingCategory(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (title.trim().length < 5) {
      setError("Назва повинна містити щонайменше 5 символів");
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
      setError("Не вдалось створити таску. Спробуй ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl"
    >
      <Input
        id="task-title"
        placeholder="Назва нової таски..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        id="task-description"
        placeholder="Опис (необов'язково)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
      />

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="task-category"
            className="text-sm font-medium text-slate-400"
          >
            Категорія
          </label>
          {isAddingCategory ?
            <div className="flex gap-1">
              <input
                autoFocus
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    confirmNewCategory();
                  }
                  if (e.key === "Escape") setIsAddingCategory(false);
                }}
                placeholder="Нова категорія..."
                className="w-32 px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={confirmNewCategory}
                className="px-2 rounded bg-emerald-600/80 hover:bg-emerald-500 text-white text-sm cursor-pointer"
              >
                ✓
              </button>
            </div>
          : <select
              id="task-category"
              value={category}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-32 px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value={NEW_CATEGORY_VALUE}>+ Нова категорія</option>
            </select>
          }
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="task-priority"
            className="text-sm font-medium text-slate-400"
          >
            Пріоритет
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="task-due-date"
          type="date"
          label="Дедлайн"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm text-slate-400 pb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Приватна
        </label>

        <Button type="submit" disabled={isSubmitting} className="ml-auto">
          {isSubmitting ? "Додаємо..." : "+ Додати таску"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
          {error}
        </p>
      )}
    </form>
  );
}
