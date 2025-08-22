"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordField from "@/components/ui/password-field";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // Replace with your registration logic
    alert("Registration submitted");
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-md">
        <h2 className="text-foreground mb-6 text-center text-2xl font-bold">
          Create Account
        </h2>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-border bg-input text-foreground mt-1 w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border bg-input text-foreground mt-1 w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <PasswordField
            placeholder="Password"
            value={password}
            onChange={setPassword}
            className="border-border bg-input text-foreground mt-1 w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            onClick={handleRegister}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
