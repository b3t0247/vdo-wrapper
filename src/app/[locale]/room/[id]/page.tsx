// Dynamic room page with VDO.Ninja
import { getVdoLanguage } from "@/lib/vdoLanguageMap";
import VdoEmbed from "@/components/VdoEmbed";
import { getLocale } from "next-intl/server";

export default async function RoomPage() {
  const locale = await getLocale();
  const vdoLang = getVdoLanguage(locale);
  const vdoUrl = `https://vdo.ninja/?room=${locale}&language=${vdoLang}&cleanoutput`;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-bold">Room: {locale}</h1>
      <VdoEmbed src={vdoUrl} />
    </main>
  );
}
