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
    "Professional architectural design firm specializing in modern residential and commercial projects.",
  site_tagline: "Design. Architect. Create.",
  site_domain: "https://dacarchdesign.com",
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
    instagram: "@dac_architects_llc",
  },
  og_image:
    "https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png",
};
