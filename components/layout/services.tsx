import { Section, Container, Prose } from "@/components/craft";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";

export default function Services() {
  return (
    <Section className="px-6 lg:px-36">
      <Prose>
        <h1 className="text-center">Our Services</h1>
      </Prose>
      <section className="services-section">
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* //////////////////////////////////////////////////////////////////////// */}
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
          {/* //////////////////////////////////////////////////////////////////////// */}
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
          {/* //////////////////////////////////////////////////////////////////////// */}
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
          {/* //////////////////////////////////////////////////////////////////////// */}
        </div>
      </section>
    </Section>
  );
}
