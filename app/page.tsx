// Craft Imports
import { Section, Container } from "@/components/craft";
// Components
import Hero from "@/components/Hero";
import Services from "@/components/layout/services";
import About from "@/components/layout/about";

// This page is using the craft.tsx component and design system
export default function Home() {
  const secret = process.env.WORDPRESS_WEBHOOK_SECRET;
  console.log(
    "ENV secret length:",
    process.env.WORDPRESS_WEBHOOK_SECRET?.length
  );
  console.log("Header secret length:", secret?.length);

  return (
    <>
      <Hero />
      <main>
        <div style={{ marginTop: "-2rem", zIndex: "10", position: "relative" }}>
          <Services />
        </div>
        <div className="mb-4 max-w-[75%] mx-auto">
          <hr />
        </div>
        <div className="mt-18">
          <About />
        </div>
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
