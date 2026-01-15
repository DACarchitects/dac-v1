import Image from "next/image";
// Craft Imports
import { Section, Container, Prose } from "@/components/craft";

// This page is using the craft.tsx component and design system
export default function Project1() {
  return (
    <>
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              N. Ave. Barndominium
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              Ligonier, Pennsylvania
            </p>
          </div>
        </div>
      </section>
      <Container className="rounded-lg bg-card p-8">
        <div className="space-y-6 mx-auto max-w-6xl">
          <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
            Project Details
          </h2>
          <p className="text-pretty text-card-foreground">
            The N. Ave. Barndominium is a custom single-family residence
            designed for a corner lot in Ligonier, Pennsylvania. The project
            blends a refined barndominium aesthetic with a functional
            residential layout, balancing efficiency, durability, and everyday
            livability.
          </p>
          <p className="text-pretty text-card-foreground">
            The home is organized with open living, kitchen, and dining spaces
            on the main level, while private bedrooms are located above. An
            attached garage and covered porch were integrated into the overall
            massing to maintain a cohesive exterior and support practical
            day-to-day use.
          </p>
          <p className="text-pretty text-card-foreground">
            Zoning constraints, floodplain requirements, and energy code
            standards informed the building placement and design approach. The
            project was developed with a strong focus on constructability and
            long-term performance, resulting in a fully coordinated,
            permit-ready set of construction documents that support a smooth
            approval and building process.
          </p>

          <div className="mt-12 flex flex-col md:flex-row gap-8">
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/proj_1.png"
                width={600}
                height={400}
                alt="Project Image"
                className="rounded-lg"
              />
            </div>
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/proj-1.png"
                width={580}
                height={200}
                alt="Project Image"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
