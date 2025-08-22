"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    // Replace with your API call
    const res = await fetch("/api/auth/request-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Check your email for a reset link.");
    } else {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-md">
        <h2 className="text-foreground mb-6 text-center text-2xl font-bold">
          Forgot Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-border bg-input text-foreground mb-4 w-full rounded border px-4 py-2"
        />
        <button
          onClick={handleRequest}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Send Reset Link
        </button>
        {message && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
