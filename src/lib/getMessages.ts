// import { readFile } from "fs/promises";
// import path from "path";

// export async function getMessages(locale: string) {
//   const home = await readFile(
//     path.join(process.cwd(), "src/messages", locale, "home.json"),
//     "utf8",
//   );
//   const dashboard = await readFile(
//     path.join(process.cwd(), "src/messages", locale, "dashboard.json"),
//     "utf8",
//   );
//   const common = await readFile(
//     path.join(process.cwd(), "src/messages", locale, "common.json"),
//     "utf8",
//   );

//   return {
//     home: JSON.parse(home),
//     dashboard: JSON.parse(dashboard),
//     common: JSON.parse(common),
//   };
// }

import { readdir, readFile } from "fs/promises";
import path from "path";

export async function getMessages(locale: string) {
  const messagesDir = path.join(process.cwd(), "src/messages", locale);
  const files = await readdir(messagesDir);

  const messages: Record<string, unknown> = {};

  for (const file of files) {
    if (file.endsWith(".json")) {
      const namespace = path.basename(file, ".json");
      const content = await readFile(path.join(messagesDir, file), "utf8");
      messages[namespace] = JSON.parse(content);
    }
  }

  return messages;
}
