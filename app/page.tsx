import Image from "next/image";
// Components
import Hero from "@/components/Hero";
import Services from "@/components/layout/services";
import About from "@/components/layout/about";
import Projects from "@/components/layout/projects";
import Ribbon from "@/components/layout/ribbon";
import {
  Testimonial,
  TestimonialsCarousel,
} from "@/components/testimonialsCarousel";

const testimonialsArray: Testimonial[] = [
  {
    id: "1",
    content:
      "This product has completely transformed how we work. The team is responsive, the features are intuitive, and the results speak for themselves. Highly recommended!",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
  },
  {
    id: "2",
    content:
      "Outstanding service from start to finish. The attention to detail and commitment to excellence is evident in every interaction. We couldn't be happier with our decision.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "/professional-man.jpg",
    rating: 5,
  },
  {
    id: "3",
    content:
      "A game-changer for our business. The ROI was immediate and the ongoing support has been exceptional. This is exactly what we were looking for.",
    author: "Emily Rodriguez",
    role: "Director of Operations",
    company: "Growth Solutions",
    avatar: "/professional-woman-smiling.png",
    rating: 5,
  },
  {
    id: "4",
    content:
      "The level of professionalism and expertise is unmatched. They understood our needs perfectly and delivered beyond our expectations. Absolutely fantastic!",
    author: "David Thompson",
    role: "CTO",
    company: "Digital Dynamics",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "5",
    content:
      "Implementing this solution was seamless. The support team guided us every step of the way, and we saw results within the first week. Couldn't ask for more!",
    author: "Jennifer Martinez",
    role: "VP of Marketing",
    company: "Brand Builders",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "6",
    content:
      "Simply outstanding! The quality of work and dedication to customer success is remarkable. This has been one of the best investments we've made.",
    author: "Robert Kim",
    role: "Founder",
    company: "StartupHub",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
];

export default function Home() {
  const secret = process.env.WORDPRESS_WEBHOOK_SECRET;
  console.log(
    "ENV secret length:",
    process.env.WORDPRESS_WEBHOOK_SECRET?.length
  );
  console.log("Header secret length:", secret?.length);

  return (
    <>
      <Hero />
      <main>
        <div style={{ marginTop: "-2rem", zIndex: "10", position: "relative" }}>
          <Services />
        </div>
        <About />
        <div className="max-w-[75%] mx-auto">
          <hr />
        </div>
        <Projects />
        <Ribbon
          ribbonText="Don Dino Divino"
          ribbonSubtext="El Bambino"
          ribbonImage="https://dacarch.com/wp-content/uploads/2026/01/construction-plans-drawing-tools-blueprints-scaled.jpg"
        />

        <p className="text-center mt-16 mb-8 text-3xl font-semibold">
          What Our Clients Say (work in progress)
        </p>
        <TestimonialsCarousel testimonials={testimonialsArray} />
      </main>
    </>
  );
}

{
  //  import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
  /* <section className="services-section">
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts"
            >
              <Pen size={32} />
              <span>
                Posts{" "}
                <span className="block text-sm text-muted-foreground">
                  All posts from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/pages"
            >
              <File size={32} />
              <span>
                Pages{" "}
                <span className="block text-sm text-muted-foreground">
                  Custom pages from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/authors"
            >
              <User size={32} />
              <span>
                Authors{" "}
                <span className="block text-sm text-muted-foreground">
                  List of the authors from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/tags"
            >
              <Tag size={32} />
              <span>
                Tags{" "}
                <span className="block text-sm text-muted-foreground">
                  Content by tags from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="/posts/categories"
            >
              <Diamond size={32} />
              <span>
                Categories{" "}
                <span className="block text-sm text-muted-foreground">
                  Categories from your WordPress
                </span>
              </span>
            </Link>
            <a
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href="https://github.com/9d8dev/next-wp/blob/main/README.md"
            >
              <Folder size={32} />
              <span>
                Documentation{" "}
                <span className="block text-sm text-muted-foreground">
                  How to use `next-wp`
                </span>
              </span>
            </a>
          </div>
        </section> */
}
