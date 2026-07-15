import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s an overview of your activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground mb-1">Active projects</p>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground mb-1">Proposals sent</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground mb-1">Messages</p>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects">
            <Button>Browse projects</Button>
          </Link>
          <Link href="/developers">
            <Button variant="outline">Find developers</Button>
          </Link>
          <Link href="/messages">
            <Button variant="outline">Messages</Button>
          </Link>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
        <div className="space-y-3">
          {[
            { text: "New proposal received on \"E-commerce Platform Redesign\"", time: "2 hours ago" },
            { text: "Milestone completed for \"Mobile App MVP\"", time: "5 hours ago" },
            { text: "New message from Maria Garcia", time: "1 day ago" },
            { text: "Project \"API Migration\" moved to in_progress", time: "2 days ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
              <span>{item.text}</span>
              <span className="text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
