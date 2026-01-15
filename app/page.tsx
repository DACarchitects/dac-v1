// Components
import Hero from "@/components/heroHeader";
import Services from "@/components/layout/services";
import About from "@/components/layout/about";
import Projects from "@/components/layout/projects";
import Ribbon from "@/components/layout/ribbon";
import { ContactForm } from "@/components/contactForm";
import { contactDetails } from "./data";
import { TestimonialsCarousel } from "@/components/testimonialsCarousel";
import { testimonialsArray } from "./data";
import { Container } from "@/components/craft";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <div style={{ marginTop: "-2rem", zIndex: "10", position: "relative" }}>
          <Services />
        </div>
        <About />
        <div className="max-w-[75%] mx-auto">
          <hr />
        </div>
        <Projects />
        <Ribbon
          ribbonText="Designing inspiring spaces"
          // ribbonSubtext="El Bambino"
          ribbonImage="https://dacarch.com/wp-content/uploads/2026/01/construction-plans-drawing-tools-blueprints-scaled.jpg"
        />

        {/* <p className="text-center mt-16 mb-8 text-3xl font-semibold">
          What Our Clients Say
        </p>
        <TestimonialsCarousel testimonials={testimonialsArray} /> */}
        <p className="text-center mt-8 text-3xl font-semibold">Get in Touch</p>
        <Container className="rounded-lg bg-card p-8 mt-2 flex flex-col lg:flex-row gap-10 lg:gap-20">
          <ContactForm />
          <div className="space-y-6 md:mx-auto max-w-6xl">
            <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
              Contact Information
            </h2>
            {contactDetails.map((detail: any) => {
              const Icon = detail.icon;
              const content = (
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="mt-1 whitespace-pre-line text-base font-medium leading-relaxed text-card-foreground">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );

              if (detail.href) {
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="block rounded-lg transition-colors hover:bg-muted/50"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={detail.label} className="rounded-lg">
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </main>
    </>
  );
}

{
  //  import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
  /* <section className="services-section">
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts"
            >
              <Pen size={32} />
              <span>
                Posts{" "}
                <span className="block text-sm text-muted-foreground">
                  All posts from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/pages"
            >
              <File size={32} />
              <span>
                Pages{" "}
                <span className="block text-sm text-muted-foreground">
                  Custom pages from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/authors"
            >
              <User size={32} />
              <span>
                Authors{" "}
                <span className="block text-sm text-muted-foreground">
                  List of the authors from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/tags"
            >
              <Tag size={32} />
              <span>
                Tags{" "}
                <span className="block text-sm text-muted-foreground">
                  Content by tags from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/categories"
            >
              <Diamond size={32} />
              <span>
                Categories{" "}
                <span className="block text-sm text-muted-foreground">
                  Categories from your WordPress
                </span>
              </span>
            </Link>
            <a
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="https://github.com/9d8dev/next-wp/blob/main/README.md"
            >
              <Folder size={32} />
              <span>
                Documentation{" "}
                <span className="block text-sm text-muted-foreground">
                  How to use `next-wp`
                </span>
              </span>
            </a>
          </div>
        </section> */
}
