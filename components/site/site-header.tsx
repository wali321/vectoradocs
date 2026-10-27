import Link from "next/link";
import { project } from "@/lib/project";
import { PrimaryNavigation } from "./primary-navigation";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link aria-label={`${project.name} home`} className="wordmark" href="/">
          {project.name}
        </Link>
        <div className="header-tools">
          <PrimaryNavigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
