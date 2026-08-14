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
      {featuredMedia && (
        <PageHeader
          title={page.title.rendered}
          imgSrc={featuredMedia.source_url}
          alt={page.title.rendered}
        />
      )}

      <Section>
        <Container>
          {/* <h1 className="text-3xl mb-4">
            <span
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            ></span>
          </h1> */}

          <Article
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </Container>
      </Section>
    </>
  );
}
