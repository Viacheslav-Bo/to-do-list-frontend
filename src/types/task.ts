export type Category = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type Task = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  priority: number;
  isCompleted: boolean;
  isPrivate: boolean;
  category: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  priority?: number;
  isCompleted?: boolean;
  isPrivate?: boolean;
  category?: string;
  dueDate?: string;
};

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

export type SortBy = "priority" | "createdAt" | "dueDate";
export type SortOrder = "asc" | "desc";
export type StatusFilter = "all" | "done" | "undone";

export type GetTasksParams = {
  page?: number;
  limit?: number;
  search?: string;
  isCompleted?: boolean;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

export type PaginatedTasks = {
  items: Task[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
