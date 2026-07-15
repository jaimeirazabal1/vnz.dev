import Link from "next/link";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/developers", label: "Developers" },
  { href: "/projects", label: "Projects" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/messages", label: "Messages" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-muted/20 flex flex-col">
        <div className="h-14 flex items-center px-5 border-b border-border">
          <Link href="/" className="text-lg font-bold tracking-tight">
            vnz<span className="text-muted-foreground">.dev</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/login"
            className="block px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
