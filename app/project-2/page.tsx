import Image from "next/image";
// Craft Imports
import { Section, Container, Prose } from "@/components/craft";

// This page is using the craft.tsx component and design system
export default function Project2() {
  return (
    <>
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg"
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
              Crispy Cones
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              Commercial Tenant Improvement in Clearwater, Florida
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
            Crispy Cones is a commercial tenant improvement project converting
            an existing strip-center space into a new franchise ice cream shop
            in Clearwater, Florida. The scope included interior demolition, new
            partitions, service counters, and back-of-house support spaces
            tailored to the franchise's operational requirements.
          </p>
          <p className="text-pretty text-card-foreground">
            The layout was designed to support efficient customer flow, clear
            separation between public and service areas, and compliance with
            accessibility and life safety requirements. The project was
            classified as an Assembly occupancy and developed to meet Florida
            Building Code, NFPA, and ADA standards, including occupant load
            calculations, exit access, emergency lighting, and restroom
            accessibility.
          </p>
          <p className="text-pretty text-card-foreground">
            Architectural services focused on producing a coordinated,
            permit-ready drawing set, integrating architectural, MEP, and life
            safety requirements to support a smooth review and construction
            process. The result is a clear, functional interior environment that
            supports both daily operations and long-term franchise use.
          </p>
          <div className="mt-12 flex flex-col md:flex-row gap-8">
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg"
                width={600}
                height={400}
                alt="Project Image"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <Image
                src="https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg"
                width={600}
                height={400}
                alt="Project Image"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
