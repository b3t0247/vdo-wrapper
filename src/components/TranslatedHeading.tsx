"use client";
import { useTranslations } from "next-intl";

type Props = {
  section: string;
};

export default function TranslatedHeading({ section }: Props) {
  const t = useTranslations(section);
  return <h2>{t("title")}</h2>;
}
