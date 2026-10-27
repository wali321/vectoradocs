import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { project } from "@/lib/project";

export const metadata: Metadata = {
  title: "Contact Vectora",
  description: "Send a question or feedback about the Vectora project.",
  alternates: process.env.SITE_URL ? { canonical: "/contact" } : undefined,
};

export default function ContactPage() {
  return (
    <main id="main-content" className="page-width contact-page">
      <header className="contact-heading">
        <h1>Contact Vectora</h1>
        <p>
          Share a question, technical suggestion, bug report, research idea, or
          collaboration inquiry.
        </p>
      </header>
      <div className="contact-layout">
        <aside aria-label="Contact information" className="contact-context">
          <h2>Explore the project</h2>
          <p>
            Message delivery is not configured. The form validates your input,
            but does not send or store messages.
          </p>
          <Link
            href={project.repositoryUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            View the Vectora repository
          </Link>
        </aside>
        <section aria-labelledby="contact-form-title" className="contact-panel">
          <h2 id="contact-form-title">Send a message</h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
