import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { ModeToggle } from "@/components/theme-toggle";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params); // ✅ explicitly await
  const t = await getTranslations({ locale: resolvedParams.locale });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the imcoming `locale` is valid
  const { locale } = await Promise.resolve(params);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="America/Los_Angeles"
    >
      <header className="flex items-center justify-between border-b p-4">
        <LanguageSwitcher />
        <ModeToggle />
      </header>
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
