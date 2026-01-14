import { Section, Container, Prose } from "@/components/craft";
import Image from "next/image";

export default function Ribbon({
  ribbonImage = "",
  ribbonText = "",
  ribbonSubtext = "",
}: {
  ribbonImage: string;
  ribbonText: string;
  ribbonSubtext?: string;
}) {
  return (
    <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ribbonImage}
          alt={ribbonText}
          fill
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/40" /> */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {ribbonText}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
            {ribbonSubtext}
          </p>
        </div>
      </div>
    </section>
  );
}
