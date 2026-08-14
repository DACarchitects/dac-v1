import Image from "next/image";
import Link from "next/link";

import { Project } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { truncateHtml } from "@/lib/metadata";

export function ProjectCard({ project }: { project: Project }) {
  const media = project._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const category = project._embedded?.["wp:term"]?.[0]?.[0] ?? null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all",
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center bg-muted">
          {media?.source_url ? (
            <Image
              className="h-full w-full object-cover"
              src={media.source_url}
              alt={project.title?.rendered || "Project thumbnail"}
              width={400}
              height={200}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: project.title?.rendered || "Untitled Project",
          }}
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        />

        <div className="text-sm">
          {project.excerpt?.rendered
            ? truncateHtml(project.excerpt.rendered, 12)
            : "No excerpt available"}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />

        <div className="flex justify-between items-center text-xs">
          <p>
            <span className="font-bold">Project Category:</span>{" "}
            {category?.name || "Uncategorized"}
          </p>
        </div>
      </div>
    </Link>
  );
}
