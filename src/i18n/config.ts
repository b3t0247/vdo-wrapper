// i18n-js v4 setup (new)
// src/i18n/config.ts
import { createTranslator } from "next-intl";

export async function getTranslator(locale: string) {
  const messages = await import(`../locales/${locale}.json`);
  return createTranslator({ locale, messages: messages.default });
}
