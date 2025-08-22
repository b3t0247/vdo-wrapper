"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Password successfully reset.");
    } else {
      setMessage("Reset failed. Try again.");
    }
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-md">
        <h2 className="text-foreground mb-6 text-center text-2xl font-bold">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-border bg-input text-foreground mb-4 w-full rounded border px-4 py-2"
        />
        <button
          onClick={handleReset}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Reset Password
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
