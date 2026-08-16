import { notFound } from "next/navigation";
import { Section, Container, Article } from "@/components/craft";
import { getPageBySlug } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

// Custom Components
import PageHeader from "@/components/pageHeader";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const description = page.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : stripHtml(page.content.rendered).slice(0, 200) + "...";

  return generateContentMetadata({
    title: stripHtml(page.title.rendered),
    description,
    url: `${siteConfig.site_domain}/${page.slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const featuredMedia = page._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <>
      {featuredMedia ? (
        <PageHeader
          title={page.title.rendered}
          imgSrc={featuredMedia.source_url}
          alt={page.title.rendered}
          textAlign="left"
        />
      ) : (
        <Container className="pb-0 md:pb-0">
          <h1 className="text-3xl">
            <span
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            ></span>
          </h1>
        </Container>
      )}

      <Section
        className={`${featuredMedia ? "pt-4 md:pt-4" : "pt-0 md:pt-0"} min-h-screen`}
      >
        <Container>
          <Article
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </Container>
      </Section>
    </>
  );
}
