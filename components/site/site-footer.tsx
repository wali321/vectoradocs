import Link from "next/link";
import { project } from "@/lib/project";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        {project.name} · Made by {project.author}
      </p>
      <Link href="/contact">Contact Us</Link>
    </footer>
  );
}
