"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/wordpress.d";

interface FilterProjectsProps {
  categories: Category[];
  selectedCategory?: string;
}

export function FilterProjects({
  categories,
  selectedCategory,
}: FilterProjectsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(window.location.search);

    // Reset pagination whenever the filter changes.
    newParams.delete("page");

    if (value === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }

    startTransition(() => {
      router.push(
        `/projects${newParams.toString() ? `?${newParams.toString()}` : ""}`,
      );
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      router.push("/projects");
    });
  };

  const hasCategories = categories.length > 0;

  return (
    <>
      <div
        className={cn(
          "flex-1 min-w-[200px] z-10! transition-opacity duration-200",
          isPending && "opacity-50",
        )}
      >
        <Select
          value={selectedCategory || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger disabled={!hasCategories} className="w-full">
            {hasCategories ? (
              <SelectValue placeholder="View All Projects" />
            ) : (
              "No categories found"
            )}
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Select Project Category</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <span role="status" aria-live="polite">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          <span className="sr-only">Updating projects…</span>
        </span>
      )}

      <Button variant="outline" onClick={handleResetFilters}>
        Reset Filter
      </Button>
    </>
  );
}
