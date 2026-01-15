// Craft Imports
import { Container } from "@/components/craft";
import { ContactForm } from "@/components/contactForm";
import { contactDetails } from "../data";
import PageHeader from "@/components/pageHeader";

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="For inquiries, project discussions, or collaborations, feel free to reach out via our phone, email, or  contact form!"
        imgSrc="https://dacarch.com/wp-content/uploads/2026/01/arch-image-scaled.jpg"
      />

      <Container className="rounded-lg bg-card p-8 mt-2 flex flex-col lg:flex-row gap-10 lg:gap-20">
        <ContactForm />
        <div className="space-y-6 md:mx-auto max-w-6xl">
          <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
            Contact Information
          </h2>
          {contactDetails.map((detail: any) => {
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
    </>
  );
}
