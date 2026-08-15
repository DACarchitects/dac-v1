// app/projects/[slug]/page.tsx

import { getProjectBySlug, getAllProjectSlugs } from "@/lib/wordpress";

import { generateContentMetadata, stripHtml } from "@/lib/metadata";

import { Section, Container, Article } from "@/components/craft";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Custom Components
import PageHeader from "@/components/pageHeader";

export async function generateStaticParams() {
  return await getAllProjectSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return generateContentMetadata({
    title: project.title.rendered,
    description: stripHtml(project.excerpt.rendered),
    slug: project.slug,
    basePath: "projects",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const featuredMedia = project._embedded?.["wp:featuredmedia"]?.[0] ?? null;

  // const categoryNames =
  //   project._embedded?.["wp:term"]
  //     ?.flat()
  //     .filter(
  //       (term) =>
  //         (term as typeof term & { taxonomy?: string }).taxonomy === "category",
  //     )
  //     .map((term) => term.name)
  //     .join(", ") ?? "";

  return (
    <>
      {featuredMedia && (
        <PageHeader
          title={project.title.rendered}
          imgSrc={featuredMedia.source_url}
          alt={project.title.rendered}
          textAlign="left"
          // subtitle={stripHtml(project.excerpt.rendered)}
          // subtitle={categoryNames}
        />
      )}

      <Container>
        {/* <h2 className="text-2xl font-bold mb-4">Project Details</h2> */}
        <Article
          dangerouslySetInnerHTML={{
            __html: project.content.rendered,
          }}
        />
      </Container>
    </>
  );
}
