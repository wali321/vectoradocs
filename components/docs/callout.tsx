import type { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
  title?: string;
  type?: "note" | "important" | "warning";
};

export function Callout({
  children,
  title,
  type = "note",
}: CalloutProps) {
  return (
    <aside className={`callout callout-${type}`} role="note">
      {title && <p className="callout-title">{title}</p>}
      <div>{children}</div>
    </aside>
  );
}
