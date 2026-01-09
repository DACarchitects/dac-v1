import Link from "next/link";
import Image from "next/image";
import { Section, Container, Prose } from "@/components/craft";

// make div component to use for each service with icon, title, and description
function ProjectCard({
  title,
  description,
  imageUrl,
  href,
  imageAlt = title,
}: {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  imageAlt?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Image */}
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-accent/90 via-accent/50 to-transparent" />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-foreground">
        <h3 className="mb-2 text-xl font-bold leading-tight text-balance">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground/90 text-pretty">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <Section className="px-6 lg:px-28 2xl:px-48 xl:px-36 mb-18" id="projects">
      <Prose className="pb-8 text-center">
        <h2>Our Projects</h2>
      </Prose>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <ProjectCard
          title="Modern Family Home"
          description="A beautiful modern family home with open spaces and natural light."
          imageUrl="https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png"
          href="/project-1"
        />
        <ProjectCard
          title="Crispy Cone Project"
          description="A sleek urban apartment designed for city living and ice cream lovers."
          imageUrl="https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg"
          href="/project-2"
        />
        <ProjectCard
          title="Modular Container"
          description="A charming cottage nestled in a serene countryside setting."
          imageUrl="https://dacarch.com/wp-content/uploads/2026/01/modular-shipping-container.png"
          href="/project-3"
        />
      </div>
    </Section>
  );
}

{
  /* <Section className="px-6 lg:px-28 2xl:px-48 xl:px-36">
      <Prose>
        <h1 className="text-center">Our Services</h1>
      </Prose>
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
      </div>
    </Section > 
    */
}
