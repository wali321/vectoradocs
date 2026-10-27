import type { Metadata } from "next";
import Link from "next/link";
import { project } from "@/lib/project";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the creator of Vectora through the supplied GitHub profile.",
  alternates: process.env.SITE_URL ? { canonical: "/contact" } : undefined,
};

export default function ContactPage() {
  return (
    <main id="main-content" className="page-width contact-page">
      <header className="contact-heading">
        <h1>Contact Us</h1>
        <p>
          Vectora is made by {project.author}. The supplied public contact
          destination is this GitHub profile.
        </p>
      </header>
      <section aria-label="Project contact" className="contact-card">
        <h2>{project.author}</h2>
        <p>Project creator</p>
        <Link
          href={project.contactUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          github.com/wali321
        </Link>
      </section>
    </main>
  );
}
