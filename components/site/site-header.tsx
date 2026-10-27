import Link from "next/link";
import { project } from "@/lib/project";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link aria-label={`${project.name} home`} className="wordmark" href="/">
          {project.name}
        </Link>
        <div className="header-tools">
          <nav aria-label="Primary navigation" className="primary-nav">
            <Link href="/models">Models</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
