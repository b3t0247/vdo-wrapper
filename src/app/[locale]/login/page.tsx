"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PasswordField from "@/components/ui/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // State for credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Loading state to prevent double submission
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl, // Ensures proper redirect after login
    });

    setLoading(false);

    if (result?.error) {
      setError("Login failed: " + result.error);
    } else {
      // window.location.href = callbackUrl;
      // Wait briefly to ensure cookie is written
      setTimeout(() => {
        window.location.href = callbackUrl;
      }, 250);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider: string) => {
    await signIn(provider, { callbackUrl });
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-md">
        <h2 className="text-foreground mb-6 text-center text-2xl font-bold">
          Sign In
        </h2>

        {/* ⚠️ Error message display */}
        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ✅ Correct form submission using onSubmit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="text-foreground block text-sm font-medium">
                Username
              </label>
              <Input
                name="username"
                type="text"
                value={username.toLowerCase()}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="border-border bg-input text-foreground mt-1 w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-foreground block text-sm font-medium">
                Password
              </label>
              <PasswordField
                name="password"
                value={password}
                onChange={setPassword}
                placeholder="Password"
                className="border-border bg-input text-foreground mt-1 w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-between text-sm">
              <span />
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button disables while loading */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              {/* Sign In */}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-6 border-t pt-4 text-center">
          <p className="text-muted-foreground mb-2 text-sm">Or sign in with</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
