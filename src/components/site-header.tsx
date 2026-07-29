import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-gradient" />
          <span className="font-display text-lg font-bold tracking-tight">
            Stonelam SOP
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          <NavLink to="/">Home</NavLink>

          {/* SOP with hover-intent dropdown */}
          <div className="group relative">
            <Link
              to="/sop"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              SOP
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                <DropdownLink
                  to="/sop/developers"
                  title="Developers SOP"
                  desc="Sales & delivery playbook"
                />
                <DropdownLink
                  to="/sop/architects"
                  title="Architects SOP"
                  desc="Specification & engagement guide"
                />
              </div>
            </div>
          </div>

          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </nav>

      </div>
    </header>
  );
}

function NavLink({
  to,
  children,
}: {
  to: "/" | "/resources" | "/faq";
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-muted-foreground transition hover:text-foreground"
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

function DropdownLink({
  to,
  title,
  desc,
}: {
  to: "/sop/developers" | "/sop/architects";
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="block border-b border-border/60 px-4 py-3 text-sm transition last:border-0 hover:bg-accent"
      activeProps={{ className: "bg-accent/60 text-primary" }}
    >
      <div className="font-display font-semibold">{title}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Stonelam. Italian-engineered porcelain slabs.</p>
        <p className="font-display uppercase tracking-[0.2em]">Stonelam SOP</p>
      </div>
    </footer>
  );
}
