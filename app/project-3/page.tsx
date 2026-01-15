// Craft Imports
import Image from "next/image";
import { Section, Container, Prose } from "@/components/craft";

// This page is using the craft.tsx component and design system
export default function Project3() {
  return (
    <>
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://dacarch.com/wp-content/uploads/2026/01/Front-render-.jpeg"
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
              Wright Residence
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              Dunedin, Florida
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
            The Wright Residence is a comprehensive residential renovation and
            addition project located in Dunedin, Florida. The scope included a
            full exterior facelift of the existing home along with new additions
            to both rear flanking wings, expanding the program while maintaining
            a cohesive architectural character.
          </p>
          <p className="text-pretty text-card-foreground">
            The design reconfigured interior spaces to improve flow,
            functionality, and connection to the rear yard, while the new
            additions introduced expanded living areas and supporting spaces.
            Care was taken to integrate new construction seamlessly with the
            existing structure, balancing proportion, rooflines, and material
            transitions.
          </p>
          <p className="text-pretty text-card-foreground">
            The project was developed in coordination with zoning requirements,
            building code standards, and site constraints typical of established
            residential neighborhoods in Dunedin. Architectural services focused
            on clear documentation, constructability, and permit readiness,
            resulting in a coordinated drawing set that supports efficient
            review and construction.
          </p>
          <div className="mt-12 flex flex-col md:flex-row gap-8">
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/project-3-2.png"
                width={585}
                height={400}
                alt="Project Image"
                className="rounded-lg border border-accent shadow-xl"
              />
            </div>
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/project-3-1.png"
                width={600}
                height={400}
                alt="Project Image"
                className="rounded-lg border border-accent shadow-xl"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={
                "https://dacarch.com/wp-content/uploads/2026/01/project-3-3.png"
              }
              width={1000}
              height={600}
              alt="Project Image"
              className="rounded-lg border border-accent shadow-xl"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
