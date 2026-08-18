// app/projects/page.tsx

import { Suspense } from "react";

import {
  getProjectsPaginated,
  getProjectCategories,
  getCategoryBySlug,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Article } from "@/components/craft";
import { ProjectCard } from "@/components/projects/project-card";
import { FilterProjects } from "@/components/projects/filter";
import { AdvancedSearch } from "@/components/projects/advanced-search";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}): Promise<Metadata> {
  const { category, search } = await searchParams;

  const selectedCategory = category
    ? await getCategoryBySlug(category)
    : undefined;

  const title = selectedCategory
    ? `${selectedCategory.name} Projects`
    : search
      ? `Projects matching "${search}"`
      : "Projects";

  const description = selectedCategory?.description
    ? stripHtml(selectedCategory.description)
    : "Browse a selection of DAC projects across single-family residential, multifamily, development, and commercial architecture.";

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  return generateContentMetadata({
    title,
    description,
    url: `${siteConfig.site_domain}/projects${params.toString() ? `?${params.toString()}` : ""}`,
  });
}

export const dynamic = "auto";
export const revalidate = 3600;

// Categories used across all projects are resolved separately since they require
// scanning every project, which is slower than fetching the current page of results.
async function ProjectCategoryFilter({
  selectedCategory,
}: {
  selectedCategory?: string;
}) {
  const categories = await getProjectCategories();

  return (
    <FilterProjects
      categories={categories}
      selectedCategory={selectedCategory}
    />
  );
}

function FilterProjectsSkeleton() {
  return (
    <>
      <div className="flex-1 min-w-[200px] h-10 rounded-md border border-input bg-background animate-pulse" />
      <div className="h-10 w-[104px] rounded-md border border-input bg-background animate-pulse" />
    </>
  );
}

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

  const [projectsResponse, selectedCategory] = await Promise.all([
    getProjectsPaginated(page, projectsPerPage, {
      category,
      search,
    }),
    category ? getCategoryBySlug(category) : Promise.resolve(undefined),
  ]);

  const { data: projects, headers } = projectsResponse;
  const { total, totalPages } = headers;

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
          <div key={`${category ?? "all"}-heading`} className="animate-fade-in">
            <h1 className="text-3xl mb-8 font-semibold">
              {selectedCategory
                ? `${selectedCategory.name} Projects`
                : "All Projects"}
            </h1>
            <Article className="w-full text-lg text-muted-foreground">
              {selectedCategory
                ? selectedCategory.description
                : "Explore a selection of DAC projects across single-family residential, multifamily, development, and commercial architecture. Our portfolio reflects a range of project scales and challenges, from custom homes and commercial interiors to entitlement-driven infill projects and larger residential developments."}
            </Article>
          </div>
          {/* <p className="text-muted-foreground">
              {total} {total === 1 ? "project" : "projects"} found
              {search && " matching your search"}
            </p> */}

          {/* <p className="text-muted-foreground">
              {total} {total === 1 ? "project" : "projects"} found
              {search && " matching your search"}
            </p> */}

          <div className="flex flex-wrap items-center gap-2 my-12">
            <Suspense fallback={<FilterProjectsSkeleton />}>
              <ProjectCategoryFilter selectedCategory={category} />
            </Suspense>
            <AdvancedSearch defaultValue={search} />
          </div>

          {projects.length > 0 ? (
            <div
              key={`${category ?? "all"}-${search ?? ""}-${page}`}
              className="grid md:grid-cols-3 gap-4 animate-fade-in"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div
              key={`${category ?? "all"}-${search ?? ""}-${page}`}
              className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center animate-fade-in"
            >
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
