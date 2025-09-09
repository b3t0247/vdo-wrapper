"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  const stripLocaleFromPath = (path: string) => path.replace(/^\/(en|es)/, "");
  const toggleLocale = () => {
    const nextLocale = activeLocale === "en" ? "es" : "en";
    const newPath = `/${nextLocale}${stripLocaleFromPath(pathname)}`;
    document.cookie = `preferredLocale=${nextLocale}; path=/; max-age=31536000`; // Store for 1 year
    router.push(newPath); // client-side navigation
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      aria-label="Toggle language"
    >
      🌐
      <div>{activeLocale.toUpperCase()}</div>
    </Button>
  );
}
