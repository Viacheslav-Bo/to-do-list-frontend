"use client";

import { useState } from "react";
import type { CreateTaskPayload, SortBy, SortOrder } from "@/types/task";
import { useCreateTask } from "@/hooks/tasks/useTaskMutations";
import FilterBar from "@/components/Filters/FilterBar";
import TaskForm from "@/components/Tasks/TaskForm/TaskForm";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
  onReset: () => void;
};

export default function TasksToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: Props) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createTask = useCreateTask();

  const handleCreate = async (payload: CreateTaskPayload) => {
    await createTask.mutateAsync(payload);
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="New task"
      >
        <TaskForm onCreate={handleCreate} />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <FilterBar
            search={search}
            onSearchChange={onSearchChange}
            sortBy={sortBy}
            onSortByChange={onSortByChange}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
            onReset={onReset}
          />
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-11 px-5 shrink-0 w-full sm:w-auto"
        >
          + New task
        </Button>
      </div>
    </>
  );
}
