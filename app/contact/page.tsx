// Craft Imports
import { Section, Container, Prose } from "@/components/craft";

// Others
import { Mail, Phone, MapPin, Clock } from "lucide-react";

// This page is using the craft.tsx component and design system
export default function Contact() {
  const contactDetails = [
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@realestatefirm.com",
      href: "mailto:info@realestatefirm.com",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "123 Main Street, Suite 200\nNew York, NY 10001",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
      href: null,
    },
  ];
  return (
    <div>
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://dacarch.com/wp-content/uploads/2026/01/arch-image-scaled.jpg"
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
              Get in Touch
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </section>
      <Container className="rounded-lg bg-card p-8 shadow-lg mt-2">
        <div className="space-y-6 mx-auto max-w-6xl">
          <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
            Contact Information
          </h2>
          {contactDetails.map((detail) => {
            const Icon = detail.icon;
            const content = (
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-base font-medium leading-relaxed text-card-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            );

            if (detail.href) {
              return (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="block rounded-lg transition-colors hover:bg-muted/50"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={detail.label} className="rounded-lg">
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
