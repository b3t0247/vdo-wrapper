export default async function ManualPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const supportedLocales = ["en", "es"];
  const safeLocale = supportedLocales.includes(locale) ? locale : "en";

  const ManualContent = (
    await import(`@/content/manual/${safeLocale}/intro.mdx`)
  ).default;

  return (
    <main className="prose mx-auto p-4">
      <ManualContent />
    </main>
  );
}
