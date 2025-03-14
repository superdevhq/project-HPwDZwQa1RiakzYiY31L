
import { useState } from "react";
import { Task, sampleTasks, sampleCategories } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/TaskList";
import CalendarView from "@/components/CalendarView";
import TaskForm from "@/components/TaskForm";
import { ListTodo, Calendar as CalendarIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Determine active tab based on route
  const getInitialTab = () => {
    if (location.pathname === "/calendar") return "calendar";
    return "list";
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());

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

  // Get page title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/tasks":
        return "Tasks";
      case "/calendar":
        return "Calendar";
      case "/categories":
        return "Categories";
      case "/reports":
        return "Reports";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <p className="text-muted-foreground">
          {location.pathname === "/" && "Welcome to your task management dashboard"}
          {location.pathname === "/tasks" && "Manage and organize your tasks"}
          {location.pathname === "/calendar" && "View your tasks in a calendar"}
          {location.pathname === "/categories" && "Manage task categories"}
          {location.pathname === "/reports" && "View reports and analytics"}
          {location.pathname === "/settings" && "Configure your preferences"}
        </p>
      </header>

      {/* Show tabs only on dashboard page */}
      {location.pathname === "/" && (
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
      )}

      {/* Show specific content based on route */}
      {location.pathname === "/tasks" && (
        <TaskList
          tasks={tasks}
          categories={sampleCategories}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      )}

      {location.pathname === "/calendar" && (
        <CalendarView
          tasks={tasks}
          categories={sampleCategories}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      )}

      {/* Placeholder content for other routes */}
      {location.pathname === "/categories" && (
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <p className="text-muted-foreground">Category management will be implemented here.</p>
        </div>
      )}

      {location.pathname === "/reports" && (
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <p className="text-muted-foreground">Reports and analytics will be implemented here.</p>
        </div>
      )}

      {location.pathname === "/settings" && (
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <p className="text-muted-foreground">Settings will be implemented here.</p>
        </div>
      )}

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
