"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"developer" | "client">("developer");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Account created! Check your email for confirmation.");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-2xl font-bold tracking-tight mb-8 block">
            vnz<span className="text-muted-foreground">.dev</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-muted-foreground mb-6">Join the developer marketplace</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setRole("developer")}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    role === "developer"
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Developer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    role === "client"
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Client
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 border-l border-border">
        <div className="max-w-md px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {role === "developer" ? "Showcase your skills" : "Find top talent"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {role === "developer"
              ? "Build your portfolio, connect with clients, and get hired for projects that match your expertise."
              : "Browse specialized developers, review their work, and hire the perfect fit for your project."}
          </p>
        </div>
      </div>
    </div>
  );
}
