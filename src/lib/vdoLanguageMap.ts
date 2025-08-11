// Maps app locale to VDO.Ninja language
export const vdoLanguageMap: Record<string, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  ja: "ja",
  zh: "zh",
  pt: "pt",
  ru: "ru",
  it: "it",
  ko: "ko",
};

export function getVdoLanguage(appLocale: string): string {
  return vdoLanguageMap[appLocale] || "en";
}
