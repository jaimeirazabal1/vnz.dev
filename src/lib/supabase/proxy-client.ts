import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function createClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet, cacheHeaders) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          Object.entries(cacheHeaders).forEach(([key, value]) =>
            response.headers.set(key, value)
          );
        },
      },
    }
  );
}
