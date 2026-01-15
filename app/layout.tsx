import "./globals.css";
import Head from "next/head";
import Script from "next/script";
// fonts
import { Inter as FontSans } from "next/font/google";
// Theme provider and (some) layout components
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react";
// site config and utils
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
// types
import type { Metadata } from "next";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.site_name,
    template: `%s | ${siteConfig.site_name}`,
  },
  description: siteConfig.site_description,
  keywords: siteConfig.site_keywords,
  authors: [{ name: "DAC Architects" }],
  creator: "DAC Architects",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.site_domain,
    title: siteConfig.site_name,
    description: siteConfig.site_description,
    siteName: siteConfig.site_name,
    images: [
      {
        url: siteConfig.og_image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.site_name} - ${siteConfig.site_tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.site_name,
    description: siteConfig.site_description,
    images: [siteConfig.og_image],
    creator: siteConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification IDs here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

const GoogleAnalytics_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.site_domain}#business`,
    name: siteConfig.site_name,
    description: siteConfig.site_description,
    url: siteConfig.site_domain,
    logo: siteConfig.og_image,
    image: siteConfig.og_image,
    serviceType: ["Architectural Design", "Residential Architecture"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5767 75th Ave",
      addressLocality: "Pinellas Park",
      addressRegion: "FL",
      postalCode: "33781",
      addressCountry: "US",
    },
    sameAs: [
      // siteConfig.social.twitter
      //   ? `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`
      //   : "",
      // siteConfig.social.linkedin
      //   ? `https://linkedin.com/in/${siteConfig.social.linkedin}`
      //   : "",
      siteConfig.social.instagram
        ? `https://instagram.com/${siteConfig.social.instagram.replace(
            "@",
            ""
          )}`
        : "",
    ].filter(Boolean),
    slogan: siteConfig.site_tagline,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn("min-h-screen font-sans antialiased", font.variable)}
        suppressHydrationWarning
      >
        {GoogleAnalytics_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalytics_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GoogleAnalytics_ID}', { page_path: window.location.pathname });
            `}
            </Script>
          </>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // "light" | "dark"
          // enableSystem // uncomment to enable system theme detection (dark/light)
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
