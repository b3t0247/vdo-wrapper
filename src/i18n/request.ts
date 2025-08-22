import { getMessages } from "@/lib/getMessages";
import { routing, Locale } from "@/i18n/routing";

export default async function getRuntimeConfig(locale: string): Promise<{
  locale: Locale;
  messages: Record<string, unknown>;
}> {
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const messages = await getMessages(safeLocale);

  return {
    locale: safeLocale,
    messages,
  };
}
