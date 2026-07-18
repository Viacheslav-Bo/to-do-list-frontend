"use client";

import { useState } from "react";
import type {
  CreateTaskPayload,
  SortBy,
  SortOrder,
  StatusFilter,
} from "@/types/task";
import { useCategoriesOverview } from "@/hooks/tasks/useTasksOverview";
import { useCreateTask } from "@/hooks/tasks/useTaskMutations";
import FilterBar from "@/components/Filters/FilterBar";
import TaskForm from "@/components/Tasks/TaskForm/TaskForm";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sortBy: SortBy;
  onSortByChange: (value: SortBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
};

export default function TasksToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
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
        title="Нова таска"
      >
        <TaskForm onCreate={handleCreate} />
      </Modal>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[260px]">
          <FilterBar
            search={search}
            onSearchChange={onSearchChange}
            status={status}
            onStatusChange={onStatusChange}
            sortBy={sortBy}
            onSortByChange={onSortByChange}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="shrink-0">
          + Нова таска
        </Button>
      </div>
    </>
  );
}
