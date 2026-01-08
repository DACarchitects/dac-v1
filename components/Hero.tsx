import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png"
          alt=""
          //   className="h-full w-full object-cover opacity-40"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-background" />
        {/* <div className="absolute inset-0 bg-black/60" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-50 text-center sm:px-8 lg:px-12 pad">
        <h1
          className="text-balance font-serif text-5xl tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-light max-w-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Imagine, visualize, and create.
        </h1>

        {/* <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl md:mt-8">
          Used by some of the world&apos;s largest companies, Next.js enables
          you to create{" "}
          <span className="font-semibold text-foreground">
            high-quality web applications
          </span>{" "}
          with the power of React components.
        </p> */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground sm:text-xl md:mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo officia
          sunt.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
          >
            Learn More
          </Button>
        </div>

        {/* Optional: Terminal Command */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono">~</span>
          <code className="font-mono">npx create-next-app@latest</code>
        </div>
      </div>
    </section>
  );
}
