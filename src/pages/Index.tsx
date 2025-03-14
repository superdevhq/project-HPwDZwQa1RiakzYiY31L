
import { useState } from "react";
import { Task, sampleTasks, sampleCategories } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/TaskList";
import CalendarView from "@/components/CalendarView";
import TaskForm from "@/components/TaskForm";
import { ListTodo, Calendar as CalendarIcon } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  // Toggle task completion status
  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Open form to edit a task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Open form to add a new task
  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  // Save a task (new or edited)
  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">TaskMaster</h1>
        <p className="text-muted-foreground">
          Organize your tasks efficiently with categories, priorities, and due dates
        </p>
      </header>

      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            <span>List View</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar View</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="animate-slide-in">
          <TaskList
            tasks={tasks}
            categories={sampleCategories}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
        </TabsContent>
        
        <TabsContent value="calendar" className="animate-slide-in">
          <CalendarView
            tasks={tasks}
            categories={sampleCategories}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
        </TabsContent>
      </Tabs>

      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Index;
