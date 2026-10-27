import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Crimson_Pro,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/site/theme-provider";
import { project } from "@/lib/project";

const bodyFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

const editorialFont = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600", "700"],
});

const codeFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  weight: ["400", "500"],
});

const siteUrl = process.env.SITE_URL
  ? new URL(process.env.SITE_URL)
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${project.name} — Research documentation`,
    template: `%s | ${project.name}`,
  },
  description:
    `Research documentation for ${project.name}'s machine learning and language models.`,
  applicationName: project.name,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: project.name,
    title: `${project.name} — Research documentation`,
    description:
      "A project-wide record of model documentation, versions, methods, and evidence.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      className={`${bodyFont.variable} ${editorialFont.variable} ${codeFont.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
