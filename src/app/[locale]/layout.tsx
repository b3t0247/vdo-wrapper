import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "@/lib/getMessages";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/NavBar";

type Messages = {
  common?: {
    metadata?: {
      title?: string;
      description?: string;
    };
  };
  [namespace: string]: unknown;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as (typeof routing.locales)[number];
  const messages = (await getMessages(locale)) as Messages;

  return {
    title: messages.common?.metadata?.title ?? "Default Title",
    description:
      messages.common?.metadata?.description ?? "Default Description",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as (typeof routing.locales)[number];

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="America/Los_Angeles"
    >
      <header className="flex items-center justify-between border-b p-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>
      <div className="flex items-center justify-center border-b p-1">
        <NavBar />
      </div>
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
