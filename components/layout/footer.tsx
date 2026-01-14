import { Container } from "@/components/craft";
// import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/site.config";
import Link from "next/link";
import { DAC_Icon } from "../icons/DAC_Icon";

export function Footer() {
  return (
    <footer>
      <div className="max-w-[90%] mx-auto mt-12">
        <hr />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col h-24 md:flex-row md:gap-2 gap-6 justify-between md:items-center px-4 md:px-0 py-4">
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
          </div>
        </div>
        <div className="items-center gap-2 hidden sm:flex">
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
        </div>
      </div>
    </footer>
  );
}
