// import { readdir, readFile } from "fs/promises";
// import path from "path";

// export async function getMessages(locale: string) {
//   const messagesDir = path.join(process.cwd(), "src/messages", locale);
//   const files = await readdir(messagesDir);

//   const messages: Record<string, unknown> = {};

//   for (const file of files) {
//     if (file.endsWith(".json")) {
//       const namespace = path.basename(file, ".json");
//       const content = await readFile(path.join(messagesDir, file), "utf8");
//       messages[namespace] = JSON.parse(content);
//     }
//   }

//   return messages;
// }

import common_en from "@/messages/en/common.json";
import dashboard_en from "@/messages/en/dashboard.json";
import home_en from "@/messages/en/home.json";
import manual_en from "@/messages/en/manual.json";

import common_es from "@/messages/es/common.json";
import dashboard_es from "@/messages/es/dashboard.json";
import home_es from "@/messages/es/home.json";
import manual_es from "@/messages/es/manual.json";

const translations = {
  en: {
    common: common_en,
    dashboard: dashboard_en,
    home: home_en,
    manual: manual_en,
  },
  es: {
    common: common_es,
    dashboard: dashboard_es,
    home: home_es,
    manual: manual_es,
  },
} as const;

export function getMessages(locale: keyof typeof translations) {
  return translations[locale] ?? translations["en"];
}
