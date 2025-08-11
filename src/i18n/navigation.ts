import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

export const locales = ["en", "es"] as const;

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// export const pathname = {
//   "/": {
//     en: "/",
//     es: "/",
//   },
//   "/tailwind-preview": {
//     en: "/tailwind-preview",
//     es: "/tailwind-preview",
//   },
// };

export const localePrefix = "always"; // adds locale to all paths
