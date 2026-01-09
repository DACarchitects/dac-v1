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
              Project 1
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </section>
      <Container className="rounded-lg bg-card p-8 shadow-sm">
        <div className="space-y-6 mx-auto max-w-6xl">
          <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
            Project 1 Details
          </h2>
          <p className="text-pretty text-card-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Container>
    </>
  );
}
