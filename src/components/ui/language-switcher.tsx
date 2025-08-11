"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  // const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations();

  const stripLocaleFromPath = (path: string) => path.replace(/^\/(en|es)/, "");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Switch language">
          🌐 {t("language")} - {activeLocale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        // className="rounded-md border bg-white p-2 shadow-lg"
        className="opacity-0 transition-all duration-200 ease-out data-[state=open]:translate-y-1 data-[state=open]:opacity-100"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() =>
              window.location.assign(
                `/${locale}${stripLocaleFromPath(pathname)}`,
              )
            }
            className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
