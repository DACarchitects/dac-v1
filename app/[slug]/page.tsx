import { notFound } from "next/navigation";
import { Section, Container, Article } from "@/components/craft";
import { getPageBySlug } from "@/lib/wordpress";

// Custom Components
import PageHeader from "@/components/pageHeader";

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
