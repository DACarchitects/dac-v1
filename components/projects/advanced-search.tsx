"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/posts/search-input";

export function AdvancedSearch({ defaultValue }: { defaultValue?: string }) {
  // Keep the search bar open if a search is already active.
  const [isOpen, setIsOpen] = useState(!!defaultValue);

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={() => setIsOpen((prev) => !prev)}>
        Advanced search
      </Button>

      {isOpen && <SearchInput defaultValue={defaultValue} />}
    </div>
  );
}
