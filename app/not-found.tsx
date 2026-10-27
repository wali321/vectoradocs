import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-width contact-page">
      <header className="contact-heading">
        <h1>Page not found</h1>
        <p>
          This model, version, or page is not part of the published Vectora
          documentation.
        </p>
      </header>
      <p>
        <Link className="text-link" href="/models">
          Browse models
        </Link>
      </p>
    </main>
  );
}
