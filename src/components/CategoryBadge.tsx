
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        className
      )}
      style={{
        backgroundColor: `${category.color}20`, // 20% opacity
        color: category.color,
        borderColor: `${category.color}40`, // 40% opacity
        borderWidth: "1px",
      }}
    >
      {category.name}
    </span>
  );
};

export default CategoryBadge;
