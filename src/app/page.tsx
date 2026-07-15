import Link from "next/link";
import { Button } from "@/components/ui/button";

const SDLC_STAGES = [
  {
    name: "Discovery",
    description: "Understand requirements and plan the project",
  },
  {
    name: "Design",
    description: "UI/UX design and system architecture",
  },
  {
    name: "Development",
    description: "Build the product with best practices",
  },
  {
    name: "QA & Testing",
    description: "Ensure quality through automated and manual testing",
  },
  {
    name: "DevOps",
    description: "Deploy, monitor, and maintain infrastructure",
  },
  {
    name: "Maintenance",
    description: "Ongoing support and continuous improvement",
  },
];

const ROLES = [
  "Frontend",
  "Backend",
  "DevOps",
  "QA",
  "UI/UX",
  "Architect",
  "PM",
  "Mobile",
  "AI/ML",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            vnz<span className="text-muted-foreground">.dev</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/developers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Developers
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Where developers
            <br />
            get hired
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A global marketplace built by developers, for developers. From
            discovery to deployment — connect with clients across the entire
            software development lifecycle.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register?role=developer">
              <Button size="lg" className="text-base px-8">
                I&apos;m a developer
              </Button>
            </Link>
            <Link href="/register?role=client">
              <Button size="lg" variant="outline" className="text-base px-8">
                Hire developers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-border bg-muted/30 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Specialized roles
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Not just &quot;freelancers&quot; — real specialists in every area of
            software development.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ROLES.map((role) => (
              <span
                key={role}
                className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SDLC */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Full development lifecycle
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Every stage of software development, covered. Find the right people
            for every phase of your project.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SDLC_STAGES.map((stage) => (
              <div
                key={stage.name}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold text-lg mb-2">{stage.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Open source, community driven
          </h2>
          <p className="text-muted-foreground mb-8">
            vnz.dev is built in the open. Contribute code, report bugs, or
            shape the future of how developers get hired.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/jaimeirazabal1/vnz.dev" target="_blank">
              <Button size="lg" variant="outline" className="text-base px-8">
                View on GitHub
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="text-base px-8">
                Join the community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} vnz.dev</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
