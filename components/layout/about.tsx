import { Section, Container, Prose } from "@/components/craft";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Container>
      <Prose className="py-8">
        <h1>About Us</h1>
      </Prose>

      <Prose>
        <section className="about-section">
          <Image
            src="https://dacarch.com/wp-content/uploads/2026/01/Dean-Corsaro-Circle.png"
            alt="Dean Corsaro"
            width={200}
            height={200}
            className="circle-image !w-38 !h-38 sm:!w-40 sm:!h-40 md:!w-48 md:!h-48 lg:!w-52 lg:!h-52"
          />

          <p className="!text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
