import { Container } from "@/components/craft";
import { stripHtml } from "@/lib/metadata";
import PageHeaderBackground from "@/components/page-header-background";

export default function PageHeader({
  title = "",
  subtitle = "",
  imgSrc = "",
  alt = "Header Image",
  textAlign = "center",
}: {
  title?: string;
  subtitle?: string;
  imgSrc?: string;
  textAlign?: "left" | "center" | "right";
  alt?: string;
}) {
  return (
    <header className="relative bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      {imgSrc ? (
        <PageHeaderBackground src={imgSrc} alt={alt} />
      ) : (
        <div className="absolute inset-0 z-0 bg-black/40" />
      )}

      <Container className="relative z-10 px-4">
        <div
          className={`max-w-5xl ${
            textAlign === "left"
              ? "mr-auto text-left"
              : textAlign === "right"
                ? "ml-auto text-right"
                : "mx-auto text-center"
          }`}
        >
          <h1
            className={`text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl`}
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {stripHtml(title)}
          </h1>
          {subtitle && (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              {stripHtml(subtitle)}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
