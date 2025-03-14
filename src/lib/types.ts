
export type Priority = "low" | "medium" | "high";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string; // ISO date string
  priority: Priority;
  categoryId: string;
};

// Sample data for development
export const sampleCategories: Category[] = [
  { id: "1", name: "Work", color: "#4f46e5" },
  { id: "2", name: "Personal", color: "#ec4899" },
  { id: "3", name: "Health", color: "#10b981" },
  { id: "4", name: "Learning", color: "#f59e0b" },
  { id: "5", name: "Errands", color: "#6366f1" }
];

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the client",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    priority: "high",
    categoryId: "1"
  },
  {
    id: "2",
    title: "Grocery shopping",
    description: "Buy fruits, vegetables, and other essentials",
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    priority: "medium",
    categoryId: "5"
  },
  {
    id: "3",
    title: "Morning jog",
    description: "30 minutes jogging in the park",
    completed: true,
    dueDate: new Date().toISOString(), // Today
    priority: "low",
    categoryId: "3"
  },
  {
    id: "4",
    title: "Read React documentation",
    description: "Study the new React features and hooks",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    priority: "medium",
    categoryId: "4"
  },
  {
    id: "5",
    title: "Call mom",
    description: "Weekly call with mom to catch up",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 days from now
    priority: "high",
    categoryId: "2"
  }
];
