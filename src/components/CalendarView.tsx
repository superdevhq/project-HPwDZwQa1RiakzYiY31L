
import { useState } from "react";
import { Task, Category } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import TaskItem from "./TaskItem";

interface CalendarViewProps {
  tasks: Task[];
  categories: Category[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: () => void;
}

const CalendarView = ({
  tasks,
  categories,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
}: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Get tasks for selected date
  const tasksForSelectedDate = selectedDate
    ? tasks.filter((task) => isSameDay(new Date(task.dueDate), selectedDate))
    : [];

  // Get category by ID
  const getCategoryById = (categoryId: string): Category => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  // Custom day render function to show task indicators
  const renderDay = (day: Date) => {
    const tasksOnDay = tasks.filter((task) => isSameDay(new Date(task.dueDate), day));
    const hasHighPriority = tasksOnDay.some((task) => task.priority === "high");
    const hasMediumPriority = tasksOnDay.some((task) => task.priority === "medium");
    const hasLowPriority = tasksOnDay.some((task) => task.priority === "low");
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div>{format(day, "d")}</div>
        {tasksOnDay.length > 0 && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            {hasHighPriority && (
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
            {hasMediumPriority && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            )}
            {hasLowPriority && (
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            )}
          </div>
        )}
      </div>
    );
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onAddTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-5">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              components={{
                Day: ({ date }) => renderDay(date),
              }}
            />
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              {selectedDate && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    onAddTask();
                    // Note: In a real implementation, we would pre-fill the date in the form
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {tasksForSelectedDate.length > 0 ? (
                tasksForSelectedDate.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    category={getCategoryById(task.categoryId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {selectedDate
                      ? "No tasks for this date"
                      : "Select a date to view tasks"}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
