"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
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

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(window.location.search);

    // Reset pagination whenever the filter changes.
    newParams.delete("page");

    if (value === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }

    router.push(
      `/projects${newParams.toString() ? `?${newParams.toString()}` : ""}`,
    );
  };

  const handleResetFilters = () => {
    router.push("/projects");
  };

  const hasCategories = categories.length > 0;

  return (
    <div className="grid md:grid-cols-[1fr_0.5fr] gap-2 my-4 z-10!">
      <Select
        value={selectedCategory || "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger disabled={!hasCategories}>
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

      <Button variant="outline" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
