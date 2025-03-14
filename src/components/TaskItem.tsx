
import { useState } from "react";
import { Task, Category } from "@/lib/types";
import { format } from "date-fns";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PriorityBadge from "./PriorityBadge";
import CategoryBadge from "./CategoryBadge";

interface TaskItemProps {
  task: Task;
  category: Category;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({
  task,
  category,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = format(new Date(task.dueDate), "MMM d, yyyy");
  
  return (
    <Card
      className={cn(
        "task-item mb-3 p-4 transition-all",
        task.completed && "opacity-70"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 text-primary hover:text-primary/80 transition-colors"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 
              className={cn(
                "font-medium text-base truncate",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            
            <div className={cn(
              "flex items-center gap-1 transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(task)}
                aria-label="Edit task"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1 line-clamp-2",
              task.completed && "line-through"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="text-xs text-muted-foreground">
              {formattedDate}
            </div>
            <PriorityBadge priority={task.priority} />
            <CategoryBadge category={category} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
