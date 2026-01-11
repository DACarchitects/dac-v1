export default function PageHeader({
  title = "",
  subtitle = "",
  imgSrc = "",
}: {
  title?: string;
  subtitle?: string;
  imgSrc?: string;
}) {
  return (
    <header className="relative bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          alt="Header Image"
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
            {title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
