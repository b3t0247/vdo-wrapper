"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navigation } from "@/i18n/navigation";
import clsx from "clsx";

export default function NavBar() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // crude locale extraction

  return (
    <nav className="mx-auto flex w-full max-w-fit justify-center gap-6">
      {navigation.map(({ label, path }) => (
        <Link
          key={path}
          href={`/${locale}${path}`}
          className={clsx(
            "text-sm font-medium hover:text-blue-600",
            pathname === `/${locale}${path}` && "text-blue-600 underline",
          )}
        >
          {t(label)}
        </Link>
      ))}
    </nav>
  );
}
