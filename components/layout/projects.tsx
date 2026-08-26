import Link from "next/link";
import Image from "next/image";
import { Section, Prose } from "@/components/craft";
import { Button } from "../ui/button";

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
        <h2>Featured Projects</h2>
      </Prose>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <ProjectCard
          title="N. Florida Ave. Townhomes"
          description="Tampa, Florida"
          imageUrl="https://dacarch.com/wp-content/uploads/2026/08/N-Florida-Main-Rendering.png"
          href="/projects/n-florida-ave-townhomes"
        />
        <ProjectCard
          title="5008 Timberland Development"
          description="Hillsborough County, Florida"
          imageUrl="https://dacarch.com/wp-content/uploads/2026/08/Timberland-Siteplan.png"
          href="/projects/5008-timberland"
        />
        <ProjectCard
          title="Dover Residence"
          description="St. Petersburg, Florida"
          imageUrl="https://dacarch.com/wp-content/uploads/2026/08/Dover-St-Front-Render.png"
          href="/projects/dover-street-residence"
        />
      </div>
      <div className="text-center mt-6">
        <Button asChild>
          <a href="/projects">View All Projects</a>
        </Button>
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
