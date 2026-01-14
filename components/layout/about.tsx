import { Section, Container, Prose } from "@/components/craft";
import Image from "next/image";

export default function About() {
  return (
    <Container className="mt-0 mb-4">
      <Prose className="pb-8 text-center">
        <h2>About DAC</h2>
      </Prose>

      <Prose>
        <section className="about-section">
          <Image
            src="https://dacarch.com/wp-content/uploads/2026/01/Dean-Corsaro-Circle.png"
            alt="Dean Corsaro"
            width={200}
            height={200}
            className="circle-image w-38! h-38! sm:w-40! sm:h-40! md:w-48! md:h-48! lg:w-52! lg:h-52!"
          />
          <p>
            DAC Architects is a Florida-based architecture studio led by
            licensed architect Dean Corsaro Jr., providing architectural
            services for residential, commercial, and multifamily projects.{" "}
          </p>
          <p>
            Our work is grounded in feasibility, constructability, and code
            compliance. We focus on clear documentation, efficient layouts, and
            designs that perform in the real world — from early concept through
            permitting and construction.
          </p>
          <p>
            Every project is approached with the same objective: create
            architecture that holds up through approval, building, and long-term
            use. Whether working with homeowners, developers, or business
            owners, we prioritize clarity, responsiveness, and practical
            problem-solving throughout the design process.
          </p>
        </section>
      </Prose>

      {/* <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3"></div>

        <div className="flex gap-2 items-center">
          <Button size="lg" className="w-full sm:w-auto">
            Contact Us
          </Button>
        </div>
      </div> */}
    </Container>
  );
}
