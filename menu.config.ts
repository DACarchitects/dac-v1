// Define the menu items
export type MenuDropdown = {
  href: string;
  items: { label: string; href: string }[];
};

export const mainMenu: Record<string, string | MenuDropdown> = {
  home: "/",
  projects: {
    href: "/projects",
    items: [
      {
        label: "Single-Family Residential",
        href: "/projects?category=single-family-residential",
      },
      {
        label: "Multi-Family Projects",
        href: "/projects?category=multifamily",
      },
      { label: "Commercial Projects", href: "/projects?category=commercial" },
      { label: "Development Projects", href: "/projects?category=development" },
      { label: "Feasibility Studies", href: "/feasibility-studies" },
    ],
  },
};

export const contentMenu = {
  categories: "/posts/categories",
  tags: "/posts/tags",
  authors: "/posts/authors",
};
