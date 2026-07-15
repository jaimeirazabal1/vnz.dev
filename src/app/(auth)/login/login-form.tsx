"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    router.push("/developers");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-2xl font-bold tracking-tight mb-8 block">
            vnz<span className="text-muted-foreground">.dev</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-muted-foreground mb-6">Sign in to your account</p>
          <form onSubmit={handleLogin} className="space-y-4">
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
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-foreground font-medium hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 border-l border-border">
        <div className="max-w-md px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Build something great</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of developers and clients building the future of software together.
          </p>
        </div>
      </div>
    </div>
  );
}
