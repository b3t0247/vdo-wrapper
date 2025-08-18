"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string;
};

export default function PasswordField({
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  className,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none",
          className,
        )}
      />

      {value && (
        <button
          type="button"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
          aria-label="Hold to reveal password"
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="transition-opacity duration-200 ease-in-out">
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </button>
      )}
    </div>
  );
}
