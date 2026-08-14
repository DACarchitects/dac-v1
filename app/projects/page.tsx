// app/projects/page.tsx

import { getProjectsPaginated, getProjectCategories } from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { SearchInput } from "@/components/posts/search-input";
import { ProjectCard } from "@/components/projects/project-card";
import { FilterProjects } from "@/components/projects/filter";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all projects",
};

export const dynamic = "auto";
export const revalidate = 3600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { category, page: pageParam, search } = params;

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const projectsPerPage = 9;

  const [projectsResponse, categories] = await Promise.all([
    getProjectsPaginated(page, projectsPerPage, {
      category,
      search,
    }),
    getProjectCategories(),
  ]);

  const { data: projects, headers } = projectsResponse;
  const { total, totalPages } = headers;

  const selectedCategory = category
    ? categories.find((cat) => cat.slug === category)
    : undefined;

  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();

    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    if (category) {
      params.set("category", category);
    }

    if (search) {
      params.set("search", search);
    }

    return `/projects${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h2>{selectedCategory ? selectedCategory.name : "All Projects"}</h2>
            <p className="text-muted-foreground">
              {selectedCategory
                ? selectedCategory.description
                : "Browse all projects"}
            </p>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "project" : "projects"} found
              {search && " matching your search"}
            </p>

            {/* <p className="text-muted-foreground">
              {total} {total === 1 ? "project" : "projects"} found
              {search && " matching your search"}
            </p> */}
          </Prose>

          <div className="space-y-4">
            <SearchInput defaultValue={search} />

            <FilterProjects
              categories={categories}
              selectedCategory={category}
            />
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>There are no projects listed under this category</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center py-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - page) <= 1
                      );
                    })
                    .map((pageNum, index, array) => {
                      const showEllipsis =
                        index > 0 && pageNum - array[index - 1] > 1;

                      return (
                        <div key={pageNum} className="flex items-center">
                          {showEllipsis && <span className="px-2">...</span>}

                          <PaginationItem>
                            <PaginationLink
                              href={createPaginationUrl(pageNum)}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      );
                    })}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
