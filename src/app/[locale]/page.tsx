import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("homepage");

  return (
    <section className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div className="group flex max-w-xl flex-col items-center gap-4 text-center sm:flex-row sm:gap-3 sm:text-left">
        <Globe className="size-8 text-blue-600 transition duration-500 group-hover:text-blue-700 sm:size-6 dark:text-blue-400 dark:group-hover:text-blue-500" />
        <h1 className="group-hover:animate-pulseOnce animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent transition duration-500 sm:text-3xl">
          {t("title")}
        </h1>
      </div>

      <p className="text-muted-foreground max-w-xl">{t("description")}</p>

      <a
        href="https://github.com/b3t0247/nextjs-tailwind/tree/main?tab=readme-ov-file#%EF%B8%8F-getting-started"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-500 dark:focus:ring-blue-600">
          {t("cta")}
        </Button>
      </a>
    </section>
  );
}
