// app/projects/[slug]/page.tsx
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getProjectImages,
} from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { Container, Article } from "@/components/craft";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Custom Components
import PageHeader from "@/components/pageHeader";
import ProjectGallery from "@/components/projects/project-gallery";

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

  const projectImages = await getProjectImages(
    project.meta.project_images ?? [],
  );

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
        {project.meta.heading_one && (
          <h3 className="text-2xl mb-0 mt-4 font-bold">
            {project.meta.heading_one}
          </h3>
        )}

        {project.meta.heading_two && (
          <h4 className="mt-0 mb-8 text-xl">{project.meta.heading_two}</h4>
        )}
        <Article
          dangerouslySetInnerHTML={{
            __html: project.content.rendered,
          }}
        />

        {projectImages.length > 0 && (
          <>
            <p className="mt-12 mb-4">{/* <i>Click to enlarge</i> */}</p>
            <ProjectGallery
              images={projectImages}
              alt={project.title.rendered}
            />
          </>
        )}
      </Container>
    </>
  );
}
