import { Section, Container, Prose } from "@/components/craft";
import ExpandIcon from "@/components/icons/expandIcon";
import BuildIcon from "@/components/icons/buildIcon";
import HomeIcon from "@/components/icons/homeIcon";

// make div component to use for each service with icon, title, and description
function Service({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ReactElement<{ size: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex px-2 md:px-8 py-6 gap-4 items-start">
      <div>{Icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    // <Section className="bg-accent/50">
    <Section className="bg-linear-to-b from-transparent via-accent/50 to-accent/50 mb-3">
      <div className="xl:flex px-6 lg:px-36">
        <div className="flex-1">
          <Service
            icon={<BuildIcon />}
            title="Custom Design"
            description="Bring your unique vision to life. Our bespoke design process transforms your ideas into a one-of-a-kind home tailored to your lifestyle and preferences."
          />
        </div>
        <div className="flex-1 md:border-r md:border-l">
          <Service
            icon={<HomeIcon />}
            title="Residential Remodeling"
            description="Create your dream home from the ground up. We specialize in creating beautiful and functional residential spaces that reflect our clients' lifestyles and preferences."
          />
        </div>
        <div className="flex-1">
          <Service
            icon={<ExpandIcon />}
            title="Extension & Renovation Design"
            description="Expand your horizons without changing address. Our extension designs seamlessly integrate with your existing property, and adding value to your home."
          />
        </div>
      </div>
    </Section>
  );
}

{
  /* <Section className="px-6 lg:px-28 2xl:px-48 xl:px-36">
      <Prose>
        <h1 className="text-center">Our Services</h1>
      </Prose>
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
      </div>
    </Section > 
    */
}
