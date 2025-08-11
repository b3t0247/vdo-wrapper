// Dynamic room page with VDO.Ninja
import { getVdoLanguage } from "@/lib/vdoLanguageMap";
import VdoEmbed from "@/components/VdoEmbed";
import { useLocale } from "next-intl";

export default function RoomPage({ params }: { params: { id: string } }) {
  const locale = useLocale();
  const vdoLang = getVdoLanguage(locale);
  const vdoUrl = `https://vdo.ninja/?room=${params.id}&language=${vdoLang}`;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-bold">Room: {params.id}</h1>
      <VdoEmbed src={vdoUrl} />
    </main>
  );
}
