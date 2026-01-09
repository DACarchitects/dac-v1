import { Container } from "@/components/craft";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/site.config";
import Link from "next/link";
import { DAC_Icon } from "../icons/DAC_Icon";

export function Footer() {
  return (
    <footer className="">
      <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
        <div className="flex flex-col gap-6 not-prose">
          {/* <Link href="/">
            <h3 className="sr-only">{siteConfig.site_name}</h3>
            <DAC_Icon className="text-foreground" />
          </Link> */}
          {/* <p>{siteConfig.site_description}</p> */}
        </div>
        {/* <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div> */}
        {/* <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div> */}
      </Container>
      <div className="max-w-[90%] mx-auto">
        <hr />
      </div>
      <Container className="not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
        <div>
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2" href="/">
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              <span className="text-sm text-muted-foreground">&copy;</span>
              <DAC_Icon className="text-foreground" width={100} />
            </Link>
          </div>
          <div className="flex justify-between">
            <span className="ml-5 text-sm text-muted-foreground">
              All rights reserved, {new Date().getFullYear()}
            </span>
            <div className="-mt-4 sm:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
        {/* <p className="text-muted-foreground">
          &copy; <a href="https://9d8.dev">9d8</a>. All rights reserved.
          2025-present.
        </p> */}
        <div className="items-center gap-2 hidden sm:flex">
          {/* <p className="text-muted-foreground">Developed by </p> */}
          <a
            href="https://alfredodeveloper.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.alfredorafael.com/wp-content/uploads/2019/02/whileLogoName-e1551079673184.png"
              alt="Alfredo Developer Logo"
              style={{
                maxWidth: "3.5rem",
                height: "auto",
                marginTop: "0.25rem",
              }}
            />
          </a>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
