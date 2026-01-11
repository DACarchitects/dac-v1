type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
  site_tagline: string;
  site_keywords: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  og_image: string;
};

export const siteConfig: SiteConfig = {
  site_name: "DAC Architects",
  site_description:
    "Professional architectural design and consulting firm specializing in modern residential and commercial projects. We bring your vision to life through innovative design and expert craftsmanship.",
  site_tagline: "Design. Architect. Create.",
  site_domain: "https://dacarch.com/",
  site_keywords: [
    "architecture",
    "architectural design",
    "architects",
    "residential architecture",
    "commercial architecture",
    "building design",
    "construction",
    "architectural consulting",
    "modern architecture",
  ],
  social: {
    twitter: "@DACArchitects",
    linkedin: "company/dac-architects",
    instagram: "@dacarchitects",
  },
  og_image:
    "https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png",
};
